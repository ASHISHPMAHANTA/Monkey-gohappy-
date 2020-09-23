//for declareing the variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey,monkey_running;
var bananaImage,
    obstacle,ground, invisibleGround, stoneImage;
var bananaGroup, obstacleGroup,JungleImage;
var score,survivalTime;
var survivalTime= 0;

function preload(){
  //to preload the variables
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
  JungleImage = loadImage("Jungle.jpeg");
 
}

function setup() {
    createCanvas(windowWidth,windowHeight);
  
  ground = createSprite(width/2,height/2,width*10,20);
  ground.velocityX = -(2+3*survivalTime/10); 
  ground.addImage("Jungle",JungleImage);
  ground.scale = 1.2;
  

  //to create the sprites
   monkey = createSprite(width/10,height-100,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
 invisibleGround = createSprite(200,height,900,20);
  
  
//to create the groups
  bananaGroup = createGroup();
  stoneGroup = createGroup();

}

function draw() {
  //to give color to the background
background(220);
  
  if(gameState === PLAY){
  
   //jump when the space key is pressed
  if(touches.length >0||keyDown("space")&& monkey.y>height-50){
     monkey.velocityY = -12;
     }  
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
//to reset the ground
  if(ground.x<0){
  ground.x = ground.width-10;
     }
        
    stone();
    food();
    
    if(monkey.isTouching(stoneGroup)){
      gameState = END;
        
       }
    }
  
  //giving extra point when the monkey is touching the bananaGroup 
    if(monkey.isTouching(bananaGroup)){
    survivalTime = survivalTime+2;
    
  }
  
  //game state = end
  else if (gameState === END) {
  
  ground.velocity = 0;
    //to destroy the groups      
     stoneGroup.destroyEach();
      bananaGroup.destroyEach();
    frameCount = 0;
    monkey.destroy();
    //console.log(survivalTime);
///to show game over
    textSize(50);
    fill("red");
     text("GAME OVER",width/2-120,height/2);
  }
  
  //preventing the monkey to fall down
monkey.collide(invisibleGround);
  
  //to draw the sprites
  drawSprites();
  //to show the Survival time
  stroke("white");
  textSize(20);
  fill("white");
  text("score:",+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("green");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,width/2-20,height/2-150);
  
}

//function food
function food(){
  
  if (frameCount % 80=== 0) {
 //to create the banana
    var banana = createSprite(200,150,10,10);
    banana.y = Math.round(random(height-140,height-60));
    banana.addImage("banana",bananaImage);
    banana.scale =0.1;
    banana.velocityX= -2;
    banana.lifetime = 200;
     bananaGroup.add(banana);          
                              
}
}

function stone(){
  
  if(frameCount % 80 === 0) {
    //to create the sprites
 var stone = createSprite(width-50,height-30,20,20);
 stone.addAnimation("banana", stoneImage);
  stone.velocityX = -(6+3*survivalTime/10);
    stone.scale = 0.1;
    stone.lifetime = 300;
    
    stoneGroup.add(stone);
    
  }
}









