const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
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

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
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
    question: 'What is npm in Node.js?',
    answers: [
      { text: 'default package manager for Node.js, used to install, manage, and share JavaScript packages and dependencies.', correct: true },
      { text: 'npm is a tool for monitoring and logging server-side applications.', correct: false }
    ]
  },
  {
    question: 'What is Flexbox and when would you use it?',
    answers: [
      { text: 'Flexbox is a layout model for arranging items in a container, useful for creating flexible and responsive layouts.', correct: true },
      { text: 'Flexbox is a JavaScript library used for creating animations and transitions on web pages.', correct: false },
      { text: 'D. Flexbox is a CSS preprocessor that allows you to write CSS in a more dynamic and modular way.', correct: false },
      { text: ' Flexbox is a template engine used to create dynamic HTML content on the server side.', correct: false }
    ]
  },
  {
    question: 'How does state management work in React?',
    answers: [
      { text: 'By using HTML local storage to save and retrieve state.', correct: false },
      { text: 'Through hooks like useState and useReducer, and libraries like Redux.', correct: true },
      { text: 'By creating custom SQL databases to store component state.', correct: false },
      { text: 'Through server-side rendering to manage state dynamically.', correct: false }
    ]
  },
  {
    question: 'What is Amazon S3 used for?',
    answers: [
      { text: 'Amazon S3 is a database management system for relational databases.', correct: false },
      { text: 'Amazon S3 is used for storing and retrieving any amount of data at any time, providing highly scalable and durable object storage.', correct: true }
    ]
  }
]