export class ShaderUtil {
  public static createProgramFromShaderSources(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram {
    let shaders = [];
    shaders.push(ShaderUtil.loadShader(gl, vertexShaderSource, gl.VERTEX_SHADER));
    shaders.push(ShaderUtil.loadShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER));
    return ShaderUtil.createProgram(gl, shaders);
  }

  public static createProgram(gl: WebGLRenderingContext, shaders: WebGLShader[]): WebGLProgram {
    let program = gl.createProgram();
    shaders.forEach(
      shader => {
        gl.attachShader(program, shader);
      }
    );
    gl.linkProgram(program);

    // Check the link status
    let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linked) {
      // something went wrong with the link
      let lastError = gl.getProgramInfoLog(program);
      console.log('Error in program linking:' + lastError);

      gl.deleteProgram(program);
      return null;
    }
    return program;
  }

  public static loadShader(gl: WebGLRenderingContext, shaderSource: string, shaderType: number): WebGLShader {
    // Create the shader object
    let shader = gl.createShader(shaderType);

    // Load the shader source
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check the compile status
    let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (!compiled) {
      // Something went wrong during compilation; get the error
      let lastError = gl.getShaderInfoLog(shader);
      console.log('*** Error compiling shader \'' + shader + '\':' + lastError);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }
}