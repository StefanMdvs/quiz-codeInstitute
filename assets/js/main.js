
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

  formattedQuestion(results) {
    var questionArray = results.map((data) => {
      const formattedQ = {
        question: data.question
      };
      const answers = [...data.incorrect_answers];
      formattedQ.correct = data.correct_answer;
      //get the index where the correct answer will be inserted
      let sliceIndex = answers.length > 1 ?
          Math.floor(Math.random() * 4) + 1 :
          Math.floor(Math.random() * 2) + 1;
      //insert correct answer
      answers.splice(sliceIndex, 0, formattedQ.correct);
      //assign the answers to each question
      answers.forEach((answer, i) => {
        formattedQ['answer' + (i+1)] = answer;
      });
      return formattedQ;
    });
    return questionArray;
  }

  getRandomQuestion() {

  }
}

let buttons = document.getElementsByTagName('button');
for(let button of buttons) {
  button.addEventListener('click', function(e) {
    let id = e.target.id;
    let client = new ApiRequest();
    //get the id of each button in order to generate the right set of questions
    let questionCategory = id === 'mixed' ?
          client.sendHTTPRequest('GET', 'https://opentdb.com/api.php?amount=10') :
          client.sendHTTPRequest('GET', `https://opentdb.com/api.php?amount=10&category=${id}`)
    questionCategory.then((data) => {
      return data.results;
    }).then((question) => {
      let formatted = client.formattedQuestion(question);
      console.log(formatted)
    })
    
  })
}