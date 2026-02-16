const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 350;
canvas.height = 500;

// 🔊 sons online simples
const somPulo = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
const somGameOver = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");

let player, obstacles, gravity, score, gameRunning, speed;

function startGame(){
  player = {x:60,y:250,size:20,velocity:0};
  obstacles = [];
  gravity = 0.35;
  score = 0;
  speed = 1.4;
  gameRunning = true;
  document.getElementById("score").textContent = score;
  spawnObstacle();
  update();
}

function spawnObstacle(){
  if(!gameRunning) return;

  let gap = 120;
  let topHeight = Math.random()*200+50;

  obstacles.push({
    x:350,
    top:topHeight,
    bottom:topHeight+gap,
    width:40
  });

  setTimeout(spawnObstacle,1500);
}

function update(){
  if(!gameRunning) return;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  player.velocity += gravity;
  player.y += player.velocity;

  ctx.fillStyle="cyan";
  ctx.beginPath();
  ctx.arc(player.x,player.y,player.size,0,Math.PI*2);
  ctx.fill();

  ctx.fillStyle="red";
  for(let i=0;i<obstacles.length;i++){
    let o = obstacles[i];
    o.x -= speed;

    ctx.fillRect(o.x,0,o.width,o.top);
    ctx.fillRect(o.x,o.bottom,o.width,canvas.height);

    if(player.x+player.size>o.x && player.x-player.size<o.x+o.width){
      if(player.y-player.size<o.top || player.y+player.size>o.bottom){
        endGame();
      }
    }

    if(o.x+o.width===player.x){
      score++;
      document.getElementById("score").textContent = score;
      speed += 0.1;
    }
  }

  if(player.y>canvas.height || player.y<0){
    endGame();
  }

  requestAnimationFrame(update);
}

function endGame(){
  if(!gameRunning) return;
  gameRunning=false;

  somGameOver.currentTime=0;
  somGameOver.play();

  setTimeout(()=>{
    alert("Game Over! Pontuação: "+score);
  },200);
}

window.addEventListener("mousedown",()=>{
  if(!gameRunning) return;
  player.velocity=-6;
  somPulo.currentTime=0;
  somPulo.play();
});

window.addEventListener("touchstart",()=>{
  if(!gameRunning) return;
  player.velocity=-6;
  somPulo.currentTime=0;
  somPulo.play();
});
