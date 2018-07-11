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
  exercises: 0,
  reads: 0,
  quizzes: 0
}

window.computeUsersStats = (users, progress, courses) => {

  let usersWithStats = [];
  let coursesProgress = {};

  // variables contador por tipo para cada usuario 
  let exercisesInPart = 0;
  let quizzesInPart = 0;
  let readsInPart = 0;

  // variables contador progreso por tipo para cada curso
  let exercisesInCourse = 0;
  let quizzesInCourse = 0;
  let readsInCourse = 0;

  // variables contador de completados por tipo para cada usuario
  let exercisesCompleted = 0;
  let quizzesCompleted = 0;
  let readsCompleted = 0;

  // variable para porcentaje total del curso por usuario
  let percentTotal = 0;
  let quizzesScore = 0;

  // analizando el archivo json que contiene el progreso de los usuarios
  for (let i = 0; i < users.length; i++) {
    users[i].name = users[i].name.toUpperCase();

    courses.forEach(course => {
      coursesProgress.name = course;
      if (progress[users[i].id].hasOwnProperty(course)) {
        let units = progress[users[i].id][course];
        percentTotal = units.percent;
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
                      exercisesInPart += Object.keys(subsubparts.exercises).length;
                      for (let subsubpart in subsubparts) {
                        let exercises = subsubparts[subsubpart];
                        for (let exercise in exercises) {
                          if (exercises[exercise].completed == 1) {
                            exercisesCompleted++;
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
      exercises: {
        total: exercisesInPart,
        completed: exercisesCompleted,
        percent: (exercisesCompleted === 0 && exercisesInPart === 0) ? 0 : Math.round((exercisesCompleted / exercisesInPart) * 100)
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
      percent: percentTotal,
    };

    // contando progreso por curso
    exercisesInCourse += users[i].stats.exercises.percent;
    readsInCourse += users[i].stats.reads.percent;
    quizzesInCourse += users[i].stats.quizzes.percent;

    // reiniciando contadores
    exercisesInPart = 0;
    quizzesInPart = 0;
    readsInPart = 0;

    exercisesCompleted = 0;
    quizzesCompleted = 0;
    readsCompleted = 0;
    quizzesScore = 0;

    percentTotal = 0;


  }
  // llenando datos en el objeto cursoProgress
  coursesProgress.exercises = Math.round(exercisesInCourse / users.length);
  coursesProgress.reads = Math.round(readsInCourse / users.length);
  coursesProgress.quizzes = Math.round(quizzesInCourse / users.length);

  // enviando objeto coursesProgress, esto se muestra en la parte principal de la web. Progreso por cursos
  progressGeneral(coursesProgress);

  // asignando a userWithStats los usuarios con sus stats calculados
  usersWithStats = users;
  return usersWithStats;
};

//ordenar usuarios
window.sortUsers = (users, orderBy, orderDirection) => {

  //devuelve usuarios ordenados de acuerdo a elección
  let usersOrder = users.sort((a, b) => {
    let x=0;
    switch (orderBy) {
      case 'name': {
        if (orderDirection === 'ASC') {
          if (a[orderBy] > b[orderBy]) {
            x= 1;
          } else {
            x= -1;
          }
        } else {
          if (a[orderBy] < b[orderBy]) {
            x= 1;
          } else {
            x= -1;
          }
        }
        return x;
      }
      case 'exercises': {
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
      case 'scoreAvg': {
        if (orderDirection === 'ASC') {
          if (a.stats.quizzes[orderBy] > b.stats.quizzes[orderBy]) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a.stats.quizzes[orderBy] < b.stats.quizzes[orderBy]) {
            return 1;
          } else {
            return -1;
          }
        }
      }
      case 'scoreSum': {
        if (orderDirection === 'ASC') {
          if (a.stats.quizzes[orderBy] > b.stats.quizzes[orderBy]) {
            return 1;
          } else {
            return -1;
          }
        } else {
          if (a.stats.quizzes[orderBy] < b.stats.quizzes[orderBy]) {
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
 
  if (search === '') {
    return users;
  } else {
    return users.filter(user => (user.name.includes(search.toUpperCase())));
  }

};

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

