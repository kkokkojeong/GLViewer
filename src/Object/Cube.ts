import {
  mat4,
  vec3
} from 'gl-matrix'
import { Mesh } from './Mesh';

export class Cube {
  //
  // shader codes
  //
  public vertexShader = `
    precision mediump float;

    attribute vec3 aPosition;
    attribute vec3 aColor;

    uniform mat4 uProjectionMatrix;
    uniform mat4 uViewingMatrix;
    uniform mat4 uModelMatrix;

    varying vec3 vColor;

    void main() {
      vColor = aColor;
      //gl_Position = vec4(aPosition, 1.0);
      gl_Position = uProjectionMatrix * uViewingMatrix * uModelMatrix * vec4(aPosition, 1.0);
    }
  `;

  public fragmentShader = `
    precision mediump float;

    varying vec3 vColor;

    void main() {
      gl_FragColor = vec4(vColor, 1.0);
    }
  `;

  //
  // define vertices, colors, indices
  //
  public vertices: number[] = [
    -1, -1, -1,
    1, -1, -1,
    1, 1, -1,
    -1, 1, -1,
    -1, -1, 1,
    1, -1, 1,
    1, 1, 1,
    -1, 1, 1,
    -1, -1, -1,
    -1, 1, -1,
    -1, 1, 1,
    -1, -1, 1,
    1, -1, -1,
    1, 1, -1,
    1, 1, 1,
    1, -1, 1,
    -1, -1, -1,
    -1, -1, 1,
    1, -1, 1,
    1, -1, -1,
    -1, 1, -1,
    -1, 1, 1,
    1, 1, 1,
    1, 1, -1
  ];
  public colors: number[] = [
    5, 3, 7,
    5, 3, 7,
    5, 3, 7,
    5, 3, 7,
    1, 1, 3,
    1, 1, 3,
    1, 1, 3,
    1, 1, 3,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    0, 0, 1,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 0, 0,
    1, 1, 0,
    1, 1, 0,
    1, 1, 0,
    1, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0,
    0, 1, 0
  ];

  public readonly indices: number[] = [
    0, 1, 2, 0, 2, 3,
    4, 5, 6, 4, 6, 7,
    8, 9, 10, 8, 10, 11,
    12, 13, 14, 12, 14, 15,
    16, 17, 18, 16, 18, 19,
    20, 21, 22, 20, 22, 23
  ];

  public readonly vertexNormals = [
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, 1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 0.0, -1.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, 1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    0.0, -1.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0,
    -1.0, 0.0, 0.0
  ];

  //
  //  model matrix
  //
  private modelMatrix: mat4;

  constructor() {
    //super();

    this.modelMatrix = mat4.create();
  }

  public setPosition(px: number, py: number, pz: number): void {
    mat4.translate(this.modelMatrix, this.modelMatrix, vec3.fromValues(px, py, pz));
  }

  public setRotation(radian: number, rx: number, ry: number, rz: number): void {
    mat4.rotate(this.modelMatrix, this.modelMatrix, radian, vec3.fromValues(rx, ry, rz));
  }


  public setScale(sx: number, sy: number, sz: number): void {
    mat4.scale(this.modelMatrix, this.modelMatrix, vec3.fromValues(sx, sy, sz));
  }

}