export interface Point {
  x: number;
  y: number;
}

export const zero = () => ({
  x: 0,
  y: 0,
});

export const subtract = (a: Point, b: Point) => ({
  x: a.x - b.x,
  y: a.y - b.y,
});

export const add = (a: Point, b: Point) => ({
  x: a.x + b.x,
  y: a.y + b.y,
});

export const invert_x = (point: Point) => ({
  x: -point.x,
  y: point.y,
});

export const invert_y = (point: Point) => ({
  x: point.x,
  y: -point.y,
});