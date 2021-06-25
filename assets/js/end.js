let final = document.getElementById('end');

const rightQuestions = localStorage.getItem('rightQuestions');

final.innerText = rightQuestions == 5 ? 
"You're a star! You have answered correctly to ALL questions!" :
`Well done! You have replied correctly to ${rightQuestions} questions! Keep practicing!`;
