var p1,p2,zombieImage1,zombieImage2,zombieImage3;
var zombie;
var shooter, shooterImage;
var blast,blastImage,ground,backgroundImage;
var laserImage;
var shoot = 0;
var score = 0;
var laser,zombieGroup,laserGroup;
var explosionSound,laserSound,explosionImage;
var instruction = 0;
var play = 1;
var end = 2;
var gameState = instruction;
var endline,canvas;
function preload() {
  
  backgroundImage = loadImage("background.jpg");
  zombieImage = loadImage("zombie.png");
  shooterImage = loadImage("shooter.png");
  laserImage = loadImage("laser.png");
  zombieImage1 = loadImage("zombie.png");
  zombieImage2 = loadImage("zombie2.png");
  zombieImage3 = loadImage("zombie3.png");
  blastImage = loadImage("blast.png");
  explosionImage = loadImage("blast.png");
  explosionSound = loadSound("explosion.mp3");
  laserSound = loadSound("laser sound.mp3");
}

function setup() {  
  canvas = createCanvas(1000,700);
  ground = createSprite(1000,400,1000,700);
  ground.addImage(backgroundImage);
  ground.velocityX = (5 + score/10);
  ground.scale = 3;

  shooter = createSprite(250,600);
  shooter.addImage(shooterImage);
  shooter.scale = 0.6;
  
  p1 = createSprite(250,600);
  //p1.debug = true;
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  //p2.debug = true;
  p2.visible = false;
  
  zombieGroup = new Group;
  laserGroup = new Group;
  
  endline = createSprite(250,700,500,5);
  endline.visible = false;
}

function draw() {
  background(0);

  if(gameState === play) {
    // console.log(frameCount);
    
    if(ground.x > 800) {
      ground.x = 300;
    }
    
    shoot = shoot - 1;

    if(keyDown("space") && shoot < 460) {
      laser = createSprite(shooter.x,shooter.y - 130);
      laser.addImage(laserImage);
      laser.velocityX = -8; 
      laser.scale = 0.7;
      laserGroup.add(laser);
      laserSound.play();
      //console.log(laser.x);
      shoot = laser.y;
    }  

    if(keyDown("UP_ARROW") && shooter.x < 1400) {
      shooter.y = shooter.y + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("DOWN_ARROW") && shooter.x > 50) {
      shooter.y = shooter.y - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }

    if(keyDown("LEFT_ARROW") && shooter.x < 1400) {
      shooter.x = shooter.x + 10;
      p1.x = p1.x + 10;
      p2.x = p2.x + 10;
    }

    if(keyDown("RIGHT_ARROW") && shooter.x > 50) {
      shooter.x = shooter.x - 10;
      p1.x = p1.x - 10;
      p2.x = p2.x - 10;
    }
    
    if(zombieGroup.isTouching(p2) || zombieGroup.isTouching(p1)) {
      zombieGroup.destroyEach();
      var blast = createSprite(shooter.x,shooter.y - 50);
      blast.addImage(blastImage);
      blast.lifetime = 25;
      explosionSound.play();
      shooter.destroy();
      gameState = end;
    }
    
    if(zombieGroup.isTouching(laserGroup)) {
      zombieGroup.destroyEach();
      laserGroup.destroyEach();
      explosionSound.play();
      score = score + 1;
    }

    zombies();
    drawSprites();
    
    stroke("white");
    fill("white");
    textSize(30);
    text("score : " + score,210,60)
    
    if(zombieGroup.isTouching(endline)) {
      zombieGroup.destroyEach();
      gameState = end;
    }
    
  }
  else if(gameState === end) {
    ground.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(40);
    text("GAME OVER!",canvas.width/2-400,canvas.height/2);
    text("The zombies destroyed the planet",canvas.width/2-400,canvas.height/2+100);
    text("Your final score:"+score,canvas.width/2-400,canvas.height/2+200);

    
  }


  if(gameState === instruction) {
    stroke("white");
    fill("white");
    textFont("trebuchetMS")
    textSize(50);
    text("------Shoot the Zombies------",canvas.width/2-300,canvas.height/2-300);
    text("ENJOY THE GAME!",canvas.width/2-300,canvas.height/2+100);
    stroke("yellow");
    fill("yellow");
    textSize(35);
    textFont("Apple Chancery");
    text("In the near future .....",canvas.width/2-300,canvas.height/2-250);
    text(" Some zombies will be coming .",canvas.width/2-300, canvas.height/2 - 210);
    text("  To take over Earth",canvas.width/2-300,canvas.height/2-170);
    text("  Help the people and Earth !",canvas.width/2-300,canvas.height/2-130);
    text("  press 'space' to shoot.",canvas.width/2-300,canvas.height/2-90);
    text("  use right and left arrows to move.",canvas.width/2-300,canvas.height/2-50);
    text("  press 's' to start game.",canvas.width/2,canvas.height/2-10);
    
    if(keyDown("s")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
  }
}
  

function zombies() {
  if(frameCount % 110 === 0) {
  
    var zombie = createSprite(50,600,50,50);
    
    zombie.velocityX = (6 + score/10);
    zombie.lifetime = 200;
    zombie.scale = random(0.4,0.5);
    //zombie.debug = true;

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: zombie.addImage(zombieImage1);
              zombie.setCollider("circle",-80,10,160);
              break;
      case 2: zombie.addImage(zombieImage2);
              zombie.setCollider("circle",50,0,150);
              break;
      case 3: zombie.addImage(zombieImage3);
              zombie.setCollider("circle",0,0,170)
      default: break;
    }
    

    //console.log(zombie.x);
    zombieGroup.add(zombie);
  }
}