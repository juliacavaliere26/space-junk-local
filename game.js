class Game {
  static DEFAULT_NUM_LIVES = 3;
  static JUNK_CATCH_TIME_MS = 500;
  static JUNK_DROPOFF_TIME_MS = 1000;
  static SCORE_DROPOFF = 100;
  static LEVEL = { name: "Training", junk: 5, time: 120000 };

  lives;
  levell
  magpie;
  mothership;
  inputs;
  debug;
  score;
  paused;

  constructor() {
    this.lives = Game.DEFAULT_NUM_LIVES;
    this.level = new Level(Game.LEVEL);

    const padW = width / 4;
    const padH = height / 4;

    this.magpie = new Magpie();
    this.magpie.physics.x = random(padW, padW * 3);
    this.magpie.physics.y = random(padH, padH * 3);
    this.magpie.physics.rotation = random(0, 2 * Math.PI);

    this.mothership = new Mothership();
    this.mothership.physics.x = random(padW, padW * 3);
    this.mothership.physics.y = random(padH, padH * 3);
    this.mothership.physics.rotation = random(0, 2 * Math.PI);
    this.mothership.physics.dx = random(-12, 12);
    this.mothership.physics.dy = random(-12, 12);

    this.inputs = new Inputs(this.magpie);
    this.debug = false;

    this.score = 0;
    this.paused = false;
  }

  move(delta) {
    this.inputs.handleKeyDown(delta);
    this.magpie.move(delta);
    this.mothership.move(delta);
    this.level.move(delta, { countTime: !this.isLevelComplete() });
    const junk = this.resolveBeam(delta);
    if (junk) {
      this.magpie.captureJunk(junk);
      this.level.removeJunk(junk);
    }

    if (this.resolveDropoff(delta)) {
      this.magpie.capturedJunk = null;
      this.updateScore("dropoff");
    }
  }

 resolveBeam(delta) {
    const candidates = [];

    for (const item of this.level.junk) {
      if (this.magpie.beamContains(item.physics)) {
        item.beamTime += delta;
        candidates.push(item);
      } else {
        item.beamTime = Math.max(0, item.beamTime - delta);
      }
    }

    if (candidates.length === 0) {
      return null;
    }

    const bestJunk = candidates.reduce((prev, current) => 
      current.beamTime > prev.beamTime ? current : prev
    );

    return bestJunk.beamTime > Game.JUNK_CATCH_TIME_MS ? bestJunk : null;
  }

  
  resolveDropoff(delta) {
    return false;
  }

  draw() {
    this.level.draw(this.score, this.lives);
    this.mothership.draw();
    this.magpie.draw();
    if (this.paused) {
      Game.drawMessage("Paused");
    } else if (this.isLevelComplete()) {
      Game.drawMessage("All clear!");
    }
  }

  static drawMessage(message) {
    push();
    noStroke();
    fill(0,80);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(64);
    text(message, width / 2, height / 2);
    pop();
  }

  updateScore(reason) {
  }

  isLevelComplete() {
    return this.level.junk.length === 0 && this.magpie.capturedJunk === null;
  }
}