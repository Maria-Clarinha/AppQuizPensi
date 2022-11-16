// Referências
// YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k&list=PLZlA0Gpn_vH_XnZHin-Vjma8KylU-N0X8&index=1&t=66s
// Site Embrapa: https://www.embrapa.br/ccweb/jogos/quiz-biomas-do-brasil
// Stackoverflow: https://stackoverflow.com/questions/8683528/embed-image-in-a-button-element
// freecodecamp.org: https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/

import data from './quizzes.json' assert {type: 'json'};

const titleContainerElement = document.getElementById('title-container')

const scoreContainerElement = document.getElementById('score-container')
const scoreElement = document.getElementById('score')

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const quizzesDropDown = document.getElementById("quizzes-drop-down");

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const questionImgElement = document.getElementById('question-img')

const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex, score=0, selectedQuiz=0, questions, finishedQuiz=false


// Ao carregar a página

addQuizzesToDropDownList();
loadQuizQuestions(selectedQuiz);

// Eventos

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

quizzesDropDown.addEventListener("change", e => {    
    selectedQuiz = e.target.value;
 })


// Funções

function loadQuizQuestions(quiz_id) {
    questions = data.quizzes[quiz_id].questions;
}

function addQuizzesToDropDownList() {
        
    for (let key in data.quizzes) {
        
        let option = document.createElement("option");
        option.setAttribute('value', key);
      
        let optionText = document.createTextNode(data.quizzes[key].name);
        option.appendChild(optionText);
      
        quizzesDropDown.appendChild(option);
      }
}


function startQuiz() {

    if (finishedQuiz){
        titleContainerElement.classList.remove('hide')

        scoreContainerElement.classList.add('hide')
        scoreElement.classList.add('hide')

        startButton.innerText = 'Iniciar';

        finishedQuiz = false

    } else{
        titleContainerElement.classList.add('hide')
        startButton.classList.add('hide')

        loadQuizQuestions(selectedQuiz)
        shuffledQuestions = questions.sort(() => Math.random() - .5)
        currentQuestionIndex = 0
        score = 0
        questionContainerElement.classList.remove('hide')    
        setNextQuestion()        
    }
    
}

function setNextQuestion() {
    
    resetState()

    if (finishedQuiz) {
        showScore()
    }else {        
        showQuestion(shuffledQuestions[currentQuestionIndex])
    }    
}

function showQuestion(question) {
    const imgPath = './img/'

    questionElement.innerText  = question.text
    if (question.show_question){
        questionElement.classList.remove('hide')
    } else{
        questionElement.classList.add('hide')
    }

    questionImgElement.setAttribute("src", imgPath.concat(question.img))
    questionImgElement.setAttribute("alt", question.text)

    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function showScore() {  

    startButton.innerText = 'Reiniciar';
    startButton.classList.remove('hide');
    
    questionContainerElement.classList.add('hide');
    
    scoreElement.innerHTML = 'Sua pontuação foi: ' + score + '/' + questions.length;
    scoreContainerElement.classList.remove('hide');    
    scoreElement.classList.remove('hide')
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    
    scoreContainerElement.classList.add('hide')
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct

    if (correct){
        score++
    }

    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    
    if (shuffledQuestions.length <= currentQuestionIndex + 1) {
        finishedQuiz = true;
    }

    nextButton.classList.remove('hide')
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')        
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}