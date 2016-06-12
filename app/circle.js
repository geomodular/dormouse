export default function Circle(x, y, r) {
  return {
    x: x || 0, // Position X
    y: y || 0, // Position y
    r: r || 1, // Radius r
    h: [0, 1]  // Heading h
  };
}
