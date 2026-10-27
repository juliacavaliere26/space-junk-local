class Physics {
  x;
  y;
  dx;
  dy;
  rotation;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.rotation = 0;
  }

 
  draw() {
    push();
    noFill();
    stroke(255);
    strokeWeight(1);
    circle(0, 0, 10);
    const v = createVector(this.dx, this.dy);
    const future = v.copy().mult(0.5);
    line(0, 0, future.x, future.y);
    strokeWeight(2);
    const dir = v.copy().setMag(10);
    line(0, 0, dir.x, dir.y);
    pop();
  }

  move(delta, { constrain = false } = {}) {
const dt = delta / 1000.0
   this.x += this.dx * dt
  this.y += this.dy * dt
    if (constrain) {
      while (this.x < 0) this.x += width;
      while (this.y < 0) this.y += height;
      while (this.x >= width) this.x -= width;
      while (this.y >= height) this.y -= height;
    }
  }


  rotate(rate, delta) {
    this.rotation += rate * (delta / 1000.0)
  }

  thrust(accel, delta) {
    const power = accel * (delta / 1000.0);
  this.dx += Math.sin(this.rotation) * power
  this.dy -= Math.cos(this.rotation) * power
  }
}
