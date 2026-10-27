class Mothership {
  static WIDTH = 50;
  static HEIGHT = 20;
  static PICKUP_DIAMETER = Mothership.WIDTH * 1.2;
  static CORNER_RADIUS = 8;
  static NUM_PORTHOLES = 4;
  static PORTHOLE_DIAMETER = 6;

  physics;

  constructor() {
    this.physics = new Physics();
  }

  draw() {
    push();
    drawEverywhere({
      offset: this.physics,
      drawFn: () => {
        Mothership.drawMothership({ rotation: this.physics.rotation });
        if (game.debug) {
          this.physics.draw();
          noFill();
          stroke(255);
          circle(0, 0, Mothership.PICKUP_DIAMETER);
        }
      },
    });
    pop();
  }
  static drawMothership({ rotation }) {
    push();
    rotate(rotation);
  
    rectMode(CENTER);
    fill(231, 223, 118);
    rect(0, 0, Mothership.WIDTH, Mothership.HEIGHT, Mothership.CORNER_RADIUS);
    fill(120, 184, 248);
    const gap = Mothership.WIDTH / (Mothership.NUM_PORTHOLES + 1);
    for (let i = 0; i < Mothership.NUM_PORTHOLES; i++) {
      const x = -Mothership.WIDTH / 2 + (i + 1) * gap;
      circle(x, 0, Mothership.PORTHOLE_DIAMETER);
    }
    
    pop();
  }

  move(delta) {
    this.physics.move(delta, { constrain: true });
  }
}