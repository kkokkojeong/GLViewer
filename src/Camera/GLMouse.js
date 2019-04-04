import { mat4, vec3 } from 'gl-matrix';
export class GLMouse {
    constructor(canvas, spec = {}) {
        this.view = mat4.create();
        this.tick = () => {
            this.eye = getCircleCoord(this._lat, this._lon, this._radius);
            this._calView();
        };
        this.bindMouseUpEvent = () => {
            this._canvas.addEventListener('mouseup', this._handleMouseUp);
        };
        this.bindMouseDownEvent = () => {
            this._canvas.addEventListener('mousedown', this._handleMouseDown);
        };
        this.bindMouseWheelEvent = () => {
            this._canvas.addEventListener('mousewheel', this._handleMouseWheel);
        };
        this.removeMouseUpEvent = () => {
            this._canvas.removeEventListener('mouseup', this._handleMouseUp);
        };
        this.removeMouseDownEvent = () => {
            this._canvas.removeEventListener('mousedown', this._handleMouseDown);
        };
        this.removeMouseWheelEvent = () => {
            this._canvas.removeEventListener('mousewheel', this._handleMouseWheel);
        };
        this.removeMouseMoveEvent = () => {
            this._canvas.removeEventListener('mousemove', this._handleMouseMove);
        };
        this._handleMouseUp = () => {
            this._canvas.addEventListener('mousemove', this._handleMouseMove);
        };
        this._handleMouseDown = () => {
            console.log(this.wheelSpeed);
            this._canvas.addEventListener('mousemove', this._handleMouseMove);
        };
        this._handleMouseWheel = (ev) => {
            ev.preventDefault();
            this._radius -= ev.deltaY * this.wheelSpeed;
        };
        this._lastX = 0;
        this._lastY = 0;
        this._handleMouseMove = (ev) => {
            const { _lastX, _lastY } = this;
            const { screenX, screenY } = ev;
            this._lastX = screenX;
            this._lastY = screenY;
            if (!ev.buttons) {
                return;
            }
            ev.preventDefault();
            const dx = screenX - _lastX;
            const dy = screenY - _lastY;
            let lon = this._lon;
            lon += dy * this.wheelSpeed;
            this._lat += dx * this.wheelSpeed;
            if (lon > 1.57 || lon < -1.57) {
                this._lon = lon < 0 ? -1.57 : 1.57;
            }
            else {
                this._lon = lon;
            }
            this.tick();
        };
        this._canvas = canvas;
        const { height, width } = canvas;
        this.eye = spec.eye && vec3.copy(vec3.create(), spec.eye) || vec3.fromValues(0, 0, 1);
        this.wheelSpeed = spec.wheelSpeed || 0.001;
        this._calView();
        this._radius = getRadius(this.eye[0], this.eye[1], this.eye[2]) || 8;
        this._lat = getAngle([1, 0], [this.eye[0], this.eye[2]]);
        this._lon = getAngle([1, 0], [this.eye[2], this.eye[1]]);
        this.bindMouseUpEvent();
        this.bindMouseDownEvent();
        this.bindMouseWheelEvent();
    }
    _calView() {
        mat4.lookAt(this.view, this.eye, [0, 0, 0], [0, 1, 0]);
    }
}
function toFixed(n, f = 2) {
    return [
        parseInt(n[0].toFixed(f)),
        parseInt(n[1].toFixed(f)),
        parseInt(n[2].toFixed(f)),
    ];
}
function degToRad(degrees) {
    return degrees * Math.PI / 180;
}
function radToDeg(radian) {
    return radian * 180 / Math.PI;
}
function getRadius(x, y, z = 0) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
}
function getCircleCoord(lat, lon, r) {
    return vec3.fromValues(r * Math.cos(lat) * Math.cos(lon), r * Math.sin(lon), r * Math.sin(lat) * Math.cos(lon));
}
function getAngle(a, b) {
    return Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0]);
}
//# sourceMappingURL=GLMouse.js.map