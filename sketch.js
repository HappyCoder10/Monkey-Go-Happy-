var bananaImage;
var obstacleImage;
var obstacleGroup;
var background;
var score;
var player, survivalTime, bananaGroup, obstacleGroup;
  //initiate Game STATES
var PLAY = 1;
var END = 0;
var gameState = PLAY;
  
//Create the Banana score
  var count = 0;
  
//Create the ground
  var ground;
  

function preload() {
  backImage = loadImage("jungle.png");
  player_running = 
  loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  

}
function setup () {
createCanvas(400,400);
//Create the monkey
  player = createSprite(100,340,20,50);
  player.addAnimation("a",player_running);
 player.scale = 0.1;
  ground = createSprite(200,350,800,10);
  
  //Create the survival time
  survivalTime = 0;
  //Create the obstacle and banana group
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background("green");
  
  if(gameState === PLAY){
    
    //Make the ground repeat
    ground.velocityX = -4;
    ground.x = ground.width/2;
    //ground.visible = false;
  
    //Make the monkey jump
    if(keyDown("space")){
     player.velocityY = -12;
    }
    
    //Add the gravity
    player.velocityY = player.velocityY + 0.8;
  
    survivalTime = survivalTime+Math.round(World.frameRate/60);
  
    //Add the fruit scores
    if (bananaGroup.isTouching(player)) {
      count = count + 2;
      bananaGroup.destroyEach();
    }
  
    switch (count) {
      case 10: player.scale = 0.12;
                break;
      case 20: player.scale = 0.14;
                break;
      case 30: player.scale = 0.16;
                break;
      case 40: player.scale = 0.18;
                break;
      default: break;
    }
    
    if (obstacleGroup.isTouching(player)){
      gameState=END;
    }
    food ();
    obstacles ();
  }
  else if(gameState === END) {
    player.scale = 0.1;
    ground.velocityX=0;
    player.velocityY=0;
    //player.setAnimation("green");
    //player.scale=0.3;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  //Collide the monkey with the ground
  player.collide(ground);

  drawSprites();
  //Make the survival time visible  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime,100,50); 
  text("Banana Score: " + count, 100,150);
}

//Create the food function
function food () {
  if (frameCount % 80 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;

    //Assign lifetime to the variable
    banana.lifetime = 134;
    
    //Add each banana to the group
    bananaGroup.add(banana);
  }
}

//Create the obstacle function
function obstacles (){
  if (frameCount % 300 === 0) {
    var stone = createSprite(400,340,40,10);
    stone.addImage(obstacleImage);
    stone.scale = 0.1;
    stone.velocityX = -3;

    //Assign lifetime to the variable
    stone.lifetime = 134;
    
    //Add each banana to the group
    obstacleGroup.add(stone);
  } 
}
