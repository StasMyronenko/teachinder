// eslint-disable-next-line import/extensions
import { randomUserMock, additionalUsers } from './db.js';

// eslint-disable-next-line import/extensions
const Teacher = require('./functions.js');

const teacher = new Teacher(randomUserMock, additionalUsers);

teacher.getCorrectData();

teacher.dataValidation();

/* Created filter for country */
teacher.configureFilters();

teacher.configureSearchField();

teacher.configureAddTeacherForm();

teacher.updateTopTeachers(teacher.data);

teacher.updateFavorite();

teacher.updateStatistics();
