import { RuntimeError } from '../Common/CustomError';
export class Context {
    get webgl2() {
        return this.supportedWebgl2;
    }
    set webgl2(supported) {
        this.supportedWebgl2 = supported;
    }
    constructor(canvas, options) {
        if (!WebGLRenderingContext) {
            throw new RuntimeError('The browser does not support WebGL.  Visit http://get.webgl.org.');
        }
        this.canvas = canvas;
        let webgl2;
        let glContext;
        glContext = canvas.getContext('webgl2') || canvas.getContext('experimental-webgl2') || undefined;
        if (glContext) {
            webgl2 = true;
        }
        else {
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
        }
        else {
        }
    }
    destroy() {
        // Todo: Create a common function to destroying objects
    }
    clear() {
        // Todo: Clear buffers(depth, color, stencil)
    }
    draw() {
        // Todo: Call draw commands
    }
}
//# sourceMappingURL=Context.js.map