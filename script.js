'use strict';

//Общие очки обоих игроков
let score = document.querySelectorAll('.score');
let current = document.querySelectorAll('.current-score');
//Текущие очки первого игрока
let currentSFP = document.querySelector('#current--0');
//Текущие очки второго игрока
let currentSSP = document.querySelector('#current--1');
//Игрок 1
const scoreFirstPlayer = document.querySelector('.player--0');
//Игрок 2
const scoreSecondPlayer = document.querySelector('.player--1');
//Кубик
const dice = document.querySelector('.dice');
//Кнопка 'Бросить кубик'
const btnRoll = document.querySelector('.btn--roll');
//Кнопка 'Оставить'
const btnHold = document.querySelector('.btn--hold');
//Кнопка 'Новая игра'
const btnNewGame = document.querySelector('.btn--new');
//Главные очки первого игрока
let mainSFP = document.querySelector('#score--0');
//Главные очки второго игрока
let mainSSP = document.querySelector('#score--1');


let sumCurrentSFP;
let sumCurrentSSP;
let sumMainSFP;
let sumMainSSP;



/*************Начало игры******************/

//Обнуляем общий счет для начала игры

const newGame = function(){
    sumCurrentSFP = 0;
    sumCurrentSSP = 0;
    sumMainSFP = 0;
    sumMainSSP = 0;
    for (let i = 0; i < score.length; i++)
    {
        score[i].textContent = 0;
        current[i].textContent = 0;
    }
    dice.style.display = 'none';
    scoreFirstPlayer.classList.add('player--active');
    scoreSecondPlayer.classList.remove('player--active');
    scoreFirstPlayer.classList.remove('player--winner');
    scoreSecondPlayer.classList.remove('player--winner');
}
newGame();

/*****Обработка кнопки бросить кубик******/


//Функция рандомного броска кубика
const randomDiceFunc = function(){
    const random = Math.ceil(Math.random() * 6);
    dice.src = `dice${random}.png`;
    return random;
};

//Функция подсчета главных очков первого игрока
const mainScoreFunc = function(mainScore,currentScore,sumMainScore){
    sumMainScore += Number(currentScore.textContent);
    mainScore.textContent = sumMainScore;
    return sumMainScore;
};

//Функция подсчета текущих очков первого игрока
const currentScoreFunc = function(currentScoreRandom,player,sumCurrentScore){
    sumCurrentScore += Number(currentScoreRandom)
    player.textContent = sumCurrentScore; 
    return sumCurrentScore;
};

//Функция обнуления хода если выпала 1
const moveNull = function(sumCurrentScore,currentScore,playerFirst,playerSecond){
    sumCurrentScore = 0;
    currentScore.textContent = sumCurrentScore;
    playerFirst.classList.remove('player--active');
    playerSecond.classList.add('player--active');
    return sumCurrentScore;
}

//Функция игры на условиях выброса кубика с 1
const gameDice = function(playerFirst,playerSecond){
    let currentScoreRandom = randomDiceFunc();
    dice.style.display = 'block';
    console.log(playerFirst.classList.contains('player--active'));
    if(playerFirst.classList.contains('player--active')){
        if (currentScoreRandom !== 1){
            sumCurrentSFP = currentScoreFunc(currentScoreRandom,currentSFP,sumCurrentSFP);
        }else{
            sumCurrentSFP = moveNull(sumCurrentSFP,currentSFP,playerFirst,playerSecond);
        }   
    }else if (playerSecond.classList.contains('player--active')){
        if (currentScoreRandom !== 1){
            sumCurrentSSP = currentScoreFunc(currentScoreRandom,currentSSP,sumCurrentSSP);
        }else{
            sumCurrentSSP = moveNull(sumCurrentSSP,currentSSP,playerSecond,playerFirst);
        }  
    }
}

//Функция проверки победы по очкам
const winFunc = function(sumMain,playerWin,playerLose){
    if(sumMain >= 20){
        playerWin.classList.add('player--winner', '.name');
        playerWin.classList.remove('player--active');
        playerLose.classList.remove('player--active');
    }
}

//Функция игры на условиях кнопки 'Оставить'
const gameLeave = function(playerFirst,playerSecond){
    if(playerFirst.classList.contains('player--active')){
        sumMainSFP = mainScoreFunc(mainSFP,currentSFP,sumMainSFP);
        sumCurrentSFP = moveNull(sumCurrentSFP,currentSFP,playerFirst,playerSecond);
        winFunc(sumMainSFP,playerFirst,playerSecond);
    }else if(playerSecond.classList.contains('player--active')){
        sumMainSSP = mainScoreFunc(mainSSP,currentSSP,sumMainSSP);
        sumCurrentSSP = moveNull(sumCurrentSSP,currentSSP,playerSecond,playerFirst);
        winFunc(sumMainSSP,playerSecond,playerFirst);
    }
}

//Общая функция кнопки 'Оставить'
const mainScore = function(){
    gameLeave(scoreFirstPlayer,scoreSecondPlayer);
}

//Общая функция кнопки 'Бросить кубик'
const addEventFunc = function(){
    gameDice(scoreFirstPlayer,scoreSecondPlayer);
};

btnRoll.addEventListener('click', addEventFunc);
btnHold.addEventListener('click', mainScore);
btnNewGame.addEventListener('click', newGame);


