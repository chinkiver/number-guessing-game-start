// let 创建变量，旧代码为 var，获取一个随机数
let randomNumber = Math.floor(Math.random() * 100) + 1;

// 常量用于存储不希望更改的数据，使用 const
// <p> 显示当前输入 引用的元素
const guesses = document.querySelector('.guesses');
// <p> 显示最终结果
const lastResult = document.querySelector('.lastResult');
// <p> 显示大还是小
const lowOrHi = document.querySelector('.lowOrHi');

// 获取到提交按钮对象
const guessSubmit = document.querySelector(".guessSubmit");
// 获取到用户输入 Text 框
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

function checkGuess() {
    
    // 获取用户的输入
    // Number() 方法确保是一个数字
    let userGuess = Number(guessField.value);

    if (guessCount === 1) {
        // 如果是第一次猜
        guesses.textContent = "上次猜的数：";
    }
    // 用户上次输入的数字
    guesses.textContent += userGuess + " ";

    if (userGuess === randomNumber) {
        // 猜对了
        lastResult.textContent = '恭喜你！猜对了';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = '!!!GAME OVER!!!';
        setGameOver();
    } else {
        lastResult.textContent = '你猜错了！';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = '你猜低了！';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = '你猜高了';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

// 点击按钮触发 function，checkGuess 作为参数时不加 ()
guessSubmit.addEventListener('click', checkGuess);

function setGameOver() {

    // 输入框和按钮都 disabled
    guessField.disabled = true;
    guessSubmit.disabled = true;

    // 创建一个『开始新游戏的』按钮
    resetButton = document.createElement('button');
    resetButton.textContent = '开始新游戏';
    document.body.appendChild(resetButton);

    // 监听按钮事件
    resetButton.addEventListener('click', resetGame);
}

function resetGame(params) {

    // 猜次数重置为 1
    guessCount = 1;

    // 选取所有 class=“resultParas” 的 <p> 元素
    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'white';

    randomNumber = Math.floor(Math.random() * 100) + 1;
}
