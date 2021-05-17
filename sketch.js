PLAY = 1;
END = 0;
var gameState = 1;

var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving" ,monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  console.log(ground.x); 
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background("lightgreen");
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+ survivalTime,100,50);
  
  if (keyDown("space") && monkey.y >307){
      monkey.velocityY = -13;
  }
  
  monkey.velocityY = monkey.velocityY +0.5;
  monkey.collide(ground);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if (gameState === PLAY){
    
    if (monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    }
    
    spawnBananas();
    spawnObstacles();
  }
  
  if (gameState === END){
    
  }
   
  drawSprites();
}

function spawnBananas(){
  if (frameCount % 80 ===0){
    banana = createSprite(400,200,50,50);
    banana.addImage("banana",bananaImage);
    banana.scale = 0.1  ;
    banana.y = Math.round(random(120,200));
    banana.velocityX = -5;
    banana.lifetime = 82;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 200 ===0){
    obstacle = createSprite(400,315,40,20);
    obstacle.addImage("rock",obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX = -6;
    obstacle.lifetime = 70;
    
    obstacleGroup.add(obstacle);
  }
}