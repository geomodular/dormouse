import Engine from './engine/runner';
import State from './state';
import { loadImage, saveStatic, waitForResources } from './engine/loader';

waitForResources([
  loadImage('background', '/img/bg.png'),
  loadImage('balls', '/img/balls.png'),
  loadImage('items', '/img/items.png'),
  saveStatic('lightBall', { x: 0, y: 0, w: 18, h: 18 }),
  saveStatic('darkBall', { x: 18, y: 0, w: 18, h: 18 }),
  saveStatic('smallCircle', { x: 94, y: 0, w: 34, h: 34 }),
])
.then(function(res) {
  const canvas = document.getElementById('app');
  const state = State();

  function mouseonCircle(circle, x, y) {
    const X = (circle.x + 9) - x; // vector
    const Y = (circle.y + 9) - y;
    const dist = Math.sqrt(X * X + Y * Y);
    return dist <= (circle.r + 14);
  }

  function drawBall(ball, res) {
    Engine.drawClip(res.balls,
      ball.color === 'dark' ? res.darkBall : res.lightBall,
      ball.x, ball.y);
  }

  Engine.draw = function() {
    Engine.drawImage(res.background, 0, 0);
    state.balls.forEach((ball) => drawBall(ball, res));

    const {x, y} = Engine.mouseState;

    if (mouseonCircle(state.queues[0][0], x, y))
      Engine.drawClip(res.items, res.smallCircle, state.queues[0][0].x - 8, state.queues[0][0].y - 8);
    else if (mouseonCircle(state.queues[0][1], x, y))
      Engine.drawClip(res.items, res.smallCircle, state.queues[0][1].x - 8, state.queues[0][1].y - 8);
    else if (mouseonCircle(state.queues[1][2], x, y))
      Engine.drawClip(res.items, res.smallCircle, state.queues[1][2].x - 8, state.queues[1][2].y - 8);
    else if (mouseonCircle(state.queues[1][3], x, y))
      Engine.drawClip(res.items, res.smallCircle, state.queues[1][3].x - 8, state.queues[1][3].y - 8);
    else if (mouseonCircle(state.queues[2][4], x, y))
      Engine.drawClip(res.items, res.smallCircle, state.queues[2][4].x - 8, state.queues[2][4].y - 8);
    else if (mouseonCircle(state.queues[2][5], x, y))
      Engine.drawClip(res.items, res.smallCircle, state.queues[2][5].x - 8, state.queues[2][5].y - 8);
  }

  Engine.onMouseUp = function(evt) {
    if (mouseonCircle(state.queues[0][0], evt.x, evt.y))
      state.turnLeft(0);
    else if (mouseonCircle(state.queues[0][1], evt.x, evt.y))
      state.turnRight(0);
    else if (mouseonCircle(state.queues[1][2], evt.x, evt.y))
      state.turnLeft(1);
    else if (mouseonCircle(state.queues[1][3], evt.x, evt.y))
      state.turnRight(1);
    else if (mouseonCircle(state.queues[2][4], evt.x, evt.y))
      state.turnLeft(2);
    else if (mouseonCircle(state.queues[2][5], evt.x, evt.y))
      state.turnRight(2);
  }

  Engine.run(canvas);
})
.catch(function(err) {
  console.error('Error loading images', err); // eslint-disable-line
});
