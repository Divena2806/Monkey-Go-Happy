//Global Variables
var player_running;
var bananaImage, bananaGroup
var obstacle_img, obstaclesGroup;
var backImage;

//score variables and groups
var score;

function preload(){
  backImage= loadImage("jungle.jpg");
  player_running= loadAnimation("Monkey_01.png","Monkey_02.png",  "Monkey_03.png", "Monkey_04.png",  "Monkey_05.png", "Monkey_06.png",  "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png")
  
  bananaImage= loadImage("Banana.png");
  obstacle_img= loadImage("stone.png");
} 
 
function setup() {
  createCanvas(600,300);
  
  background=createSprite(200,200,200,200);
  background.addImage(backImage);
  background.velocityX=-7;
  
  invisibleGround = createSprite(300, 305, 600, 10);
  invisibleGround.visible = false;
  
  monkey= createSprite(50, 270, 50, 50);
  monkey.addAnimation("player", player_running);
  monkey.scale=0.1;
  
  //create Obstacle and banana Groups
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw(){
  if (background.x <199){
   background.x = background.width/2;
  }
  
  //jump when the space key is pressed
  if(keyDown("space")&&monkey.y>=236){ 
    //console.log(monkey.y);
    monkey.velocityY = -12 ;
  }
  
  
  if(bananaGroup.isTouching(monkey)){ 
    bananaGroup.destroyEach(); 
    score = score + 2; 
  }
  
  switch(score){
    case 10: monkey.scale=0.12;
            break; 
    case 20: monkey.scale=0.14;
            break;
    case 30: monkey.scale=0.16;
            break;
    case 40: monkey.scale=0.18;
            break;
    default:break;
  }
    
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale=0.1;
    score=0;
  }
  

  
  //add gravity
  monkey.velocityY = monkey.velocityY + 0.75;
  monkey.collide(invisibleGround);
  
  obstacles(); 
  food();
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+score, 500, 50);
}

function food(){
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(400,350,40,10);
    banana.y = random(100,200);
    banana.addAnimation("banana", bananaImage);
    banana.scale=0.05;
    banana.velocityX=-5;
    banana.lifetime=80;  
    bananaGroup.add(banana);
  }
}
function obstacles(){
  if (World.frameCount % 300 === 0) {
    var obstacle = createSprite(400,280,40,10);
    obstacle.addAnimation("rock", obstacle_img);
    obstacle.scale=0.12;
    obstacle.velocityX=-5;
    obstaclesGroup.add(obstacle);
  }  
}
