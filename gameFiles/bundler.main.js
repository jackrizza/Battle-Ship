let Game = require("./main.js");
let game = new Game(); // new instances of game
game.music(); // start music
game.draw(); // setup game
window.setInterval(_ => {
    game.update(); // check scores/xp and health
}, (1000 / 60)); // 60 times seconds