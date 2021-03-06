var backImage,backgr;
var player, player_running;
var ground,ground_img,bananaImg,obstacleImg;
var foodGroup;
var END =0;
var PLAY =1;
var gameState = PLAY;
var foodGroup,obstacleGroup;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg= loadImage("banana.png");
  obstacleImg= loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);

  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
      
  foodGroup = new Group();
  obstacleGroup= new Group();

}

function draw() { 

 
  background(0);

  if(gameState===PLAY){
    
    if(backgr.x<100){
      backgr.x=backgr.width/2;
    }
  
    if(keyWentDown("space")) {
      player.velocityY = -20;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score = score + 2;
      player.scale += +0.01;

    }
   
    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }
    spawnFood();
    spawnObstacles();
  }
  console.log(frameCount);
  drawSprites();
   if(gameState === END){
    backgr.velocityX = 0;
    player.visible = false;

    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
 
    textSize(25);
    fill(255);
    text("  GAME OVER!  ",300,220);
   
  }
 
 
  fill("white");
  text("SCORE : " + score,700,70);

}
function spawnFood(){
  if(frameCount % 80 === 0){
    var banana = createSprite(600,350,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImg);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}
function spawnObstacles(){
  if(frameCount % 120 === 0){
    var obstacle = createSprite(790,340,40,10);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;
    obstacle.velocityX = -4;
    obstacle.lifetime = 200;
    player.depth = obstacle.depth + 1;
    obstacleGroup.add(obstacle);
  
  }
}
