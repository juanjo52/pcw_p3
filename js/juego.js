const ANCHO = 480;
const ALTO = 360;

function prepararCanvas() {
    let cv = document.querySelector('#cv01');

    cv.width = ANCHO;
    cv.height = ALTO;

    ponerEventos();
}

function ponerEventos() {
    let cv = document.querySelector('#cv01');

    // cv.addEventListener('mousemove', function(evt){ // Para cuando el ratón esté por encima...
    cv.addEventListener('click', function(evt){ // Para cuando se pulsa en la celda...
        let x = evt.offsetX,
            y = evt.offsetY,
            altoCelda = ALTO / 3,
            anchoCelda = ANCHO / 3,
            fila,col;

        fila = Math.floor(y / altoCelda);
        col = Math.floor(x / anchoCelda);
        console.log(`(x,y): (${fila}, ${col})`);
    });
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