const ANCHO = 480;
const ALTO = 360;

function prepararCanvas() {
    let cv = document.querySelector('#cv01');

    cv.width = ANCHO;
    cv.height = ALTO;
}

function ejemplo01() {
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');

        ctx.beginPath();

    ctx.strokeStyle = '#a00';
    ctx.lineWidth = 6;

    ctx.lineCap = 'round'; //Hacer redondas las puntas de las lines

    ctx.moveTo(100, 100);
    ctx.lineTo(200, 150);
    ctx.lineTo(80, 200);

    ctx.moveTo(200, 300);
    ctx.lineTo(50, 280);

    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = '#00a';
    ctx.rect(20, 20, 100, 50); 

    ctx.stroke();
}

function ejemplo02() {
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');

        ctx.beginPath();

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
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');

        ctx.beginPath();
    
    ctx.strokeStyle = '#a0a';
    ctx.lineWidth = 2;

    ctx.arc(200,200, 100, 0, 3*Math.PI/2, false);
    //centro del círculo
    ctx.moveTo(220, 200);
    ctx.arc(200,200, 20, 0, 2*Math.PI, false);


    ctx.stroke();
}

function ejemplo04() {
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');
    
    // ctx.globalAlpha = .5;
    ctx.fillStyle = '#aaa8';

    ctx.fillRect(200,200, 100, 80);
} 

function dibujarTexto() {
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d'),
        texto = 'Holap Mundo!!!';
    
    ctx.fillStyle = '#0a0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.font = 'italic 32px Sigmar';
    ctx.fillText(texto, 100,100);

    ctx.beginPath();

    ctx.strokeStyle = '#a00';
    ctx.lineWidth = 2;

    ctx.moveTo(100, 0);
    ctx.lineTo(100, cv.height);
    ctx.moveTo(0, 100);
    ctx.lineTo(cv.width, 100);
    
    ctx.stroke();
}


function divisiones() {
    let cv = document.querySelector('#cv01'),
    ctx = cv.getContext('2d'),
    celdas = 3,
    anchoCelda = ANCHO / 3,
    altoCelda = ALTO / 3;

    ctx.beginPath();
    ctx.strokeStyle = '#00a';
    ctx.lineWidth = 2;

    for(let i=1; i<celdas; i++){
        // verticales 
        ctx.moveTo( i * anchoCelda, 0);
        ctx.lineTo( i * anchoCelda, cv.height);
        // horizontales
        ctx.moveTo(0, i * altoCelda);
        ctx.lineTo(cv.width, i * altoCelda);
    }

    ctx.stroke();

}