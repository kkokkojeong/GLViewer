import { mat4 } from 'gl-matrix';
import { Mesh } from './Mesh';
export class Plane extends Mesh {
    constructor() {
        super();
        this.initialize();
    }
    initialize() {
        this.modelMatrix = mat4.create();
        this.vertices = [
            -1, -1, 0,
            1, -1, 0,
            1, 1, 0,
            -1, 1, 0
        ];
        this.colors = [
            0.3, 0.3, 0.8,
            0.3, 0.3, 0.8,
            0.3, 0.3, 0.8,
            0.3, 0.3, 0.8
        ];
        this.indices = [
            0, 1, 2, 0, 2, 3
        ];
        this.vertexShader =
            `precision mediump float;
    
      attribute vec3 aPosition;
      attribute vec3 aColor;
      
      uniform mat4 uProjectionMatrix;
      uniform mat4 uViewingMatrix;
      uniform mat4 uModelMatrix;
      
      varying vec3 vColor;
      
      void main() {
        vColor = aColor;
        gl_Position = uProjectionMatrix * uViewingMatrix * uModelMatrix * vec4(aPosition, 1.0);
      }`;
        this.fragmentShader =
            ` precision mediump float;
  
      varying vec3 vColor;
      
      void main() {
        gl_FragColor = vec4(vColor, 1.0);
      }`;
    }
}
//# sourceMappingURL=Plane.js.map