var player,fundo;
var fundoImg,playerImg;
var car,police1,police2;
var pol1Group, pol2Group, carGroup;

var carImg;
var pol2Img;
var pol1Img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver, restart;

function preload(){
 fundoImg = loadImage("Road.png");
 playerImg = loadAnimation("ladrao.png","ladrao_run2.png");
 carImg = loadImage("carro.png");
 pol1Img = loadImage("police.png");
 pol2Img = loadImage("police2.png");
 gameOverImg = loadImage("fimdejogo.png");
}

function setup() {
 
 createCanvas(1000,400);
 fundo=createSprite(100,150);
 fundo.addImage("fundoImg",fundoImg);
 fundo.velocityX = -5;

 player = createSprite(100,160);
  player.scale=0.9;
  player.addAnimation("playerImg",playerImg);

 fimdejogo = createSprite(650,150);
 fimdejogo.addImage("gameOverImg",gameOverImg);
 fimdejogo.scale = 0.8;
 fimdejogo.visible = false;  

 pol1Group = new Group();
 pol2Group = new Group();
 carGroup = new Group();
}

function draw() {
 background(0);
  
 drawSprites();
    
 if(gameState===PLAY){

  player.y = World.mouseY;
    
 edges= createEdgeSprites();

 if(fundo.x < 0 ){
    fundo.x = width/2;
  }
  var select_police = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_police == 1) {
      criarPolice2();
    } else if (select_police == 2) {
      criarPolice1();
    } else {
      criarCarro();
    }
  }
  if(pol1Group.isTouching(player)){
    gameState = END;
    pol1Group.velocityY = 0;
   }
   if(pol2Group.isTouching(player)){
    gameState = END;
    pol2Group.velocityY = 0;
   }
   if(carGroup.isTouching(player)){
    gameState = END;
    carGroup.velocityY = 0;
   }
}
   else if (gameState === END) {
    fimdejogo.visible = true;

    fundo.velocityX = 0;
    player.velocityY = 0;

    carGroup.VelocityXEach(0);
    carGroup.LifetimeEach(-1);
    carGroup.destroyEach();

    pol2Group.VelocityXEach(0);
    pol2Group.LifetimeEach(-1);
    pol2Group.destroyEach();

    pol1Group.VelocityXEach(0);
    pol1Group.LifetimeEach(-1);
    pol1Group.destroyEach();
 }
}
function criarCarro(){
    car =createSprite(1100,Math.round(random(50, 250)));
    car.scale =0.2;
    car.lifetime = 170;
    carGroup.add(car);
    car.velocityX = -6;
    car.addImage("carImg", carImg);
}

function criarPolice1(){
    police1 =createSprite(1100,Math.round(random(50, 250)));
    police1.scale =0.3;
    police1.lifetime = 170;
    pol1Group.add(police1);
    police1.velocityX = -6;
    police1.addImage("pol1Img", pol1Img);
}

function criarPolice2(){
    police2 =createSprite(1100,Math.round(random(50, 250)));
    police2.scale =0.5;
    police2.lifetime = 170;
    pol2Group.add(police2);
    police2.velocityX = -6;
    police2.addImage("pol2Img", pol2Img);
}


