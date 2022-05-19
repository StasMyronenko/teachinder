const courses = [
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

function findElementAddInfo(el, additionalUsers) {
  const res = additionalUsers.filter(
    (addEl) => el.full_name === addEl.full_name || el.id === addEl.id,
  );
  if (res.length > 0) {
    return res[0];
  }
  return undefined;
}

export function getCorrectData(randomUserMock, additionalUsers) {
  const res = [];
  randomUserMock.forEach(
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

      const addEl = findElementAddInfo(el, additionalUsers);
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
          el.course = courses[Math.floor(Math.random() * 12)];
        }
      } else {
        el.favorite = false;
        el.bg_color = null;
        el.note = null;
        el.course = courses[Math.floor(Math.random() * 12)];
      }
      res.push(el);
    },
  );
  return res;
}
// 2

export function dataValidation(data) {
  // 1
  return data.map((element) => {
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

export function filter(data, params) {
  const res = [];

  data.forEach((client) => {
    let flag = true;
    const parameters = Object.keys(params);
    parameters.forEach((p) => {
      if (!params[p] || client[p] !== params[p]) {
        flag = false;
      }
    });
    if (flag === true) {
      res.push(client);
    }
  });
  return res;
}

function showAllInfo(idCard) {
  const userCard = document.getElementById(idCard);
  const allInfo = userCard.getElementsByClassName('all-info')[0];
  allInfo.style.display = 'flex';
}

function hideAllInfo(idCard) {
  const userCard = document.getElementById(idCard);
  const allInfo = userCard.getElementsByClassName('all-info')[0];
  allInfo.style.display = 'none';
}

function updateFavorite() {
  const favorite = document.getElementsByClassName('favorite')[0];
  const grid = favorite.getElementsByTagName('main')[0];

  const leftArrow = document.createElement('div');
  leftArrow.classList.add('left-arrow');
  leftArrow.innerHTML = '<p>&#10092;</p>';

  const rightArrow = document.createElement('div');
  rightArrow.classList.add('right-arrow');
  rightArrow.innerHTML = '<p>&#10093;</p>';

  grid.appendChild(leftArrow);
}

function changeFavorite(element, star) {
  element.favorite = !element.favorite;
  if (element.favorite) {
    star.innerHTML = '&star;';
  } else {
    star.innerHTML = '&starf;';
  }
  updateFavorite();
}

function createUserCard(user, ind, block = 'tt') {
  const htmlCard = document.createElement('div');
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
                      <div class="star">&star;</div>

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
  const mainInfo = htmlCard.getElementsByClassName('main-info')[0];
  mainInfo.addEventListener('click', () => showAllInfo(`all-info-${block}-${ind}`));

  const cross = htmlCard.getElementsByClassName('cross')[0];
  cross.addEventListener('click', () => hideAllInfo(`all-info-${block}-${ind}`));

  const star = htmlCard.getElementsByClassName('star')[0];
  star.addEventListener('click', () => { changeFavorite(user, star); });
  return htmlCard;
}

export function updateTopTeachers(data) {
  console.log(data);
  const grid = document.getElementsByClassName('top-teachers')[0].getElementsByTagName('main')[0];
  data.forEach((user, ind) => {
    const userCard = createUserCard(user, ind);
    grid.appendChild(userCard);
  });
}
