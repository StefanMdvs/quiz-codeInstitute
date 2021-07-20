
class ApiRequest {
  
  constructor() {
    this._counter = 0;
    this._max_question = 10;
  }

  sendHTTPRequest (type, url) {
    return new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();
      request.onload = function() {
        if(request.readyState == 4) {
          if(request.status == 200) {
            let asJSON = JSON.parse(request.responseText);
            resolve(asJSON);
          } else {
            reject();
          }
        }
      };
      request.open(type, url);
      request.send();
    });
  }

  // this method follows James Q Quick's YouTube tutorial
  formattedQuestion(results) {
    return results.map((data) => {
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
  }

  // this method follows James Q Quick's YouTube tutorial
  getRandomQuestion(questions) {
    let questionIndex = Math.floor(Math.random() * questions.length);
    let currentQuestion = questions[questionIndex];
    //remove the current question from the question array after displaying it
    questions.splice(questionIndex, 1);
    return currentQuestion;
  }

  // this method follows James Q Quick's YouTube tutorial
  displayQuestion(currQ) {
    this._counter++;
    //use object destructuring to access the answers
    const {question, correct, answer, ...answers} = currQ;
    let displayedAnswers = [];
    for (let answer in answers) {
      displayedAnswers += `<p class="answer">${answers[answer]}</p>`;
    }
    let hideCategories = document.getElementById('hide');
    hideCategories.style.display = 'none';
    document.getElementById('question').innerHTML = currQ.question;
    document.getElementById('answers').innerHTML = displayedAnswers;
    hasAnswered = true;

    this.updateProgress();
  }

  // this method follows James Q Quick's YouTube tutorial
  checkAnswer(availableQuestions, randomQuestion) {
    let correctAnswer = randomQuestion.correct;
    let paragraphs = document.getElementsByClassName('answer');
    for(let p of paragraphs) {
      p.addEventListener('click', (e) => {
        if (!hasAnswered) return;
        hasAnswered = false;
        let userSelection = e.target.innerHTML;
       
        let HTMLClass = userSelection === correctAnswer ? 
                        'green' : 'red';
        p.classList.add(HTMLClass);
        if(HTMLClass === 'green') {
          score+=1;
        }
        
        setTimeout(() => {
          p.classList.remove(HTMLClass);
          if(availableQuestions.length == 0 || this._counter >= this._max_question) {
            localStorage.setItem('rightQuestions', score);
            return window.location.assign("https://stefanmdvs.github.io/quiz-codeInstitute/endGame.html");
          }else{
            let nextQuestion = this.getRandomQuestion(availableQuestions);
            this.displayQuestion(nextQuestion);
            this.checkAnswer(availableQuestions, nextQuestion);
          }
        }, 1000);
      });
    }
  }

  // this method follows James Q Quick's YouTube tutorial
  updateProgress() {
    let progressBar = document.getElementById('progress');
    progressBar.innerHTML = `Question ${this._counter}/${this._max_question} from ${category}`;
  }
}

let score = 0;
let hasAnswered = false;
let category;
let buttons = document.getElementsByTagName('button');
for(let button of buttons) {
  button.addEventListener('click', function(e) {
    category = e.target.innerText;
    let id = e.target.id;
    let client = new ApiRequest();
    let questionCategory = id === 'mixed' ?
          client.sendHTTPRequest('GET', 'https://opentdb.com/api.php?amount=10') :
          client.sendHTTPRequest('GET', `https://opentdb.com/api.php?amount=10&category=${id}`);
    questionCategory.then((data) => {
      let formattedData = data.results;
      let availableQuestions = client.formattedQuestion(formattedData);
      return availableQuestions;
    }).then((availableQuestions) => {
      let randomQuestion = client.getRandomQuestion(availableQuestions);
      client.displayQuestion(randomQuestion);
      client.checkAnswer(availableQuestions, randomQuestion);
      client.updateProgress();
    });
  });
}