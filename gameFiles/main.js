let Player = require("./player");
let background = new Audio('../assets/background.wav');
let user;
background.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);
background.play();


let playGame = _ => {
    document.getElementById("app").innerHTML = `
        <div id="debug" class="hide">
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
    user = new Player("Jack", 100, 0);
    user.createPlayer()
    user.controlPlayer()
    user.GUI();
}



playGame();


setInterval(_ => {
    if (user.health > 0) {
        user.addXp();
        user.loseHealth();
    } else if (user.health == 0) {
        document.getElementById("app").innerHTML = `
        <div class="center">
            <h1>Game Over</h1>
            <h2>Score : ${user.xp}</h2>
            <br />
            <button id="restartGame">Play Again</button>
        </div>
        `;
        user = null;
        document.getElementById("restartGame").addEventListener('click', _ => {
            playGame();
        });
    }
}, 1000);