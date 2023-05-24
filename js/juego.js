//--------------------------------------------------------------------------------------
//SESSIONSTORAGE
//--------------------------------------------------------------------------------------

(function(){
    if(!sessionStorage['_jugador1_'] || !sessionStorage['_jugador2_']){
        location.href = 'index.html';
    }
})();

//--------------------------------------------------------------------------------------
//CANVAS
//--------------------------------------------------------------------------------------
const ANCHO = 300;
const ALTO = 300;

function prepararCanvas() {
    let cv = document.querySelector('#cv01');

    cv.width = ANCHO;
    cv.height = ALTO;

    ponerEventos();
    divisiones();
    recogerTablero();
}

function ponerEventos() {
    let cv = document.querySelector('#cv01');

    // cv.addEventListener('mousemove', function(evt){ // Para cuando el ratón esté por encima...
    cv.addEventListener('click', function(evt){ // Para cuando se pulsa en la celda...
        let x = evt.offsetX,
            y = evt.offsetY,
            altoCelda = ALTO / 4,
            anchoCelda = ANCHO / 4,
            fila,col;

        fila = Math.floor(y / altoCelda);
        col = Math.floor(x / anchoCelda);
        console.log(`(x,y): (${fila}, ${col})`);
    });
}

function pintarPosiciones(posX,posY){

    const cv = document.querySelector('#cv01');

    console.log('Fila-->'+ posX + ' Columna-->'+posY);

    let altoCelda = ALTO / 4;
    let anchoCelda = ANCHO / 4;

    let fila = posX;
    let col = posY; 
  
    const ctx = cv.getContext('2d');
    ctx.fillStyle = 'red';

    ctx.fillRect(col * anchoCelda, 
                fila * altoCelda, 
                anchoCelda, 
                altoCelda);
    ctx.stroke();
}

function recogerTablero(){

    let url = 'api/tablero';
    let pos = 0;
    let cont = 0;

    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(datos){
                datos.TABLERO.forEach(function(e){
                    
                    console.log(e);
                    for(let i = 0; i < e.length ; i++){
                        
                        if(e[i] === -1){ 
                            pos = i;
                            pintarPosiciones(cont,i);
                        }                
                    }
                    cont++;
                });
            });
        }
    });
}

function divisiones() {
    let cv = document.querySelector('#cv01'),
    ctx = cv.getContext('2d'),
    celdas = 4,
    anchoCelda = ANCHO / 4,
    altoCelda = ALTO / 4;

    ctx.beginPath();
    ctx.strokeStyle = 'BLACK';
    ctx.lineWidth = 1;

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


//--------------------------------------------------------------------------------------
//JUEGO
//--------------------------------------------------------------------------------------