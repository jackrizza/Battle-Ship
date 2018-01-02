let Game = require("./main.js");
let game = new Game();
game.music();
game.setUp();
window.setInterval(_ => {
    game.update();
}, 16.66);

//Sound by Rajive from the Noun Project
//Sound by Rajive from the Noun Project