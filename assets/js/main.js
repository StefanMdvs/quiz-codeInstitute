let buttons = document.getElementsByTagName('button');

class ApiRequest {
  sendHTTPRequest (type, url) {
    var promise = new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.onload = function() {
        if(request.readyState == 4) {
          if(request.status == 200) {
            let asJSON = JSON.parse(request.responseText);
            resolve(asJSON);
          } else {
            reject(console.log("Oops! Something went wrong", error));
          }
        }
      }
      request.open(type, url);
      request.send();
    });
    return promise;
  }
}

for(let button of buttons) {
  button.addEventListener('click', function(e) {
    let id = e.target.id;
    let client = new ApiRequest();
    //get the id of each button in order to generate the right set of questions
    let questionCategory = id === 'mixed' ?
          client.sendHTTPRequest('GET', 'https://opentdb.com/api.php?amount=10') :
          client.sendHTTPRequest('GET', `https://opentdb.com/api.php?amount=10&category=${id}`)
    questionCategory.then((data) => {
      console.log(data.results)
    })
    console.log(id)
  })
}