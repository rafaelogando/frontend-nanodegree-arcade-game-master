//Sets end of game
var gameOver=false;

// Enemies our player must avoid
var Enemy = function(speed) {
    this.y;
    this.x;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
}


//Generates a random position for the next time the bug 
//(Enemy) appears on the screen.
Enemy.prototype.randomPos = function()
    {
        this.x=-101;
        this.y=(Math.round((Math.random()*2)+1)*83)-20;
    }
    
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) 
{
    this.x=this.x+this.speed*dt;
    if(this.x >= 500)
    {
        this.randomPos();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() 
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Checks if the player has been grabbed by a bug and if true 
//reset player position and set the game to over if player
// have no hearts(lifes) left.
Enemy.prototype.grab = function() {
    if( (this.x+20) >= player.x && this.x <= (player.x+20) && player.y == this.y)
        {
            
            player.reset();
            player.hearts--;
            if(player.hearts<=0){gameOver=true;}
        }
}

// Ower hero/es class.
var character = function() {

    this.hearts =3;
    this.points =0;
    
    
 
    this.charpic = 'images/char-boy.png';
    this.chardead = 'images/dead.png';
}

//Check user inputs to set player character position.
//This function wont work if the game is over.
character.prototype.handleInput = function(key)
    {
        if(!gameOver)
        {
            if(key ==  "up"){
                this.y=this.y-83;
            };
            if(key ==  "down"&&player.y<395){
                this.y=this.y+83;
            };
            if(key ==  "right"&& player.x <404){
                this.x=this.x+101;
            };
            if(key ==  "left"&&player.x>0){
                this.x=this.x-101;
            };
        };
    }

//Resets the character starting posiion.
character.prototype.reset = function()
    {
        this.y = 312;
        this.x = 202;
    }

//Sets the character points status, resest its position and
//increase enemies speed.  Does not use dt because character
// movement is not smoth like
//bugs do.
character.prototype.update = function() {
    if(this.y <= -20)
    {
        this.points++;
        this.reset();
        for(e in allEnemies)
        {
             allEnemies[e].speed=allEnemies[e].speed+25;
        }
    } 
}

// Draw the player on the screen and change player appeal if 
//not alive, required method for game.
character.prototype.render = function() {
    if(!gameOver){ctx.drawImage(Resources.get(this.charpic), this.x, this.y);}
    else{ctx.drawImage(Resources.get(this.chardead), this.x, this.y)};
    
}



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var firstE = new Enemy(120);
var secondE = new Enemy(140);
var thirdE = new Enemy(200);
var fourthE = new Enemy(250);
var fifthE = new Enemy(300);
var allEnemies = [firstE,secondE,thirdE,fourthE,fifthE];
var player = new character();



// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
