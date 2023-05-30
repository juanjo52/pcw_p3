//--------------------------------------------------------------------------------------
//SESSIONSTORAGE
//--------------------------------------------------------------------------------------

(function(){
    if(!sessionStorage['_jugador1_'] || !sessionStorage['_jugador2_']){
        location.href = 'index.html';
    }
})();

function estadoPartida() {

    let p1 = document.getElementById("PuntosJ1").innerHTML;
    let p2 = document.getElementById("PuntosJ2").innerHTML;

    let t;

    let b1 = document.getElementById("numero1").innerHTML;
    let b2 = document.getElementById("numero2").innerHTML;
    let b3 = document.getElementById("numero3").innerHTML;

    document.getElementById('TurnoJ1').innerHTML == "*" ? t = 1 : t = 2;
    var n = [];
    var tablero = [];

    console.log("------------------------------------------");
    console.log("------------------------------------------");
    console.log(b1);

    n.push(b1);
    n.push(b2);
    n.push(b3);

    console.log(n);

    if (sessionStorage['_partida_'] == null) {

        // tablero = recogerTablero();
        let partida = {
            Tablero: tablero,
            Jugador1: JSON.parse(sessionStorage['_jugador1_']).Jugador1,
            Jugador2: JSON.parse(sessionStorage['_jugador2_']).Jugador2,
            Puntos1: p1,
            Puntos2: p2,
            Turno: t,
            Numeros : n
        };
        sessionStorage.setItem('_partida_', JSON.stringify(partida));
    }
}
//--------------------------------------------------------------------------------------
//JUEGO
//--------------------------------------------------------------------------------------

function partida(){

    if(sessionStorage['_partida_'] != null){

        console.log("pito pito");
        // console.log(recogerTablero());

        document.getElementById('TablaJ1').innerHTML = JSON.parse(sessionStorage['_partida_']).Jugador1;
        document.getElementById('TablaJ2').innerHTML = JSON.parse(sessionStorage['_partida_']).Jugador2;

        if(JSON.parse(sessionStorage['_partida_']).Turno === 1){
            document.getElementById('TurnoJ1').innerHTML = "*";
            document.getElementById('TurnoJ2').innerHTML = "";
        }
        else{
            document.getElementById('TurnoJ1').innerHTML = "";
            document.getElementById('TurnoJ2').innerHTML = "*";
        }

        console.log("------------------------------------------");
        console.log(JSON.parse(sessionStorage['_partida_']).Numeros[0]);

        document.getElementById('numero1').innerHTML = JSON.parse(sessionStorage['_partida_']).Numeros[0];
        document.getElementById("numero2").innerHTML = JSON.parse(sessionStorage['_partida_']).Numeros[1];
        document.getElementById("numero3").innerHTML = JSON.parse(sessionStorage['_partida_']).Numeros[2];

        let t = JSON.parse(sessionStorage['_partida_']).Tablero;

        console.log(t);

        let c = 0;
        let p = 0;

        t.forEach(function(e){

            for(let i = 0; i < e.length;i++){
                if(e[i] === -1){
                    p = i;
                    pintarPosiciones(c,p);

                }else if(t[c][i] != 0){
                    console.log('hola');
                    pintarNumeros2(e[i],c,i);
                }
            }
            c++;
        });
    }
    else{
        // recogerTablero();

        generarNumerosAleatorios();
        completarTabla();
        let url = 'api/tablero';
        let pos = 0;
        let cont = 0;

        let v0 = [], v1 = [], v2 = [], v3 = [];
        fetch(url).then(function(response){
            if(response.ok){
                response.json().then(function(datos){
                    datos.TABLERO.forEach(function(e){

                        console.log(e);
                        for(let i = 0; i < e.length ; i++){

                            if(e[i] === -1){
                                pos = i;
                                pintarPosiciones(cont,pos);
                                if(cont == 0) v0.push(e[i]);
                                if(cont == 1) v1.push(e[i]);
                                if(cont == 2) v2.push(e[i]);
                                if(cont == 3) v3.push(e[i]);
                            }
                            else{
                                if(cont == 0) v0.push(e[i]);
                                if(cont == 1) v1.push(e[i]);
                                if(cont == 2) v2.push(e[i]);
                                if(cont == 3) v3.push(e[i]);
                            }
                        }
                        cont++;
                    });
                    tablero = [v0,v1,v2,v3];
                    actualizarTableroEnPartida(tablero);
                });
            }
        });
    }
}

function actualizarTableroEnPartida(nuevoTablero) {
    let partida = JSON.parse(sessionStorage['_partida_']);
    partida.Tablero = nuevoTablero;
    console.log(partida);
    sessionStorage['_partida_'] = JSON.stringify(partida);
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

function selctNumero(evt){

    let numBoton = {

        Numero: document.getElementById(evt.target.id).innerHTML,
        ID: document.getElementById(evt.target.id)
    }

   sessionStorage.setItem('_numero_',JSON.stringify(numBoton));
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
    // recogerTablero();
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

        let nPintar = JSON.parse(sessionStorage['_numero_']).Numero;
        let t = JSON.parse(sessionStorage['_partida_']).Tablero;
        let v0 = [], v1 = [], v2 = [], v3 = [];
        let cont = 0; 

        t.forEach(function(e){
            for(let i = 0; i < e.length;i++){
                if(cont == fila && i == col){
                    pintarNumeros(nPintar,fila,col);
                }
            }
            cont++;
        });
        // console.log(`(x,y): (${fila}, ${col})`);
    });
}

function pintarNumeros(num,fil,col){

    console.log(`El numero a pintar es ${num}; en la pos --> ${fil}, ${col} `);

    const canvas = document.getElementById("cv01");
    const ctx = canvas.getContext("2d");
    ctx.font = "48px Arial"; // Establece el tamaño y la fuente del texto
    ctx.fillStyle = "black"; // Establece el color de relleno del texto

    let altoCelda = ALTO / 4;
    let anchoCelda = ANCHO / 4;

    let t = JSON.parse(sessionStorage['_partida_']).Tablero;

        let cont = 0; 

        t.forEach(function(e){
            for(let i = 0; i < e.length;i++){

                if(cont == fil && i == col){

                    if(e[i]!=-1){
                        console.log('entra1')
                        if(e[i] == 0){
                            t[cont][i] = num;
                            ctx.fillText(num, col*altoCelda + altoCelda/2 -13,fil*anchoCelda + anchoCelda/2 +17);
                            ctx.stroke();
    
                        }  
                    }
                }
            }
            cont++;
        });

    actualizarTableroEnPartida(t);
    sessionStorage['_numero_'] = null;

}

function pintarNumeros2(num,fil,col){

    console.log(`El numero a pintar es ${num}; en la pos --> ${fil}, ${col} `);

    const canvas = document.getElementById("cv01");
    const ctx = canvas.getContext("2d");
    ctx.font = "48px Arial"; // Establece el tamaño y la fuente del texto
    ctx.fillStyle = "black"; // Establece el color de relleno del texto

    let altoCelda = ALTO / 4;
    let anchoCelda = ANCHO / 4;

    let t = JSON.parse(sessionStorage['_partida_']).Tablero;

        let cont = 0; 

        t.forEach(function(e){
            for(let i = 0; i < e.length;i++){

                if(cont == fil && i == col){

                    ctx.fillText(num, col*altoCelda + altoCelda/2 -13,fil*anchoCelda + anchoCelda/2 +17);
                    ctx.stroke();
                    console.log('entra')

                }
            }
            cont++;
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
//NAV
//--------------------------------------------------------------------------------------

function ayuda(){

    let dialogo = document.createElement('dialog');

    dialogo.innerHTML =
    '<p>El juego consiste en ir colocando en las casillas vacías del tablero los números que se'+
    'proporcionan en grupos de tres. Juegan dos jugadores por turnos. Si al'+
    'colocar un número en una celda vacía, sumándole el que tiene'+
    'arriba/abajo/izquierda/derecha se obtiene un múltiplo de 5, se limpian las'+
    'casillas correspondientes y el resultado de la suma son los puntos que'+
    'acumula el jugador, manteniendo el turno. El juego finaliza cuando ya no'+
    'quedan casillas vacías en el tablero, ganando el jugador con mayor'+
    'puntuación.</p>'+
    '<button onclick="cerrarDialogo()">Cerrar</button>';

    document.body.appendChild(dialogo);
    dialogo.showModal();
}
