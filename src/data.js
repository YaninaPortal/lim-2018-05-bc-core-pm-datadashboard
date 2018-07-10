window.processCohortData = (options) => {
  console.log('Cuarta funcion');
  let courses = Object.keys(options.cohort.coursesIndex);
  let computedData = computeUsersStats(options.cohortData.users, options.cohortData.progress, courses);
  let sortData = sortUsers(computedData, options.orderBy, options.orderDirection);
  let filterData = filterUsers(sortData, options.search);
  return filterData;
}

let coursesProgress = {
  name: '',
  excercises: 0,
  reads: 0,
  quizzes: 0
}

window.computeUsersStats = (users, progress, courses) => {

  let usersWithStats = [];
  let coursesProgress = {};

  // variables contador por tipo 
  let excercisesInPart = 0;
  let quizzesInPart = 0;
  let readsInPart = 0;

  // variables contador progreso por curso
  let excercisesInCourse = 0;
  let quizzesInCourse = 0;
  let readsInCourse = 0;

  // variables contador de completados por tipo
  let excercisesCompleted = 0;
  let quizzesCompleted = 0;
  let readsCompleted = 0;

  // variable para porcentaje total stats
  let percentForStats = 0;
  let quizzesScore = 0;

  // analizando el archivo json que contiene el progreso de los usuarios
  for (let i = 0; i < users.length; i++) {
    users[i].name = users[i].name.toUpperCase();

    courses.forEach(course => {
      coursesProgress.name = course;
      if (progress[users[i].id].hasOwnProperty(course)) {
        let units = progress[users[i].id][course];
        percentForStats = units.percent;
        for (let unit in units) {
          let temas = units[unit];
          for (let tema in temas) {
            let parts = temas[tema];
            for (let part in parts) {
              let subparts = parts[part];
              for (let subpart in subparts) {
                let subsubparts = subparts[subpart];
                if (subpart.includes('guided') === false) {
                  switch (subsubparts.type) {
                    case 'practice':
                      excercisesInPart += Object.keys(subsubparts.exercises).length;
                      for (let subsubpart in subsubparts) {
                        let exercises = subsubparts[subsubpart];
                        for (let excercise in exercises) {
                          if (exercises[excercise].completed == 1) {
                            excercisesCompleted++;
                          }
                        }
                      }
                      break;
                    case 'quiz':
                      quizzesInPart++;
                      if (subsubparts.completed === 1) {
                        quizzesCompleted++;
                        quizzesScore += subsubparts.score;
                      }
                      break;
                    case 'read':
                      readsInPart++;
                      if (subsubparts.completed === 1) {
                        readsCompleted++;
                      }
                      break;
                  }
                }
              }
            }
          }
        }
      }
    });


    // asignando los stats a cada usuario, con sus respectivos progresos calculados
    users[i].stats = {
      excercises: {
        total: excercisesInPart,
        completed: excercisesCompleted,
        percent: (excercisesCompleted === 0 && excercisesInPart === 0) ? 0 : Math.round((excercisesCompleted / excercisesInPart) * 100)
      },
      quizzes: {
        total: quizzesInPart,
        completed: quizzesCompleted,
        percent: (quizzesCompleted === 0 && quizzesInPart === 0) ? 0 : Math.round((quizzesCompleted / quizzesInPart) * 100),
        scoreSum: quizzesScore,
        scoreAvg: (quizzesCompleted === 0 && quizzesInPart === 0) ? 0 : Math.round(quizzesScore / quizzesCompleted)
      },
      reads: {
        total: readsInPart,
        completed: readsCompleted,
        percent: (readsCompleted === 0 && readsInPart === 0) ? 0 : Math.round((readsCompleted / readsInPart) * 100)
      },
      percent: percentForStats,
    };

    // contando progreso por curso
    excercisesInCourse += users[i].stats.excercises.percent;
    readsInCourse += users[i].stats.reads.percent;
    quizzesInCourse += users[i].stats.quizzes.percent;

    // reiniciando contadores
    excercisesInPart = 0;
    quizzesInPart = 0;
    readsInPart = 0;

    excercisesCompleted = 0;
    quizzesCompleted = 0;
    readsCompleted = 0;
    quizzesScore = 0;

    percentForStats = 0;


  }
  // llenando datos en el objeto cursoProgress
  coursesProgress.excercises = Math.round(excercisesInCourse / users.length);
  coursesProgress.reads = Math.round(readsInCourse / users.length);
  coursesProgress.quizzes = Math.round(quizzesInCourse / users.length);

  // enviando objeto coursesProgress 
  progressGeneral(coursesProgress);

  // asignando a userWithStats los usuarios con sus stats calculados
  usersWithStats = users;
  return usersWithStats;
};

//ordenar usuarios
window.sortUsers = (users, orderBy, orderDirection) => {
  console.log('segunda funcion, ordenar usuarios');

  //devuelve usuarios ordenados de acuerdo a elección
  let usersOrder = users.sort((a, b) => {
    switch (orderBy) {
      case 'name': {
        if (orderDirection === 'ASC') {
          if (a[orderBy] > b[orderBy]) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a[orderBy] < b[orderBy]) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      case 'excercises': {
        if (orderDirection === 'ASC') {
          if (a.stats[orderBy].percent > b.stats[orderBy].percent) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a.stats[orderBy].percent < b.stats[orderBy].percent) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      case 'reads': {
        if (orderDirection === 'ASC') {
          if (a.stats[orderBy].percent > b.stats[orderBy].percent) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a.stats[orderBy].percent < b.stats[orderBy].percent) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      case 'quizzes': {
        if (orderDirection === 'ASC') {
          if (a.stats[orderBy].percent > b.stats[orderBy].percent) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a.stats[orderBy].percent < b.stats[orderBy].percent) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      case 'percent': {
        if (orderDirection === 'ASC') {
          if (a.stats[orderBy] > b.stats[orderBy]) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a.stats[orderBy] < b.stats[orderBy]) {
            return 1;
          } else {
            return -1;
          }
        }
      }
    }
  }
  );
  return usersOrder;
};

//filtrar usuarios
window.filterUsers = (users, search) => {
  console.log('tercera funcion, filtrar usuarios');

  if (search === "") {
    return users;
  } else {
    return users.filter(user => (user.name.includes(search.toUpperCase())));
  }

};


let createTable = (element, title, usersWithStats) => {
  console.log('creando tablas');

  var thead = document.createElement('thead'); // crea un element thead para table
  var tr = document.createElement('tr'); // crea un elemento tr para el head

  for (var i = 0; i < title.length; i++) {
    var th = document.createElement('th');//crea un elemento th para cada titulo
    th.appendChild(document.createTextNode(title[i])); //da el nombre del titulo
    tr.appendChild(th); // agrega el th a sus respectivos tr
  }
  thead.appendChild(tr); //agrega el tr al thead

  var tbdy = document.createElement('tbody');
  for (var j = 0; j < usersWithStats.length; j++) {
    var tr = document.createElement('tr');
    for (var k = 0; k < title.length; k++) {
      if (k === 0) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(j.toString()));
        tr.appendChild(td);
      } else if (k === 1) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(usersWithStats[j].name));
        tr.appendChild(td);
      } else if (k < (title.length - 1)) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(usersWithStats[j].stats[Object.keys(usersWithStats[j].stats)[k - 2]].percent));
        tr.appendChild(td);
      } else if (k === title.length - 1) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(usersWithStats[j].stats[Object.keys(usersWithStats[j].stats)[k - 2]]));
        tr.appendChild(td);
      }
    }
    tbdy.appendChild(tr);
  }
  element.appendChild(thead);
  element.appendChild(tbdy);
}

const getJSON = (url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = _ => {
    if (xhr.readyState === 4) {
      if (xhr.status !== 200) {
        return callback(new Error(`HTTP error: ${xhr.status}`));
      }
      try {
        callback(null, JSON.parse(xhr.responseText));
      } catch (err) {
        callback(err);
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
};

