class Coin {
  constructor (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = 10;
    this.speed = 3.5;
  }
  draw () {
    push();
    fill('gold');
    noStroke();
    translate(this.x, this.y, this.z);
    sphere(this.size);
    pop();
  }
  update () {
    this.x -= this.speed;
    if(this.x + this.size < width/-2) {
      coinArr.splice(coinArr.indexOf(this), 1);
    }
  }
}