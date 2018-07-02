// data.js para todas las funciones que vimos que obtienen y manipulan los datos
// 4 funciones

const processCohortData = (options) => {
  let courseIds = Object.keys(options.cohort.coursesIndex);
  let computedData = computeUsersStats(options.cohortData.users, options.cohortData.progress, courseIds);
  let sortData = sortUsers(computedData, options.orderBy, options.orderDirection);
  let filterData = filterUsers(sortData, options.search);
  return filterData;
}

const computeUsersStats = (users, progress, courses) => {
  let usersWithStats = [];
  let countUserDataEmpty = 0;

  // variables contador por tipo 
  let excercisesInPart = 0;
  let quizzesInPart = 0;
  let readsInPart = 0;

  // variables contador de completados por tipo
  let excercisesCompleted = 0;
  let quizzesCompleted = 0;
  let readsCompleted = 0;

  // variable para porcentaje total stats
  let percentForStats = 0;
  let quizzesScore = 0;

  for (let i = 0; i < users.length; i++) {

    if (progress[users[i].id].intro === undefined) {
      countUserDataEmpty++;
    } else {
      let courseKeys = Object.keys(progress[users[i].id]);
      courseKeys.forEach(course => {
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
      })
    };

    users[i].stats = {
      excercises: {
        total: excercisesInPart,
        completed: excercisesCompleted,
        percent: Math.round((excercisesCompleted / excercisesInPart) * 100)
      },
      quizzes: {
        total: quizzesInPart,
        completed: quizzesCompleted,
        percent: Math.round((quizzesCompleted / quizzesInPart) * 100),
        scoreSum: quizzesScore,
        scoreAvg: Math.round(quizzesScore / quizzesCompleted)
      },
      reads: {
        total: readsInPart,
        completed: readsCompleted,
        percent: Math.round((readsCompleted / readsInPart) * 100)
      },
      percent: percentForStats,
    };

    excercisesInPart = 0;
    quizzesInPart = 0;
    readsInPart = 0;

    excercisesCompleted = 0;
    quizzesCompleted = 0;
    readsCompleted = 0;
    quizzesScore = 0;
  }

  usersWithStats = users;
  console.log('users sin data: ' + countUserDataEmpty);
  return usersWithStats;
};

//ordenar usuarios
const sortUsers = (users, orderBy, orderDirection) => {
  //devuelve usuarios ordenados de acuerdo a elección
  let usersOrder = users.sort((a, b) => {
    if (a[orderBy] > b[orderBy]) {
      return 1;
    }
    return -1;
  });

  return usersOrder;
};

//filtrar usuarios
const filterUsers = (users, search) => {
  if (search === "") {
    return users;
  } else {
    return users.filter(user => (user.name.includes(search)));
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

/*     let course = { 
      name: courses,
      totalParts: progress[users[i].id][intro][units][courses].totalParts,
      completedParts: progress[users[i].id][intro][units][courses].completedParts,
      percentCourse: (progress[users[i].id][intro][units][courses].completedParts / progress[users[i].id][intro][units][courses].totalParts) * 100
    } */

let createTable = (element, title, usersWithStats) => {
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


window.processCohortData();
window.usersWithStats();
window.sortUsers();
window.filterUsers();