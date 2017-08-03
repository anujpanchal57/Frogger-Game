// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.fail = function() {
        if(((this.y > player.y - 30) &&
            (this.y < player.y + 30)) &&
            ((this.x > player.x - 50) &&
                (this.x < player.x + 30))) {
                    player.x = 202;
                    player.y = 395;
        }
    };
    //Adds some amount of space between each and every row of bugs
    if(this.x < 610) {
        this.x = (this.x + dt * Math.floor(Math.random() * 600));
        this.fail();
    } else {
        this.x = Math.floor(Math.random() * (-400)) - 300;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var pawn;

for(pawn = 0; pawn < 3; pawn++) {
    allEnemies[pawn] = new Enemy(Math.floor(Math.random()), ((pawn + 1) * 55) + (pawn * 30));
}

// Sets the initial position of the Player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 395;
};


// Border Protection of player
Player.prototype.update = function(dt) {

    if (this.x < 0 ) {
        this.x = 0;
    } else

    if (this.x > 400) {
        this.x = 400;
    } else

    if (this.y < -10 ) {
        this.y = -10;
    } else

    if (this.y > 400) {
        this.y = 395;
    }

    if(this.y <= 60) {
        this.x = 200;
        this.y = 395;
    }
};

// Renders the Player on screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.font = 'bold 24px Helvetica';
};

//Handling the control of player movement
Player.prototype.handleInput = function(direct) {
    if (((this.y < 60) && (direct === "up")) ||
        ((this.y > 450) && (direct === "down")) ||
        ((this.x < 0) && (direct === "left")) ||
        ((this.x > 450) && (direct === "right"))) {
        return;
    }

    if(direct === "up") {
        this.y = this.y - 83;
    } else if (direct === "down"){
        this.y = this.y + 83;
    } else if(direct === "right") {
        this.x = this.x + 101;
    } else if(direct === "left") {
        this.x = this.x - 101;
    }
};

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


