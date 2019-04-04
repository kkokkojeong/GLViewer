import { mat4, vec3 } from 'gl-matrix';
export class PhongCube {
    constructor() {
        //super();
        //
        // shader codes
        //
        this.vertexShader = `
    precision mediump float;

    attribute vec3 aPosition;
    attribute vec3 aNormal;
     
    uniform mat4 uProjectionMatrix; 
    uniform mat4 uViewingMatrix; 
    uniform mat4 uModelMatrix;
    uniform mat4 uNormalMatrix; 
     
    varying vec3 vNormal;
    varying vec3 vEyeVec;
 
     void main(void) {
       vec4 vertex = uViewingMatrix * uModelMatrix * vec4(aPosition, 1.0);
       vNormal = vec3(uNormalMatrix * vec4(aNormal, 1.0));
       vEyeVec = -vec3(vertex.xyz);

       gl_Position = uProjectionMatrix * uViewingMatrix * uModelMatrix * vec4(aPosition, 1.0);
    }`;
        this.fragmentShader = `
    precision highp float;
     
    const float shininess = 230.0;       
    const vec3 lightDirection = vec3(0.0, -1.0, -1.0);
     
    const vec4 lightAmbient = vec4(0.03, 0.03, 0.03, 1.0);
    const vec4 lightDiffuse = vec4(1.0, 0.0, 0.0, 1.0);
    const vec4 lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);
     
    varying vec3 vNormal;
    varying vec3 vEyeVec;
 
    void main(void) {
       vec3 L = normalize(lightDirection);
       vec3 N = normalize(vNormal);
       
       float lambertTerm = dot(N, -L);
       
       vec4 Ia = lightAmbient;
       vec4 Id = vec4(0.0,0.0,0.0,1.0);
       vec4 Is = vec4(0.0,0.0,0.0,1.0);
       
       if (lambertTerm > 0.0) {
            Id = lightDiffuse * lambertTerm;
            
            vec3 E = normalize(vEyeVec);
            vec3 R = reflect(L, N);
            float specular = pow( max(dot(R, E), 0.0), shininess);
            
            Is = lightSpecular * specular;
       }
       
       vec4 finalColor = Ia + Id + Is;
       finalColor.a = 1.0;
       
       gl_FragColor = finalColor;
   }`;
        //
        // define vertices, colors, indices
        //
        this.vertices = [
            -1, -1, -1,
            1, -1, -1,
            1, 1, -1,
            -1, 1, -1,
            -1, -1, 1,
            1, -1, 1,
            1, 1, 1,
            -1, 1, 1,
            -1, -1, -1,
            -1, 1, -1,
            -1, 1, 1,
            -1, -1, 1,
            1, -1, -1,
            1, 1, -1,
            1, 1, 1,
            1, -1, 1,
            -1, -1, -1,
            -1, -1, 1,
            1, -1, 1,
            1, -1, -1,
            -1, 1, -1,
            -1, 1, 1,
            1, 1, 1,
            1, 1, -1
        ];
        this.colors = [
            5, 3, 7,
            5, 3, 7,
            5, 3, 7,
            5, 3, 7,
            1, 1, 3,
            1, 1, 3,
            1, 1, 3,
            1, 1, 3,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 1, 0,
            1, 1, 0,
            1, 1, 0,
            1, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
        ];
        this.indices = [
            0, 1, 2, 0, 2, 3,
            4, 5, 6, 4, 6, 7,
            8, 9, 10, 8, 10, 11,
            12, 13, 14, 12, 14, 15,
            16, 17, 18, 16, 18, 19,
            20, 21, 22, 20, 22, 23
        ];
        this.vertexNormals = [
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0
        ];
        this.modelMatrix = mat4.create();
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
}
//# sourceMappingURL=PhongCube.js.map