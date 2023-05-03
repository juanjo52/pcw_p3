const ANCHO = 480;
const ALTO = 360;

function prepararCanvas() {
    let cv = document.querySelector('#cv01');

    cv.width = ANCHO;
    cv.height = ALTO;
}

function ejemplo01() {
    let cv = document.querySelector('#cv01');
        ctx = cv.getContext('2d');
    
    ctx.strokeStyle = '#a00';
    ctx.lineWidth = 6;

    ctx.lineCap = 'round'; //Hacer redondas las puntas de las lines

    ctx.moveTo(100, 100);
    ctx.lineTo(200, 150);
    ctx.lineTo(80, 200);

    ctx.moveTo(200, 300);
    ctx.lineTo(50, 280);

    ctx.rect(20, 20, 100, 50); 

    ctx.stroke();
}

function ejemplo02() {
    let cv = document.querySelector('#cv01');
        ctx = cv.getContext('2d');

    // Sombras
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#000';


    ctx.fillStyle = '#0a0';
    ctx.fillRect(100,100, 200,150);

    ctx.strokeStyle = '#00a';
    ctx.lineWidth = 20;

    ctx.strokeRect(100,100, 200,150);

    
}

function ejemplo03() {
    let cv = document.querySelector('#cv01');
        ctx = cv.getContext('2d');
    
    ctx.strokeStyle = '#a0a';
    ctx.lineWidth = 2;

    ctx.arc(200,200, 100, 0, 3*Math.PI/2, false);
    //centro del círculo
    ctx.moveTo(220, 200);
    ctx.arc(200,200, 20, 0, 2*Math.PI, false);


    ctx.stroke();
}

function ejemplo04() {
    let cv = document.querySelector('#cv01');
        ctx = cv.getContext('2d');
    
    // ctx.globalAlpha = .5;
    ctx.fillStyle = '#aaa8';

    ctx.fillRect(200,200, 100, 80);
} 