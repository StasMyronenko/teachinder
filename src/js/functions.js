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

function getCorrectData(randomUserMock, additionalUsers) {
  const res = [];
  randomUserMock.forEach(
    (i) => {
      const el = {};
      el.id = randomUserMock[i].id.name + randomUserMock[i].id.value;
      el.gender = randomUserMock[i].gender;

      el.title = randomUserMock[i].name.title;
      el.full_name = `${randomUserMock[i].name.first} ${randomUserMock[i].name.last}`;

      el.city = randomUserMock[i].location.city;
      el.state = randomUserMock[i].location.state;
      el.country = randomUserMock[i].location.country;
      el.postcode = randomUserMock[i].location.postcode;
      el.coordinates = randomUserMock[i].location.coordinates;
      el.timezone = randomUserMock[i].location.timezone;

      el.email = randomUserMock[i].email;

      el.b_date = randomUserMock[i].dob.date;
      el.age = randomUserMock[i].dob.age;

      el.phone = randomUserMock[i].phone;
      el.picture_large = randomUserMock[i].picture.large;
      el.picture_thumbnail = randomUserMock[i].picture.thumbnail;

      const addEl = findElementAddInfo(el, additionalUsers);
      if (addEl !== undefined) {
        const emptyFields = [];
        const keys = Object.keys(el);
        keys.forEach((field) => {
          if (!el[field] || el[field] === 'null') {
            emptyFields.push(field);
          }
        });
        emptyFields.forEach((f) => {
          el[f] = addEl[f];
        });
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
    });
  return res;
}
// 2

function validationPhone(str) {
  let res = '';
  for (let s = 0; s < str.length; s += 1) {
    if (s <= '9' && s >= '0') {
      res += s;
    }
  }
  return res;
}

function dataValidation(data) {
  const countriesPhone = {
    Germany: '49',
    Ireland: '353',
    Australia: '61',
    'United States': '1',
    Finland: '358',
    Turkey: '90',
    Switzerland: '41',
    'New Zealand': '64',
    Spain: '34',
    Norway: '47',
    Denmark: '45',
    Iran: '98',
    Canada: '1',
    France: '33',
    Netherlands: '31',
  };

  // 1
  data.forEach((el) => {
    if (typeof el.full_name === 'string') {
      if (
        el.full_name.charAt(0).toUpperCase() !== el.full_name.charAt(0)
      ) {
        el.full_name = el.full_name.charAt(0).toUpperCase() + el.full_name.slice(1);
      }
    } else {
      el.full_name = null;
    }

    if (typeof el.gender == 'string') {
      if (el.gender.charAt(0).toUpperCase() !== el.gender.charAt(0)) {
        el.gender =
          el.gender.charAt(0).toUpperCase() + el.gender.slice(1);
      }
    } else {
      el.note = null;
    }

    if (typeof el.note == 'string') {
      if (el.note.charAt(0).toUpperCase() !== el.note.charAt(0)) {
        el.note = el.note.charAt(0).toUpperCase() + el.note.slice(1);
      }
    } else {
      el.note = null;
    }

    if (typeof el.state == 'string') {
      if (el.state.charAt(0).toUpperCase() !== el.state.charAt(0)) {
        el.state =
          el.state.charAt(0).toUpperCase() + el.state.slice(1);
      }
    } else {
      el.state = null;
    }

    if (typeof el.city == 'string') {
      if (el.city.charAt(0).toUpperCase() !== el.city.charAt(0)) {
        el.city = el.city.charAt(0).toUpperCase() + el.city.slice(1);
      }
    } else {
      el.city = null;
    }

    if (typeof el.country == 'string') {
      if (el.country.charAt(0).toUpperCase() !== el.country.charAt(0)) {
        el.country =
          el.country.charAt(0).toUpperCase() + el.country.slice(1);
      }
    } else {
      el.country = null;
    }
    // 2
    if (typeof el.age !== 'number') {
      el.age = null;
    }
    // 3
    el.phone = validationPhone(el.phone);
    let code = countriesPhone[el.country];
    if (el.phone.slice(0, code.length) !== code) {
      el.phone = null;
    }

    // 4
    if (!el.email.includes('@')) {
      el.email = false;
    }
  });
}

function filter(data, params) {
  let res = [];

  for (let client of data) {
    let flag = true;
    for (let p in params) {
      //console.log(params[p], client[p])
      if (params[p] !== undefined && client[p] !== params[p]) {
        flag = false;
        break;
      }
    }
    if (flag === true) {
      res.push(client);
    }
  }
  return res;
}

// TODO 4

function dataSort(data, params = [], ascending = false) {
  // ascending - зростаюча
  let param = null;
  let res = [...data];
  if (typeof params == 'string') {
    param = params;
  } else {
    param = params[0];
  }

  if (typeof res[0][param] == 'number') {
    res.sort(function (a, b) {
      return a[param] - b[param];
    });
  } else {
    res.sort(function (a, b) {
      if (a[param] <= b[param]) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  if (ascending === true) {
    return res.reverse();
  } else {
    return res;
  }
}

function searchObject(data, param) {
  for (let i in param) {
    for (let el of data) {
      if (el[i] === param[i]) {
        return el;
      }
    }
  }
  return undefined;
}
