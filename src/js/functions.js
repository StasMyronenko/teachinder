module.exports = class Teachers {
  constructor(randomUserMock, additionalUsers) {
    this.courses = [
      'Mathematics',
      'Physics',
      'English',
      'Computer Science',
      'Dancing',
      'Chess',
      'Biology',
      'Chemistry',
      'Law',
      'Art',
      'Medicine',
      'Statistics',
    ];
    this.indFirstFavorite = 0;
    this.randomUserMock = randomUserMock;
    this.additionalUsers = additionalUsers;
  }

  findElementAddInfo(el) {
    const res = this.additionalUsers.filter(
      (addEl) => el.full_name === addEl.full_name || el.id === addEl.id,
    );
    if (res.length > 0) {
      return res[0];
    }
    return undefined;
  }

  randomCourse() {
    return this.courses[Math.floor(Math.random() * 12)];
  }

  getCorrectData() {
    const res = [];
    this.randomUserMock.forEach(
      (i) => {
        let el = {};
        el.id = i.id.name + i.id.value;
        el.gender = i.gender;

        el.title = i.name.title;
        el.full_name = `${i.name.first} ${i.name.last}`;

        el.city = i.location.city;
        el.state = i.location.state;
        el.country = i.location.country;
        el.postcode = i.location.postcode;
        el.coordinates = i.location.coordinates;
        el.timezone = i.location.timezone;

        el.email = i.email;

        el.b_date = i.dob.date;
        el.age = i.dob.age;

        el.phone = i.phone;
        el.picture_large = i.picture.large;
        el.picture_thumbnail = i.picture.thumbnail;

        const addEl = this.findElementAddInfo(el);
        if (addEl) {
          const emptyFields = [];
          const keys = Object.keys(el);
          keys.forEach((field) => {
            if (!el[field] || el[field] === 'null') {
              emptyFields.push(field);
            }
          });
          el = { ...el, ...emptyFields.map((f) => addEl[f]) };
          el.favorite = addEl.favorite;
          el.bg_color = addEl.bg_color;
          el.note = addEl.note;
          if (typeof addEl.course === 'string') {
            el.course = addEl.course;
          } else {
            el.course = this.randomCourse();
          }
        } else {
          el.favorite = false;
          el.bg_color = null;
          el.note = null;
          el.course = this.randomCourse();
        }
        res.push(el);
      },
    );
    this.dirtyData = res;
  }

  // 2
  dataValidation() {
    // 1
    this.data = this.dirtyData.map((element) => {
      const el = { ...element };
      if (typeof el.full_name === 'string') {
        if (el.full_name.charAt(0).toUpperCase() !== el.full_name.charAt(0)) {
          el.full_name = el.full_name.charAt(0).toUpperCase() + el.full_name.slice(1);
        }
      } else {
        el.full_name = null;
      }

      if (typeof el.gender === 'string') {
        if (el.gender.charAt(0).toUpperCase() !== el.gender.charAt(0)) {
          el.gender = el.gender.charAt(0).toUpperCase() + el.gender.slice(1);
        }
      } else {
        el.note = null;
      }

      if (typeof el.note === 'string') {
        if (el.note.charAt(0).toUpperCase() !== el.note.charAt(0)) {
          el.note = el.note.charAt(0).toUpperCase() + el.note.slice(1);
        }
      } else {
        el.note = null;
      }

      if (typeof el.state === 'string') {
        if (el.state.charAt(0).toUpperCase() !== el.state.charAt(0)) {
          el.state = el.state.charAt(0).toUpperCase() + el.state.slice(1);
        }
      } else {
        el.state = null;
      }

      if (typeof el.city === 'string') {
        if (el.city.charAt(0).toUpperCase() !== el.city.charAt(0)) {
          el.city = el.city.charAt(0).toUpperCase() + el.city.slice(1);
        }
      } else {
        el.city = null;
      }

      if (typeof el.country === 'string') {
        if (el.country.charAt(0).toUpperCase() !== el.country.charAt(0)) {
          el.country = el.country.charAt(0).toUpperCase() + el.country.slice(1);
        }
      } else {
        el.country = null;
      }
      // 2
      if (typeof el.age !== 'number') {
        el.age = null;
      }
      // 3
      const re = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/;
      const phoneInfo = el.phone.match(re);
      el.phone = phoneInfo ? phoneInfo.input : null;

      // 4
      if (!el.email.includes('@')) {
        el.email = null;
      }
      return el;
    });
  }

  static showAllInfo(idCard) {
    const userCard = document.getElementById(idCard);
    const allInfo = userCard.querySelector('.all-info');
    allInfo.style.display = 'flex';
  }

  static hideAllInfo(idCard) {
    const userCard = document.getElementById(idCard);
    const allInfo = userCard.querySelector('.all-info');
    allInfo.style.display = 'none';
  }

  changeIndFirstFavorite(count) {
    if ((count !== -1 || this.indFirstFavorite)
        && (count !== 1 || this.indFirstFavorite < (this.countFavorite - 5))) {
      this.indFirstFavorite += count;
    }
    this.updateFavorite();
  }

  updateFavorite() {
    const favorite = document.querySelector('.favorite');
    const grid = favorite.querySelector('main');
    grid.innerHTML = '';
    const leftArrow = document.createElement('div');
    leftArrow.classList.add('left-arrow');
    leftArrow.addEventListener('click', () => this.changeIndFirstFavorite(-1));
    leftArrow.innerHTML = '<p>&#10092;</p>';

    const rightArrow = document.createElement('div');
    rightArrow.classList.add('right-arrow');
    rightArrow.addEventListener('click', () => this.changeIndFirstFavorite(1));
    rightArrow.innerHTML = '<p>&#10093;</p>';

    grid.appendChild(leftArrow);

    const arrFavorite = this.data.filter((el) => el.favorite);
    this.countFavorite = arrFavorite.length;
    const maxInd = Math.min(arrFavorite.length, this.indFirstFavorite + 5);
    for (let i = this.indFirstFavorite; i < maxInd; i += 1) {
      const userCard = this.createUserCard(arrFavorite[i], i, 'f');
      grid.appendChild(userCard);
    }
    grid.append(rightArrow);
  }

  changeFavorite(el, st) {
    const element = el;
    const star = st;
    element.favorite = !element.favorite;
    star.innerHTML = element.favorite ? '&starf;' : '&star;';
    this.updateFavorite();
  }

  createUserCard(user, ind, block = 'tt') {
    const htmlCard = document.createElement('div');
    const favoriteStar = user.favorite ? '&starf;' : '&star;';
    htmlCard.classList.add('teacher');
    htmlCard.setAttribute('id', `all-info-${block}-${ind}`);
    htmlCard.innerHTML = `<div class="main-info">
                <figure class="image-bg">
                  <img src="${user.picture_large}" alt="Teacher">
                </figure>
                <h3 class="teacher-name">${user.full_name.split(' ')[0]}</h3>
                <h3 class="teacher-second-name">${user.full_name.split(' ')[1]}</h3>
                <p class="science">${user.course}</p>
                <p class="p-region">${user.country}</p>
              </div>
              <div class="all-info">
                <div>
                  <div class="card">
                    <header>
                      <p class="teacher-info">Teacher Info</p>
                      <p class="cross">&#10006;</p>
                    </header>
                    <section>
                      <figure>
                        <img src="${user.picture_large}" alt="">
                      </figure>
                      <div class="data">
                        <div class="star">${favoriteStar}</div>
  
                        <h3>${user.full_name}</h3>
  
                        <p class="science">${user.course}</p>
                        <p class="address">${user.city}, ${user.country}</p>
                        <p class="year-sex">${user.age}, ${user.gender}</p>
                        <a href="#" class="email">${user.email}</a>
                        <p class="number">${user.phone}</p>
                      </div>
                    </section>
                    <p class="description">
                      ${user.node}
                    </p>
                    <details>
                      <summary>Toggle map</summary>
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9595.97122911726!2d30.474290256320444!3d50.4291003599208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cec3731f1293%3A0x87ef4461299b4604!2z0KHQvtC70L7QvCfRj9C90YHRjNC60LjQuSDQu9Cw0L3QtNGI0LDRhNGC0L3QuNC5INC_0LDRgNC6!5e0!3m2!1sru!2sua!4v1650663638378!5m2!1sru!2sua"
                        width="600"
                        height="200"
                        style="border: 0"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </details>
                  </div>
                </div>
              </div>`;
    const mainInfo = htmlCard.querySelector('.main-info');
    mainInfo.addEventListener('click', () => Teachers.showAllInfo(`all-info-${block}-${ind}`));

    const cross = htmlCard.querySelector('.cross');
    cross.addEventListener('click', () => Teachers.hideAllInfo(`all-info-${block}-${ind}`));

    const star = htmlCard.querySelector('.star');
    star.addEventListener('click', () => { this.changeFavorite(user, star); });
    return htmlCard;
  }

  updateTopTeachers(data = this.data) {
    const grid = document.querySelector('.top-teachers').querySelector('main');
    grid.innerHTML = '';
    data.forEach((user, ind) => {
      const userCard = this.createUserCard(user, ind);
      grid.appendChild(userCard);
    });
  }

  configureFilters() {
    const form = document.querySelector('.filters');
    form.addEventListener('click', () => this.updateFilters());

    const countries = [...new Set(this.data.map((el) => el.country))].sort((a, b) => (
      a > b ? 1 : -1
    ));
    const region = document.getElementById('region');
    region.innerHTML = '<option value="All">All</option>';
    countries.forEach((country) => {
      const option = document.createElement('option');
      option.setAttribute('value', country);
      option.innerHTML = country;
      region.appendChild(option);
    });
  }

  updateFilters() {
    const form = document.querySelector('.filters');
    const ageField = form.age.value;
    const age = ageField.split('-');
    const region = form.region.value;
    const gender = form.sex.value;
    const photo = form.photo_only.checked;
    const favorite = form.favorite_only.checked;
    let res = [...this.data];
    if (age[0] !== 'All') {
      if (age.length === 2) {
        res = res.filter((user) => user.age >= parseInt(age[0], 10)
            && user.age <= parseInt(age[1], 10));
      } else {
        res = res.filter((user) => user.age >= 40);
      }
    }

    if (region !== 'All') {
      res = res.filter((user) => user.country === region);
    }

    if (gender !== 'Both') {
      res = res.filter((user) => user.gender === gender);
    }

    if (photo) {
      res = res.filter((user) => user.picture_large > '');
    }

    if (favorite) {
      res = res.filter((user) => user.favorite);
    }
    this.updateTopTeachers(res);
  }

  updateStatistics(listData = this.data) {
    const data = [...listData];
    const table = document.querySelector('.statistics').querySelector('table');
    table.innerHTML = '';

    const head = document.createElement('tr');
    head.classList.add('table-head');

    const name = document.createElement('th');
    name.innerText = 'Name';
    name.addEventListener('click', () => {
      data.sort((a, b) => {
        if (a.full_name > b.full_name) {
          return 1;
        }
        return -1;
      });
      this.updateStatistics(data);
    });

    const speciality = document.createElement('th');
    speciality.innerText = 'Speciality';
    speciality.addEventListener('click', () => {
      data.sort((a, b) => {
        if (a.course >= b.course) {
          return 1;
        }
        return -1;
      });
      this.updateStatistics(data);
    });

    const age = document.createElement('th');
    age.innerText = 'Age';
    age.addEventListener('click', () => {
      data.sort((a, b) => b.age - a.age);
      this.updateStatistics(data);
    });

    const gender = document.createElement('th');
    gender.innerText = 'Gender';
    gender.addEventListener('click', () => {
      data.sort((a, b) => {
        if (a.gender <= b.gender) {
          return 1;
        }
        return -1;
      });
      this.updateStatistics(data);
    });

    const nationality = document.createElement('th');
    nationality.innerText = 'Nationality';
    nationality.addEventListener('click', () => {
      data.sort((a, b) => {
        if (a.country >= b.country) {
          return 1;
        }
        return -1;
      });
      this.updateStatistics(data);
    });
    head.appendChild(name);
    head.appendChild(speciality);
    head.appendChild(age);
    head.appendChild(gender);
    head.appendChild(nationality);

    table.appendChild(head);

    data.forEach((user) => {
      const tr = document.createElement('tr');

      const userName = document.createElement('td');
      userName.innerText = user.full_name;

      const userSpeciality = document.createElement('td');
      userSpeciality.innerText = user.course;

      const userAge = document.createElement('td');
      userAge.innerText = user.age;

      const userGender = document.createElement('td');
      userGender.innerText = user.gender;

      const userNationality = document.createElement('td');
      userNationality.innerText = user.country;

      tr.appendChild(userName);
      tr.appendChild(userSpeciality);
      tr.appendChild(userAge);
      tr.appendChild(userGender);
      tr.appendChild(userNationality);
      table.appendChild(tr);
    });
  }

  configureSearchField() {
    const form = document.getElementById('search-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const str = form.search_field.value;
      this.search(str);
    });
  }

  search(pattern) {
    const data = this.findAllForSearch(pattern);
    this.updateTopTeachers(data);
  }

  findAllForSearch(pattern) {
    return this.data.filter((user) => user.full_name.includes(pattern)
        || (user.note && user.note.includes(pattern))
        || user.age === parseInt(pattern, 10));
  }

  createAddTeacherForm() {
    const form = document.createElement('div');
    form.classList.add('add-teacher-form');
    const optionCourses = this.courses.map((c) => `<option value="${c}">${c}</option>`);
    const countries = [...new Set(this.data.map((c) => c.country))];
    countries.sort((a, b) => (a > b ? 1 : -1));
    const optionCountries = countries.map((c) => `<option value="${c}">${c}</option>`);
    form.innerHTML = `
            <div>
              <div class="card">
                <header>
                  <p>Add Teacher</p>
                  <div class="cross">&#10006;</div>
                </header>
                <form>
                  <label for="name">Name</label>
                  <input type="text" id="name" placeholder="Enter name" />

                  <label for="speciality">Speciality</label>
                  <select id="speciality">
                    ${optionCourses}
                  </select>
                  <div class="grid">
                    <div class="country">
                      <label for="country">Country</label>

                      <select id="country">
                        ${optionCountries}
                      </select>
                    </div>

                    <div class="city">
                      <label for="city">City</label>
                      <input type="text" id="city" />
                    </div>

                    <div class="email">
                      <label for="email">Email</label>
                      <input type="email" id="email" />
                    </div>

                    <div class="phone">
                      <label for="phone">Phone</label>
                      <input type="tel" id="phone" />
                    </div>

                    <div class="bdate">
                      <label for="bdate">Date of birth</label>
                      <input type="date" id="bdate" />
                    </div>
                  </div>

                  <div class="sex">
                    <p>Sex</p>
                    <label for="male">Male</label>
                    <input type="radio" name="sex" id="male" required>

                    <label for="female">Female</label>
                    <input type="radio" name="sex" id="female" />
                  </div>

                  <div class="bg-color">
                    <label for="color">Background color</label>
                    <input type="color" id="color" />
                  </div>

                  <div class="notes">
                    <label for="notes">Notes(Optional)</label>
                    <textarea id="notes" cols="65" rows="10"></textarea>
                  </div>

                  <div class="button-add">
                    <input type="submit" id="button-add" value="Add" />
                  </div>
                </form>
              </div>
            </div>`;
    const cross = form.querySelector('.cross');
    cross.addEventListener('click', () => {
      form.style.display = 'none';
    });

    return form;
  }

  configureAddTeacherForm() {
    const buttons = document.getElementsByClassName('add-teacher');
    const fatherDiv = document.querySelector('.menu-and-add-teacher');
    const divForm = this.createAddTeacherForm();
    const form = divForm.querySelector('form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTeacher(form);
    });
    for (let i = 0; i < buttons.length; i += 1) {
      buttons[i].addEventListener('click', () => {
        divForm.style.display = 'flex';
      });
    }
    fatherDiv.appendChild(divForm);
  }

  addTeacher(form) {
    const name = form.name.value;
    const course = form.speciality.value;
    const country = form.country.value;
    const city = form.city.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const bDate = form.bdate.value;
    const gender = form.male.checked ? 'Male' : 'Female';
    const color = form.color.value;
    const notes = form.notes.value;

    const date = new Date(bDate);
    const now = new Date(Date.now());

    let age = now.getFullYear() - date.getFullYear();
    if (date.getMonth() > now.getMonth()) {
      age -= 1;
    }

    const newUser = {
      gender,
      title: gender === 'Male' ? 'Mr' : 'Mrs',
      full_name: name,
      city,
      course,
      bg_color: color,
      state: null,
      country,
      postcode: null,
      coordinates: { latitude: null, longitude: null },
      timezone: null,
      email,
      b_date: bDate,
      age,
      phone,
      id: null,
      favorite: false,
      picture_large: null,
      picture_thumbnail: null,
      notes,
    };
    if (!this.alreadyCreated(newUser)) {
      this.data.push(newUser);
    } else {
      alert('This user already created');
    }
    this.updateTopTeachers();
    this.updateStatistics();
  }

  alreadyCreated(user) {
    return this.data.reduce((p, c) => {
      if (c.full_name === user.full_name
      && c.course === user.course
      && c.country === user.country) {
        return c;
      }
      return p;
    }, undefined);
  }
};
