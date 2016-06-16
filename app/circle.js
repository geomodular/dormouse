import Vector from './vector';

export default function Circle(x, y, r, phi) {
  phi = phi || 0;
  return {
    x: x || 0, // Position X
    y: y || 0, // Position y
    r: r || 1, // Radius r
    h: Vector(0, 1).rotate(phi) // Heading h
  };
}
