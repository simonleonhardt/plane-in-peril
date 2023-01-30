class CloudBoss {
  constructor(x, y, z, health) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.health = health;
    this.smallCloudsArrHead = [];
    this.smallCloudsArrHand1 = [];
    this.smallCloudsArrHand2 = [];
    this.cloudSizeMultiplier = 0;
    this.spellCasting = false;
    this.spellCastingTimer = 0;
    this.spellCastingHandX = 0;
    this.headSpawned = false;
    this.attackChosen = 0;
    this.attackTimer = 0;
  }
  
  draw () {
    
    if(this.x > 150 && this.health > 0) {
      this.x-=2;
    }
    if(this.x < 150 && this.health > 0) {
      this.x = 150;
    }
    
    if(this.cloudSizeMultiplier < 1 && this.health > 0 && this.x == 150) {
      this.cloudSizeMultiplier += 0.01;
    }
    if(this.cloudSizeMultiplier > 1 && this.health > 0 && this.x == 150) {
      this.cloudSizeMultiplier = 1;
    }
    
    if(!this.headSpawned) {
      for(let i = 0; i < this.health; i++) {
        this.smallCloudsArrHead.push(new SmallCloud(random(-30, 30), random(-30, 40), random(-30, 30), random(15, 30)));
      }
    }
    if(!this.headSpawned) {
      for(let j = 0; j < 20; j++) {
        this.smallCloudsArrHead.push(new SmallCloud(random(-50, -40), random(-20, -30), random(-40, 100), random(8, 10)));
      }
    }
    if(!this.headSpawned) {
      for(let k = 0; k < 30; k++) {
        this.smallCloudsArrHead.push(new SmallCloud(random(-55, -50), random(10, 50), random(45, 55), random(12, 15)));
      }
      this.headSpawned = true;
    }
    this.smallCloudsArrHead.forEach(cloud => {
      cloud.rotateX += 1;
      cloud.rotateY += 1;
      cloud.rotateZ += 1;
      push();
      translate(this.x + cloud.x, this.y + cloud.y - 80, this.z + cloud.z);
      rotateX(cloud.rotateX);
      rotateY(cloud.rotateY);
      rotateZ(cloud.rotateZ);
      fill('#fff');
      box(cloud.size * this.cloudSizeMultiplier);
      pop();
    })
    
    push();
    fill('pink');
    translate(this.x, this.y - 80, this.z);
    rotateX(frameCount);
    rotateY(frameCount);
    rotateZ(frameCount);
    box(50);
    pop();
    
    push();
    fill('#caed55');
    translate(this.x - 45, this.y - 85, this.z - 10);
    rotateY(30);
    rotateZ(planePlayer.y / -10);
    box(15);
    fill('black');
    noStroke();
    translate(-3, 0, 0);
    sphere(7);
    fill('pink');
    translate(28, 0, 0);
    rotateZ(-90);
    cone(8, 40);
    pop();
    push();
    fill('#caed55');
    translate(this.x - 30, this.y - 85, this.z + 40);
    rotateY(30);
    rotateZ(planePlayer.y / -10);
    box(15);
    fill('black');
    noStroke();
    translate(-3, 0, 0);
    sphere(7);
    fill('pink');
    translate(28, 0, 0);
    rotateZ(-90);
    cone(8, 40);
    pop();
    
    if(this.smallCloudsArrHand1.length == 0) {
      for(let i = 0; i < 25; i++) {
        this.smallCloudsArrHand1.push(new SmallCloud(random(-20, 20), random(-20, 20), random(-20, 20), random(15, 30)));
      }
    }
    this.smallCloudsArrHand1.forEach(cloud => {
      cloud.rotateX += 1;
      cloud.rotateY += 1;
      cloud.rotateZ += 1;
      push();
      translate(this.x + cloud.x, this.y + cloud.y + 40, this.z + cloud.z + 40);
      rotateX(cloud.rotateX);
      rotateY(cloud.rotateY);
      rotateZ(cloud.rotateZ);
      fill('#fff');
      box(cloud.size * this.cloudSizeMultiplier);
      pop();
    })
    
    if(this.smallCloudsArrHand2.length == 0) {
      for(let i = 0; i < 25; i++) {
        this.smallCloudsArrHand2.push(new SmallCloud(random(-20, 20), random(-20, 20), random(-20, 20), random(15, 30)));
      }
    }
    this.smallCloudsArrHand2.forEach(cloud => {
      cloud.rotateX += 1;
      cloud.rotateY += 1;
      cloud.rotateZ += 1;
      push();
      translate(this.x + cloud.x - 30 + this.spellCastingHandX, this.y + cloud.y + 40, this.z + cloud.z - 40);
      rotateX(cloud.rotateX);
      rotateY(cloud.rotateY);
      rotateZ(cloud.rotateZ);
      fill('#fff');
      box(cloud.size * this.cloudSizeMultiplier);
      pop();
    })
  }
  
  attacking () {
    
    if(this.x == 150) {
      this.attackTimer++;
    }
    if(this.attackTimer >= 200) {
      this.spellCasting = true;
    }
    
    if(this.spellCasting) {
      this.spellCastingTimer++;
      if(this.spellCastingTimer < 40) {
        this.spellCastingHandX-=2;
      } else {
        this.spellCastingHandX+=2;
      }
      if(this.spellCastingTimer >= 80) {
        this.spellCasting = false;
        this.attackChosen = round(random(1, 2));
        if(this.attackChosen == 1) {
          this.cloudRainAttack();
        } else if(this.attackChosen == 2) {
          this.thunderEyesAttack();
        }
        this.attackTimer = 0;
      }
    } else {
      this.spellCastingTimer = 0;
      this.spellCastingHandX = 0;
    }
  }
  
  cloudRainAttack() {
    for(let l = 0; l < (windowWidth * windowHeight) / 50000; l++) {
      cloudArr.push(new Cloud(windowWidth/2 + 100, random(-windowHeight/2, windowHeight/2), 80, random(2, 5), random(-1.5, 1.5)))
    }
  }
  
  thunderEyesAttack() {
    thunderboltArr.push(new Thunderbolt(this.x - 100, this.y - 120, this.z - 10, 15, atan2(planePlayer.y - (this.y - 120), planePlayer.x - (this.x - 100)) - 90, 4.2, planePlayer.y));
    
    thunderboltArr.push(new Thunderbolt(this.x - 100, this.y - 120, this.z + 30, 15, atan2(planePlayer.y - (this.y - 120), planePlayer.x - (this.x - 100)) - 90, -4.2, planePlayer.y));
  }
  
  death() {
    if(this.health <= 0) {
      this.cloudSizeMultiplier -= 0.01;
    }
    if(this.health <= 0 && this.cloudSizeMultiplier <= 0) {
      this.x+=2;
      this.cloudSizeMultiplier = 0;
    }
    if(this.health <= 0 && this.cloudSizeMultiplier <= 0 && this.x >= windowWidth/2 + 100) {
      cloudBossArr.splice(cloudBossArr.indexOf(this), 1);
      bossFight = false;
      cloudBossDefeated = true;
    }
  }
}