// usar main.js para todo tu código que tenga que ver con mostrar los datos en la pantalla
// DOM // Info necesaria: controlador-> main.js (aqui va el fetch o xhr), modelo-> data.js, vista-> html, css
getJSON('../data/cohorts.json', (err, json) => {
  const selectElementG = document.getElementById('cohortGeneral');
  if (err) {
    return console.error(err);
  }
  const jsonCohort = json;
  console.log(jsonCohort);
  console.log(jsonCohort.length);

  for (let i = 0; i < jsonCohort.length; i++) {
    const optionsElements = document.createElement('option');
    const contenidoOptions = document.createTextNode(jsonCohort[i].id);
    optionsElements.appendChild(contenidoOptions);
    selectElementG.appendChild(optionsElements);
  }

  const selectElementD = document.getElementById('cohortDetallado');
  for (let i = 0; i < jsonCohort.length; i++) {
    const optionsElements = document.createElement('option');
    const contenidoOptions = document.createTextNode(jsonCohort[i].id);
    optionsElements.appendChild(contenidoOptions);
    selectElementD.appendChild(optionsElements);
  }

  getJSON('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, json) => {
    if (err) {
      return console.error(err);
    }

    const jsonUsers = json;
    console.log(jsonUsers);
    let x = [];
    for (let i = 0; i < jsonUsers.length; i++) {
      x[i] = jsonUsers[i].id;
    }
    console.log(x);

    getJSON('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, json) => {
      if (err) {
        return console.error(err);
      }
      const jsonProgress = json;
      console.log(jsonProgress);
      let obj = {
        total: 0,
        completado: 0,
        porcentaje: 0
      };

      // Obtener la referencia del elemento body
      var body = document.getElementsByTagName("body")[0];

      // Crea un elemento <table> y un elemento <tbody>
      var tabla = document.createElement("table");
      var tblBody = document.createElement("tbody");

      // Crea las celdas
      for (var i = 0; i < 2; i++) {
        // Crea las hileras de la tabla
        var hilera = document.createElement("tr");

        for (var j = 0; j < 2; j++) {
          // Crea un elemento <td> y un nodo de texto, haz que el nodo de
          // texto sea el contenido de <td>, ubica el elemento <td> al final
          // de la hilera de la tabla
          var celda = document.createElement("td");
          var textoCelda = document.createTextNode(x[i]);
          celda.appendChild(textoCelda);
          hilera.appendChild(celda);
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
      }

      // posiciona el <tbody> debajo del elemento <table>
      tabla.appendChild(tblBody);
      // appends <table> into <body>
      body.appendChild(tabla);
      // modifica el atributo "border" de la tabla y lo fija a "2";
      tabla.setAttribute("border", "2");


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

          console.log(obj);
        }
      };
      console.log(c);
    });

  });

});



