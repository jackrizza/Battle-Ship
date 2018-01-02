let game = require("./main.js");
let background = new Audio('../assets/background.wav');
background.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);
background.play();
game.setUp();
setInterval(game.update(), 10);