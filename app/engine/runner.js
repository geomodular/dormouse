import Timer from './timer';

function mousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
    button: null
  };
}

const Engine = {};

Engine.canvas = null;
Engine.ctx = null;
Engine.draw = () => {};
Engine.update = () => {};
Engine.onMouseMove = () => {};
Engine.onMouseDown = () => {};
Engine.onMouseUp = () => {};
Engine.mouseMove = false;
Engine.mouseDown = false;
Engine.mouseUp = false;
Engine.mouseState = { x: 0, y: 0, button: null }

/* Main cycle */
Engine.run = function(canvas) {

  Engine.canvas = canvas;
  Engine.ctx = canvas.getContext('2d');

  /* Set mouse events */
  canvas.addEventListener('mousemove', function(evt) {
    Engine.mouseState = mousePos(canvas, evt);
    Engine.mouseMove = true;
  });

  canvas.addEventListener('mousedown', function(evt) {
    Engine.mouseState = mousePos(canvas, evt);
    Engine.mouseState.button = evt.button;
    Engine.mouseDown = true;
  });

  canvas.addEventListener('mouseup', function(evt) {
    Engine.mouseState = mousePos(canvas, evt);
    Engine.mouseState.button = evt.button;
    Engine.mouseUp = true;
  });

  /* Set loop */
  let oldstamp = null;

  function loop(timestamp) {
    const dt = (timestamp - oldstamp) / 1000;

    /* Update and draw */
    Timer.update(dt); // On each cycle we have to update the timer
    if (Engine.mouseMove) Engine.onMouseMove(Engine.mouseState);
    if (Engine.mouseDown) Engine.onMouseDown(Engine.mouseState);
    if (Engine.mouseUp) Engine.onMouseUp(Engine.mouseState);
    Engine.update(dt);
    Engine.draw();
    Engine.mouseMove = false;
    Engine.mouseDown = false;
    Engine.mouseUp = false;

    oldstamp = timestamp;

    window.requestAnimationFrame(loop);
  }

  /* Init oldstamp variable */
  window.requestAnimationFrame(function(timestamp) {
    oldstamp = timestamp / 1000; // Obtain seconds
    window.requestAnimationFrame(loop);
  });
}

Engine.drawImage = function(image, x, y) {
  Engine.ctx.drawImage(image, x, y);
}

Engine.drawClip = function(image, clip, x, y) {
  Engine.ctx.drawImage(image, clip.x, clip.y, clip.w, clip.h, x, y, clip.w, clip.h);
}

export default Engine;
