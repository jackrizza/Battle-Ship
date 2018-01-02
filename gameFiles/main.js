let game = {
    Player : require("./player"),
    debug : "",
    user : null,
    setUp: _ => {
        document.getElementById("app").innerHTML = `
        <div id="debug" class="${game.debug}">
        <span>Adjacent : </span><span id="adjacent"></span>
        <span>Oppisite : </span><span id="oppisite"></span>
        <span>Hypotenuse : </span><span id="hypotenuse"></span>
        <span>Rotate : </span><span id="rotate"></span>
        </div>
        <div id="GUI">
        <h1>HEALTH : <span id="health"></span></h1>
        <h1>XP : <span id="xp"></span></h1>
        </div>
    `;
        game.user = new game.Player("Jack", 100, 0);
        game.user.createPlayer()
        game.user.controlPlayer()
        game.user.GUI();
    },


    update: _ => {
        if (game.user.health > 0) {
            // game play
        } else if (game.user.health == 0) {
            // game over
            document.getElementById("app").innerHTML = `
        <div class="center">
            <h1>Game Over</h1>
            <h2>Score : ${game.user.xp}</h2>
            <br />
            <button id="restartGame">Play Again</button>
        </div>
        `;
        game.user = null;
            document.getElementById("restartGame").addEventListener('click', _ => {
                game.setUp();
            });
        }
    }

}

module.exports = game;