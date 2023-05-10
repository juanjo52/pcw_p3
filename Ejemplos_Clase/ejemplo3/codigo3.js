const ANCHO = 480; 
const ALTO = 360;

function prepararCanvas() {
    let cv = document.querySelector('canvas');

    cv.width = ANCHO;
    cv.height = ALTO;
}

function ejemplo01() {
    let cv = document.querySelector('#cv1'),
        ctx = cv.getContext('2d');
    
    ctx.beginPath();

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#a00';

    ctx.moveTo(100, 100);
    ctx.lineTo(200, 200);
    ctx.lineTo(100,300);
    
    // ctx.closePath();
    ctx.fillStyle = '#aa0';
    ctx.fill();
    ctx.stroke();
}

function limpiar() {
    let cv = document.querySelector('#cv1'),
        ctx = cv.getContext('2d');
    
    
    // ctx.clearRect(0, 100, cv.width, cv.height);
    cv.width = cv.width;
    // cv.height = cv.height
}

function escalar() {
    let cv = document.querySelector('#cv1'),
        ctx = cv.getContext('2d');
    
    ctx.scale(1.25,1.25);
}

//Este está en apuntes (lo ha copiado y pegado y me da pereza xd es uno de rotaciones etc)
function ejemplo02 {
    // let canvas = document.querySelector('#cv1'),
    //     ctx    = 

}

