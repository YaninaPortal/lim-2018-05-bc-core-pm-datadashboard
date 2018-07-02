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

        let read = {
        total:0,
        completed:0,
        porcentaje:0
      };
     
      let quizzes = {
        total:0,
        completed:0,
        percent:0,
        scoreSum:0,
        scoreAvg:0
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
          let d = Object.keys(jsonProgress[x[i]].intro.units['02-variables-and-data-types'].parts['06-exercises'].exercises).length;
          let xyz = ((w + z) / 2) * 100;
          obj = {
            id: x[i],
            total: d,
            completado:0,
            porcentaje: xyz
          };

              let m = jsonProgress[jsonUsers[i].id].intro.units['01-introduction'].parts['02-why-learn-to-code'].completed;
              let n = jsonProgress[jsonUsers[i].id].intro.units['01-introduction'].parts['01-growth-mindset'].completed;
              let o = jsonProgress[jsonUsers[i].id].intro.units['01-introduction'].parts['00-welcome-and-orientation'].completed;
              let p = jsonProgress[jsonUsers[i].id].intro.units['01-introduction'].parts['03-your-first-website'].completed;
            
             let q = jsonProgress[jsonUsers[i].id].intro.units['03-ux-design'].parts['00-development-team'].completed;
             console.log(q);
             let r = jsonProgress[jsonUsers[i].id].intro.units['03-ux-design'].parts['02-ux-design-vs-ui-design'].completed;
             console.log(r);
             let s = jsonProgress[jsonUsers[i].id].intro.units['03-ux-design'].parts['01-ux-design'].completed;
             console.log(s);

             let t = jsonProgress[jsonUsers[i].id].intro.units['02-variables-and-data-types'].parts['03-comments'].completed;
             let u= jsonProgress[jsonUsers[i].id].intro.units['02-variables-and-data-types'].parts['00-values-data-types-and-operators'].completed; 

          }
          
        }
      });
      console.log(c);
    });

  });

});