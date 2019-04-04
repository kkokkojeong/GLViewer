import { DeveloperError } from '../../Common/CustomError';
import {
  Attribute,
  PrimitiveType
} from '../../Interface/common';
import { defaultValue } from '../../Common/TypeFunction';

export class Geometry {

  public attributes: Attribute;
  public indices: Uint16Array;
  public primitiveType : PrimitiveType;

  constructor(options) {
    if (!options.attributes) {
      throw new DeveloperError('options.attributes is required, actual value was undefined');
    }

    this.attributes = options.attributes;
    this.indices = options.indices;
    this.primitiveType = defaultValue(options.primitiveType, PrimitiveType.TRIANGLES);
  }
}
