// usar main.js para todo tu código que tenga que ver con mostrar los datos en la pantalla
// DOM

// Info necesaria: controlador-> main.js (aqui va el fetch o xhr), modelo-> data.js, vista-> 
getJSONcohorts('../data/cohorts.json', (err, jsonCohorts) => {
  const selectElementG = document.getElementById('cohortGeneral');

  if (err) {
    // algo salió mal...
    return console.error(err);
  }

  const cohortGeneral = jsonCohorts;
  console.log(cohortGeneral);
  console.log(cohortGeneral.length);

  for (let i = 0; i < cohortGeneral.length; i++) {
    const optionsElements = document.createElement('option');
    const contenidoOptions = document.createTextNode(cohortGeneral[i].id);
    optionsElements.appendChild(contenidoOptions);
    selectElementG.appendChild(optionsElements);
  }

  const selectElementD = document.getElementById('cohortDetallado');
  for (let i = 0; i < cohortGeneral.length; i++) {
    const optionsElements = document.createElement('option');
    const contenidoOptions = document.createTextNode(cohortGeneral[i].id);
    optionsElements.appendChild(contenidoOptions);
    selectElementD.appendChild(optionsElements);
  }

});
let x = [];
getJSONusers('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, jsonUsers) => {

  if (err) {
    // algo salió mal...
    return console.error(err);
  }

  const users = jsonUsers;
  console.log(users);

  for (let i = 0; i < users.length; i++) {
    //console.log(users[i].id);
    x[i] = users[i].id;
  }
  console.log(x);
  console.log(users);
  return users;


});

getJSONprogress('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, jsonProgress) => {
  if (err) {
    // algo salió mal...
    return console.error(err);
  }
  console.log(jsonProgress);
  let obj = {
    total: 0,
    completado: 0,
    porcentaje: 0
  };
  let c = 0;
  
 
  
    for (let i = 0; i < x.length; i++) {
    // Obtengo el objeto que corresponde a cada id de usuario
    //let y = jsonProgress[x[i]];
    //console.log(y);
    // Crear una función con el argumento (users: arreglo de objetos obtenido de la data en bruto) 
    //y su *valor de retorno* sea un objeto exercises con 3 propiedades: total, completed, percent.
    if (jsonProgress[x[i]].intro == undefined) {
      console.log('no hay datos para este alumno');
      c++;
    } else {
      // ejercicios guiados
      let w = jsonProgress[x[i]].intro.units['02-variables-and-data-types'].parts['04-guided-exercises'].completed;
      //console.log(w);
      // Ejercicios no guiados
      let z = jsonProgress[x[i]].intro.units['02-variables-and-data-types'].parts['06-exercises'].completed;
      //console.log(z);
      let xyz = ((w + z) / 2) * 100;
      obj = {
        id: x[i],
        total: 0,
        completado: jsonProgress[x[i]].intro.units['02-variables-and-data-types'].parts['04-guided-exercises'].completed,
        porcentaje: xyz
      };
      /* for (let j = 0; j < 4; j++) {
        const trElements = document.createElement('tr');
        const tdElements = document.createElement('td');
        const contenidoTh = document.createTextNode(x[i].id);
        tdElements.appendChild(contenidoTh);
        tablaElement.appendChild(tdElements);
      } */
      console.log(obj);
    }
  };
  console.log(c);
});
