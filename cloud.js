class SmallCloud {
  constructor(x, y, z, size) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.size = size;
    this.rotateX = random(0, 360);
    this.rotateY = random(0, 360);
    this.rotateZ = random(0, 360);
    this.hitPlane = false;
  }
}

class Cloud {
  constructor(x, y, z, bx, by) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.bx = bx;
    this.by = by;
    this.smallCloudsArr = [];
  }
  
  draw () {
    if(this.smallCloudsArr.length == 0) {
      for(let i = 0; i < 15; i++) {
        this.smallCloudsArr.push(new SmallCloud(random(-30, 30), random(-30, 30), random(-30, 30), random(15, 30)));
      }
    }
    this.smallCloudsArr.forEach(cloud => {
      cloud.rotateX += 1;
      cloud.rotateY += 1;
      cloud.rotateZ += 1;
      push();
      translate(this.x + cloud.x, this.y + cloud.y, this.z + cloud.z);
      rotateX(cloud.rotateX);
      rotateY(cloud.rotateY);
      rotateZ(cloud.rotateZ);
      fill('#fff');
      box(cloud.size);
      pop();
    })
  }

  update () {
    this.x -= this.bx;
    this.y -= this.by;
    if(this.x + 70 < width/-2) {
      cloudArr.splice(cloudArr.indexOf(this), 1);
      if(!bossFight && !this.hitPlane) {
        cloudsSurvived++;
      }
    }
  }
}