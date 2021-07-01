let final = document.getElementById('end');

const rightQuestions = localStorage.getItem('rightQuestions');
if(rightQuestions == 0){
  final.innerText = "Oh, no! You didn't get any questions right. Don't give up, keep practicing!";
} else if(rightQuestions == 10) {
  final.innerText = "You're a star! You have answered correctly to ALL questions!";
} else {
  final.innerText = `Well done! You have replied correctly to ${rightQuestions} questions! Keep practicing!`;
}
