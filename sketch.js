let game;

const MAX_DELTA_MS = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  game = new Game();
  
  window.addEventListener("blur", () => {
    game.paused = true;
  });
  window.addEventListener("focus", () => {
    game.paused = false;
  });
}

function draw() {
  background(0);
  if (!game.paused) {
    game.move(Math.min(deltaTime, MAX_DELTA_MS));
  }
  game.draw();
}
