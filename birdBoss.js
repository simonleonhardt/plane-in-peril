class BirdBoss {
  constructor(x, y, z, health) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.health = health;
    this.wingRotation = 40;
    this.headRotation = 0;
    this.wingRotationMultiplier = 1;
    this.goingUp = false;
    this.attackTimer = 0;
    this.spellCasting = false;
    this.spellCastingTimer = 0;
    this.attackChosen = 0;
    this.eggAttackRotating = false;
    this.eggAttackRotation = 0;
    this.eggLaunched = false;
  }
  draw () {
    
    if(this.x > 140 && this.health > 0) {
      this.x-=2;
    }
    if(this.x < 140 && this.health > 0) {
      this.x = 140;
    }

    if(!this.goingUp) {
      this.y += 0.3;
    } else {
      this.y -= 1.5;
      if(this.y <= -20) {
        this.goingUp = false;
      }
    }
    
    this.wingRotation -= 1 * this.wingRotationMultiplier;
    if(this.wingRotation <= 0 || this.wingRotation >= 60) {
      this.wingRotationMultiplier *= -1;
    }
    
    if(this.wingRotation >= 60) {
      this.goingUp = true;
    }
    
    push();
    rotateZ(this.eggAttackRotation);
    translate(-this.eggAttackRotation * 1.2, -this.eggAttackRotation * 2, 0);
    translate(this.x, this.y - 60, this.z);
    rotateZ(this.headRotation);
    stroke('grey');
    fill('white');
    sphere(30);
    pop();
    push();
    rotateZ(this.eggAttackRotation);
    translate(-this.eggAttackRotation * 1.2, -this.eggAttackRotation * 2, 0);
    translate(this.x - 40 + this.headRotation/5 + (this.health > 10 ? ((100/this.health) * 2) : 12), this.y - 50 - this.headRotation/1.7 + (this.health > 10 ? ((100/this.health) * 2) : 12), this.z);
    rotateZ(this.headRotation);
    rotateZ(75 * (this.health/100));
    fill('yellow');
    stroke('#7c8000');
    cone(15, 50);
    rotateZ(-1 * (75 * (this.health/100)));
    translate(12 - (this.health > 10 ? ((100/this.health) * 2) : 12), -22 - (this.health > 10 ? ((100/this.health) * 2) : 12), 15);
    fill('blue');
    stroke('black');
    sphere(5);
    translate(0, 0, -30);
    sphere(5);
    pop();
    push();
    rotateZ(this.eggAttackRotation);
    translate(-this.eggAttackRotation * 1.2, -this.eggAttackRotation * 2, 0);
    stroke('grey');
    translate(this.x + 15, this.y - 20, this.z);
    rotateZ(-20);
    cylinder(20, 50);
    rotateZ(20);
    translate(10, 25, 0);
    sphere(21);
    rotateZ(15);
    translate(0, 30, 0);
    cylinder(20, 60);
    translate(0, 20, 0);
    sphere(19);
    translate(18, 24, 0);
    rotateZ(-40);
    cone(20, 60);
    rotateY(90);
    plane(30, 80);
    rotateZ(20);
    plane(20, 70);
    rotateZ(-40);
    plane(20, 70);
    rotateZ(20);
    rotateX(10);
    translate(0, 20, 0);
    plane(30, 90);
    pop();
    push();
    rotateZ(this.eggAttackRotation);
    translate(-this.eggAttackRotation * 1.2, -this.eggAttackRotation * 2, 0);
    fill('yellow');
    stroke('#7c8000');
    translate(this.x - 15, this.y + 67, this.z - 8);
    rotateZ(30);
    rotateX(-15);
    cone(5, 35);
    translate(-3, 20, 0);
    rotateZ(20);
    cone(2.5, 20);
    pop();
    push();
    rotateZ(this.eggAttackRotation);
    translate(-this.eggAttackRotation * 1.2, -this.eggAttackRotation * 2, 0);
    fill('yellow');
    stroke('#7c8000');
    translate(this.x, this.y + 67, this.z + 20);
    rotateZ(30);
    rotateX(15);
    cone(5, 35);
    translate(-3, 20, 0);
    rotateZ(20);
    cone(2, 20);
    pop();
    push();
    rotateZ(this.eggAttackRotation);
    translate(-this.eggAttackRotation * 1.2, -this.eggAttackRotation * 2, 0);
    stroke('grey');
    translate(this.x + 30, this.y - 20, this.z);
    sphere(21);
    translate(-15, 15, 45);
    rotateZ(40);
    rotateX(65);
    rotateY(this.wingRotation - 50);
    cone(20, 90);
    rotateY(20);
    rotateX(-11);
    translate(12, 0, 10);
    plane(50, 130);
    rotateY(10);
    translate(25, -20, 0);
    plane(50, 130);
    pop();
    push();
    rotateZ(this.eggAttackRotation);
    translate(-this.eggAttackRotation * 1.2, -this.eggAttackRotation * 2, 0);
    stroke('grey');
    translate(this.x + 15, this.y - 15, this.z - 45);
    rotateZ(40);
    rotateX(-65);
    rotateY(-this.wingRotation + 50);
    cone(20, 90);
    rotateY(10);
    rotateX(11);
    translate(12, 0, -10);
    plane(50, 100);
    rotateY(10);
    translate(25, 0, 0);
    plane(60, 80);
    pop();
  }
  
  attacking () {
    if(this.x == 140 && this.eggAttackRotation == 0) {
      this.attackTimer++;
    }
    if(this.attackTimer >= 200) {
      this.spellCasting = true;
    }
    if(this.spellCasting) {
      this.spellCastingTimer++;
      if(this.spellCastingTimer < (this.health > 10 ? 40 : 30)) {
        this.headRotation+=2;
      } else {
        this.headRotation-=2;
      }
      if(this.spellCastingTimer >= (this.health > 10 ? 80 : 60)) {
        this.spellCasting = false;
        this.attackChosen = round(random(1, 2));
        if(this.attackChosen == 1) {
          this.birdStormAttack();
        } else if(this.attackChosen == 2) {
          this.eggLaunchAttack();
        }
        this.attackTimer = 0;
      }
    } else {
      this.spellCastingTimer = 0;
      this.headRotation = 0;
    }
  }
  
  birdStormAttack () {
    for(let i = 0; i < (windowWidth * windowHeight) / 25000; i++) {
      birdArr.push(new Bird(windowWidth/2 + 100, random(-windowHeight/2, windowHeight/2), random(2, 5)))
    }
  }
  
  eggLaunchAttack() {
    this.eggAttackRotating = true;
  }
  
  eggLaunchAttackRotating() {
    if(this.eggAttackRotating) {
      if(this.eggAttackRotation < 40 && !this.eggLaunched) {
        this.eggAttackRotation++;
      } else {
       if(this.eggLaunched == false) {
         eggArr.push(new Egg(this.x + 110, this.y + 130, this.z, 10, atan2(planePlayer.y - (this.y + 130),planePlayer.x - (this.x + 110)) - 90, planePlayer.y));
       }
       this.eggLaunched = true;
      }
      if(this.eggLaunched && this.eggAttackRotation != 0) {
        this.eggAttackRotation--;
      }
      if(this.eggAttackRotation == 0) {
        this.eggLaunched = false;
        this.eggAttackRotating = false;
      }
    }
  }
  
  death () {
    if(this.health <= 0) {
      this.x+=2;
    }

    if(this.health <= 0 && this.x >= windowWidth/2 + 100) {
      birdBossArr.splice(birdBossArr.indexOf(this), 1);
      bossFight = false;
      birdBossDefeated = true;
    }
  }
}