import Ball from './ball'
import Circle from './circle';

function arrangeBalls(circle, balls) {
  return balls.map((ball, i) => {

    /* New ball position - relative */
    const pos = circle.h
      .rotate(2 * Math.PI / balls.length * i)
      .mul(circle.r);

    /* Make it absolute */
    return Object.assign({}, ball, {
      x: circle.x + pos.x,
      y: circle.y + pos.y
    });
  });
}

export default function load() {
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
    Ball(0, 0, 'dark'),
    Ball(0, 0, 'light'),
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

  return {
    circles,
    balls,
    queues
  };
}