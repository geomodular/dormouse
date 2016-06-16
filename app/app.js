import load from './load';
import Timer from './timer';
import { loadImage, saveStatic, waitForResources } from './loader';

function update() {}

function drawBall(ball, res) {
  let clip = null;
  if (ball.color === 'dark') {
    clip = res.darkBall;
  } else if (ball.color === 'light') {
    clip = res.lightBall;
  }
  res.ctx.drawImage(res.balls, clip.x, clip.y, clip.w, clip.h, ball.x, ball.y, 18, 18);
}

function draw(state, res) {
  res.ctx.drawImage(res.background, 0, 0);
  state.balls.forEach((ball) => drawBall(ball, res));
}

/* Main cycle */
function run(state, res) {
  let oldstamp = null;

  function loop(timestamp) {
    const dt = (timestamp - oldstamp) / 1000;

    /* Update and draw */
    Timer.update(dt); // On each cycle we have to update the timer
    update(state, dt);
    draw(state, res);

    oldstamp = timestamp;

    window.requestAnimationFrame(loop);
  }

  /* Init oldstamp variable */
  window.requestAnimationFrame(function(timestamp) {
    oldstamp = timestamp / 1000; // Obtain seconds
    window.requestAnimationFrame(loop);
  });
}

/* Start */
waitForResources([
  loadImage('background', '/img/bg.png'),
  loadImage('balls', '/img/balls.png'),
  saveStatic('lightBall', { x: 0, y: 0, w: 18, h: 18 }),
  saveStatic('darkBall', { x: 18, y: 0, w: 18, h: 18 }),
  saveStatic('ctx', document.getElementById('app').getContext('2d'))
])
.then(function(res) {
  const state = load();
  run(state, res);
})
.catch(function(err) {
  console.log('Error loading images', err); // eslint-disable-line
});
