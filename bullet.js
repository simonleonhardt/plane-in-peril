class Bullet {
  constructor(y) {
    this.x = -155;
    this.y = y;
    this.z = 80;
    this.speed = 5;
  }
  
  draw () {
    push();
    fill('#595959');
    noStroke();
    translate(this.x, this.y, this.z);
    sphere(5);
    pop();
  }
  
  update () {
    this.x += this.speed;
    
    if(this.x > width/2 + 10) {
      bulletArr.splice(bulletArr.indexOf(this), 1);
    }
  }
  
  collision () {
    birdArr.forEach(bird => {
      if(bird.x - 20 < this.x + 30 && bird.x + 20 > this.x - 30 && bird.y + 20 > this.y - 5 && bird.y - 20 < this.y + 5) {
        birdArr.splice(birdArr.indexOf(bird), 1);
        if(!bossFight) {
          planePlayer.score += 2;
          birdsShot++;
        }
      }
    })
    
    cloudBossArr.forEach(cloudBoss => {
      if(cloudBoss.x - 30 < this.x + 5 && cloudBoss.x + 30 > this.x - 5 && cloudBoss.y - 115 < this.y - 5 && cloudBoss.y - 45 > this.y + 5) {
        cloudBoss.health-=1;
        cloudBoss.smallCloudsArrHead.splice(0, 1);
      }
    })
    
    birdBossArr.forEach(birdBoss => {
      if(birdBoss.x - 10 < this.x + 5 && birdBoss.x + 30 > this.x - 5 && birdBoss.y - 120 < this.y - 5 && birdBoss.y + 100 > this.y + 5) {
        birdBoss.health -= 5;
        bulletArr.splice(bulletArr.indexOf(this), 1);
      }
    })
  }
}