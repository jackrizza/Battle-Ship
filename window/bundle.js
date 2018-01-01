(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
class Bullet {
    constructor(mX, mY) {
        this.mouseX = mX;
        this.mouseY = mY;
        this.velocity = 2;
        this.app = document.getElementById("app");
    }
    wait(ms) {
        var d = new Date();
        var d2 = null;
        do {
            d2 = new Date();
        }
        while (d2 - d < ms);
    }
    createBullet() {
        // create bullet
        let lazer = new Audio('../assets/lazer.wav');
        let bullet = document.createElement("div");
        bullet.style.position = "absolute";
        bullet.style.width = "2px";
        bullet.style.height = "4px";
        bullet.style.left = window.innerWidth / 2 + "px";
        bullet.style.top = window.innerHeight / 2 + "px";
        bullet.style.background = "red";
        this.app.appendChild(bullet);
        lazer.play();
        // fire bullet
        this.app.removeChild(bullet);
    }
}

module.exports = Bullet;
},{}],2:[function(require,module,exports){
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
},{"./player":3}],3:[function(require,module,exports){
const Sprites = require("./sprites");
const Bullet = require("./bullet");
class Player {
    constructor(name, health, xp) {
        this.name = name;
        this.health = health;
        this.xp = xp;
    }

    createPlayer() {
        let playerSprite = new Sprites();
        playerSprite.createPlayer();
    }

    debug(a, b, c, d) {
        let debug = document.getElementById("debug").classList;
        if (!debug.contains("hide")) {
            document.getElementById("hypotenuse").innerText = Math.ceil(a);
            document.getElementById("adjacent").innerText = Math.ceil(b);
            document.getElementById("oppisite").innerText = Math.ceil(c);
            document.getElementById("rotate").innerText = Math.ceil(d);
        } else {
            console.log(`
            BattleShip : {
                "Hypotenuse" : ${Math.ceil(a)},
                "Adjacent" : ${Math.ceil(b)},
                "Oppisite" : ${Math.ceil(c)},
                "Oppisite" : ${Math.ceil(d)}
            }
        `);
        }
    }

    degrees(pX, pY, mX, mY) {
        /*
         * The degrees function takes the players (or sprites) location (x and y)
         * and the mouse location (x and y)
         * and outputs the total degrees the sprite would have to be to line up with the mouse
         */
        // get the quadrant of the mouse
        let quad = this.Q(mX, mY),
            q = quad * 90,
            // find the the distance between the sprite and the mouse
            hypotenuse = Math.sqrt(Math.pow((mY - pY), 2) + Math.pow((mX - pX), 2)),
            // find the height of where the mouse is to 0
            adjacent = pY - mY, //(mY - pY < 0 ? (mY - pY) * -1 : mY - pY)
            // a^2 - b^2 = c^2
            oppisite = Math.sqrt((Math.pow(hypotenuse, 2) - Math.pow(adjacent, 2))),
            // find the angle of the hypotenuse
            angle = Math.asin(oppisite / hypotenuse),
            // convert the angle of the right angle triangle into the total degrees that the sprite has to turn to from 0
            degrees = angle * (180 / Math.PI) + q;
        // this is fucking ridiculous but
        // https://math.stackexchange.com/questions/453334/how-to-reverse-a-range-of-numbers
        if (quad == 1 || quad == 3) {
            let old = degrees,
                min = quad * 90 + 1,
                max = (quad + 1) * 90 - 1,
                total = min + max;
            degrees = degrees - total;
            degrees = Math.sqrt(degrees * degrees)
        }
        this.debug(hypotenuse, adjacent, oppisite, degrees)

        return Math.ceil(degrees);
    }
    Q(mX, mY) {
        /* 
         * The Q function takes in the mouse location (x and y)
         * then outputs what quadrant the mouse is in
         */
        let quad = {
                // top right
                "x1y0": 0,
                // bottom right
                "x1y1": 1,
                // bottom left
                "x0y1": 2,
                // top left
                "x0y0": 3
            },
            // window width
            windowX = window.innerWidth,
            // window height
            windowY = window.innerHeight,
            x = (mX > windowX / 2 ? 1 : 0),
            y = (mY > windowY / 2 ? 1 : 0),
            // use the found data to create a string corrisponding quad object
            value = ("x" + x.toString() + "y" + y.toString()).toString();
        // find and return the results from the quad object
        return quad[value];

    }

    rotate(deg) {
        /*
         * This is the the last step to rotating the sprite
         * It takes in the Degrees it needs to rotate the sprite and does so
         */
        // rotate the sprite
        document.getElementById("user").style.webkitTransform = `rotate(${deg}deg)`;
    }

    controlPlayer() {
        let app = document.getElementById("app");
        // mouse moving arround screen
        app.addEventListener("mousemove", (event) => {
            // get mouse x
            let x = event.clientX;
            // get mouse y
            let y = event.clientY;
            this.rotate(this.degrees(window.innerWidth / 2, window.innerHeight / 2, x, y));
        });

        // test listener for later
        // this will be for firing at the zombies
        app.addEventListener("click", (event) => {
            let x = event.clientX;
            let y = event.clientY;
            let bullet = new Bullet(x, y).createBullet();

        }, false);

    }

    loseHealth() {
        this.health--;
        this.GUI();
    }

    addXp() {
        this.xp++;
        this.GUI();
    }
    GUI() {
        document.getElementById("health").innerText = this.health;
        document.getElementById("xp").innerText = this.xp;
    }
}

module.exports = Player;
},{"./bullet":1,"./sprites":4}],4:[function(require,module,exports){
class Sprites {
    constructor() {
        this.app = document.getElementById("app");
    }

    createPlayer() {
        let user = document.createElement("img");
        user.id = "user";
        user.src = "../assets/ship.png";
        this.app.appendChild(user);
        return user;

    }

    createAlien() {
        let alien = document.createElement("img");
        alien.id = "alien";
        alien.src = "../assets/alien.png";
        this.app.appendChild(alien);
        return alien;
    }
}

module.exports = Sprites;
},{}]},{},[2]);