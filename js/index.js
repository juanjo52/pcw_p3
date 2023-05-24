// Función para recoger nombres de los jugadores 

function recogeNombres() {
    let j1 = document.getElementById('jugador1').value;
    let j2 = document.getElementById('jugador2').value;
    
    sessionStorage['_jugador1_'] = JSON.stringify(j1);
    sessionStorage['_jugador2_'] = JSON.stringify(j2);
}