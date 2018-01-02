let Game = require("./main.js");
let game = new Game(); // new instances of game
game.music(); // start music
game.setUp(); // setup game
window.setInterval(_ => {
    game.update(); // check scores/xp and health
}, 16.66); // 60 times seconds