import Circle from './circle';

export default function Ball(x, y, color) {
  const circle = Circle(x, y, 5);
  circle.color = color;
  return circle;
}
