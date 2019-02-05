window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

};

var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");

 class Game {
   constructor(){
     this.score = 0;
     this.level = 1;
     
   }
 }


function startGame() {
  let game = new Game;
  backgroundMusic.play();
  dogBark.play();
  
  animate(game);
  levelUp()
// if (score <= 2000) {
//   levelOne();
// } else if (score > 2000 && score <= 4000) {
//   levelTwo();
// } else if (score > 4000 && score <= 6000) {
//   levelThree();
// } else if (score > 6000 && score <= 8000) {
//   levelFour();
// } else if (score > 8000 && score <= 10000) {
//   levelFive();
// }
}
let level = 0;
function levelUp(points){
  // console.log(points, level)

  if (points <= 1000 && level !=1 && points != 0) {
    levelOne();
    level = 1; 
  } else if (points > 100 && points <= 300 && level !=2) {
    levelTwo();
    level = 2; 
  } else if (points > 300 && points <= 500 && level != 3) {
    levelThree();
    level = 3 
  } else if (points > 500 && points <= 700 && level != 4) {
    levelFour();
    level = 4 
  } else if (points > 700 && points <= 900  && level != 5) {
    levelFive();
    level = 5
  } else if (points > 900) {
    alert('Ruff survived the apocalypse with your help!')
  }
 }


//let carInterval = setInterval(createCars, 10000); //vehicle generated every 10 secs

function zombieCoinInt () {
  let zombieInterval = setInterval(createZombie, 3000); //3000 creates a new Zombie every 3 seconds.
  let coinInterval = setInterval(createCoins, 5000); //coins generated every 5 secs
}

function levelOne () {
  // zombieInterval;
  // coinInterval;
  zombieCoinInt();
  document.getElementById('level').innerText = "1";
}


// function levelTwo () {
//   zombieInterval;
//   coinInterval;
//   carInterval;
//   document.getElementById('level').innerText = "2";
// }

// function levelThree () {
//   clearInterval(zombieInterval);
//   clearInterval(coinInterval);
//   clearInterval(carInterval);
//   zombieInterval = setInterval(createZombie, 2500); //2500 creates a new Zombie every 2.5 seconds
//   zombieSpeed += 1; //Zombie speed increased by 1 pixel per frame
//   coinInterval = setInterval(createCoins, 7000); //coins generated every 7 secs
//   carInterval = setInterval(createCars, 7500);
//   document.getElementById('level').innerText = "3";
// }

// function levelFour () {
//   clearInterval(zombieInterval);
//   zombieInterval = setInterval(createZombie, 2000);
//   coinInterval;
//   coinSpeed += 1;
//   clearInterval(carInterval);
//   setInterval(createCars, 5000); //vehicle generated every 5 secs
//   carSpeed += 1;
//   document.getElementById('level').innerText = "4";
// }

// function levelFive () {
//   clearInterval(zombieInterval);
//   clearInterval(coinInterval);
//   clearInterval(carInterval);
//   zombieInterval = setInterval(createZombie, 1500);
//   zombieSpeed += 1;
//   coinInterval = setInterval(createCoins, 10000);
//   coinSpeed += 1;
//   carInterval = setInterval(createCars, 3000);
//   carSpeed += 1;
//   document.getElementById('level').innerText = "5";
// }



function endGame() {
  backgroundMusic.stop();
  dogWhimper.play();
  //init();
}

function init() {
  //level = 1;
  //points = 0 
  //window.location.reload()
  startGame()
}


/*----------------------------------User--------------------------------------*/


var user = {
  x: 200,  //initializes user on x axis
  y: 540,  //initializes use on y axis        
  moveLeft:  function() { this.x -= 20 },  // how much each keypress will move
  moveRight: function() { this.x += 20 } ,  //left or right
  width: 32,
  height: 55,
}

var img = new Image();
img.onload = function() { 
  ctx.drawImage(img, user.x, user.y, 32, 55); 
}
img.src = "./IMG/user/ruffStill.png";

/*--------------------------User Boundaries------------------------------------------*/

document.onkeydown = function(e) {
  if(user.x < 70){
    switch (e.keyCode) {
      case 39: user.moveRight(); 
      break;
    }
  }
  else if(user.x > 310){
    switch (e.keyCode) {
      case 37: user.moveLeft(); 
      break;
    }
  }
  else{
    switch (e.keyCode) {
      case 37: user.moveLeft();   
      break;
      case 39: user.moveRight(); 
      break;
    }
  }
}

/*----------------------------------Functionality--------------------------------------*/

//Sets default y of 0 and increases by 2 
//This is what causes the zombies/objects to move down the canvas
var y = 0;


//generates a random x point at which zombies/obstacles spawn
function generateX(){
  return Math.floor(Math.random()*250) + 57;
}

function generateRandomSound(){
  return Math.floor(Math.random () * zombieSounds.length);
}

/*-------------------------------------Audio------------------------------------------*/
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

let backgroundMusic = new sound("./audio/Anonymous420_-_02_-__startup_nation.mp3");
let coinSound = new sound("./audio/coin (online-audio-converter.com).mp3");
let carSound = new sound('./audio/car- (online-audio-converter.com).mp3');
let splatSound = new sound("./audio/splat.wav");
let dogWhimper = new sound('./audio/dog-hurt1.mp3');
let dogBark = new sound('./audio/bark12.mp3');

//initializing zombie sounds to be declared in array
let zombie1;
let zombie2;
let zombie3;
let zombie4;

let zombieSounds = [
  zombie1 = new sound("./audio/zombie/Minecraft-zombiehurt2.mp3"),
  zombie2 = new sound("./audio/zombie/Hunter_Death_04.mp3"),
  zombie3 = new sound("./audio/zombie/become_enraged07.mp3"),
  zombie4 = new sound("./audio/zombie/become_enraged09.mp3"),
];

//Solution below required a third party API from https://p5js.org/examples/sound-preload-soundfile.html
// let backgroundMusic;

// function preLoad(){
//   backgroundMusic = loadSound("./audio/Anonymous420_-_02_-__startup_nation.mp3");
//   backgroundMusic.setVolume(0.5);
// }

// preLoad();

/*--------------------------------------Zombies-----------------------------------------*/

class Zombie {
  constructor(x){
    this.x = x;
    this.y = -43;
    this.width = 40.4;
    this.height = 43;
  }
}

let zombies = [];
let zombieSpeed = 2;

var imgZombie = new Image();
imgZombie.src = "./IMG/zombie/zombieIdleCrop.png";

function createZombie(){
  let obs = {
    x:50,
    y:-43,
  }
  zombies.push(new Zombie(generateX(), 200));
  zombieSounds[generateRandomSound()].play(); 
}



/*drawZombies function will control how 
quickly zombies approach (default is moving 2 spaces on y axis). This can also be set
to a variable that can change based on difficulty, along with setInterval*/

function drawZombies() {
  for(var i = 0; i<zombies.length; i++){
    zombies[i].y += zombieSpeed;   //Defines speed of the zombies
    ctx.drawImage(imgZombie, zombies[i].x,zombies[i].y, 40.4, 43);
    //checkCollision
    if (getDistance (user, zombies[i])) {    //if less than the addition of half the width of user + obstacle
      console.log('collision')

      zombieSounds[generateRandomSound()].play();
      game.score = 0;
      game.level = 1;
console.log(game.score)
      //endGame();
      // alert('You let Ruff get killed! You son of a bitch!!!');
    } 
  }
}

/*----------------------------------Cars----------------------------------*/
class Cars {
  constructor(x){
    this.x = x;
    this.y = -148;
    this.width = 80;
    this.height = 148;
  }
}

let cars = [];
let carSpeed = 5;

var imgCars = new Image();
imgCars.src = "./IMG/obstacles/JeepCrop.png";

function createCars(){
  let obs = {
    x:50,
    y:-148,
  }
  cars.push(new Cars(generateX(), 200));
  carSound.play();
}



/*drawCoins function will control how 
quickly coins approach (default is moving 2 spaces on y axis). This can also be set
to a variable that can change based on difficulty, along with setInterval*/

function drawCars() {
  for(var i = 0; i<cars.length; i++){
    cars[i].y += carSpeed; //defines speed of the car
    ctx.drawImage(imgCars, cars[i].x,cars[i].y, 80, 148)  //width and height are last 2
    if (getDistance (user, cars[i])) {    //if less than the addition of half the width of user + obstacle
      splatSound.play();
      endGame();
      alert('You let Ruff get run over! You son of a bitch!!!');
    } 
    //checkCollision(cars[i])
  }
}



/*----------------------------------Coins----------------------------------*/
class Coins {
  constructor(x){
    this.x = x;
    this.y = 0;
    this.width = 20;
    this.height = 20;
  }
}

let coins = [];
let coinSpeed = 4;

var imgCoins = new Image();
imgCoins.src = "./IMG/Coins/GoldCoinSprite/coinSpriteSheet.png";
//imgCoins.src = "./IMG/Coins/GoldCoinSprite/Coin1.png";

function createCoins(){
  let obs = {
    x:50,
    y:0
  }
  coins.push(new Coins(generateX(), 200));
}

let coinsCollected = 0;

/*drawCoins function will control how 
quickly coins approach (default is moving 2 spaces on y axis). This can also be set
to a variable that can change based on difficulty, along with setInterval*/
function drawCoins() {
  for(let i = 0; i<coins.length; i++){
    coins[i].y += coinSpeed;
    //ctx.drawImage(imgCoins, sx, 0, 30, 30, coins[i].x,coins[i].y, 20, 20)  //width and height are last 2
     ctx.drawImage(imgCoins, coins[i].x,coins[i].y, 20, 20)  //width and height are last 2
    //checkCollision(coins[i])
    if (getDistance (user, coins[i])) {    //if less than the addition of half the width of user + obstacle ----- item radius
      coinSound.play();
      coinsCollected += 1;
      coins.shift();          //removes coin from s
      break;
    } 
  }
}


/*--------------------------Animation-------------------------------------------------*/
let frames = 0;
let highScore = 0;
// let score = 0;

function animate(game){
  let score= Math.floor(frames/5) + (100 * coinsCollected);    //The intention is to add 100 score to the score for every point collected 
  levelUp(score)
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawZombies();
  drawCoins(coins[1]);
  drawCars(cars[1]);
  ctx.drawImage(img, user.x, user.y, 32, 55); 
  window.requestAnimationFrame(animate);
  
  frames += 1;

  document.getElementById('score').innerText = score ;
  document.getElementById('coinsCollected').innerText = coinsCollected;
  if (score > highScore) {
    document.getElementById('highScore').innerText = score;
  }
  game.score = score;
  //console.log('this is the score', game.score)
  console.log(frames);


}



/*--------------------------Testing Crash/Stop function--------------------------------*/
function getDistance(user, obstacles) {
  if (obstacles.x < user.x + user.width &&
    obstacles.x + obstacles.width > user.x &&
    obstacles.y < user.y + user.height &&
    obstacles.y + obstacles.height > user.y) {
       return true;
    }

// function getDistance (user, zombies) {
//   let xDistance = zombies.x - user.x;
//   let yDistance = zombies.y - user.y;
//   let takeAPyth = Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));

//   return takeAPyth;
// }
// collision detected!
}

// function checkCollision(obstacles){
//   //if(obstacle.y > 475 && obstacle.x ){

//     if(
//       obstacles.y + 40 == 470 // the obstacle is low enough to hit the user
//       && ((user.x >= obstacles.x  //the obstacle is further to the left then the user
//       && user.x <= obstacles.x + obstacles.width) // the obstacles is further to the right then the user 
//       || (user.x + 40 >= obstacles.x // the obstacles[1] is hitting the left side of the user 
//       && user.x + 40<= obstacles.x + obstacles.width))) //the obstacles is hitting the right side of the user
      
//       {
//              alert("Watch where you're going!!");
//     console.log('obs is about to pass user')
//   }
// }
    
//     if(
//       obstacles[1].y + 40 == 540 // the obstacle is low enough to hit the user
//       && ((user.x >= obstacles[1].x  //the obstacle is further to the left then the user
//       && user.x <= obstacles[1].x + obstacles[1].width) // the obstacles is further to the right then the user 
//       || (user.x + 50 >= obstacles[1].x // the obstacles[1] is hitting the left side of the user 
//       && user.x + 50<= obstacles[1].x + obstacles[1].width))) //the obstacles is hitting the right side of the user
      
//       {
//              alert("Watch where you're going!!");
//     //console.log('obs is about to pass car')
//   }
// }

// if (Zombie.y === user.y && (Zombie.x === user.x)){
//   function stop () {

//  }
// }



/*--------------------------Not Currently Used--------------------------------*/
// let update = () => {
//   setInterval(updateCanvas, 1000);
//   update();
// }


// function updateCanvas() {
//   ctx.clearRect(0,0,1500,1700);
//   draw(user);
// }

// let clearedObstacles = 0;
// let points = clearedObstacles * 5;

// if (Obstacle.y > window.height - 40) {
//   $('#score').text("Score: " + points);
//   console.log(points);
// 