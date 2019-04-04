import {
  mat4,
  vec3
} from 'gl-matrix';

export class Mesh {
  //
  // mesh properties
  //
  public vertices: number[];
  public normals: number[];
  public colors: number[];
  public indices: number[];

  //
  // model transform matrix
  //
  protected modelMatrix: mat4;

  //
  // shaders
  //
  public vertexShader: string;
  public fragmentShader: string;

  constructor() {

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

  public getModelMatrix(): mat4 {
    return this.modelMatrix;
  }

}