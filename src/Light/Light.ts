import { vec3 } from 'gl-matrix';

export class Light {

  //
  // light properties
  //
  private position: vec3;
  private color: vec3;

  constructor(position: vec3, color: vec3) {
    this.position = position;
    this.color = color;
  }

  public getPosition(): vec3 {
    return this.position;
  }

  public getColor(): vec3 {
    return this.color;
  }
}