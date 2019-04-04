import { ShaderUtil } from '../Util/ShaderUtil';
import { Camera } from '../Camera/Camera';
import { GLMouse } from '../Camera/GLMouse';
import { Light } from '../Light/Light';
import { mat4 } from 'gl-matrix';

interface ObjectList {
  vertexBuffer: WebGLBuffer,
  normalBuffer?: WebGLBuffer,
  colorBuffer?: WebGLBuffer,
  faceBuffer: WebGLBuffer
  faceSize: number;
  shaderProgram: WebGLProgram;
}

export class PhongRenderer {

  //
  // rendering properties
  //
  private _width: number;
  private _height: number;
  private gl: WebGLRenderingContext;

  //
  // object properties
  //
  private objLists: ObjectList[] = [];
  private camera: Camera;
  private trackball: GLMouse;
  private light: Light;

  constructor(canvas?: HTMLCanvasElement) {
    this.gl = canvas.getContext('experimental-webgl');

    this._width = canvas.clientWidth;
    this._height = canvas.clientHeight;
  }

  public init(r: number, g: number, b: number, a: number = 0.1): void {
    this.gl.clearColor(r, g, b, a);
    this.gl.clearDepth(1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);

    this.gl.viewport(0, 0, this._width, this._height);
  }

  public destroy(): void {
    this.objLists.forEach((el: ObjectList): void => {
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, el.vertexBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, 0, this.gl.STATIC_DRAW);
      this.gl.deleteBuffer(el.vertexBuffer);

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, el.colorBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, 0, this.gl.STATIC_DRAW);
      this.gl.deleteBuffer(el.colorBuffer);

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, el.normalBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, 0, this.gl.STATIC_DRAW);
      this.gl.deleteBuffer(el.normalBuffer);

      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, el.faceBuffer);
      this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, 0, this.gl.STATIC_DRAW);
      this.gl.deleteBuffer(el.faceBuffer);
    });
  }

  public addObject(vertices: number[], colors: number[], normals: number[], indices: number[], vertexShader: string, fragmentShader: string): void {
    if (!vertices || !indices || !vertexShader || !fragmentShader) {
      return;
    }

    let objects = {} as ObjectList;

    objects.vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, objects.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

    objects.faceSize = indices.length;
    objects.faceBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, objects.faceBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

    if (colors) {
      objects.colorBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, objects.colorBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(colors), this.gl.STATIC_DRAW);
    }
    if (normals) {
      objects.normalBuffer = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, objects.normalBuffer);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(normals), this.gl.STATIC_DRAW);
    }
    objects.shaderProgram = ShaderUtil.createProgramFromShaderSources(this.gl, vertexShader, fragmentShader);

    this.objLists.push(objects);
  }


  public addCamera(camera: Camera): void {
    this.camera = camera;
  }

  public addMouse(trackball: GLMouse): void {
    this.trackball = trackball;
  }

  public addLight(light: Light): void {
    this.light = light
  }

  public render = (): void => {
    this.objLists.forEach((el: ObjectList): void => {
      this.gl.useProgram(el.shaderProgram);

      ///< attributes
      const positionLocation = this.gl.getAttribLocation(el.shaderProgram, 'aPosition');
      const vertexNormalLocation = this.gl.getAttribLocation(el.shaderProgram, 'aNormal');

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, el.vertexBuffer);
      this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, el.normalBuffer);
      this.gl.vertexAttribPointer(vertexNormalLocation, 3, this.gl.FLOAT, false, 0, 0)

      this.gl.enableVertexAttribArray(positionLocation);
      this.gl.enableVertexAttribArray(vertexNormalLocation);

      ///< uniforms
      const projectionLocation = this.gl.getUniformLocation(el.shaderProgram, 'uProjectionMatrix');
      const viewLocation = this.gl.getUniformLocation(el.shaderProgram, 'uViewingMatrix');
      const modelLocation = this.gl.getUniformLocation(el.shaderProgram, 'uModelMatrix');
      const normalLocation = this.gl.getUniformLocation(el.shaderProgram, 'uNormalMatrix');

      this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

      // test code
      const identityMatrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
      let normalMatrix: mat4 = mat4.create();
      mat4.copy(normalMatrix, this.trackball.view);
      mat4.invert(normalMatrix, normalMatrix);

      this.gl.uniformMatrix4fv(projectionLocation, false, this.camera.getProjectionMatrix());
      this.gl.uniformMatrix4fv(viewLocation, false, this.trackball.view);
      this.gl.uniformMatrix4fv(modelLocation, false, identityMatrix);
      this.gl.uniformMatrix4fv(normalLocation, false, normalMatrix);

      this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, el.faceBuffer);
      this.gl.drawElements(this.gl.TRIANGLES, el.faceSize, this.gl.UNSIGNED_SHORT, 0);
    });

    requestAnimationFrame(this.render);
  };

  public getWidth(): number {
    return this._width
  }

  public getHeight(): number {
    return this._height
  }
}