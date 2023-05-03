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
    ctx.lineWidth = 2;

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

    ctx.fillStyle = '#0a0';
    ctx.fillRect(100,100, 200,150);
    
    ctx.strokeStyle = '#00a';
    ctx.lineWidth = 20;

    ctx.strokeRect(100,100, 200,150);

    
}