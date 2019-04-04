import { mat4, vec3 } from 'gl-matrix';
export class Camera {
    constructor() {
        this.viewMatrix = mat4.create();
        this.projectionMatrix = mat4.create();
        this.at = vec3.create();
        this.pos = vec3.create();
        this.up = vec3.create();
    }
    getViewMatrix() {
        return this.viewMatrix;
    }
    getProjectionMatrix() {
        return this.projectionMatrix;
    }
    setPosition(px, py, pz) {
        this.pos = vec3.fromValues(px, py, pz);
        this.updateViewMatrix();
    }
    setAt(ax, ay, az) {
        this.at = vec3.fromValues(ax, ay, az);
        this.updateViewMatrix();
    }
    setUpVector(ux, uy, uz) {
        this.up = vec3.fromValues(ux, uy, uz);
        this.updateViewMatrix();
    }
    setLookAt(px, py, pz, ax, ay, az, ux, uy, uz) {
        this.pos = vec3.fromValues(px, py, pz);
        this.at = vec3.fromValues(ax, ay, az);
        this.up = vec3.fromValues(ux, uy, uz);
        this.updateViewMatrix();
    }
    update(mat) {
        mat4.mul(this.viewMatrix, this.viewMatrix, mat);
    }
    updateViewMatrix() {
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
        this.viewMatrix = mat4.fromValues(u[0], u[1], u[2], 0.0, v[0], v[1], v[2], 0.0, n[0], n[1], n[2], 0.0, p[0], p[1], p[2], 1.0);
        mat4.invert(this.viewMatrix, this.viewMatrix);
    }
    perspective(fovy, aspect, near, far) {
        const angle = Math.tan((fovy * .5) * Math.PI / 180);
        this.projectionMatrix = mat4.fromValues(0.5 / angle, 0, 0, 0, 0, 0.5 * aspect / angle, 0, 0, 0, 0, -(far + near) / (far - near), -1, 0, 0, (-2 * far * near) / (far - near), 0);
    }
    orthographic(left, right, bottom, top, near, far) {
        this.projectionMatrix = mat4.fromValues(2 / (right - left), 0, 0, 0, 0, 2 / (top - bottom), 0, 0, 0, 0, 2 / (near - far), 0, (left + right) / (left - right), (bottom + top) / (bottom - top), (near + far) / (near - far), 1);
    }
}
//# sourceMappingURL=Camera.js.map