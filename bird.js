class Bird {
  constructor (x, y, speed) {
    this.x = x;
    this.y = y;
    this.z = 80;
    this.speed = speed;
    this.type = round(random(1, 5));
    this.wingRotation = 0;
    this.wingRotationSpeed = 2;
    this.hitPlane = false;
  }
  
  draw () {
    push();
    translate(this.x, this.y, this.z);
    rotateZ(90);
    fill('white');
    cylinder(10, 30);
    translate(0, 20, 0);
    fill('yellow');
    cone(5, 10);
    translate(-10, -20, 0);
    rotateZ(-90);
    rotateX(45);
    rotateX(45 + this.wingRotation);
    fill('white');
    plane(18, 20);
    translate(0, 15, -10);
    rotateX(-50);
    plane(18, 20);
    pop();
  }
  
  update () {
    this.x -= this.speed;
    if(this.x + 40 < -width/2) {
      birdArr.splice(birdArr.indexOf(this), 1);
      if(!bossFight && !this.hitPlane) {
        birdsSurvived++;
      }
    }
    
    this.wingRotation += this.wingRotationSpeed;
    
    if(this.wingRotation > 45 || this.wingRotation < -15) {
      this.wingRotationSpeed *= -1;
    }
  }
}