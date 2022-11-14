const canvas = document.getElementById("canvas"); // pointing to the canvas 
const context = canvas.getContext("2d"); 

//context.beginPath(); // begining to define a path
//context.moveTo(0, 0);
//context.lineTo(300, 150);
//context.lineTo(100, 250);
//context.stroke(); // end to draw

var x = 10;
var y = 10;
var vx = -1;

function render() {
    context.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    context.fillStyle = "green";
    context.fillRect(x, y, 100, 100);
}

function evolveWorld(){
    x += vx;
    y += vx;
    
    if(x+10>=canvas.offsetWidth){
        vx=-vx;
    }
    if(x<0){
        vx =-vx;
    }
}

function tick(){ // tick minimum step of change
    evolveWorld();
    render();
}

setInterval(tick, 20); //20 is 50 fps since 20*50=1000

console.log(canvas.offsetHeight)
console.log(canvas.offsetWidth) 