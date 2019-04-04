import { vec3 } from 'gl-matrix';
import { defaultValue } from '../../Common/TypeFunction';
import { DeveloperError } from '../../Common/CustomError';
import { ComponetDataType, PrimitiveType } from '../../Interface/common';
import { Geometry } from './Geometry';
export class Ellipsoid {
    constructor(options) {
        if (!options.radii) {
            throw new DeveloperError('options.radii is required, actual value was undefined');
        }
        this.primitiveType = defaultValue(options.primitiveType, PrimitiveType.TRIANGLES);
        this.stackPartitions = Math.round(defaultValue(options.stackPartitions, 64));
        this.slicePartitions = Math.round(defaultValue(options.slicePartitions, 64));
        this.initialize(options.radii);
    }
    destroy() {
        this.radii = undefined;
        this.radiiSquared = undefined;
        this.radiiToTheFourth = undefined;
    }
    initialize(radii) {
        const x = radii[0];
        const y = radii[1];
        const z = radii[2];
        this.radii = vec3.fromValues(x, y, z);
        this.radiiSquared = vec3.fromValues(x * x, y * y, z * z);
        this.radiiToTheFourth = vec3.fromValues(x * x * x * x, y * y * y * y, z * z * z * z);
        this.minimumRadius = Math.min(x, y, z);
        this.maximumRadius = Math.max(x, y, z);
    }
    createGeometry() {
        const radii = this.radii;
        if (radii[0] <= 0 || radii[1] <= 0 || radii[2] <= 0) {
            return;
        }
        //
        // calculate ellipsoid geometry(vertices)
        //
        const slicePartitions = this.slicePartitions + 1;
        const stackPartitions = this.stackPartitions + 1;
        const vertexCount = slicePartitions * stackPartitions;
        const positions = new Float64Array(vertexCount * 3);
        const numIndices = 6 * (slicePartitions - 1) * (stackPartitions - 2);
        const indices = new Uint16Array(numIndices);
        const cosTheta = new Array(slicePartitions);
        const sinTheta = new Array(stackPartitions);
        let topOffset;
        let bottomOffset;
        let index = 0;
        for (let i = 0; i < slicePartitions; i++) {
            const theta = i * Math.PI * 2.0 / (slicePartitions - 1);
            cosTheta[i] = Math.cos(theta);
            sinTheta[i] = Math.sin(theta);
            positions[index++] = 0.0;
            positions[index++] = 0.0;
            positions[index++] = radii[2];
        }
        for (let i = 1; i < stackPartitions - 1; i++) {
            const phi = Math.PI * i / (stackPartitions - 1);
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);
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
            },
            indices: indices,
            primitiveType: this.primitiveType
        });
    }
}
//< reference `https://en.wikipedia.org/wiki/Ellipsoid`
//# sourceMappingURL=Ellipsoid.js.map