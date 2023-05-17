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
            />`;

    // Para ir añadiendo círculos al svg
    document.querySelector('#svg01').innerHTML += html;
}