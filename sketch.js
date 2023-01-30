// Variables

let showMenu = true;
let buttonTutorial;
let buttonGame;
let tutorialCompleted = false;
let movementCompleted = false;
let shootingCompleted = false;
let cloudsCompleted = false;
let birdsSurvivedCompleted = false;
let birdsCompleted = false;
let coinsCompleted = false;
let pixelsMoved = 0;
let shotsFired = 0;
let cloudsSurvived = 0;
let birdsSurvived = 0;
let birdsShot = 0;
let coinsCollected = 0;
let cloudTutorialTimer = 0;
let birdTutorialTimer = 0;
let coinTutorialTimer = 0;
let finishTutorialTimer = 0;
let planePlayer = new Plane(-175, 0);
let cloudArr = [];
let birdArr = [];
let coinArr = [];
let bulletArr = [];
let cloudBossArr = [];
let thunderboltArr = [];
let birdBossArr = [];
let eggArr = [];
let bossFight = false;
let cloudBossDefeated = false;
let birdBossDefeated = false;

let cloudsSpawning;
let birdSpawning;
let coinsSpawning;

// Set font

function preload() {
  myFont = loadFont('assets/inconsolata.ttf');
}


// Set buttons and clouds on menu
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  noCursor();
  cloudsSpawning = (windowWidth * windowHeight) / 50000;
  birdSpawning = (windowWidth * windowHeight) / 75000;
  coinsSpawning = (windowWidth * windowHeight) / 75000;
  buttonTutorial = createButton("Tutorial");
  buttonGame = createButton("Game");
  buttonTutorial.position(width/2 - 62.5, 280);
  buttonGame.position(width/2 - 62.5, 170);
  buttonTutorial.size(125, 100);
  buttonGame.size(125, 100);
  buttonTutorial.mousePressed(() => {
    showMenu = false;
    buttonTutorial.remove();
    buttonGame.remove();
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
    planePlayer.score = 0;
    cloudArr = [];
  });
  buttonGame.mousePressed(() => {
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
    tutorialCompleted = true;
    movementCompleted = true;
    shootingCompleted = true;
    cloudsCompleted = true;
    birdsSurvivedCompleted = true;
    birdsCompleted = true;
    coinsCompleted = true;
    planePlayer.y = mouseY - height / 2;
    buttonTutorial.remove();
    buttonGame.remove();
    planePlayer.score = 0;
    cloudArr = [];
  })
  cloudArr.push(new Cloud(220, -windowHeight/2 + 165, 80, 0, 0));
  cloudArr.push(new Cloud(160, 90, 80, 0, 0));
  cloudArr.push(new Cloud(-245, -windowHeight/2 + 120, 80, 0, 0));
  cloudArr.push(new Cloud(windowWidth/3, -120, 80, 0, 0));
}

// Hearbeat function will draw menu or run game

function draw() {
  background('#98d3d6');
  
  ambientLight(200, 200, 200);
  directionalLight(250, 250, 250, width/2, height/2, -100);

  if(showMenu) {
    drawMouse();
    updateClouds();
    fill('black');
    textAlign(CENTER);
    textFont(myFont);
    textSize(50)
    text("Plane in Peril", 0, -height/2 + 120);
    if(planePlayer.score > 0) {
      textSize(20);
      textAlign(LEFT);
      text("Stats:\nScore: " + planePlayer.score + "\nPixels Moved: " + pixelsMoved + "\nShots Fired: " + shotsFired + "\nClouds Survived: " + cloudsSurvived + "\nBirds Survived: " + birdsSurvived + "\nBirds Shot: " + birdsShot + "\nCoins Collected: " + coinsCollected, -285, -height/2 + 210);
    }
  } else {
    if(!tutorialCompleted) {
      tutorial();
    }
    updatePlane();
    updateClouds();
    updateBirds();
    updateCoins();
    updateBullets();
    drawMouse();
    updateCloudBoss();
    updateThunderbolts();
    updateBirdBoss();
    updateEggs();
  }
}

// Handles plane

function updatePlane() {
  planePlayer.update();
  planePlayer.draw();
  planePlayer.collision();
  planePlayer.death();
  planePlayer.shoot();
}

// Handles clouds

function updateClouds() {
  cloudArr.forEach(cloud => {
    cloud.draw();
    cloud.update();
  })
  
  if(!bossFight && tutorialCompleted) {
    if(!showMenu && cloudArr.length < (planePlayer.score < 100 ? cloudsSpawning : plane.score < 200 ? cloudsSpawning + 1 : planePlayer.score < 300 ? cloudsSpawning + 2 : cloudsSpawning + 3)) {
      cloudArr.push(new Cloud(width/2 + 70, random(-windowHeight, windowHeight), 80, random(2, 5), 0));
    }
  }
}

// Handles birds

function updateBirds() {
  birdArr.forEach(bird => {
    bird.draw();
    bird.update();
  })
  
  if(!bossFight && tutorialCompleted) {
    if(birdArr.length < (planePlayer.score < 100 ? birdSpawning : plane.score < 200 ? birdSpawning + 1 : planePlayer.score < 300 ? birdSpawning + 2 : birdSpawning + 3)) {
      birdArr.push(new Bird(width/2 + 40, random(-height/2 + 40, height/2 - 40), random(2,4)));
    }
  }
}

// Handles coins
function updateCoins() {
  coinArr.forEach(coin => {
    coin.draw();
    coin.update();
  })
  
  if(!bossFight && tutorialCompleted) {
    if(coinArr.length < (planePlayer.score < 100 ? coinsSpawning : plane.score < 200 ? coinsSpawning + 1 : planePlayer.score < 300 ? coinsSpawning + 2 : coinsSpawning + 3)) {
      let ranY = random(height/-2 + 50, height/2 - 50)
      for(let i = 0; i < 250; i+=50) {
        coinArr.push(new Coin(width/2 + 50 + i, ranY, 80));
      }
    }
  }
}

// Handles bullets

function updateBullets() {
  bulletArr.forEach(bullet => {
    bullet.draw();
    bullet.update();
    bullet.collision();
  })
}

// Draws custom mouse

function drawMouse() {
  push();
  noStroke();
  fill('red');
  translate(mouseX - width/2, (mouseY - height/2) - (showMenu ? 0 : 20), showMenu ? 0 : 80);
  sphere(6);
  pop();
}

// Handles cloud boss

function updateCloudBoss() {
  if(planePlayer.score >= 200 && !bossFight && !cloudBossDefeated) {
    cloudBossArr.push(new CloudBoss(width/2 + 100, 35, 80, 13*15));
    bossFight = true;
  }
  
  cloudBossArr.forEach(cloudBoss => {
    cloudBoss.draw();
    cloudBoss.attacking();
    cloudBoss.death();
  })
}

// Handles thunderbolts

function updateThunderbolts() {
  thunderboltArr.forEach(thunderbolt => {
    thunderbolt.draw();
    thunderbolt.update();
  })
}

// Handles bird boss

function updateBirdBoss() {
  if(planePlayer.score >= 100 && !bossFight && !birdBossDefeated) {
    birdBossArr.push(new BirdBoss(width/2 + 100, -20, 80, 100));
  bossFight = true;
  }
  
  birdBossArr.forEach(birdBoss => {
    birdBoss.draw();
    birdBoss.attacking();
    birdBoss.death();
    birdBoss.eggLaunchAttackRotating()
  })
}

// Handles eggs

function updateEggs() {
  eggArr.forEach(egg => {
    egg.draw();
    egg.update();
  })
}

// Tutorial

function tutorial() {
  if(!movementCompleted) {
    fill('black');
    textAlign(CENTER);
    textFont(myFont);
    textSize(24)
    text("Use your mouse to move\nyour plane up and down\nMove 1000 pixels to continue\nPixels Moved: " + pixelsMoved, 0, -height/2 + 50);
    if(pixelsMoved >= 1000) {
      movementCompleted = true;
    }
  } else if(!shootingCompleted) {
    fill('black');
    textAlign(CENTER);
    textFont(myFont);
    textSize(24)
    text("Click to fire a bullet\nShoot 3 bullets to continue\nShots fired: " + shotsFired, 0, -height/2 + 50);
    if(shotsFired >= 3) {
      shootingCompleted = true;
    }
  } else if(!cloudsCompleted) {
    fill('black');
    textAlign(CENTER);
    textFont(myFont);
    textSize(19)
    text("Clouds will spawn as you fly\nHitting these clouds will damage you\nMove out of the way to dodge the clouds\nSurvive 3 clouds to continue\nClouds survived: " + cloudsSurvived, 0, -height/2 + 30);
    
    cloudTutorialTimer++;
    
    if(cloudTutorialTimer == 100) {
      cloudArr.push(new Cloud(width/2 + 70, random(-150, 150), 80, 2, 0));
    } else if(cloudTutorialTimer == 400) {
      cloudArr.push(new Cloud(width/2 + 70, random(-150, 150), 80, 3, 0));
    } else if(cloudTutorialTimer >= 600 && cloudArr.length == 0 && cloudsSurvived < 3) {
      cloudArr.push(new Cloud(width/2 + 70, random(-150, 150), 80, 4, 0));
    }
    
    if(cloudsSurvived >= 3) {
      cloudsCompleted = true;
    }
  } else if(!birdsCompleted) {
    
    birdTutorialTimer++;
    
    if(!birdsSurvivedCompleted) {
      fill('black');
      textAlign(CENTER);
      textFont(myFont);
      textSize(19)
      text("Birds will also spawn as you fly\nHitting these birds will damage you\nMove out of the way to dodge the birds\nSurvive 3 birds to continue\nBirds survived: " + birdsSurvived, 0, -height/2 + 30);

      if(birdTutorialTimer == 100) {
        birdArr.push(new Bird(width/2 + 40, random(-height/2 + 40, height/2 - 40), 2));
      } else if(birdTutorialTimer == 400) {
        birdArr.push(new Bird(width/2 + 40, random(-height/2 + 40, height/2 - 40), 3));
      } else if(birdTutorialTimer >= 600 && birdArr.length == 0 && birdsSurvived < 3) {
        birdArr.push(new Bird(width/2 + 40, random(-height/2 + 40, height/2 - 40), 4));
      }

      if(birdsSurvived >= 3) {
        birdsSurvivedCompleted = true;
        birdTutorialTimer = 0;
      }
    }
    
    if(birdsSurvivedCompleted) {
      fill('black');
      textAlign(CENTER);
      textFont(myFont);
      textSize(19)
      text("You can shoot birds to gain points\nand destroy birds\nLine your plane up to aim your bullet\nand click to shoot\nShoot 3 birds to continue\nBirds shot: " + birdsShot, 0, -height/2 + 30);

      if(birdTutorialTimer == 100) {
        birdArr.push(new Bird(width/2 + 40, random(-height/2 + 40, height/2 - 40), 2));
      } else if(birdTutorialTimer == 400) {
        birdArr.push(new Bird(width/2 + 40, random(-height/2 + 40, height/2 - 40), 3));
      } else if(birdTutorialTimer >= 600 && birdArr.length == 0 && birdsShot < 3) {
        birdArr.push(new Bird(width/2 + 40, random(-height/2 + 40, height/2 - 40), 4));
      }

      if(birdsShot >= 3) {
        birdsCompleted = true;
      }
    }
    
  } else if(!coinsCompleted) {
    fill('black');
    textAlign(CENTER);
    textFont(myFont);
    textSize(19)
    text("Coins will also spawn as you fly\nFlying through the coins will earn you points\nCollect 15 coins to continue\nCoins collected: " + coinsCollected, 0, -height/2 + 30);
    
    coinTutorialTimer++;
    
    if(coinTutorialTimer == 100) {
      let ranY = random(height/-2 + 50, height/2 - 50)
      for(let i = 0; i < 250; i+=50) {
        coinArr.push(new Coin(width/2 + 50 + i, ranY, 80));
      }
    } else if(coinTutorialTimer == 400) {
      let ranY = random(height/-2 + 50, height/2 - 50)
      for(let i = 0; i < 250; i+=50) {
        coinArr.push(new Coin(width/2 + 50 + i, ranY, 80));
      }
    } else if(coinTutorialTimer >= 600 && coinArr.length == 0 && coinsCollected < 15) {
      let ranY = random(height/-2 + 50, height/2 - 50)
      for(let i = 0; i < 250; i+=50) {
        coinArr.push(new Coin(width/2 + 50 + i, ranY, 80));
      }
    }
    
    if(coinsCollected >= 15) {
      coinsCompleted = true;
    }
  } else {
    fill('black');
    textAlign(CENTER);
    textFont(myFont);
    textSize(24)
    if(planePlayer.score > 0) {
      text("You have completed the tutorial\nGood luck and have fun playing!", 0, -height/2 + 50);
    }
    finishTutorialTimer++;
    if(finishTutorialTimer >= 150) {
      planePlayer.x += 3;
      if(planePlayer.x >= width/2 + 150) {
        planePlayer.x = -225;
        planePlayer.health = 100;
        planePlayer.score = 0;
      }
      if(planePlayer.x >= -175 && planePlayer.score == 0) {
        tutorialCompleted = true;
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
      }
    }
  }
}

// Update window when resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  buttonTutorial.position(width/2 - 62.5, 280);
  buttonGame.position(width/2 - 62.5, 170);
  cloudsSpawning = (windowWidth * windowHeight) / 50000;
  birdSpawning = (windowWidth * windowHeight) / 75000;
}