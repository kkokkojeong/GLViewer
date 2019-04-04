import { WebGLConstants } from './WebGLConstants';
import { vec3 } from 'gl-matrix';

//
// WebGL options
//
export interface WebglOptions {
  alpha: boolean;
  depth: boolean;
  stencil: boolean;
  antialias: boolean;
}

//
// WebGL context options
//
export interface ContextOptions {
  allowTextureFilterAnisotropic: boolean
  webgl: WebglOptions;
}

//
// Geometry Attributes
//
export interface Attribute {
  componentDatatype: ComponetDataType;
  componentPerAttribute: number;
  values: Float32Array | Float64Array;
}

export interface GeometryAttributes {
  position: Attribute;
  normal?: Attribute;
  st?: Attribute;
  color?: Attribute;
  bitangent?: Attribute;
  tangent?: Attribute;
}

export interface EllipsoidOptions {
  radii: vec3;
  primitiveType? : PrimitiveType;
  stackPartitions?: number;
  slicePartitions?: number;
}

//
// Component data type
//
export enum ComponetDataType {
  BYTE = WebGLConstants.BYTE,
  UNSIGNED_BYTE = WebGLConstants.UNSIGNED_BYTE,
  SHORT = WebGLConstants.SHORT,
  UNSIGNED_SHORT = WebGLConstants.UNSIGNED_SHORT,
  INT = WebGLConstants.INT,
  UNSIGNED_INT = WebGLConstants.UNSIGNED_INT,
  FLOAT = WebGLConstants.FLOAT,
  DOUBLE = WebGLConstants.DOUBLE
}

//
// Primitive type enum
//
export enum PrimitiveType {
  POINTS = WebGLConstants.POINTS,
  LINES = WebGLConstants.LINES,
  LINE_LOOP = WebGLConstants.LINE_LOOP,
  LINE_STRIP = WebGLConstants.LINE_STRIP,
  TRIANGLES = WebGLConstants.TRIANGLES,
  TRIANGLE_STRIP = WebGLConstants.TRIANGLE_STRIP,
  TRIANGLE_FAN = WebGLConstants.TRIANGLE_FAN
}

