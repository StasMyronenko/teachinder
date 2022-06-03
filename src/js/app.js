// eslint-disable-next-line import/extensions
import { randomUserMock, additionalUsers } from './db.js';
import {
  getCorrectData, dataValidation, filter, dataSort, searchObject,
// eslint-disable-next-line import/extensions
} from './functions.js';

const dirtyData = getCorrectData(randomUserMock, additionalUsers);
console.log(dirtyData);
// 2
const data = dataValidation(dirtyData);
console.log(data);
// 3
const myClients = filter(data, { gender: 'Female' });
// let my_client = data.filter(element => element.gender == 'Female')
console.log(myClients);

// 4
const sData = dataSort(data, 'full_name');
// let s_data = data.sort((a, b) => a['age'] > b['age'] ? -1 : 1)
// let s_data = data.sort((a, b) => a['full_name'] > b['full_name'] ? -1 : 1)
console.log(sData);

const el = searchObject(data, { age: 65 });
// let el = data.find(el => el['age'] > 65)
console.log(el);

const find6 = (data.reduce(
  (total, current) => total + (current.age > 65 ? 1 : 0), 0,
) / data.length) * 100;

console.log(find6);
