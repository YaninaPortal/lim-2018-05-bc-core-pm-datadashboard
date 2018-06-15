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
  
  getJSONusers('../data/cohorts/lim-2018-03-pre-core-pw/users.json', (err, jsonUsers) => {
  
    if (err) {
      // algo salió mal...
      return console.error(err);
    }
  
    const cohortUsers = jsonUsers;
    console.log(cohortUsers);
    console.log(cohortUsers.length);
  
    for (let i = 0; i < cohortUsers.length; i++) {
      //console.log(cohortUsers[i].id);
    }
  });
  
  getJSONprogress('../data/cohorts/lim-2018-03-pre-core-pw/progress.json', (err, jsonProgress) => {
    if (err) {
      // algo salió mal...
      return console.error(err);
    }
  
    console.log(jsonProgress)
    for (let i = 0; i < jsonProgress.length; i++) {
      console.log(jsonProgress[i]);
    }
  });