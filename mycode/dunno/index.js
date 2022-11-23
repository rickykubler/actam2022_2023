
var c = new AudioContext();
var o = c.createOscillator();
var sp = c.createScriptProcessor(1024, 1, 1);
var recordBuffer = c.createBuffer(1, 5*c.sampleRate, c.sampleRate); // buffer
var recordAudioData = recordBuffer.getChannelData(0); // array contains the sample of the buffer



/** @type HTMLCanvasElement */
var canvas = document.getElementById("osc");
const context = canvas.getContext("2d");

function drawSound() {
    window.requestAnimationFrame(drawSound); 
    const h = canvas.height;
    const w = canvas.width;
    context.clearRect(0,0,w,h);
    context.beginPath();
    context.moveTo(0,h/2);
    // we are drawing the first w=500 samples in the canvas
    for(let i=0; i<recordAudioData.length;i++){
        context.lineTo(i, (recordAudioData[i]+1)*h/2);
    }
    context.stroke();
}

drawSound();



o.connect(sp);
sp.connect(c.destination);

// script processor has an inputBuffer and an outputBuffer attached
var index = 0;
sp.onaudioprocess = function(e) {
    let inputBuffer = e.inputBuffer;
    let outputBuffer = e.outputBuffer;

    let audioDataIn = inputBuffer.getChannelData(0);
    let audioDataOut = outputBuffer.getChannelData(0);

    for(let i=0; i<audioDataIn.length; i++) {

        //let sample = audioDataIn[i];
        //if(sample > 0.5) sample = 0.5; // clipping the sound
        //audioDataOut[i] = sample;

        recordAudioData[index] = audioDataIn[i];
        index += 1;
        if(index > recordAudioData.length) index = 0;

    }

}

o.start();

document.onclick = () => c.resume();