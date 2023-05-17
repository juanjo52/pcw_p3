const ANCHO = 480;
const ALTO = 360;

function prepararSVG() {
    let svg = document.querySelector('#svg01');

    svg.setAttribute('width', ANCHO);
    svg.setAttribute('height', ALTO);
}

function anyadir() {
    let html,
        cx, cy,
        radio = 25;

    cx =  radio + Math.ceil( Math.random() * (ANCHO - 2 * radio) );
    cy =  radio + Math.ceil( Math.random() * (ALTO - 2 * radio) );


    html = `<circle
                cx="${cx}" cy="${cy}" r="${radio}"
                stroke="#00a"
                stroke-width = "6px"
                fill="#a00"

                onclick="seleccionar(event);"
                onmousedown="clicDown(event);"
                onmousemove="mover(event);"
                onmouseup="clicUp(event);"
                onmouseleave="mouseLeave(event);"
            />`;

    // Para ir añadiendo círculos al svg
    document.querySelector('#svg01').innerHTML += html;
}

function seleccionar(evt) {
    let circle = evt.target,
        sel = document.querySelector('.seleccionada');

    // Para que solo se pueda seleccionar uno de los círculos
    if(sel) {
        sel.classList.remove('seleccionada');
    }

    circle.classList.add('seleccionada');

    //Luego para pillar todos los seleccionador ponermos document.querySelectorAll('.seleccionada') 

    //Si tiene la clase se la quita y si no se la pone asi:  
    // circle.classList.toggle('seleccionada');

}


function clicDown(evt) {
    let circle = evt.target,
        x = evt.offsetX,
        y = evt.offsetY,
        pos;

    pos = {'x':x, 'y':y};

    circle.setAttribute('data-pos', JSON.stringify(pos));

    console.log('DOWN');
    console.log(circle);
}

function clicUp(evt) {
    let circle = evt.target;

    if(circle.getAttribute('data-pos')){
        circle.removeAttribute('data-pos')
    }

    console.log('UP');
    console.log(circle);
}

function mover(evt) {
    let circle = evt.target,
        x = evt.offsetX,
        y = evt.offsetY;

    if(circle.getAttribute('data-pos')){
        let pos = JSON.parse(circle.getAttribute('data-pos')),
            dx = parseInt(x - pos.x),
            dy = parseInt(y - pos.y),
            cx, cy;

            cx = parseInt(circle.getAttribute('cx')) + parseInt(dx);
            cy = parseInt(circle.getAttribute('cy')) + parseInt(dy);

            circle.setAttribute('cx', cx);
            circle.setAttribute('cy', cy);

            pos = {'x':x, 'y':y};
            circle.setAttribute('data-pos', JSON.stringify(pos));
    }
}

function mouseLeave(evt) {
    clicUp(evt);
}