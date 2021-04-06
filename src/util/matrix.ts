import { Point } from "./point";

export type Matrix = [
  number, number, number,
  number, number, number,
  number, number, number,
];

export const identity = (point: Point): Matrix => ([
  1, 0, 0,
  0, 1, 0,
  0, 0, 1,
  ]);

export const translate = (point: Point): Matrix => ([
1, 0, point.x,
0, 1, point.y,
0, 0, 1,
]);

export const rotation = (radians: number): Matrix => ([
  Math.cos(radians), -Math.sin(radians), 0,
  Math.sin(radians), Math.cos(radians), 0,
  0, 0, 1,
]);

export const dot = (a: Matrix, b: Matrix): Matrix => ([
  a[0] * b[0] + a[1] * b[3] + a[2] * b[6], a[0] * b[1] + a[1] * b[4] + a[2] * b[7], a[0] * b[2] + a[1] * b[5] + a[2] * b[8],
  a[3] * b[0] + a[4] * b[3] + a[5] * b[6], a[3] * b[1] + a[4] * b[4] + a[5] * b[7], a[3] * b[2] + a[4] * b[5] + a[5] * b[8],
  a[6] * b[0] + a[7] * b[3] + a[8] * b[6], a[6] * b[1] + a[7] * b[4] + a[8] * b[7], a[6] * b[2] + a[7] * b[5] + a[8] * b[8],
]);