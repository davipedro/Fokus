//pode ser referenciado diretamente pois só existe uma tag html
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const imageFigure = document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const musicButton = document.querySelector('#alternar-musica');
const audio = new Audio('./sons/luna-rise-part-one.mp3');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const startPauseImage = startPauseBt.querySelector('img');
const timerOnScreen = document.querySelector('#timer');

const TimerFinishedAudio = new Audio('./sons/beep.mp3');
const TimerStoppedAudio = new Audio('./sons/pause.mp3');
const TimerStartAudio = new Audio('./sons/play.wav');
audio.loop = true;

let time = 1500;
/**
 * IntervalId é um ID retornado pelo setInterval para que seja 
 * possível fazer alterações no fluxo de execução de um determinado interval,
 * já que é possível declarar múltiplos intervalos nos quais rodam ao mesmo tempo
 * na aplicação - Relacionado a pilha e fila de execução do JS (Event Loop)
 */
let intervalId = null;

focoBt.addEventListener('click', () => {
    time = 1500;
    changeContext('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    time = 300;
    changeContext('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    time = 900;
    changeContext('descanso-longo');
    longoBt.classList.add('active');
});

function changeContext(context){
    showTime();
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    
    html.setAttribute('data-contexto', context);
    imageFigure.setAttribute('src', `/imagens/${context}.png`);
    switch (context) {
        case "foco":
            title.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            title.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            title.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

musicButton.addEventListener('change', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

startPauseBt.addEventListener('click', startAndPause);

function startAndPause() {
    if(intervalId){
        TimerStoppedAudio.play();
        startPauseImage.setAttribute('src', './imagens/play_arrow.png')
        reset();
        return;
    }
    TimerStartAudio.play();
    startPauseImage.setAttribute('src', './imagens/pause.png')
    intervalId = setInterval(countdown, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
}

const countdown = () => {
    if(time == 0){
        alert('Tempo finalizado!');
        TimerFinishedAudio.play();
        reset();
        return;
    }
    time--;
    showTime();
}

function reset() {
    clearInterval(intervalId);
    iniciarOuPausarBt.textContent = "Começar";
    intervalId = null;
}

function showTime(){
    const timeToShow = new Date(time * 1000);
    const timeFormatted = timeToShow.toLocaleTimeString('pt-BR', {
        minute: '2-digit', second: '2-digit'});
    timerOnScreen.innerHTML = `${timeFormatted}`;
}

showTime();