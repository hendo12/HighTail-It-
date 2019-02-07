window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    startGame();
  };
};

var canvas = document.getElementById("board");
var ctx = canvas.getContext("2d");

function startGame() {
  backgroundMusic.play();
  dogBark.play();
  window.cancelAnimationFrame(anime);
  animate();
  levelUp();
}

function endGame() {
  //backgroundMusic.stop();
  dogWhimper.play();
  init();
}

function init() {
  setTimeout(startGame, 1000);
  alert("Ruff was killed! Press 'OK' or the 'ENTER' button to try again!");
  document.getElementById('level').innerText = "1";
  frames = 0;
  points = 0;
  document.getElementById('score').innerText = 0;
  user.x = 255;
  user.y = 630;
  coinsCollected = 0;
  emptyObstacleArrays(zombies, cars, coins); 
  resetObstacleSpeed();
  clearAllIntervals();
}

function resetObstacleSpeed () {
  coinSpeed = 4;
  zombieSpeed = 2;
  carSpeed = 5;
}

function emptyObstacleArrays (zombies, cars, coins) {
  zombies.length = 0;
  cars.length = 0;
  coins.length = 0;
}

let level = 0;
function levelUp(points){
  if (points <= 150 && level !=1 && points != 0) {
    levelOne();
    level = 1; 
  } else if (points > 150 && points <= 300 && level !=2) {
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
  } else if (points > 900 && points <= 1000  && level != 6) {
    levelSix();
    level = 6
  } else if (points > 1000 && points <= 1100  && level != 7) {
    levelSeven();
    level = 7
  } else if (points > 1100 && points <= 1200  && level != 8) {
    levelEight();
    level = 8
  } else if (points > 1200 && points <= 1300  && level != 8) {
    levelEight();
    level = 8
  } else if (points > 1300 && points <= 1400  && level != 9) {
    levelNine();
    level = 9
  } else if (points > 1400 && points <= 1500  && level != 10) {
    levelTen();
    level = 10
  } else if (points == 1500) {
    alert('Great job! Ruff survived the apocalypse with your help!')
  }
}

let carInterval;
let zombieInterval 
let coinInterval;

function zombieCoinInt (zombieTime, coinTime, carTime) {
  zombieInterval = setInterval(createZombie, zombieTime); //3000 creates a new Zombie every 3 seconds.
  coinInterval = setInterval(createCoins, coinTime); //coins generated every 5 secs
  carInterval = setInterval(createCars, carTime); //vehicle generated every 10 secs
}

function clearAllIntervals (){
  clearInterval(zombieInterval);
  clearInterval(coinInterval);
  clearInterval(carInterval);
}

function levelOne () {              //Level one has zombies and coins, but no cars
  zombieCoinInt(2250,5000,10000);
  clearInterval(carInterval);
  document.getElementById('level').innerText = "1";
}

function levelTwo () {            //Level two has zombies, coins, and cars
  clearAllIntervals();
  zombieCoinInt(2250,5000,10000);
  document.getElementById('level').innerText = "2";
}

function levelThree () {          //Level three has zombies and cars generating faster, while coins are generating slower. Zombies also get faster.
  clearAllIntervals();
  zombieCoinInt(2250,5000,7500);
  zombieSpeed += 1; //Zombie speed increased by 1 pixel per frame
  document.getElementById('level').innerText = "3";
}

function levelFour () {           //Level 4 has has zombies and cars generating faster again. Both coins and cars get faster. 
  clearAllIntervals();
  zombieCoinInt(2000, 7000, 7500);
  coinSpeed += 1;
  document.getElementById('level').innerText = "4";
}

function levelFive () {            //Level 5 has zombies and cars generating even faster, while coins are generating even slower. All obstacles increase speed again.
  clearAllIntervals();
  zombieCoinInt(2000, 7000, 6500);
  carSpeed += 1;
  document.getElementById('level').innerText = "5";
}

function levelSix () {            //Level 5 has zombies and cars generating even faster, while coins are generating even slower. All obstacles increase speed again.
  clearAllIntervals();
  zombieCoinInt(1625, 7000, 6500);
  document.getElementById('level').innerText = "6";
}

function levelSeven () {            //Level 5 has zombies and cars generating even faster, while coins are generating even slower. All obstacles increase speed again.
  clearAllIntervals();
  zombieCoinInt(1625, 8500, 5500);
  document.getElementById('level').innerText = "7";
}

function levelEight () {            //Level 5 has zombies and cars generating even faster, while coins are generating even slower. All obstacles increase speed again.
  clearAllIntervals();
  zombieCoinInt(1225, 8500, 5000);
  zombieSpeed += 1; //Zombie speed increased by 1 pixel per frame
  document.getElementById('level').innerText = "8";
}

function levelNine () {            //Level 5 has zombies and cars generating even faster, while coins are generating even slower. All obstacles increase speed again.
  clearAllIntervals();
  zombieCoinInt(1225, 9500, 4000);
  coinSpeed += 1;
  carSpeed += 1;
  document.getElementById('level').innerText = "9";
}

function levelTen () {            //Level 5 has zombies and cars generating even faster, while coins are generating even slower. All obstacles increase speed again.
  clearAllIntervals();
  zombieCoinInt(1000, 10000, 2500);
  zombieSpeed += 1;
  coinSpeed += 1;
  carSpeed += 1;
  document.getElementById('level').innerText = "10";
}

/*----------------------------------User--------------------------------------*/

var user = {
  x: 255,  //initializes user on x & y axis
  y: 630,        
  moveLeft:  function() { this.x -= 20 },  // how much each keypress will move
  moveRight: function() { this.x += 20 } ,  //left or right
  moveUp:  function() { this.y -= 20 },
  moveDown:  function() { this.y += 20 },
  width: 32,
  height: 55,
}
const userWidth = 32;


var img = new Image();
img.src="./IMG/user/ruffAnimationSlide.png";
//img.src = "./IMG/user/ruffStill.png";

img.onload = function() { 
  ctx.drawImage(img, srcXUser, srcY, 32, 65, user.x, user.y, 32, 55);
  //ctx.drawImage(img, user.x, user.y, 32, 55); 
}

/*--------------------------User Boundaries & Movement------------------------------------------*/

document.onkeydown = function(e) {
  if(user.x < 70){
    switch (e.keyCode) {
      case 38: user.moveUp();
      case 39: user.moveRight(); 
      case 40: user.moveDown();
      break;
    }
  }
  else if (user.x > 460){
    switch (e.keyCode) {
      case 37: user.moveLeft(); 
      case 38: user.moveUp();
      case 40: user.moveDown();
      break;
    }
  }
  else if (user.y < 55) {
    switch(e.keycode) {
      case 37: user.moveLeft();
      case 39: user.moveRight(); 
      case 40: user.moveDown();
      break;
    }
  }
  else if (user.y > 740) { 
    switch(e.keycode) {
      case 37: user.moveLeft();
      case 38: user.moveUp();
      case 39: user.moveRight(); 
      break;
    }
  }
  else{
    switch (e.keyCode) {
      case 37: user.moveLeft();   
      break;
      case 38: user.moveUp(); 
      break;
      case 39: user.moveRight(); 
      break;
      case 40: user.moveDown();
      break;
    }
  }
}

// document.onkeydown = function(e) {
//   if(user.x < 70){
//     switch (e.keyCode) {
//       case 39: user.moveRight(); 
//       break;
//     }
//   }
//   else if(user.x > 310){
//     switch (e.keyCode) {
//       case 37: user.moveLeft(); 
//       break;
//     }
//   }
//   else{
//     switch (e.keyCode) {
//       case 37: user.moveLeft();   
//       break;
//       case 39: user.moveRight(); 
//       break;
//     }
//   }
// }

/*----------------------------------Functionality--------------------------------------*/

//generates a random x point at which zombies/obstacles spawn
function generateX(){
  return Math.floor(Math.random()*420) + 57;
}

function generateRandomSound(){
  return Math.floor(Math.random () * zombieSounds.length);
}

function getDistance(user, obstacles) {
  if (obstacles.x < user.x + user.width &&
    obstacles.x + obstacles.width > user.x &&
    obstacles.y < user.y + user.height &&
    obstacles.y + obstacles.height > user.y) {
       return true;
    }
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

/*--------------------------------------Zombies-----------------------------------------*/

class Zombie {
  constructor(x){
    this.x = x;
    this.y = -43;
    this.width = 65;
    this.height = 60;
  }
}

let zombies = [];
let zombieSpeed = 2;
const zombieHeight = 293;
const zombieWidth = 10914/17;

var imgZombie = new Image();
imgZombie.src = "./IMG/zombie/move/spritesheet.png";

function createZombie(){
  let obs = {
    x:50,
    y:-43,
  }
  zombies.push(new Zombie(generateX(), 200));
  zombieSounds[generateRandomSound()].play(); 
}

function drawZombies() {
  for(var i = 0; i<zombies.length; i++){
    zombies[i].y += zombieSpeed;   //Defines speed of the zombies
    ctx.drawImage(imgZombie, srcX2, srcY, 311, 298, zombies[i].x,zombies[i].y, 65, 60);
    if (getDistance (user, zombies[i])) {    //if less than the addition of half the width of user + obstacle
      zombieSounds[generateRandomSound()].play();
        endGame();
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

function drawCars() {
  for(var i = 0; i<cars.length; i++){
    cars[i].y += carSpeed; //defines speed of the car
    ctx.drawImage(imgCars, cars[i].x,cars[i].y, 80, 148)  //width and height are last 2
    if (getDistance (user, cars[i])) {    //if less than the addition of half the width of user + obstacle
      splatSound.play();
      endGame();
    } 
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

const coinWidth = 40;
let coins = [];
let coinSpeed = 4;
let coinsCollected = 0;

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

function drawCoins() {
  for(let i = 0; i<coins.length; i++){
    coins[i].y += coinSpeed;
    ctx.drawImage(imgCoins, srcX, srcY, 40, 30, coins[i].x,coins[i].y, 20, 20);
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
let anime;
let currentFrame = 0;
let currentZombieFrame = 0;
let currentUserFrame = 0;
let coinFrames = 6;
let zombieFrames = 17;
let userFrames = 4;
let srcX;
let srcX2;
let srcXUser;
let srcY;

function updateFrame(framez, width) {
  currentFrame = ++currentFrame % framez;
  srcX = currentFrame * width;
  srcY = 0;
}

function updateZombieFrame(framez2, width2) {
  currentZombieFrame = ++currentZombieFrame % framez2;
  srcX2 = currentZombieFrame * width2;
  srcY = 0;
}

function updateUserFrame(framez3, width3) {
  currentUserFrame = ++currentUserFrame % framez3;
  srcXUser = currentUserFrame * width3;
  srcY = 0;
}

function animate(game){
  let score = Math.floor(frames/5) + (100 * coinsCollected);    //The intention is to add 100 score to the score for every point collected 
  levelUp(score);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  updateUserFrame(userFrames, userWidth);
  updateZombieFrame(zombieFrames, zombieWidth);  //animate zombies
  updateFrame(coinFrames, coinWidth);   //animate coins
  drawZombies();
  drawCoins(coins[1]);
  drawCars(cars[1]);
  ctx.drawImage(img, user.x, user.y, 32, 55); 
  anime = window.requestAnimationFrame(animate);
  frames += 1;
  document.getElementById('score').innerText = score ;
  document.getElementById('coinsCollected').innerText = coinsCollected;
  if (score > highScore) {
    document.getElementById('highScore').innerText = score;
    highScore = score;
  }
  points = score;
}