function Carta(id, position) {
    this.id = id;
    this.img = new Image();
    this.img.src= `images/CartaVirada.png`;
    this.position = position;
    this.virada = false;
    this.achouPar = false;
}

Carta.prototype.draw = function (context) {
    context.drawImage(this.img, this.position.x * this.img.width , this.position.y * this.img.height);
}

Carta.prototype.vira = function () {
    this.img.src = `images/Carta${this.id}.png`;
    this.virada = true;
}

Carta.prototype.desvira = function () {
    this.img.src = `images/CartaVirada.png`;
    this.virada = false;
}