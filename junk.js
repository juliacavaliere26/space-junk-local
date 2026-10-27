class Junk {
  static DIAMETER = 20;

  physics;
 beamTime;
  dropoffTime;

  constructor() {
    this.physics = new Physics();
    this.physics.x = random(0, width);
    this.physics.y = random(0, height);
    this.physics.dx = random(-12, 12);
    this.physics.dy = random(-12, 12);
    this.beamTime = 0;
    this.dropoffTime = 0;
  }

  draw() {
    push();
    drawEverywhere({
      offset: this.physics,
      drawFn: () => {
        Junk.drawJunk();
        if (game.debug) {
          this.physics.draw();
        }
      },
    });
    pop();
  }

  static drawJunk() {
    push()
    fill(131, 85, 133)
    circle(0,0,Junk.DIAMETER)
    pop()
  }

  move(delta) {
    this.physics.move(delta, { constrain: true });
  }
}
