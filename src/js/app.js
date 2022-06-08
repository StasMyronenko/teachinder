// eslint-disable-next-line import/extensions
import Teachers from './teachers';

const start = async () => {
  const teacher = await new Teachers((await Teachers.getDataFromRandomUserAPI(50)).results);

  teacher.getCorrectData();

  teacher.dataValidation();

  // Created filter for country

  teacher.configureFilters();

  teacher.configureSearchField();

  teacher.configureAddTeacherForm();

  teacher.updateTopTeachers(teacher.data);

  teacher.updateFavorite();

  teacher.updateStatistics();
};

start();
