function prepararCanvas() {
    let cv = document.querySelector('#cv01');

    cv.width = 480;
    cv.height = 360;

}

function ejemplo01() {
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');

    ctx.fillStyle = '#f80';
    ctx.fillRect(20, 30, 200, 100);
}

function ejemplo02() {
    let cv = document.querySelector('#cv01'),
        ctx = cv.getContext('2d');

    ctx.strokeStyle = '#a00';
    ctx.lineWidth = 1;

    ctx.moveTo(100, 0);
    ctx.lineTo(100, cv.height);

    ctx.moveTo(102.5, 0);
    ctx.lineTo(102.5, cv.height);

    ctx.stroke();
}