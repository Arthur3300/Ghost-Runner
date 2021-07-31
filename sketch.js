var  tower, towerImg;
var doorImg, door, doorsGroup;
var climber, climberImg, climbersGroup;
var invisibleBlock, invisibleGroup;
var ghost, ghostImg;
var gameOver, overImg;
var restart, startImg;
var gameState = "PLAY";
var PLAY = 1;
var END = 0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  overImg = loadImage("gameOver.png");
  startImg = loadImage("restart.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,577);

  spookySound.loop();

  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleGroup = new Group();


  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.setCollider("circle", -25, 35, 60);
  ghost.debug = true;
  ghost.scale = 0.3;
  
  
  gameOver = createSprite(300,250);
  gameOver.addImage("end", overImg);
  gameOver.visible = false;
  gameOver.scale = 1;

  restart = createSprite(300,300);
  restart.addImage("start", startImg);
  restart.visible = false;
  restart.scale = 0.5;
}

function draw(){
  background(0);
  if (gameState === "PLAY") {

    if(keyDown("left_arrow") && ghost.x > 90){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow") && ghost.x < 520){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space") &&  ghost.y <= 577){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8;
    
    if(tower.y > 400){
      tower.y = 300;
    }
    spawnDoors();

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleGroup.isTouching(ghost) || ghost.y > 600 || ghost.y < 0){
      gameState = END;
    }
    
  } 
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    tower.velocityY = 0;
    ghost.velocityY = 0;
    ghost.y = 1000;
    doorsGroup.setVelocityYEach(0);
    climbersGroup.setVelocityYEach(0);
    invisibleGroup.setVelocityYEach(0);
    
    //set lifetime of the game objects so that they are never destroyed
    doorsGroup.setLifetimeEach(-1);
    climbersGroup.setLifetimeEach(-1);
    invisibleGroup.setLifetimeEach(-1);

    doorsGroup.destroyEach();
    invisibleGroup.destroyEach();
    climbersGroup.destroyEach();
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  drawSprites();

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    var rand
    rand = Math.round(random(120,400));

    door.x = rand
    climber.x = rand;
    invisibleBlock.x = rand;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleGroup.add(invisibleBlock);
  }
}

function reset(){
  gameState = "PLAY";
  gameOver.visible = false;
  restart.visible = false;

  ghost.x = 200;
  ghost.y = 200;
  tower.velocityY = 1;
  
}

