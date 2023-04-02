let minValue;
let maxValue;
let answerNumber;
let orderNumber;
let gameRun;

const orderNumberField = document.querySelector('#orderNumberField');
const answerField = document.querySelector('#answerField');

let phraseRandom = Math.round( Math.random() * 2);
const winPhrase = [`Я всегда угадываю\n\u{1F60E}`, `Это было слишком легко\n\u{1F4AA}`, `Изи\n\u{1F601}`];
const questionPhrase = [`Вы загадали число `, `Я уверен на 99% что это число `, `Остаётся только число `];
const answerPhrase = (phraseRandom === 1) ?
    `Вы загадали неправильное число!\n\u{1F914}` :
    `Я сдаюсь..\n\u{1F92F}`;
const arrNumbers = new Map([[0, 0], [1, 'один'], [2, 'два'], [3, 'три'], [4, 'четыре'], [5, 'пять'], [6, 'шесть'], [7, 'семь'], [8, 'восемь'], [9, 'девять'], [10, 'десять'],
[11, 'одиннадцать'], [12, 'двенадцать'], [13, 'тринадцать'], [14, 'четырнадцать'], [15, 'пятнадцать'], [16, 'шестнадцать'], [17, 'семнадцать'], [18, 'восемнадцать'], [19, 'девятнадцать'], [20, 'двадцать'], [30, 'тридцать'], [40, 'сорок'], [50, 'пятьдесят'], [60, 'шестьдесят'], [70, 'семьдесят'], [80, 'восемьдесят'], [90, 'девяносто'], [100, 'сто'], [200, 'двести'], [300, 'триста'], [400, 'четыреста'], [500, 'пятьсот'], [600, 'шестьсот'], [700, 'семьсот'], [800, 'восемьсот'], [900, 'девятьсот']]);

startGame();


function startGame(){
    minValue = parseInt(prompt('Минимальное значение числа для игры','-999'));
    maxValue = parseInt(prompt('Максимальное значение числа для игры','999'));
    minValue = isNaN(minValue) ? 0 : minValue;
    maxValue = isNaN(maxValue) ? 100 : maxValue;
    minValue = minValue < -999 ? -999 : minValue;
    maxValue = maxValue > 999 ? 999 : maxValue;
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    answerNumber  = Math.floor((minValue + maxValue) / 2);
    answerField.innerText = questionPhrase[phraseRandom] + translateNumber(answerNumber);
    orderNumber = 1;
    gameRun = true;
}

function translateNumber(number){
    tmp = Math.abs(number); 
    if(tmp <= 20){
        tmp = arrNumbers.get(tmp);
    }
    if(tmp > 20 && tmp <= 100){
        if(tmp % 10 == 0){
            tmp = arrNumbers.get(tmp);
        }
        else{
            tmp = arrNumbers.get(Math.floor(tmp / 10) * 10) + ` ` + arrNumbers.get(tmp % 10);
        }
    }
    if(tmp > 100 && tmp <= 999){
        if(tmp % 100 == 0){
            tmp = arrNumbers.get(tmp);
        }
        else{
            if((tmp % 100) <= 20){
                tmp = arrNumbers.get(Math.floor(tmp / 100) * 100) + ` ` + arrNumbers.get(tmp % 100);
            }
            else{
                tmp = arrNumbers.get(Math.floor(tmp / 100) * 100) + ` ` + translateNumber(tmp % 100);
            }
        }
    }
    if(number < 0){
        tmp = `минус ` + tmp;
    }
    if(tmp.length > 20){
        return number;
    }
    else{
        return tmp;
    }
}

document.querySelector('#btnRetry').addEventListener('click', function () {
    startGame();
    orderNumberField.innerText = orderNumber;
})

document.querySelector('#btnOver').addEventListener('click', function () {
    if (gameRun){
        if (answerNumber === maxValue){
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber  + 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            phraseRandom = Math.round( Math.random() * 2);
            answerField.innerText = questionPhrase[phraseRandom] + translateNumber(answerNumber);
            console.log(answerNumber);
        }
    }
})

document.querySelector('#btnLess').addEventListener('click', function () {
    if (gameRun){
        if (answerNumber === minValue){
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber  - 1;
            answerNumber  = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            phraseRandom = Math.round( Math.random() * 2);
            answerField.innerText = questionPhrase[phraseRandom] + translateNumber(answerNumber);
            console.log(answerNumber);
        }
    }
})

document.querySelector('#btnEqual').addEventListener('click', function () {
    if (gameRun){
        phraseRandom = Math.round( Math.random() * 2);
        answerField.innerText = winPhrase[phraseRandom];
        gameRun = false;
    }
})


