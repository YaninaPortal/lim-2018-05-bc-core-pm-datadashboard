const getJSONcohorts = (url, callback) => {
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

  const getJSONusers = (url, callback) => {
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

  const getJSONprogress = (url, callback) => {
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
















/* 
const getCohorts = (callback) => { 
    const req = new XMLHttpRequest();
    req.open('GET', '../data/cohorts.json', true);
    req.onreadystatechange = function (aEvt) {
        if (req.readyState == 4) {
            if (req.status == 200) {
                let dataCohorts = JSON.parse(req.responseText);
                callback(null, dataCohorts);
            }
            else {
                callback('Error', null);
            }
        }
    };
    req.send(null);
}

getCohorts((err, result) => {
    if (err) {
        console.error(err);
    } else {
        console.log(result);
        //document.getElementById("txtStudent").value=result;

    }
})

 */