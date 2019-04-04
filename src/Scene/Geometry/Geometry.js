import { DeveloperError } from '../../Common/CustomError';
import { PrimitiveType } from '../../Interface/common';
import { defaultValue } from '../../Common/TypeFunction';
export class Geometry {
    constructor(options) {
        if (!options.attributes) {
            throw new DeveloperError('options.attributes is required, actual value was undefined');
        }
        this.attributes = options.attributes;
        this.indices = options.indices;
        this.primitiveType = defaultValue(options.primitiveType, PrimitiveType.TRIANGLES);
    }
}
//# sourceMappingURL=Geometry.js.map