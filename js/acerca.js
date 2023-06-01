function hayPartida(){

    if(sessionStorage['_partida_']){
        window.location.replace('./juego.html');
    }else{
        window.location.replace('./index.html');
    }
}