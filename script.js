// Referências
// YouTube: https://www.youtube.com/watch?v=riDzcEQbX6k&list=PLZlA0Gpn_vH_XnZHin-Vjma8KylU-N0X8&index=1&t=66s
// Site Embrapa: https://www.embrapa.br/ccweb/jogos/quiz-biomas-do-brasil
// Stackoverflow: https://stackoverflow.com/questions/8683528/embed-image-in-a-button-element

const titleContainerElement = document.getElementById('title-container')

const scoreContainerElemnt = document.getElementById('score-container')
const scoreElement = document.getElementById('score')

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const questionImgElement = document.getElementById('question-img')

const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex, score

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    titleContainerElement.classList.add('hide')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    score = 0
    questionContainerElement.classList.remove('hide')    
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    const imgPath = './img/'

    questionElement.innerText  = question.question
    if (question.show_question){
        questionElement.classList.remove('hide')
    } else{
        questionElement.classList.add('hide')
    }

    questionImgElement.setAttribute("src", imgPath.concat(question.img))
    questionImgElement.setAttribute("alt", question.question)

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
    startButton.innerText = 'Reiniciar'
        startButton.classList.remove('hide')
        
        questionContainerElement.classList.add('hide')

        scoreElement.innerHTML = 'Sua pontuação foi: '.concat(score, '/10')
        scoreContainerElemnt.classList.remove('hide')
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    
    scoreContainerElemnt.classList.add('hide')
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
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        resetState()
        showScore()
    }    
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

const questions = [
    {
        question: 'Que planta produz açúcar, rapadura, etanol e outros produtos?',
        show_question: false,
        tip: 'Não... esta não é a resposta correta. Vou te dar uma dica!:\nA planta também faz a Garapa - caldo de cana...',
        img: 'pergunta_1_v2.jpg',        
        answers: [
            { text: 'Milho', correct: false },
            { text: 'Cana-de-açúcar', correct: true },
            { text: 'Beterraba', correct: false},
            { text: 'Mandioca', correct: false}
        ]
    },
    {
        question: 'Uma das principais fontes de energia no mundo e que não é renovável é:',
        show_question: false,
        tip: 'Não... esta não é a resposta correta. Vou te dar uma dica!:\nÉ desta fonte que se fabrica a gasolina, o óleo diesel...',
        img: 'pergunta_2_v2.jpg',
        answers: [
            { text: 'Vento', correct: false },
            { text: 'Água', correct: false },
            { text: 'Sol', correct: false},
            { text: 'Petróleo', correct: true}
        ]
    },
    {
        question: 'O biodiesel e o etanol são fontes de energia:',
        show_question: false,
        tip: 'Não... esta não é a resposta correta. Vou te dar uma dica!:\nA principal característica destas fontes de energia é a capacidade de serem cultivadas novamente.',
        img: 'pergunta_3_v2.jpg',
        answers: [
            { text: 'Primárias', correct: false },
            { text: 'Caras', correct: false },
            { text: 'Renováveis', correct: true},
            { text: 'Importadas', correct: false}
        ]
    },
    {
        question: 'Além das plantas, de onde mais pode vir a matéria-prima para a produção de biodiesel?',
        show_question: false,
        tip: 'Não... esta não é a resposta correta. Vou te dar uma dica!:\nBiodiesel também pode ser produzido a partir de substâncias de origem animal.',
        img: 'pergunta_4_v2.jpg',
        answers: [
            { text: 'Carvão', correct: false },
            { text: 'Óleo de animais', correct: true },
            { text: 'Algas', correct: false},
            { text: 'Cogumelos', correct: false}
        ]
    },
    {
        question: 'Quais dessas plantas podem ser utilizadas para produzir biodiesel?',
        show_question: false,
        tip: 'Não... esta não é a resposta correta. Vou te dar uma dica!:\nSão plantas oleaginosas. Dica: Você já experimentou óleo da Canola?',
        img: 'pergunta_5_v2.jpg',
        answers: [
            { text: 'Soja, girassol e canola', correct: true },
            { text: 'Macaúba, arroz e feijão', correct: false },
            { text: 'Beterraba, couve e amendoim', correct: false},
            { text: 'Dendê, trigo e babaçu', correct: false}
        ]
    },
    {
        question: 'Que tipos de combustível podem ser utilizados em carros de passeio?',
        show_question: false,
        tip: 'Não... esta não é a resposta correta. Vou te dar uma dica!:\nÓleo diesel e biodiesel são combustíveis de alguns carros de passeio.',
        img: 'pergunta_6_v2.jpg',
        answers: [
            { text: 'Gasolina, gás e óleo de coco', correct: false },
            { text: 'Diesel, óleo de pequi e etanol', correct: false },
            { text: 'Etanol, gasolina e biodiesel', correct: true},
            { text: 'Biodiesel, petróleo e etanol', correct: false}
        ]
    },
    {
        question: 'Que microrganismo é utilizado na produção de pão e de etanol?',
        show_question: false,
        tip: 'Não... esta não é a resposta correta. Vou te dar uma dica!:\nLevedura é usado para fermentação de bebidas e combustíveis.',
        img: 'pergunta_7_v2.jpg',
        answers: [
            { text: 'Fungo', correct: false },
            { text: 'Bactéria', correct: false },
            { text: 'Levedura', correct: true},
            { text: 'Virus', correct: false}
        ]
    },
    {
        question: 'A utilização de biocombustíveis colabora para diminuir qual efeito?',
        show_question: false,
        tip: 'Não... esta não é a resposta correta. Vou te dar uma dica!:\nEfeito estufa colabora para o aquecimento global. Biocombustíveis diminuem o aquecimento global',
        img: 'pergunta_8_v2.jpg',
        answers: [
            { text: 'Efeito sanfona', correct: false },
            { text: 'Efeito placebo', correct: false },
            { text: 'Efeito joule', correct: false},
            { text: 'Efeito estufa', correct: true}
        ]
    },
    {
        question: 'O óleo de fritura pode ser utilizado para produção de qual biocombustível?',
        show_question: false,
        tip: 'Não... esta não é a resposta correta. Vou te dar uma dica!:\nBiodiesel é um combustível que pode ser produzido de maneiras diferentes.',
        img: 'pergunta_9_v2.jpg',
        answers: [
            { text: 'Biodiesel', correct: true },
            { text: 'Bioetanol', correct: false },
            { text: 'Biometanol', correct: false},
            { text: 'Biogás', correct: false}
        ]
    },
    {
        question: 'Qual é a planta que pode ser utilizada para a produção de biodiesel e também como alimento?',
        show_question: false,
        tip: 'Não... esta não é a resposta correta. Vou te dar uma dica!:\nSoja é um dos alimentos mais importantes do mundo! E seu óleo pode ser usado também para produzir biodiesel.',
        img: 'pergunta_10_v2.jpg',
        answers: [
            { text: 'Girassol', correct: false },
            { text: 'Pinhão-manso', correct: false },
            { text: 'Soja', correct: true},
            { text: 'Algodão', correct: false}
        ]
    }
]