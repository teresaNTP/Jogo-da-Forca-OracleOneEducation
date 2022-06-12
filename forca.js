let palavras = [
    'CAVALO',
    'CAMPO',
    'JOGO',
    'MORTADELA',
    'BANANA',
    'REFRIGERANTE',
    'CACHORRO',
    'PRESIDENTE',
    'JORNAL',
    'PIZZA',
    'PHOTEL',
    'FORMIGA',
    'GALINHA',
    'REVISTA',
    'LAPIS',
    'CABELO',
    'SUCO',
    'CARRO',
    'ESTRADA',
    'NARIZ',
    'MONTANHA',
    'TREM',
    'PEIXE',
    'HOSPICIO',
    'UNIVERSIDADE',
    'GIRAFA'
];
let letrasUsadas = [];
let letrasCorretas = [];
let palavraCorreta = '';
let tentativas = 0;
let sorteiaPalavra;

function palavraSecreta(palavras) {
    sorteiaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
    letrasSeparadas = sorteiaPalavra.split("");

    return letrasSeparadas;
}

function verificaLetras(key) {
    let re = new RegExp("^[A-Z/s]+$");
    if (letrasCorretas.includes(key) || key.length > 1 ||
        letrasUsadas.includes(key) || !re.test(key)) {
        return false;
    } else {
        return true;
    }
}

function letraCorreta(i) {
    palavraCorreta += letrasSeparadas[i];
}

function letraIncorreta() {
    tentativas += 1;
    if (tentativas == 1) {
        desenhaCabeca();
    }
    if (tentativas == 2) {
        desenhaCorpo();
    }
    if (tentativas == 3) {
        desenhaBracoEsquerdo();
    }
    if (tentativas == 4) {
        desenhaBracoDireito();
    }
    if (tentativas == 5) {
        desenhaPernaEsquerda();
    }
    if (tentativas == 6) {
        desenhaPernaDireita();
        fimDeJogo();
    }
}

function fimDeJogo() {
    let botaoNovoJogo = document.querySelector("#botao-novo-jogo");
    botaoNovoJogo.style.display = "block";

    pincel.font = "bold 40px Inter";
    pincel.fillStyle = "red";
    pincel.fillText("Você perdeu! A palavra escolhida era: " + letrasSeparadas,100,150);
}

function ganharJogo() {
    let botaoNovoJogo = document.querySelector("#botao-novo-jogo");
    botaoNovoJogo.style.display = "block";

    pincel.font = "bold 40px Inter";
    pincel.fillStyle = "purple";
    pincel.fillText("Parabéns! Você ganhou!", 400, 150);
}

document.addEventListener("keydown", function (evento) {
    if (evento.target == inputPalavras) {return;}

    let teclas = evento.key;
    teclas = evento.key.toUpperCase();
    if (verificaLetras(teclas)) {
        for (let i = 0; i < letrasSeparadas.length; i++) {
            if (letrasSeparadas[i] === teclas) {
                desenhaLetras(i);
                letrasCorretas.push(teclas.toUpperCase());
                if (letrasSeparadas.length === letrasCorretas.length) {
                    ganharJogo();
                }
            }
        }
        if (!letrasSeparadas.includes(teclas) &&
            !letrasUsadas.includes(teclas)) {
            letrasUsadas.push(teclas.toUpperCase());
            letraIncorreta();
            desenhaLetraIncorreta(teclas, tentativas);
        }
    }
});

let botaoInicia = document.querySelector('#botao-inicia');
botaoInicia.addEventListener('click', function(evento){
    botaoInicia.style.display = 'none';
    botaoAdiciona.style.display = 'none';
    botaoAdd.style.display = 'none';
    inputPalavras.style.display = 'none';

    desenhaTraco(palavraSecreta(palavras));
});

let botaoNovoJogo = document.querySelector('#botao-novo-jogo');
botaoNovoJogo.addEventListener('click', function(evento){

    botaoNovoJogo.style.display = 'none';
    botaoAdiciona.style.display = 'none';
    
    pincel.clearRect(0,0,1200,800);

    tentativas = 0;
    letrasUsadas = [];
    letrasCorretas = [];
    palavraCorreta = '';

    desenhaTraco(palavraSecreta(palavras));
});

let botaoAdd = document.querySelector('#botao-adiciona');
let botaoAdiciona = document.querySelector('#adiciona-palavra');
let inputPalavras = document.querySelector('#nova-palavra');
botaoAdd.addEventListener('click', function(evento){

    botaoNovoJogo.style.display = 'none';
    botaoAdd.style.display = 'none';
    botaoAdiciona.style.display = 'block';
    inputPalavras.style.display = 'block';
    tela.style.display = 'none';
});

botaoAdiciona.addEventListener('click', function(evento){
    let inputPalavras = document.querySelector('#nova-palavra');
    if (inputPalavras.value !== '') {
        palavras.push(inputPalavras.value.toUpperCase());
        alert('Palavra adicionada com sucesso!');
    }else{
        alert('Escreva uma palavra válida!');
    }

    console.log(palavras);
});

//DESENHO DO JOGO

letrasSeparadas = palavraSecreta(palavras);
let tela = document.querySelector("canvas");
let pincel = tela.getContext("2d");

function desenhaTraco(palavraSecreta) {
    tela.style.display = "block";

    pincel.lineWidth = 6;
    pincel.lineCap = "round";
    pincel.lineJoin = "round";
    let sorteiaPalavra;
    pincel.strokeStyle = "0A3871";
    pincel.beginPath();
    let eixo = 800 / letrasSeparadas.length;
    for (let i = 0; i < letrasSeparadas.length; i++) {
        pincel.moveTo(300 + eixo * i, 640);
        pincel.lineTo(350 + eixo * i, 640);
    }
    pincel.stroke();
    pincel.closePath();
    desenhaForca();
}

function desenhaLetras(i) {
    pincel.lineWidth = 6;
    pincel.font = "bold 56px Inter";
    pincel.fillStyle = "black";
    pincel.strokeStyle = "0A3871";

    let eixo = 800 / letrasSeparadas.length;
    pincel.fillText(letrasSeparadas[i], 305 + eixo * i, 620);
    pincel.stroke();
}

function desenhaLetraIncorreta(teclas, tentativas) {
    pincel.lineWidth = 6;
    pincel.font = "bold 30px Inter";
    pincel.fillStyle = "black";
    pincel.strokeStyle = "0A3871";

    let eixo = 800 / letrasSeparadas.length;
    pincel.fillText(teclas, 535 + 40 * (6 - tentativas), 710, 40);
    pincel.stroke();
}

function desenhaForca() {
    pincel.beginPath();
    pincel.moveTo(550, 500);
    pincel.lineTo(650, 500);
    pincel.stroke();

    pincel.beginPath();
    pincel.moveTo(600, 500);
    pincel.lineTo(600, 200);
    pincel.lineTo(680, 200);
    pincel.stroke();
}

function desenhaCabeca() {
    pincel.beginPath();
    pincel.arc(680, 240, 40, 0, Math.PI * 2);
    pincel.stroke();
}

function desenhaCorpo() {
    pincel.beginPath();
    pincel.moveTo(680, 280);
    pincel.lineTo(680, 440);
    pincel.stroke();
}

function desenhaBracoEsquerdo() {
    pincel.beginPath();
    pincel.moveTo(680, 280);
    pincel.lineTo(640, 320);
    pincel.stroke();
}

function desenhaBracoDireito() {
    pincel.beginPath();
    pincel.moveTo(680, 280);
    pincel.lineTo(720, 320);
    pincel.stroke();
}

function desenhaPernaEsquerda() {
    pincel.beginPath();
    pincel.moveTo(680, 440);
    pincel.lineTo(720, 480);
    pincel.stroke();
}

function desenhaPernaDireita() {
    pincel.beginPath();
    pincel.moveTo(680, 440);
    pincel.lineTo(640, 480);
    pincel.stroke();
}

