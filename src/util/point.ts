import { Matrix } from "./matrix";

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

export const transform = (point: Point, matrix: Matrix): Point => ({
  x: point.x * matrix[0] + point.y * matrix[1] + matrix[2],
  y: point.y * matrix[3] + point.y * matrix[4] + matrix[5],
});