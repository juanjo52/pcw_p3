const ANCHO = 480; 
const ALTO = 360;

function prepararCanvas() {
    // let cv = document.querySelector('canvas');

    // cv.width = ANCHO;
    // cv.height = ALTO;

    let cvs = document.querySelectorAll('canvas');

    cvs.forEach(function(cv){
        cv.width = ANCHO;
        cv.height = ALTO;
    });
}

function ejemplo01() {
    let cv = document.querySelector('#cv1'),
        ctx = cv.getContext('2d');
    
    ctx.beginPath();

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#a00';

    ctx.moveTo(100, 100);
    ctx.lineTo(200, 200);
    ctx.lineTo(100,300);
    
    // ctx.closePath();
    ctx.fillStyle = '#aa0';
    ctx.fill();
    ctx.stroke();
}

function limpiar() {
    let cv = document.querySelector('#cv1'),
        ctx = cv.getContext('2d');
    
    
    // ctx.clearRect(0, 100, cv.width, cv.height);
    cv.width = cv.width;
    // cv.height = cv.height
}

function escalar() {
    let cv = document.querySelector('#cv1'),
        ctx = cv.getContext('2d');
    
    ctx.scale(1.25,1.25);
}

//Este está en apuntes (es uno de rotaciones etc)
function ejemplo02 (){
    // let canvas = document.querySelector('#cv1'),
    //     ctx    = 
}

function imagen01() {
    let cv = document.querySelector('#cv1'),
        ctx = cv.getContext('2d'),
        imagen,
        x,y,
        anchoImagen = cv.width * .8,
        altoImagen;
    
    imagen = document.querySelector('img');

    altoImagen = imagen.height * (anchoImagen / imagen.width);

    x = (cv.width - anchoImagen) / 2;
    y = (cv.height - altoImagen) / 2;

    // ctx.drawImage(imagen, x, y, anchoImagen, altoImagen);
    ctx.drawImage(imagen, 100, 100, 200, 150, 0,0, 200, 150);
}

function cargarImagen(inp) {
    let file = inp.files[0];

    if(file) {
        let cv = document.querySelector('#cv1'),
            ctx = cv.getContext('2d'),
            img = new Image();
        
            img.onload = function() { // Para que de tiempo al cargar al ser asincrono ( lo que debimos hacer con el número de comentarios)

                ctx.drawImage(img, 0,0, cv.width, img.height * (cv.width / img.width));
            }

            img.src = URL.createObjectURL( file );           
    }
}

function selImagen(){ // Seleccionar imagen sin necesidad de tener input en el html... 
    let inp = document.createElement('input');

    inp.type = 'file';
    inp.onchange = function(evt){
        cargarImagen(evt.target);
    }

    inp.click();
}

function copiar() { // Copiar lo de un canvas en otro
    let cv1 = document.querySelector('#cv1'),
        ctx1 = cv1.getContext('2d'),
        cv2 = document.querySelector('#cv2'),
        ctx2 = cv2.getContext('2d');
    
    ctx2.drawImage(cv1, 0, 0);
}

function copiarID() {
    let cv1 = document.querySelector('#cv1'),
        ctx1 = cv1.getContext('2d'),
        cv2 = document.querySelector('#cv2'),
        ctx2 = cv2.getContext('2d'),
        imgData;

    
    imgData = ctx1.getImageData(0,0, cv1.width, cv1.height);
    
    ctx2.putImageData(imgData, 0,0);
}

function aColor(color) {
    let cv1 = document.querySelector('#cv1'),
        ctx1 = cv1.getContext('2d'),
        cv2 = document.querySelector('#cv2'),
        ctx2 = cv2.getContext('2d'),
        imgData, pixel;

    
    imgData = ctx1.getImageData(0,0, cv1.width, cv1.height);
    
    for(let i = 0; i < imgData.height; i++) {
        for(let j = 0; j < imgData.width; j++) {
            pixel = (i * imgData.width + j) * 4;

            switch(color) {
                case 'r':
                    // imgData.data[ pixel    ] = 0;      // red
                    imgData.data[ pixel + 1] = 0;   // green
                    imgData.data[ pixel + 2] = 0;   // blue
                    // imgData.data[ pixel + 3] = 0;   // alpha
                    break;
                case 'g':
                    imgData.data[ pixel    ] = 0;      // red
                    // imgData.data[ pixel + 1] = 0;   // green
                    imgData.data[ pixel + 2] = 0;   // blue
                    // imgData.data[ pixel + 3] = 0;   // alpha
                    break;
                case 'b':
                    imgData.data[ pixel    ] = 0;      // red
                    imgData.data[ pixel + 1] = 0;   // green
                    // imgData.data[ pixel + 2] = 0;   // blue
                    // imgData.data[ pixel + 3] = 0;   // alpha
                    break;
            }
        }
    }


    ctx2.putImageData(imgData, 0,0);
}

function guardar() {
    let cv1 = document.querySelector('#cv1'),
        a = document.createElement('a');
    
    a.href = cv1.toDataURL('image/png');
    a.download = 'download';

    a.click();
}