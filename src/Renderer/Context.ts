import { ContextOptions } from '../Interface/common';
import { RuntimeError } from '../Common/CustomError';

export class Context {

  public gl: WebGLRenderingContext;

  private canvas: HTMLCanvasElement;
  private supportedWebgl2: boolean;

  get webgl2(): boolean {
    return this.supportedWebgl2;
  }

  set webgl2(supported: boolean) {
    this.supportedWebgl2 = supported;
  }

  constructor(canvas: HTMLCanvasElement, options: ContextOptions) {
    if (!WebGLRenderingContext) {
      throw new RuntimeError('The browser does not support WebGL.  Visit http://get.webgl.org.');
    }
    this.canvas = canvas as HTMLCanvasElement;

    let webgl2: boolean;
    let glContext: any;

    glContext = canvas.getContext('webgl2') || canvas.getContext('experimental-webgl2') || undefined;
    if (glContext) {
      webgl2 = true;
    } else {
      webgl2 = false;
      glContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') || undefined;
    }

    if (!glContext) {
      throw new RuntimeError('The browser supports WebGL, but initialization failed.');
    }

    this.gl = glContext;
    this.supportedWebgl2 = webgl2;

    // Todo: Describe WebGL extensions, set minimum, maximum vertex, texture properties
    if (webgl2) {

    } else {

    }
  }

  public destroy(): void {
    // Todo: Create a common function to destroying objects
  }

  public clear(): void {
    // Todo: Clear buffers(depth, color, stencil)
  }

  public draw(): void {
    // Todo: Call draw commands
  }
}
