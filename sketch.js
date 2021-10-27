var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"



function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost=createSprite(300,300,10,10)
  ghost.addImage(ghostImg)
  ghost.scale=0.4

  doorsGroup=new Group()
  climbersGroup=new Group()
  iclimbersGroup=new Group()
  
}

function draw() {
  background("black");
  
 
    if(gameState=="play"){
      if(tower.y > 400){
        tower.y = 300
      }
  
      ghost.velocityY=ghost.velocityY+1
  
      if(keyDown("space")){
        ghost.velocityY=-5
      }
      if(keyDown("right")){
        ghost.x=ghost.x+5
      }
      if(keyDown("left")){
        ghost.x=ghost.x-5
      }
      if(ghost.isTouching(climbersGroup)){
        ghost.velocityY=0
      }
      if(ghost.isTouching(iclimbersGroup)){
        ghost.destroy()
        gameState="end"
  
      }
      spawnDoors()

    drawSprites()

    }
    if(gameState=="end"){
      textSize(30)
      text("gameOver",300,300)
      

    }



    
}
function spawnDoors(){
  if(frameCount%200==0){
    var door = createSprite(random(100,500),0,10,10)
    door.addImage(doorImg)
    door.velocityY=2
    door.lifetime=600
    doorsGroup.add(door)


    var climber = createSprite(door.x,70,10,10)
    climber.addImage(climberImg)
    climber.velocityY=2
    climber.lifetime=600
    climbersGroup.add(climber)


   var iclimber = createSprite(door.x,80,100,10)
        iclimber.velocityY=2
    iclimber.lifetime=600
    iclimbersGroup.add(iclimber)
    iclimber.visible=false

    door.depth=1
    climber.depth=2
    ghost.depth=3

  }
}