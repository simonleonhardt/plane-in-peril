class Plane {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.z = 80;
    this.propellerRotation = 0;
    this.health = 100;
    this.score = 0;
    this.immune = false;
    this.immunityTimer = 70;
    this.bulletTimer = 70;
    this.canShoot = true;
  }
  
  draw () {
    push();
    translate(this.x, this.y, this.z);
    fill(!this.immune ? '#ff1200' : '#f55e22');
    stroke(!this.immune ? '#000' : '#bec983');
    rotateZ(90);
    cylinder(15, 45);
    rotateZ(-90);
    translate(-29.5, 0, 0);
    rotateZ(90);
    cone(15, 14);
    rotateZ(-90);
    translate(37, -22.5, 10);
    box(5, 25, 5);
    translate(0, 0, -20);
    box(5, 25, 5);
    translate(0, -12.5, 10);
    box(20, 5, 50)
    fill('grey');
    translate(10, 15, 0);
    rotateZ(90);
    cylinder(7, 13);
    rotateZ(-90);
    if(this.bulletTimer <= 0) {
      noStroke();
      translate(8, 0, 0);
      sphere(5);
      stroke(!this.immune ? '#000' : '#bec983')
      translate(-8, 0, 0);
    }
    translate(10, 20, 5);
    rotateX(this.propellerRotation);
    cylinder(2, 45);
    rotateX(90);
    cylinder(2, 45);
    rotateX(-90 - this.propellerRotation);
    pop();
  }

  update () {
    if(mouseY != pmouseY) {
      this.y = mouseY - height / 2;
      pixelsMoved += Math.abs(mouseY - pmouseY);
    }
    this.propellerRotation+=3;
    fill('red');
    rect(width/2 - this.health - 8, -height/2 + 20, this.health, 30);
    fill('white');
    textAlign(RIGHT);
    textFont(myFont);
    textSize(24)
    text(this.health, width/2 - 10, -height/2 + 42);
    fill('gold');
    circle(width/2 - 35, -height/2 + 85, 50);
    fill('white');
    textAlign(CENTER);
    textSize(28);
    text(this.score, width/2 - 35, -height/2 + 94);
    
    if(this.immune) {
      this.immunityTimer--;
    }
    if(this.immune && this.immunityTimer <= 0) {
      this.immune = false;
      this.immunityTimer = 70;
    }
  }
  
  collision () {
    coinArr.forEach(coin => {
      if(coin.x < this.x + 40 && coin.x > this.x - 40 && coin.y > this.y - 43 && coin.y < this.y + 25) {
        coinArr.splice(coinArr.indexOf(coin), 1);
        this.score+=1;
        coinsCollected++;
      }
    })
    
    cloudArr.forEach(cloud => {
      if(cloud.x - 30 < this.x + 40 && cloud.x + 30 > this.x - 40 && cloud.y + 30 > this.y - 43 && cloud.y - 30 < this.y + 25 && !this.immune) {
        this.immune = true;
        this.health -= 10;
        cloud.hitPlane = true;
      }
    })
    
    birdArr.forEach(bird => {
      if(bird.x - 20 < this.x + 30 && bird.x + 20 > this.x - 30 && bird.y + 20 > this.y - 33 && bird.y - 20 < this.y + 15 && !this.immune) {
        this.immune = true;
        this.health -= 10;
        bird.hitPlane = true;
      }
    })
    
    thunderboltArr.forEach(thunderbolt => {
      if(thunderbolt.y > 170 && thunderbolt.y < 230 && thunderbolt.planeY + 10 > this.y - 25 && thunderbolt.planeY - 10 < this.y + 15 && !this.immune) {
        this.immune = true;
        this.health -= 10;
      }
    })
    
    eggArr.forEach(egg => {
      if(egg.y > 350 && egg.y < 400 && egg.planeY + 25 > this.y - 25 && egg.planeY - 25 < this.y + 15 && !this.immune) {
        this.immune = true;
        this.health -= 10;
      }
    })
  }
  
  death () {
    if(this.health <= 0) {
      this.x = -175;
      this.y = 0;
      this.propellerRotation = 0;
      this.health = 100;
      this.immune = false;
      this.immunityTimer = 70;
      cloudArr = [];
      birdArr = [];
      coinArr = [];
      bulletArr = [];
      thunderboltArr = [];
      cloudBossArr = [];
      eggArr = [];
      birdBossArr = [];
      if(tutorialCompleted) {
        showMenu = true;
        cloudArr.push(new Cloud(220, -windowHeight/2 + 165, 80, 0, 0));
        cloudArr.push(new Cloud(160, 90, 80, 0, 0));
        cloudArr.push(new Cloud(-245, -windowHeight/2 + 120, 80, 0, 0));
        cloudArr.push(new Cloud(windowWidth/3, -120, 80, 0, 0));
        buttonTutorial = createButton("Tutorial");
        buttonGame = createButton("Game");
        buttonTutorial.position(width/2 - 62.5, 280);
        buttonGame.position(width/2 - 62.5, 170);
        buttonTutorial.size(125, 100);
        buttonGame.size(125, 100);
        buttonTutorial.mousePressed(() => {
          tutorialCompleted = false;
          movementCompleted = false;
          shootingCompleted = false;
          cloudsCompleted = false;
          birdsSurvivedCompleted = false;
          birdsCompleted = false;
          coinsCompleted = false;
          pixelsMoved = 0;
          shotsFired = 0;
          cloudsSurvived = 0;
          birdsSurvived = 0;
          birdsShot = 0;
          coinsCollected = 0;
          cloudTutorialTimer = 0;
          birdTutorialTimer = 0;
          coinTutorialTimer = 0;
          finishTutorialTimer = 0;
          showMenu = false;
          cloudArr = [];
          coinArr = [];
          birdArr = [];
          buttonTutorial.remove();
          buttonGame.remove();
          planePlayer.score = 0;
          bossFight = false;
          cloudBossDefeated = false;
          birdBossDefeated = false;
        })
        buttonGame.mousePressed(() => {
          tutorialCompleted = true;
          movementCompleted = true;
          shootingCompleted = true;
          cloudsCompleted = true;
          birdsSurvivedCompleted = true;
          birdsCompleted = true;
          coinsCompleted = true;
          pixelsMoved = 0;
          shotsFired = 0;
          cloudsSurvived = 0;
          birdsSurvived = 0;
          birdsShot = 0;
          coinsCollected = 0;
          cloudTutorialTimer = 0;
          birdTutorialTimer = 0;
          coinTutorialTimer = 0;
          finishTutorialTimer = 0;
          showMenu = false;
          cloudArr = [];
          coinArr = [];
          birdArr = [];
          buttonTutorial.remove();
          buttonGame.remove();
          planePlayer.score = 0;
          bossFight = false;
          cloudBossDefeated = false;
          birdBossDefeated = false;
          planePlayer.y = mouseY - height / 2;
        })
      }
    }
  }
  
  shoot () {
    this.canShoot = true;
    
    if(!movementCompleted) {
      this.canShoot = false;
      this.bulletTimer = 70;
    }
    if(shootingCompleted && !birdsSurvivedCompleted) {
      this.canShoot = false;
      this.bulletTimer = 70;
    }
    if(birdsCompleted && !tutorialCompleted) {
      this.canShoot = false;
      this.bulletTimer = 70;
    }
    
    if(this.bulletTimer > 0 && this.canShoot) {
      this.bulletTimer--;
    }
    
    if(mouseIsPressed && this.bulletTimer <= 0) {
      this.bulletTimer = 70;
      bulletArr.push(new Bullet(this.y - 20));
      shotsFired++;
    }
  }
}