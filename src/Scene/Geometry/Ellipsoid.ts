import { vec3 } from 'gl-matrix';
import { defaultValue } from '../../Common/TypeFunction';
import { DeveloperError } from '../../Common/CustomError';
import {
  ComponetDataType,
  Attribute,
  PrimitiveType
} from '../../Interface/common';
import { Geometry } from './Geometry';

export class Ellipsoid {

  private radii: vec3;
  private radiiSquared: vec3;
  private radiiToTheFourth: vec3;
  private readonly stackPartitions: number;
  private readonly slicePartitions: number;
  private readonly primitiveType: PrimitiveType;

  private minimumRadius: number;
  private maximumRadius: number;

  constructor(options: any) {
    if (!options.radii) {
      throw new DeveloperError('options.radii is required, actual value was undefined');
    }
    this.primitiveType = defaultValue(options.primitiveType, PrimitiveType.TRIANGLES);

    this.stackPartitions = Math.round(defaultValue(options.stackPartitions, 64));
    this.slicePartitions = Math.round(defaultValue(options.slicePartitions, 64));

    this.initialize(options.radii);
  }

  public destroy(): void {
    this.radii = undefined;
    this.radiiSquared = undefined;
    this.radiiToTheFourth = undefined;
  }

  public initialize(radii: vec3): void {
    const x: number = radii[0];
    const y: number = radii[1];
    const z: number = radii[2];

    this.radii = vec3.fromValues(x, y, z);
    this.radiiSquared = vec3.fromValues(x * x, y * y, z * z);
    this.radiiToTheFourth = vec3.fromValues(x * x * x * x, y * y * y * y, z * z * z * z);

    this.minimumRadius = Math.min(x, y, z);
    this.maximumRadius = Math.max(x, y, z);
  }

  public createGeometry(): Geometry {
    const radii = this.radii;
    if (radii[0] <= 0 || radii[1] <= 0 || radii[2] <= 0) {
      return;
    }

    //
    // calculate ellipsoid geometry(vertices)
    //
    const slicePartitions: number = this.slicePartitions + 1;
    const stackPartitions: number = this.stackPartitions + 1;

    const vertexCount: number = slicePartitions * stackPartitions;
    const positions: Float64Array = new Float64Array(vertexCount * 3);

    const numIndices: number = 6 * (slicePartitions - 1) * (stackPartitions - 2);
    const indices: Uint16Array = new Uint16Array(numIndices);

    const cosTheta: Array<number> = new Array(slicePartitions);
    const sinTheta: Array<number> = new Array(stackPartitions);

    let topOffset: number;
    let bottomOffset: number;
    let index: number = 0;

    for (let i = 0; i < slicePartitions; i++) {
      const theta: number = i * Math.PI * 2.0 / (slicePartitions - 1);

      cosTheta[i] = Math.cos(theta);
      sinTheta[i] = Math.sin(theta);

      positions[index++] = 0.0;
      positions[index++] = 0.0;
      positions[index++] = radii[2];
    }

    for (let i = 1; i < stackPartitions - 1; i++) {
      const phi: number = Math.PI * i / (stackPartitions - 1);
      const sinPhi: number = Math.sin(phi);
      const cosPhi: number = Math.cos(phi);

      for (let j = 0; j < slicePartitions; j++) {
        positions[index++] = radii[0] * cosTheta[j] * sinPhi;
        positions[index++] = radii[1] * sinTheta[j] * sinPhi;
        positions[index++] = radii[2] * cosPhi;
      }
    }

    for (let i = 0; i < slicePartitions; i++) {
      positions[index++] = 0.0;
      positions[index++] = 0.0;
      positions[index++] = -radii[2];
    }

    //
    // calculate ellipsoid geometry(indices)
    //
    index = 0;
    for (let i = 0; i < slicePartitions - 1; i++) {
      indices[index++] = slicePartitions + i;
      indices[index++] = slicePartitions + i + 1;
      indices[index++] = i + 1;
    }

    for (let i = 1; i < stackPartitions - 2; i++) {
      topOffset = i * slicePartitions;
      bottomOffset = (i + 1) * slicePartitions;

      for (let j = 0; j < slicePartitions - 1; j++) {
        indices[index++] = bottomOffset + j;
        indices[index++] = bottomOffset + j + 1;
        indices[index++] = topOffset + j + 1;

        indices[index++] = bottomOffset + j;
        indices[index++] = topOffset + j + 1;
        indices[index++] = topOffset + j;
      }
    }

    topOffset = (stackPartitions - 2) * slicePartitions;
    bottomOffset = (stackPartitions - 1) * slicePartitions;
    for (let i = 0; i < slicePartitions - 1; i++) {
      indices[index++] = bottomOffset + i;
      indices[index++] = topOffset + i + 1;
      indices[index++] = topOffset + i;
    }

    return new Geometry({
      attributes: {
        componentDatatype: ComponetDataType.DOUBLE,
        componentPerAttribute: 3,
        values: positions
      } as Attribute,
      indices: indices,
      primitiveType: this.primitiveType
    });
  }
}

//< reference `https://en.wikipedia.org/wiki/Ellipsoid`
