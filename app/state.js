import Ball from './ball'
import Circle from './circle';

/* This function deliberately change ball state = side effect */
function arrangeBalls(circle, balls) {
  return balls.map((ball, i) => {

    /* New ball position - relative */
    /* i + 1 is just to match up with my LUA game prototype */
    const pos = circle.h
      .rotate(2 * Math.PI / balls.length * (i + 1))
      .mul(circle.r);

    /* New ball position */
    ball.x = circle.x + pos.x1();
    ball.y = circle.y + pos.x2();

    return ball;
  });
}

export default function state() {
  const circles = [
    Circle(128, 96, 46, 0.52),
    Circle(176, 96, 46, 0.52),
    Circle(152, 136, 46, 0.52)
  ];

  const balls = [
    Ball(0, 0, 'dark'),
    Ball(0, 0, 'dark'),
    Ball(0, 0, 'light'),
    Ball(0, 0, 'light'),
    Ball(0, 0, 'light'),
    Ball(0, 0, 'light'),
    Ball(0, 0, 'light'),
    Ball(0, 0, 'dark'),
    Ball(0, 0, 'dark'),
    Ball(0, 0, 'light'),
    Ball(0, 0, 'dark'),
    Ball(0, 0, 'dark')
  ];

  const q1 = [balls[0], balls[1], balls[2], balls[3], balls[4], balls[5]];
  const q2 = [balls[6], balls[2], balls[7], balls[8], balls[9], balls[4]];
  const q3 = [balls[5], balls[6], balls[3], balls[9], balls[10], balls[11]];

  const queues = [
    arrangeBalls(circles[0], q1),
    arrangeBalls(circles[1], q2),
    arrangeBalls(circles[2], q3)
  ];

  /* Side effects :/ */
  const updateCircles = [
    function() { // Circle 1
      queues[1][1] = queues[0][2];
      queues[1][5] = queues[0][4];
      queues[2][2] = queues[0][3];
      queues[2][0] = queues[0][5];
    },
    function() { // Circle 2
      queues[0][2] = queues[1][1];
      queues[0][4] = queues[1][5];
      queues[2][1] = queues[1][0];
      queues[2][3] = queues[1][4];
    },
    function() { // Circle 3
      queues[0][5] = queues[2][0];
      queues[0][3] = queues[2][2];
      queues[1][0] = queues[2][1];
      queues[1][4] = queues[2][3];
    }
  ];

  return {
    circles,
    balls,
    queues,

    turnRight(index) {
      const member = queues[index].pop();
      queues[index].unshift(member);
      updateCircles[index]();
      arrangeBalls(circles[index], queues[index]);
    },

    turnLeft(index) {
      const member = queues[index].shift();
      queues[index].push(member);
      updateCircles[index]();
      arrangeBalls(circles[index], queues[index]);
    }
  };
}
