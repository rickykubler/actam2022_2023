/** @type {HTMLCanvasElement} */ // suggestion to visual studio that this is a canvas
var canvas = document.getElementById("oscilloscope");

var context = canvas.getContext("2d");

var c = new AudioContext();
var a = c.createAnalyser();
var o = c.createOscillator();

var bs = c.createBufferSource();
bs.loop = true;

// we want it to be long as 1 second so we have c.sampleRate number of samples
var wnbuffer = c.createBuffer(1, c.sampleRate*1, c.sampleRate); 

// it is a loat32Array
var bufferData = wnbuffer.getChannelData(0); // we get the data from the first channel of the buffer

for(let i=0; i<bufferData.length;i++){
    bufferData[i] = Math.random()*0.2 + Math.sin(i/10);
}

// connect buffer and bufferSource
bs.buffer = wnbuffer;
bs.connect(a);

o.connect(a); // we connect the oscillator to the analyser first
a.connect(c.destination); 

buffer = new Float32Array(500); // 500 is the length

/*document.onclick = () => {
    c.resume();
    //o.type = "square";
    o.start();
    // sample what the analiser sees and show in the canvas
    setInterval(sampleAndDraw, 20);
}*/

document.onclick = () => {
    c.resume();
    //bs.start();
    setInterval(sampleAndDraw, 20);
}

function sampleAndDraw(){
    context.clearRect(0,0,canvas.width, canvas.height)
    a.getFloatTimeDomainData(buffer);
    context.beginPath();
    context.moveTo(0,0);
    for(let i=0; i<buffer.length;i++){
        context.lineTo(i, (buffer[i]+1)*50);
    }
    context.stroke();
}