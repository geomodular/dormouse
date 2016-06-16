
/* Immutable type */
export default function Vector(x1, x2) {
  return {
    length: () => Math.sqrt(x1 * x1 + x2 * x2),
    rotate(phi) {
      const c = Math.cos(phi),
            s = Math.sin(phi);
      return Vector(c * x1 - s * x2, s * x1 + c * x2);
    },
    mul(number) {
      return Vector(x1 * number, x2 * number);
    }
  };
}
