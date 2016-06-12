import Timer from './timer';
import draw from './draw';
import update from './update';
import { loadImage, waitForImages } from './loader';

/* Main cycle */
function run(res, ctx) {
  let oldstamp = null;

  function loop(timestamp) {
    const dt = (timestamp - oldstamp) / 1000;

    /* Update */
    Timer.update(dt); // On each cycle we have to update the timer
    update(dt);

    /* Draw */
    ctx.drawImage(res.background, 0, 0);
    draw(res, ctx);

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
waitForImages([
  loadImage('background', '/img/bg.png'),
  loadImage('balls', '/img/balls.png')
])
.then(function(res) {
  const ctx = document.getElementById('app').getContext('2d');
  run(res, ctx);
})
.catch(function(err) {
  console.log('Error loading images', err); // eslint-disable-line
});
