// Función para recoger nombres de los jugadores 
function recogeNombres() {
    let j1 = document.getElementById('jugador1').value;
    let j2 = document.getElementById('jugador2').value;
    
    let jugador1 = { "Jugador1": j1 };
    let jugador2 = { "Jugador2": j2 };
  
    sessionStorage.setItem('_jugador1_', JSON.stringify(jugador1));
    sessionStorage.setItem('_jugador2_', JSON.stringify(jugador2));

    if(j1!=="" || j2 !=="") window.location.replace("./juego.html");;

}

//Funcion para borrar el session
function borraNombres(){
    sessionStorage.removeItem('_jugador1_');
    sessionStorage.removeItem('_jugador2_');
    sessionStorage.removeItem('_partida_'); //TEMPORAL

}