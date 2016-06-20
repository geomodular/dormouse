import Vector from './vector';

export default function Circle(x, y, r, phi = 0) {
  return {
    x, // Position X
    y, // Position y
    r, // Radius r
    h: Vector(0, 1).rotate(phi) // Heading h
  };
}
