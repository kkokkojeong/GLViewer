import { vec3 } from 'gl-matrix';
import { defaultValue } from '../../Common/TypeFunction';
import { ComponetDataType, PrimitiveType } from '../../Interface/common';
export class Plane {
    constructor(options) {
        this.min = defaultValue(options.min, vec3.fromValues(-0.5, -0.5, 0.0));
        this.max = defaultValue(options.max, vec3.fromValues(0.5, 0.5, 0.0));
        this.primitiveType = defaultValue(options.primitiveType, PrimitiveType.TRIANGLES);
    }
    createGeometry() {
        let indices = new Uint16Array(2 * 3);
        let positions = new Float64Array(4 * 3);
        // calculate plane geometry(vertices)
        //     3  -------------  2 max
        //       /            /
        // min 0 -------------   1
        positions[0] = this.min[0];
        positions[1] = this.min[1];
        positions[2] = 0.0;
        positions[3] = this.max[0];
        positions[4] = this.min[1];
        positions[5] = 0.0;
        positions[6] = this.max[0];
        positions[7] = this.max[1];
        positions[8] = 0.0;
        positions[9] = this.min[0];
        positions[10] = this.max[1];
        positions[11] = 0.0;
        // calculate plane geometry(indices)
        indices[0] = 0;
        indices[1] = 1;
        indices[2] = 2;
        indices[3] = 0;
        indices[4] = 2;
        indices[5] = 3;
        return {
            attributes: {
                componentDatatype: ComponetDataType.DOUBLE,
                componentPerAttribute: 3,
                values: positions
            },
            indices: indices,
            primitiveType: PrimitiveType.TRIANGLES
        };
    }
}
//# sourceMappingURL=Plane.js.map