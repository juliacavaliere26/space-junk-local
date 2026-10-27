class Inputs {
  static THRUST = 360;
  static REVERSE_THRUST = 180;
  static TURN_RATE = 2.4;

  magpie;

  constructor(magpie) {
    this.magpie = magpie;
  }

  
  handleKeyDown(delta) {
    
    const shipPhysics = this.magpie.physics;

  if (keyIsDown("w")) {
    shipPhysics.thrust(Inputs.THRUST, delta);
  }
  if (keyIsDown("s")) {
    shipPhysics.thrust(-Inputs.REVERSE_THRUST, delta);
  }
  if (keyIsDown("a")) {
    shipPhysics.rotate(-Inputs.TURN_RATE, delta);
  }
  if (keyIsDown("d")) {
    shipPhysics.rotate(Inputs.TURN_RATE, delta);
  }

  const beamActive = keyIsDown(" ");
  this.magpie.enableBeam(beamActive);
  }
}


const SCROLL_KEYS = [" ", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];


function keyPressed() {
  if (game && (key === "~" || key === "`")) {
    game.debug = !game.debug;
  }
  if (SCROLL_KEYS.includes(key)) {
    return false;
  }
}
