// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    this.x=x;
    this.y=y;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
   
    //will move Enemy bugs across screen and reset when bugs reach end of game screen

   if(this.x<505){

       //post condition: only if bug does not travel to end of game screen
       //increment x by 100 * dt to move bugs across screen at moderate speed 
        this.x+=100*dt;
    }
    else{

        //post condition: if bug reaches other side of game screen, then reset position back to original position
        this.x=-50;

    } 

}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


//*Player*

var Player=function(x,y){
        this.sprite = 'images/char-boy.png';
        this.x=x;
        this.y=y;
    }



        Player.prototype.update = function(){

            
            //check for collision
                   
                  for(var enemy in allEnemies){

                    //loop through all enemy objects in allEnemies

                     if(allEnemies[enemy].x+99 > this.x+25 && allEnemies[enemy].x < this.x+85 &&  allEnemies[enemy].y === this.y ) {

                        //will reset if enemy is on the same y row as enemy and enemy sprite x boundary overlaps with player sprite x boundary
                           lives--;
                           player.reset();

                      }
                  }

            //condition if player reaches water

            if(this.y === -10){

                //y coordinates meet -10 which is where the water resides
                score+=100;
                player.reset();
            }
            
            scoreboard.innerHTML = "Score: " + score + "   Lives: " + lives;

        }



        Player.prototype.render = function(){
        ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
    } 


    //Set up if statements to respond to key presses 
    //and set conditions to keep the player on the board.

        Player.prototype.handleInput = function(key){
            if(key =='left' && this.x > 0){
                
                this.x -= 100;
            }
            else if(key== 'up' && this.y> -10){
                
                this.y-=80;
            }
            else if(key == 'right' && this.x < 400){
                
                this.x += 100; 
            }

            else if(key == 'down' && this.y < 390){
                
                this.y+= 80;

            }
            

        }

        Player.prototype.reset= function(){

        //resets the players position data to start back at the beginning.

            this.x=200;
            this.y=390;
            if (lives===0){
                lives=3;
                score=0;
            }
        }



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

    enemy1 = new Enemy(-450,230);
    enemy2 = new Enemy(-200,150);
    enemy3 = new Enemy(-100,70);
   

    allEnemies=[enemy1,enemy2,enemy3];



    var player = new Player(200, 390);
    var scoreboard = document.getElementById('scoreboard');
    var gameover=document.getElementById('gameover');
    var lives=3;
    var score=0;

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