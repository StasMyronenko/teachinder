// eslint-disable-next-line import/extensions
import { randomUserMock, additionalUsers } from './db.js';
import {
  getCorrectData, dataValidation, updateTopTeachers,
// eslint-disable-next-line import/extensions
} from './functions.js';

const dirtyData = getCorrectData(randomUserMock, additionalUsers);

// 2
const data = dataValidation(dirtyData);

updateTopTeachers(data);
