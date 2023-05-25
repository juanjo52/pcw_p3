
// Recuperar el valor de la variable almacenada en localStorage
var miVariable = localStorage.getItem('miVariable');

//--------------------------------------------------------------------------------------
//SESSIONSTORAGE
//--------------------------------------------------------------------------------------

(function(){
    if(!sessionStorage['_jugador1_'] || !sessionStorage['_jugador2_']){
        location.href = 'index.html';
    }
})();

function estadoPartida(){

    let p1 = document.getElementById("PuntosJ1").innerHTML; 
    let p2 = document.getElementById("PuntosJ2").innerHTML; 

    let partida = {

        "Tablero" : "",
        "Jugador1" : JSON.parse(sessionStorage['_jugador1_']).Jugador1,
        "Jugador2" : JSON.parse(sessionStorage['_jugador2_']).Jugador2,
        "Puntos1" : p1,
        "Puntos2" : p2
    }

    sessionStorage.setItem('_partida_', JSON.stringify(partida));
}

//--------------------------------------------------------------------------------------
//JUEGO
//--------------------------------------------------------------------------------------

function partida(){

    if(miVariable === true){
        console.log("pito pito");
    }
    else{
        
        completarTabla();
        generarNumerosAleatorios();
        if (miVariable !== 'true') {
            miVariable = 'true';
            localStorage.setItem('miVariable', miVariable);
        }
        
    }   
}

function modalPrimerTurno(jugador){
    
    console.log('aqui no se mete');

    let dialogo = document.createElement('dialog');

    dialogo.innerHTML = 
    `<h3>¡El primero en comenzar la partida es el jugador: ${jugador}!</h3>`+
    '<button onclick="cerrarDialogo()">Cerrar</button>';

    document.body.appendChild(dialogo);
    dialogo.showModal();
    estadoPartida();
}

function cerrarDialogo(){
    
    const urlParam = new URLSearchParams(window.location.search);
    const z = urlParam.get('id');
    document.querySelector('dialog').close();
    document.querySelector('dialog').remove();
}

function completarTabla(){

    let turnoj1 = 0; 
    let jugadorInicial;

    var random = Math.floor(Math.random() * 2);
    console.log(random);
    random == turnoj1 ? jugadorInicial = JSON.parse(sessionStorage['_jugador1_']).Jugador1 : jugadorInicial = JSON.parse(sessionStorage['_jugador2_']).Jugador2;

    console.log(sessionStorage['_jugador1_']);
    document.getElementById('TablaJ1').innerHTML = JSON.parse(sessionStorage['_jugador1_']).Jugador1;
    document.getElementById('TablaJ2').innerHTML = JSON.parse(sessionStorage['_jugador2_']).Jugador2;
    
    random == 0 ? document.getElementById('TurnoJ1').innerHTML = "*" : document.getElementById('TurnoJ2').innerHTML = "*";

    modalPrimerTurno(jugadorInicial);

}

function generarNumerosAleatorios() {
    var numeros = [];
    
    while (numeros.length < 3) {
        var numero = Math.floor(Math.random() * 9) + 1;
        if (numero !== 5 && !numeros.includes(numero)) {
        numeros.push(numero);
        }
    }
    
    document.getElementById('numero1').innerHTML = numeros[0]; //el innerHtml hace que actualice botones
    document.getElementById('numero2').innerHTML = numeros[1];
    document.getElementById('numero3').innerHTML = numeros[2];

    console.log(numeros);
}


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



