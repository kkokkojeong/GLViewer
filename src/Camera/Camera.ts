import {
  mat4,
  vec3
} from 'gl-matrix'


export class Camera {

  //
  //  matrix
  //
  private viewMatrix: mat4;
  private projectionMatrix: mat4;

  //
  // viewing vector
  //
  private pos: vec3;
  private at: vec3;
  private up: vec3;

  constructor() {
    this.viewMatrix = mat4.create();
    this.projectionMatrix = mat4.create();

    this.at = vec3.create();
    this.pos = vec3.create();
    this.up = vec3.create();
  }

  public getViewMatrix(): mat4 {
    return this.viewMatrix;
  }

  public getProjectionMatrix(): mat4 {
    return this.projectionMatrix;
  }

  public setPosition(px: number, py: number, pz: number): void {
    this.pos = vec3.fromValues(px, py, pz);
    this.updateViewMatrix();
  }

  public setAt(ax: number, ay: number, az: number): void {
    this.at = vec3.fromValues(ax, ay, az);
    this.updateViewMatrix();
  }

  public setUpVector(ux: number, uy: number, uz: number): void {
    this.up = vec3.fromValues(ux, uy, uz);
    this.updateViewMatrix();
  }

  public setLookAt(px: number, py: number, pz: number, ax: number, ay: number, az: number, ux: number, uy: number, uz: number): void {
    this.pos = vec3.fromValues(px, py, pz);
    this.at = vec3.fromValues(ax, ay, az);
    this.up = vec3.fromValues(ux, uy, uz);

    this.updateViewMatrix();
  }

  public update(mat: mat4): void {
    mat4.mul(this.viewMatrix, this.viewMatrix, mat);
  }

  private updateViewMatrix(): void {
    let u = vec3.create();
    let v = vec3.create();
    let n = vec3.create();
    let p = vec3.create();

    vec3.subtract(n, this.pos, this.at);
    vec3.normalize(n, n);

    vec3.cross(u, this.up, n);
    vec3.normalize(u, u);

    vec3.cross(v, n, u);
    vec3.normalize(v, v);

    p[0] = vec3.dot(u, this.pos);
    p[1] = vec3.dot(v, this.pos);
    p[2] = vec3.dot(n, this.pos);

    this.viewMatrix = mat4.fromValues(
      u[0], u[1], u[2], 0.0,
      v[0], v[1], v[2], 0.0,
      n[0], n[1], n[2], 0.0,
      p[0], p[1], p[2], 1.0
    );
    mat4.invert(this.viewMatrix, this.viewMatrix);
  }

  public perspective(fovy: number, aspect: number, near: number, far: number): void {
    const angle = Math.tan((fovy * .5) * Math.PI / 180);

    this.projectionMatrix = mat4.fromValues(
      0.5 / angle, 0, 0, 0,
      0, 0.5 * aspect / angle, 0, 0,
      0, 0, -(far + near) / (far - near), -1,
      0, 0, (-2 * far * near) / (far - near), 0
    );
  }

  public orthographic(left: number, right: number, bottom: number, top: number, near: number, far: number): void {
    this.projectionMatrix = mat4.fromValues(
      2 / (right - left), 0, 0, 0,
      0, 2 / (top - bottom), 0, 0,
      0, 0, 2 / (near - far), 0,
      (left + right) / (left - right), (bottom + top) / (bottom - top), (near + far) / (near - far), 1
    );
  }
}