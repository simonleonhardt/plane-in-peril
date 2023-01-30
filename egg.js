class Egg {
  constructor(x, y, z, speed, rotationZ, planeY) {
    this.x = x;
    this.yStart = y;
    this.y = y;
    this.z = z;
    this.speed = speed;
    this.rotationZ = rotationZ;
    this.color = '#e6d89e';
    this.planeY = planeY;
  }
  
  draw () {
    push();
    fill(this.color);
    noStroke();
    translate(this.x - 5, this.yStart, this.z);
    rotateZ(this.rotationZ);
    translate(0, this.y, 0);
    sphere(20);
    pop();
  }
  
  update () {
    this.y += this.speed;
    if(this.y > width/2 + 300) {
      eggArr.splice(eggArr.indexOf(this), 1);
    }
  }
}