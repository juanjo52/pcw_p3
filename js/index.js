(function(){
    if(sessionStorage['_partida_']){
        location.href = 'juego.html';
    }
})();

// Función para recoger nombres de los jugadores 
function recogeNombres(evt) {
    evt.preventDefault();
    
    let j1 = document.getElementById('jugador1').value;
    let j2 = document.getElementById('jugador2').value;

    let msgError = document.getElementById('msgError');
    
    if(j1 != "" && j2 != ""){
        let jugador1 = { "Jugador1": j1 };
        let jugador2 = { "Jugador2": j2 };
    
        sessionStorage.setItem('_jugador1_', JSON.stringify(jugador1));
        sessionStorage.setItem('_jugador2_', JSON.stringify(jugador2));

        msgError.textContent = '';

        window.location.replace("./juego.html");
    } else {
        msgError.textContent = "Tienes que introducir dos jugadores para poder jugar";
    }

    

}

function podio(){
    let tabla = document.getElementById('tablaJugadores');
    let tbody = tabla.querySelector('tbody');
    let jugadores = JSON.parse(sessionStorage.getItem('jugadoresTOP'));

    if(sessionStorage['jugadoresTOP']){
        for (let i = 0; i < jugadores.length; i++) {
            let jugador = jugadores[i];
            
            let fila = document.createElement('tr');
            
            let celdaPosicion = document.createElement('td');
            celdaPosicion.textContent = i + 1;
            fila.appendChild(celdaPosicion);
            
            let celdaNombre = document.createElement('td');
            celdaNombre.textContent = jugador.Nombre;
            fila.appendChild(celdaNombre);
            
            let celdaPuntos = document.createElement('td');
            celdaPuntos.textContent = jugador.Puntos;
            fila.appendChild(celdaPuntos);
            
            tbody.appendChild(fila);
        }
    }else{
        let fila = document.createElement('tr');
        let celdaMensaje = document.createElement('td');
        celdaMensaje.setAttribute('colspan', '3');
        celdaMensaje.textContent = 'Todavía no hay puntuaciones guardadas. ¡¡¡ Sé el primero en conseguir una puntuación máxima !!!';
        fila.appendChild(celdaMensaje);
        tbody.appendChild(fila);
    }
}


//Funcion para borrar el session
function borraNombres(){
    sessionStorage.removeItem('_jugador1_');
    sessionStorage.removeItem('_jugador2_');
    
}
