
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

  getRandomQuestion(questions) {
    let questionIndex = Math.floor(Math.random() * questions.length);
    let currentQuestion = questions[questionIndex];
    //remove the current question from the question array after displaying it
    questions.splice(questionIndex, 1);

    return currentQuestion;
  }

  displayQuestion(currQ) {
    //use object destructuring to access the answers
    const {question, correct, answer, ...answers} = currQ;
    let displayedAnswers = [];
    for (let answer in answers) {
      displayedAnswers += `<p class="answer">${answers[answer]}</p>`
    }
    let hideCategories = document.getElementById('hide');
    hideCategories.style.display = 'none';
    document.getElementById('question').innerHTML = currQ.question;
    document.getElementById('answers').innerHTML = displayedAnswers;
  }

  checkAnswer(availableQuestions, randomQuestion) {
    if(availableQuestions.length === 0) {
      return window.location.assign('/end.html')
      /*
      After the ninth question the last one is displayed
      but the end quiz page is being loaded straight away
      before the user can answer
      */
    }
    let correctAnswer = randomQuestion.correct;
    let paragraphs = document.getElementsByClassName('answer');
    for(let p of paragraphs) {
      p.addEventListener('click', (e) => {
        let userSelection = e.target;
        let HTMLClass = userSelection.innerHTML === correctAnswer ? 
                        'green-border' : 'red-border';
        p.classList.add(HTMLClass);
        
        setTimeout(() => {
          p.classList.remove(HTMLClass);
          this.updateProgress();
          let nextQuestion = this.getRandomQuestion(availableQuestions);
          this.displayQuestion(nextQuestion);
          console.log(nextQuestion)
          this.checkAnswer(availableQuestions, nextQuestion)
        }, 1000);
      });
    }
  }

  updateProgress() {
    counter++;
    let maxQuestion = 10;
    let progressBar = document.getElementById('progress');
    progressBar.innerHTML = `Question ${counter}/${maxQuestion}`
  }

  
  
}

let counter = 0;
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
      let formattedData = data.results;
      let availableQuestions = client.formattedQuestion(formattedData);
      return availableQuestions;
    }).then((availableQuestions) => {
      let randomQuestion = client.getRandomQuestion(availableQuestions);
      console.log(randomQuestion)
      client.displayQuestion(randomQuestion);
      client.checkAnswer(availableQuestions, randomQuestion);
      client.updateProgress();
      
    })
    
  })
}