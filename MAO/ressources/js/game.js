const question = document.querySelector('#question');
const audio = document.querySelector('#wav');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const btn = document.querySelector('#next');
if(document.querySelector('#mode')){
    let input = document.querySelector('#mode');
    let mode = input.value;
    let next = document.querySelector('.next');
}

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'Quel est ce son ?',
        song: 'media/mp3/KICK_HARD.mp3',
        choice1: 'Kick',
        choice2: 'Snare',
        choice3: 'HiHat',
        choice4: 'Clap',
        answer: 1,
    },
    {
        question: 'Quel est ce son ?',
        song: 'media/mp3/HH_-_Dro.mp3',
        choice1: 'Kick',
        choice2: 'Snare',
        choice3: 'HiHat',
        choice4: 'Clap',
        answer: 3,
    },
    {
        question: 'Quel est ce son ?',
        song: 'media/mp3/Snare_-_Coke.mp3',
        choice1: 'Kick',
        choice2: 'Snare',
        choice3: 'HiHat',
        choice4: 'Clap',
        answer: 2,
    },
    {
        question: 'Quel est ce son?',
        song: 'media/mp3/CLAP_RAP.mp3',
        choice1: 'Kick',
        choice2: 'Snare',
        choice3: 'HiHat',
        choice4: 'Clap',
        answer: 4,
    },
    {
        question: 'Quelle est le nom de cet instrument ?',
        song: 'media/mp3/piano.mp3',
        choice1: 'Guitare',
        choice2: 'Flûte',
        choice3: 'Clavecin',
        choice4: 'Piano',
        answer: 4,
    },
    {
        question: 'Quel est le titre ?',
        song: 'media/mp3/gazo.mp3',
        choice1: 'Gazo - CELINE 3x',
        choice2: 'Gazo - MOLLY',
        choice3: 'Gazo - Tchin 2x',
        choice4: 'Gazo feat Freeze Corleone 667',
        answer: 2,
    },
    {
        question: 'Quel instrument reconnaissez vous ?',
        song: 'media/mp3/flute.mp3',
        choice1: 'Piano',
        choice2: 'Violon',
        choice3: 'Flûte',
        choice4: 'Harmonica',
        answer: 3,
    },
    {
        question: 'Qui est ce groupe ?',
        song: 'media/mp3/greenday.mp3',
        choice1: 'Gren Days',
        choice2: 'Jour vert',
        choice3: 'Green Day',
        choice4: 'Green Days',
        answer: 3,
    },
    {
        question: 'Quel groupe est à l\'origine de ce titre ?',
        song: 'media/mp3/ketchup.mp3',
        choice1: 'Last Ketchup',
        choice2: 'Las Ketchup',
        choice3: 'Los ketchup',
        choice4: 'Sasha Ketchum',
        answer: 2,
    },
    {
        question: 'De quel sons viens ce rire ?',
        song: 'media/mp3/gorillaz.mp3',
        choice1: 'Gorillaz - Feel Good Inc',
        choice2: 'Gorillaz - Clint Eastwood',
        choice3: 'Gorillaz - On Melancholy Hill ',
        choice4: 'Gorillaz - Humility',
        answer: 1,
    },
    {
        question: 'Quel est le titre exacte ?',
        song: 'media/mp3/scatman.mp3',
        choice1: 'ski ba bop ba bop dop',
        choice2: 'sky ba baup ba daup baup',
        choice3: 'sqi ta bop ta bop bop',
        choice4: 'ski ba bop ba dop bop',
        answer: 4,
    },
    {
        question: 'En quelle année est sortie ce titre de Vangaboys ?',
        song: 'media/mp3/boum.mp3',
        choice1: '1999',
        choice2: '2000',
        choice3: '1998',
        choice4: '1995',
        answer: 3,
    },
    {
        question: 'De quel anime vient cet opening ?',
        song: 'media/mp3/dbz.mp3',
        choice1: 'Naruto',
        choice2: 'One piece',
        choice3: 'SNK (Attaque des titans)',
        choice4: 'Dragon Ball Z',
        answer: 4,
    }

]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 13

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} sur ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    audio.src = currentQuestion.song;

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true


}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        if(document.querySelector('#mode')){
            document.querySelector('.next').style.display = "block"; 
        }else{
            
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion()
            }, 1000)
        }
        
    })

    
    
})

    
if(document.querySelector('#mode')){
    if(mode.value === 'anim'){
    btn.addEventListener('click', e => {
        const choice = document.querySelector('.correct') || document.querySelector('.incorrect')

        choice.classList.remove('correct')
        choice.classList.remove('incorrect')
        document.querySelector('.next').style.display = 'none'
        getNewQuestion()
        
    });
}
}
    incrementScore = num => {
    score+=num
    scoreText.innerText = score
}



startGame()