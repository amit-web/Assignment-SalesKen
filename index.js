let canvas = document.getElementById("canvas-bar");
let context = canvas.getContext("2d");

var lengthChange = 1;
canvas.width = 1400;
canvas.height = 600;

let btnIcon = document.getElementById("ctrl-icon");
let playPauseBtn = document.getElementById("play-pause");

let audio = document.getElementById("audio");

let isPlaying = false;

//Here Creating Bars : ------

var width = 5;
var height = [];
var X = 5;
var Y = [];

for (let i = 0; i <= 150; i++){
    Y.push(Math.floor(Math.random() * 70) + 100);
    height.push(Math.floor(Math.random() *200)+100);
}


for (let i = 0; i <= 150; i++){
    context.beginPath();
    context.fillStyle = "#DADADB";
    
    if (i === 150) height[i] = 500;
    context.fillRect(X, Y[i], width, height[i]);
    context.closePath();
    X = X + 10;

}

//Here filling bar colors
function filling_bar(val) {
    var length = val;
    console.log(val);
    X = 5;
    // changing bars color
    context.fillStyle = "#C895A6";
    for (let i = 0; i < length; i++) {
        context.beginPath();
        context.fillRect(X, Y[i], width, height[i]);
        context.closePath();
        X = X + 10;
    }
    // resetting bars color
    context.fillStyle = "#DADADB";
    for (let i = length; i <= 150; i++) {
        context.beginPath();
        context.fillRect(X, Y[i], width, height[i]);
        context.closePath();
        X = X + 10;
    }
    // resetting duration after completing cycle
    if (changingLength >= 150) {
        audio.pause();
        changingLength = 0;
        btnIcon.src =
            "https://icon-library.com/images/android-triangle-icon/android-triangle-icon-7.jpg";
        clearInterval(interval);
    }



}


//jumping on canvas
canvas.addEventListener("click", jumpingOnCanvas);
function jumpingOnCanvas(e) {
    var change_value = Math.round(e.layerX / 10);
    audio.currentTime = change_value;
    changingLength = change_value;
    filling_bar(change_value);
}


playPauseBtn.addEventListener("click", playAudio);

let changingLength = 1;
var interval;
function playAudio() {
    let audio = document.getElementById("audio");

    if (interval == undefined) {
        audio.play();
        btnIcon.src =
            "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/56573/pause-button-emoji-clipart-xl.png";

        interval = setInterval(() => {
            filling_bar(changingLength);
            changingLength++;
        }, 1000);
        console.log("play");
    } else {
        audio.pause();
        console.log("pause");
        btnIcon.src =
            "https://icon-library.com/images/android-triangle-icon/android-triangle-icon-7.jpg";
        clearInterval(interval);
        interval = undefined;
    }
}