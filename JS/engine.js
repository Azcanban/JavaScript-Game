
  // map = two dimensional array
  var map = [
    [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,1,0,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    
  ];


  



  var frameTick = 0;
  var tileH = 35;
  var tileW = 35;
  var tileGraphics = [];
  var enemyList = [];
  var destroyEnemy =[];
  var bulletList = [];
  var enemyCounter = 3;
  var hp = 3;
  var score = 0;




var player = {
    x: (map.length*tileW)/2,
    y: map.length*tileH - 40,
    width: 30,
    height: 40,
    speed: 4,
  };










  function Enemy(id, x, y, speedX, speedY)
  {

    var enemy1 = {
      x: x,
      y: y,
      width: 30,
      height: 40,
      speedX: speedX,
      speedY: speedY,
      id: id,
    };
      enemyList.push(enemy1);
  }








function Bullet (id, x, y, speedX, speedY)
{

  var bullet1 = {
    x: x,
    y: y,
    speedX: speedX,
    speedY: speedY,
    width: 7,
    height: 15,
    id: id,
    timer: 0
  }
    bulletList.push(bullet1);
   
}




 





 function randomGeneratedEnemy()
 {
    var x = 300* Math.random();
    var y = 100 * Math.random();
    var id = Math.random();
    var speedX = (1+Math.random()*8) -4;
    var speedY = (1+Math.random()*8) -4;
    Enemy(id,x,y,speedX,speedY);

 }

  randomGeneratedEnemy();
  randomGeneratedEnemy();
  randomGeneratedEnemy();












 function generatedBullet()
 {
    var x = player.x + (player.width/2);
    var y = player.y;
    var id = Math.random();
    var speedX = 0;
    var speedY = 5;
    Bullet(id,x,y,speedX,speedY);
  }















//---------------------  COLISSION  -------------------------------------

function getDistanceBetweenEntity(rect1, rect2){
  return rect1.x <= rect2.x + rect2.width
      && rect2.x <= rect1.x + rect1.width
      && rect1.y <= rect2.y + rect2.height
      && rect2.y <= rect1.y + rect1.height;
}

function testCollisionEntity(entity1, entity2){
  var rect1 = {
    x: entity1.x,
    y: entity1.y,
    
    width: entity1.width,
    height: entity2.height
  };

   var rect2 = {
    x: entity2.x,
    y: entity2.y,
    width: entity2.width,
    height: entity2.height
  };

  return getDistanceBetweenEntity(rect1,rect2);
}

//---------------------------------------------------------------------------


  


  







  function loadImg() 
  {
    var tileGraphicsToLoad = ["image/sand.png", "image/gras.png", "image/char.gif", 
                              "image/enemy.png", "image/beams.png"];
    tileGraphicsLoaded = 0;

    for (var i = 0; i < tileGraphicsToLoad.length; i++) 
    {
      tileGraphics[i] = new Image();
      tileGraphics[i].src = tileGraphicsToLoad[i];
      tileGraphics[i].onload = function() 
      {
        tileGraphicsLoaded++;
        if (tileGraphicsLoaded === tileGraphicsToLoad.length) 
        {
          drawMap();
        }
      }   
    }
  }








  
 
  function drawMap() 
  {
    
    // canvas
    canvas.height = map.length*tileW;
    canvas.width = map[0].length*tileH;
    var ctx = document.getElementById('canvas').getContext('2d');

    var frameX = 0;
    var frameY = 335;
    var frameSizeX = 50;
    var frameSizeY = 90;
    var offset = 100;
    
    var drawTile;


    // looping the map one by one
    for (var i = 0; i < map.length; i++) 
    {
      for (var j = 0; j < map[i].length; j++) 
      {

        drawTile = map[i][j];
 
        ctx.drawImage(tileGraphics[drawTile], j*tileW, i*tileH ,tileH,tileW);
        ctx.drawImage(tileGraphics[2], frameX, frameY, frameSizeX, frameSizeY, player.x, player.y, player.width, player.height)

        if(39 in keysDown)
        {
          ctx.drawImage(tileGraphics[2], frameX, frameY + 3*offset, frameSizeX, frameSizeY, player.x, player.y, player.width, player.height);
        }

        if(37 in keysDown)
        {
          ctx.drawImage(tileGraphics[2], frameX, frameY + 2*offset, frameSizeX, frameSizeY, player.x, player.y, player.width, player.height);
        }

        if(38 in keysDown)
        {
          ctx.drawImage(tileGraphics[2], frameX, frameY + offset, frameSizeX, frameSizeY, player.x, player.y, player.width, player.height);
        }


        enemyList.forEach(function(enemy, i, arr )
        {
          ctx.drawImage(tileGraphics[3],0,20, 33,40, enemy.x, enemy.y, enemy.width , enemy.height);
        });
      
        bulletList.forEach(function(bullet, i, arr)
        {
          ctx.drawImage(tileGraphics[4],209, 138, 7, 15, bullet.x, bullet.y, bullet.width , bullet.height);
        });   
      }
    }

    ctx.font = '12pt Times';
    ctx.fillText("kill all enemies and survive", 160,15);
    ctx.font = '20pt Times';
    ctx.fillText(hp + "HP", 5, canvas.height-5);
    ctx.fillText( "Enemies: " + enemyCounter , 180,40);

    if(hp == 0)
    {
       ctx.fillText("GAME OVER", 175,canvas.height/2);
    }

    if(enemyCounter == 0)
    {
      ctx.fillText("YOU WIN", 190,170);
      ctx.fillText("YOUR SCORE: " + score, 170,220);
    }
  }



 
    








//----------------------------------------------------------------------------


var keysDown = {};
window.addEventListener('keydown', press);
window.addEventListener('keyup', release);


function press(e)
{
  keysDown[e.keyCode] = true;
}

function release(e)
{
  delete keysDown[e.keyCode];
}


//-----------------------------------------------------------------------------














function updateEntity(enemy)
{
   
    enemy.x += enemy.speedX;
    enemy.y += enemy.speedY;

    if(enemy.x > (map[0].length*tileW - enemy.width) || enemy.x < 0 ){
      enemy.speedX = -enemy.speedX;
    }

    if ( enemy.y > map.length*tileH - enemy.height || enemy.y < 0 ){
      enemy.speedY = -enemy.speedY;
    }

   
}








function updateBullet(bullet)
{
    bullet.x += bullet.speedX;
    bullet.y -= bullet.speedY;

}







function updatePlayer()
{
  
  if (37 in keysDown) 
  { //left
    player.x -= player.speed; 
    if( player.x < 0)
    {
      player.x += player.speed;
    }
  }

    if (38 in keysDown) 
    { //up
      player.y -= player.speed;
      if (player.y < 0)
      {
        player.y += player.speed;
      }
    }

    if (39 in keysDown) 
    { //right
      player.x += player.speed;
      if( player.x > (map[0].length*tileW) - player.width)
      {
        player.x -= player.speed;
      }
    }

    if (40 in keysDown) 
    { //down
      player.y += player.speed;
      if (player.y > map.length*tileH - player.height)
      {
        player.y -= player.speed;
      }
    }

    if (32 in keysDown)
    {
      if(frameTick % 7 == 0)
      {
        generatedBullet();
      }
    }   
}









function run(){

  loadImg();
  updatePlayer();
  frameTick++;
  score++;

  if(frameTick % 140 == 0)
  {
    randomGeneratedEnemy();
    enemyCounter++;
  }

          
  for (var key2 in bulletList)
    {
      updateBullet(bulletList[key2]);

      bulletList[key2].timer += bulletList[key2].speedY;
      if(bulletList[key2].timer > player.y)
      {
        bulletList.splice(bulletList.indexOf(bulletList[key2]), 1);
      }
    }

     
      
  for (var key in enemyList)
  {

    updateEntity(enemyList[key]);

    var isColliding = testCollisionEntity(player,enemyList[key]);
    if(isColliding)
    {
      enemyList.splice(enemyList.indexOf(enemyList[key]), 1);
      hp --;
      enemyCounter--;
    }
  

    if(bulletList.length>0)
    {
      var bulletCollision = testCollisionEntity(bulletList[key2], enemyList[key]);
      if (bulletCollision)
      {
        enemyList.splice(enemyList.indexOf(enemyList[key]), 1);
        bulletList.splice(bulletList.indexOf(bulletList[key2]), 1);
        enemyCounter--;
      } 
    }
  }

  if(hp == 0 || enemyCounter == 0 )
  {
    clearInterval(interval);
  }

}


var interval = setInterval(run, 20);
interval;
