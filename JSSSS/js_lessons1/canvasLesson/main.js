let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

document.body.onclick = (event) => {
ctx.beginPath();
ctx.arc(event.clientX, event.clientY, 50, Math.PI/4,2 * Math.PI - Math.PI/4, false);
ctx.lineTo(event.clientX, event.clientY)
ctx.closePath();
ctx.stroke();
ctx.fillStyle = 'yellow';
ctx.fill();
}