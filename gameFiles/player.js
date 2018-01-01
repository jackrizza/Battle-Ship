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
        
        /*
        * In quad 1 and 3 the angles get reversed so where it is suppose to be 90°
        * It is 180°, vise versa.
        * This progam along with the help of 
        * Tomas @ https://math.stackexchange.com/a/453342
        * the program works sucsessfully.
        */
        if (quad == 1 || quad == 3) {
            // find the range of numbers
            let old = degrees,
                // Min and max are inside its paramaters by 1°
                // because at exact min and max they are considered
                // to be in the next or past quad.
                min = quad * 90 + 1,
                max = (quad + 1) * 90 - 1,
                total = min + max;
            // flip the number
            degrees = degrees - total;
            // make all numbers positive
            degrees = Math.sqrt(degrees * degrees);
        }
        this.debug(hypotenuse, adjacent, oppisite, degrees);
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