//pode ser referenciado diretamente pois só existe uma tag html
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const imageFigure = document.querySelector('.app__image');
const title = document.querySelector('.app__title');

focoBt.addEventListener('click', () => {
    changeContext('foco');
});

curtoBt.addEventListener('click', () => {
    changeContext('descanso-curto');
});

longoBt.addEventListener('click', () => {
    changeContext('descanso-longo');
});

function changeContext(context){
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