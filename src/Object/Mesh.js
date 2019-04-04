import { mat4, vec3 } from 'gl-matrix';
export class Mesh {
    constructor() {
    }
    setPosition(px, py, pz) {
        mat4.translate(this.modelMatrix, this.modelMatrix, vec3.fromValues(px, py, pz));
    }
    setRotation(radian, rx, ry, rz) {
        mat4.rotate(this.modelMatrix, this.modelMatrix, radian, vec3.fromValues(rx, ry, rz));
    }
    setScale(sx, sy, sz) {
        mat4.scale(this.modelMatrix, this.modelMatrix, vec3.fromValues(sx, sy, sz));
    }
    getModelMatrix() {
        return this.modelMatrix;
    }
}
//# sourceMappingURL=Mesh.js.map