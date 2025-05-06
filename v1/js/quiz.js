
import { quizObj } from "./questions.js";
import { displayResults } from "./resultCalc.js";

const progressWrapper = document.getElementById('progressWrapper')
const topic = document.querySelector('.topic');
const answerWrapper = document.getElementById('answer-wrapper')
const currentQuestion = document.querySelector('.question');
const backBtn = document.querySelector('.back-btn');

let questionLength = quizObj.length;
let currentQuestionIndex = 0;

let userAnswers = { }

function handleQuestions() {
    // handles back btn
    if (currentQuestionIndex < 0) {
        return currentQuestionIndex = 0
    }

    progressWrapper.innerHTML= ""
    for (let i=0; i <= questionLength; i++) {
        let progressBar = document.createElement('span')

        progressWrapper.appendChild(progressBar)
    }

    // select the current question and add update progress;
    const progressBars = document.querySelectorAll('span');
    for (let i=0; i <= currentQuestionIndex; i++) {
        progressBars[i].classList.add('seen')
    }


    let questionSet = quizObj[currentQuestionIndex];
    

    // render elements onto the DOM]
    topic.innerText = questionSet.topic;
    currentQuestion.innerText = questionSet.question;

    let options = questionSet.options;
    let values = questionSet.values;
    // clear DOM on new question
    answerWrapper.innerHTML = " "
    options.forEach((option, index) => {
        let ansBtn = document.createElement('button')
        // this is to allow unique selection of DOM buttons, this class is not used in the css
        ansBtn.classList.add('ans-btns')
        ansBtn.innerText = option;
        ansBtn.value = values[index]

        answerWrapper.appendChild(ansBtn)
    })


    const ansBtns = document.querySelectorAll('.ans-btns');
    ansBtns.forEach(btn => {
        btn.addEventListener('click', (evt) => {
            
            // updating user answers into a hashmap
            // where each key,value pair is the topic and chosen answer
            // no duplicates are stored
            // and the value attribute from a button is converted to number
            userAnswers[questionSet.topic] = Number(evt.target.value);

            if (currentQuestionIndex === questionLength -1) {
                currentQuestionIndex = questionLength -1;
                document.querySelector('.quiz-section').innerHTML = " "

                displayResults(userAnswers)
                return;
            }


            currentQuestionIndex++;
            handleQuestions(currentQuestionIndex);
        })
    })


}


handleQuestions();


backBtn.addEventListener('click', (e)=> {
    currentQuestionIndex--;
    handleQuestions(currentQuestionIndex)
})

