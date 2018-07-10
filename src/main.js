// usar main.js para todo tu código que tenga que ver con mostrar los datos en la pantalla
// DOM // Info necesaria: controlador-> main.js (aqui va el fetch o xhr), modelo-> data.js, vista-> html, css
const selectCohort = document.getElementById('cohortGeneral');

const buttonGeneral = document.getElementById('button-general');
const buttonStudents = document.getElementById('button-students');
const textSearch = document.getElementById('text-search');
const tableStudents = document.getElementById('table-students');
const selectOrder = document.getElementById('select-order');
const selectDirOrder = document.getElementById('order-direction');
const course = document.getElementById('course')
const excercisesCourse = document.getElementById('excercises-course')
const readsCourse = document.getElementById('reads-course')
const quizzesCourse = document.getElementById('quizzes-course')

// Arreglo para el título de la tabla a mostrar en estudiantes
const title = [
  'Index',
  'Name',
  'Exercises',
  'Quizzes',
  'Reads',
  'Percent Total'
]
 
const selectCohort = document.getElementById('cohortGeneral');

getJSON('../data/cohorts.json', (err, json) => {
  if (err) {
    return console.error(err);
  }

  const jsonCohorts = json;

  for (let i = 0; i < jsonCohorts.length; i++) {
    const optionsElements = document.createElement('option');
    const contenidoOptions = document.createTextNode(jsonCohorts[i].id);
    optionsElements.appendChild(contenidoOptions);
    selectCohort.appendChild(optionsElements);
  }

  selectCohort.addEventListener('change', () => {
    const position = jsonCohorts.map((cohort) => { return cohort.id }).indexOf(selectCohort.value);
    const cohort = jsonCohorts[position];

    getJSON('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, json) => {
      if (err) {
        return console.error(err);
      }
      const jsonUsers = json;

      getJSON('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, json) => {
        if (err) {
          return console.error(err);
        }
        const jsonProgress = json;
        options = {
          cohort: cohort,
          cohortData: {
            users: jsonUsers,
            progress: jsonProgress
          },
          orderBy: "",
          orderDirection: "",
          search: ''
        }
        let usersWithStats = processCohortData(options);
        createTable(tableStudents, title, usersWithStats);


      });
    });
  });
})

const progressGeneral = (coursesProgress) => {

  course.innerHTML = coursesProgress.name;
  excercisesCourse.innerHTML = coursesProgress.excercises +' % ';
  readsCourse.innerHTML = coursesProgress.reads +' % ';
  quizzesCourse.innerHTML = coursesProgress.quizzes +' % ';

}

// evento para activar la vista General
buttonGeneral.addEventListener('click', () => {
  buttonGeneral.className = 'active';
  buttonStudents.classList.remove('active');
  document.getElementById('students').className = 'hidden';
  document.getElementById('general').classList.remove('hidden');
});

// evento para activar la vista de Estudiantes
buttonStudents.addEventListener('click', () => {
  buttonStudents.className = 'active';
  buttonGeneral.classList.remove('active');
  document.getElementById('general').className = 'hidden';
  document.getElementById('students').classList.remove('hidden');
});

// evento para filtrar estudiantes
textSearch.addEventListener('keyup', () => {
  tableStudents.innerHTML = '';
  options.search = textSearch.value;

  let usersWithStats = processCohortData(options);
  createTable(tableStudents, title, usersWithStats);
})

//  evento para ordenar estudiantes
selectOrder.addEventListener('change', () => {
  if (selectOrder.value !== '-1' && selectDirOrder.value !== '-1') {
    tableStudents.innerHTML = '';
    options.orderBy = selectOrder.value;
    options.orderDirection = selectDirOrder.value;
    let usersWithStats = processCohortData(options);
    createTable(tableStudents, title, usersWithStats);
  }
});


selectDirOrder.addEventListener('change', () => {
  if (selectOrder.value !== '-1' && selectDirOrder.value !== '-1') {
    tableStudents.innerHTML = '';
    options.orderBy = selectOrder.value;
    options.orderDirection = selectDirOrder.value;
    let usersWithStats = processCohortData(options);
    createTable(tableStudents, title, usersWithStats);
  }

});


