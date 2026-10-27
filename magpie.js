class Magpie {
  static DOME_WIDTH = 20;
  static DOME_HEIGHT = 30;
  static PLATFORM_WIDTH = Magpie.DOME_WIDTH + 6;
  static PLATFORM_HEIGHT = 3;
  static BEAM_WIDTH = 50;
  static BEAM_HEIGHT = 60;
  static WINDOW_WIDTH = Magpie.DOME_WIDTH / 4;
  static WINDOW_HEIGHT = Magpie.DOME_HEIGHT / 4;
  /** Where captured junk sits, in the Magpie's own frame (below the ship). */
  static CARGO_Y = 40;

  physics;
  beam;

  /** If we've caught space junk, use a direct reference to draw it. */
  capturedJunk;

  constructor() {
    this.physics = new Physics();
    this.beam = false;
    this.capturedJunk = null;
  }

  draw() {
    push();
    drawEverywhere({
      offset: this.physics,
      drawFn: () => {
        // Phase 4: Draw captured junk underneath the ship if present
        if (this.capturedJunk !== null) {
          push();
          rotate(this.physics.rotation);
          translate(0, Magpie.CARGO_Y);
          Junk.drawJunk();
          pop();
        }
        Magpie.drawMagpie({ rotation: this.physics.rotation, beam: this.beam });
        if (game.debug) {
          this.physics.draw();
        }
      },
    });
    pop();
  }

  /** Sets the captured junk to the given one, and turns off the beam. */
  captureJunk(junk) {
    this.capturedJunk = junk;
    this.beam = false;
  }

  // this method is static. That means it doesn't use `this` to gain access to
  // instance members, because there _is_ no instance. This is essentially a
  // function that happens to be placed inside the Magpie namespace.
  static drawMagpie({ rotation, beam }) {
    push();
    rotate(rotation);
    if (beam) {
      const halfWidth = Magpie.BEAM_WIDTH / 2;
      const heightVal = Magpie.BEAM_HEIGHT;
      const startY = Magpie.DOME_HEIGHT / 2;
      noStroke();
      fill(246, 212, 122,80);
      triangle(10, startY, halfWidth+7, startY + heightVal, -halfWidth+7, startY + heightVal);
    }
    fill(251, 44, 68);
    rect(0, 0, Magpie.DOME_WIDTH, Magpie.DOME_HEIGHT, 5);
    fill(146, 170, 252);
    rect(-3, 30, Magpie.PLATFORM_WIDTH, Magpie.PLATFORM_HEIGHT, 5);
    fill(120, 184, 248);
    rect(0, Magpie.DOME_HEIGHT / 4, Magpie.WINDOW_WIDTH, Magpie.WINDOW_HEIGHT);
    pop();
  }

  move(delta) {
    this.physics.move(delta, { constrain: true });
    if (this.capturedJunk) {
      push();
      translate(this.physics.x, this.physics.y);
      rotate(this.physics.rotation);
      const cargo = worldToScreen(0, Magpie.CARGO_Y);
      pop();
      this.capturedJunk.physics.x = cargo.x;
      this.capturedJunk.physics.y = cargo.y;
    }
  }

  beamContains({ x, y }) {
    if (!this.beam) {
      return false;
    }
    let inside = false;
    drawEverywhere({
      offset: this.physics,
      drawFn: () => {
        rotate(this.physics.rotation);
reenToWorld(x, y);
        const halfWidth = (p.y / Magpie.BEAM_HEIGHT) * (Magpie.BEAM_WIDTH / 2);
        const withinDepth = p.y >= 0 && p.y <= Magpie.BEAM_HEIGHT;
        if (withinDepth && Math.abs(p.x) <= halfWidth) {
          inside = true;
        }
      },
    });
    return inside;
  }

  enableBeam(v) {
    if (!v) {
      this.beam = false;
    } else if (this.capturedJunk === null) {
      this.beam = true;
    }
  }
}