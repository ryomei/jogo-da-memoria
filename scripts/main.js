/**
 * Created by jpiagetprogramacao on 20/02/18.
 *
 */

function start(){
    // Inicializando variaveis globais
    averificar = [];
    fim = false;
    score = 0;
    cartas = [];

    canvas = document.getElementById("jogoTeste");
    context = canvas.getContext("2d");
    context.fillStyle="#FFFFFF";
    context.fillRect(0, 0, 800, 600);

    canvas.addEventListener ("mousedown",function(){
        onMouseDown({x:event.clientX, y:event.clientY})
    });
    canvas.addEventListener ("mouseup",function(){
        onMouseUp({x:event.clientX, y:event.clientY})
    });

    bg = new Image();
    bg.src = "images/Fundo.png";

    bgFinal = new Image();
    bgFinal.src = 'images/Parabens.png';

    // p1 e p2 são índices randomizados dos nomes das cartas para criá-las depois
    p1 = [1,2,3,4].sort( () => {
        let r = 0;
        if (Math.random() > 0.33) { r = 1; }
        if (Math.random() > 0.66) { r = -1; }
        return r;
    });
    p2 = [1,2,3,4].sort( () => {
        let r = 0;
        if (Math.random() > 0.33) { r = 1; }
        if (Math.random() > 0.66) { r = -1; }
        return r;
    });
    let i = 0;
    while (i < 4) {
        cartas.push(new Carta(p1.shift(), {x: i, y: i % 2}));
        cartas.push(new Carta(p2.shift(), {x: i, y: i % 2 ? 0 : 1}));
        i++;
    }
}

/**
 * Atualiza o jogo.
 */
function update() {
    draw(); // desenha a cena de jogo...
    setTimeout(update,1); // chama o update novamente após 1 milisegundo.
}

/**
 * Desenha os objetos do jogo.
 */
function draw() {
    context.clearRect(0, 0, 1024, 768); // limpa o canvas...
    context.drawImage(bg, 0, 0); // desenha o background, na posição {0, 0}

    // Testando o desenho da carta criada...
    cartas.forEach( carta => carta.draw(context) );
    //context.drawImage(carta, carta.position.x, carta.position.y);
    
    if (fim) { context.drawImage(bgFinal, 0, 0); } // desenha o background parabens, na posição {0, 0}
}

/**
 * Manipula eventos de mouse down.
 * @param event - coordenadas do evento (event.x,event.y).
 */
function onMouseDown(event){
    cartaAtual = encontrarCarta(event.x, event.y);
}

/**
 * Manipula eventos de mouse up.
 * @param event - coordenadas do evento (event.x,event.y).
 */
function onMouseUp(event){
    if (averificar.length > 1) { return; }

    // aux serve para verificar se a carta clicada no mouseDown é a mesma do mouseUp
    const aux = encontrarCarta(event.x, event.y);
    if (cartaAtual === aux && !cartaAtual.virada) {
        cartaAtual.vira();
        playEffect('vira');
        averificar.push(cartaAtual);
        verifica();
    }
}

function encontrarCarta(x, y) {
    return cartas.find(carta => 
        carta.position.x * carta.img.width <= x && carta.position.x * carta.img.width + carta.img.width >= x 
        &&
        carta.position.y * carta.img.height <= y && carta.position.y * carta.img.height + carta.img.height >= y 
    );
}

/**
 * Cria um áudio e toca-o.
 * @param name {String} - o nome do áudio.
 *
 * Hardcode - otimizar se desejado.
 * Dica: concatenação de string.
 */
function playEffect(name) {
    if(name == "acerto")
        var snd = new Audio("sounds/acerto.mp3");
    if(name == "erro")
        snd = new Audio("sounds/erro.mp3");
    if(name == "vira")
        snd = new Audio("sounds/vira.mp3");


    snd.play();
}

function verifica() {
    if (averificar.length === 2) {
        averificar[0].id === averificar[1].id ? acertou() : errou();        
    }
}

function acertou() {
    playEffect('acerto');
    averificar = [];
    score++;
    fim = score === 4 ? true : false;
}

function errou() {
    playEffect('erro');
    setTimeout(desvirar, 1000);
}

function desvirar() {
    averificar[0].desvira();
    averificar[1].desvira();
    averificar = [];
}
