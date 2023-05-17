const ANCHO = 480;
const ALTO = 360;

function prepararSVG() {
    let svg = document.querySelector('#svg01');

    svg.setAttribute('width', ANCHO);
    svg.setAttribute('height', ALTO);
}