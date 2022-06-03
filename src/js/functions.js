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
    (randomUser) => {
      let el = {};
      el.id = randomUser.id.name + randomUser.id.value;
      el.gender = randomUser.gender;

      el.trandomUsertle = randomUser.name.title;
      el.full_name = `${randomUser.name.first} ${randomUser.name.last}`;

      el.city = randomUser.location.city;
      el.state = randomUser.location.state;
      el.country = randomUser.location.country;
      el.postcode = randomUser.location.postcode;
      el.coordinates = randomUser.location.coordinates;
      el.timezone = randomUser.location.timezone;

      el.email = randomUser.email;

      el.b_date = randomUser.dob.date;
      el.age = randomUser.dob.age;

      el.phone = randomUser.phone;
      el.picture_large = randomUser.picture.large;
      el.picture_thumbnail = randomUser.picture.thumbnail;

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
        el.favorite = null;
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

export function dataSort(data, param = 'full_name', ascending = false) {
  // ascending - зростаюча
  const res = [...data];

  if (typeof res[0][param] === 'number') {
    res.sort((a, b) => a[param] - b[param]);
  } else {
    res.sort((a, b) => {
      if (a[param] <= b[param]) {
        return -1;
      }
      return 1;
    });
  }
  if (ascending === true) {
    return res.reverse();
  }
  return res;
}

export function searchObject(data, param) {
  const parameters = Object.keys(param);
  return parameters.reduce((p, c) => data.reduce((pEl, cEl) => {
    if (cEl[c] === param[c]) {
      return cEl;
    }
    return pEl;
  }, undefined),
  undefined);
}
