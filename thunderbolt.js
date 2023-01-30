class Thunderbolt {
  constructor(x, y, z, speed, rotationZ, rotationX, planeY) {
    this.x = x;
    this.yStart = y;
    this.y = y;
    this.z = z;
    this.speed = speed;
    this.rotationZ = rotationZ;
    this.rotationX = rotationX;
    this.color = 'yellow';
    this.planeY = planeY;
  }
  
  draw () {
    push();
    fill(this.color);
    noStroke();
    translate(this.x - 5, this.yStart, this.z);
    rotateZ(this.rotationZ);
    rotateX(this.rotationX);
    translate(0, this.y, 0)
    cone(5, 40);
    translate(5, -40, 0);
    rotateX(180);
    cone(5, 40);
    pop();
  }
  
  update () {
    this.y += this.speed;
    if(this.y > width/2 + 300) {
      thunderboltArr.splice(thunderboltArr.indexOf(this), 1);
    }
  }
}