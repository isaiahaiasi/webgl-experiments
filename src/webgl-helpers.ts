interface WebGLContextGroup {
  canvas: HTMLCanvasElement;
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
}

export function initializeWebGLGroup(
  canvas: HTMLCanvasElement,
  vertShaderSrc: string,
  fragShaderSrc: string
): WebGLContextGroup {
  const gl = canvas.getContext("webgl2");

  if (!gl) {
    throw new Error("Could not get webgl2 context from canvas.");
  }

  const vertShader = createShader(gl, gl.VERTEX_SHADER, vertShaderSrc);
  const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSrc);

  if (!vertShader || !fragShader) {
    throw new Error(
      "Could not create shaders. Aborting WebGL2 initialization."
    );
  }

  const program = createProgram(gl, vertShader, fragShader);

  if (!program) {
    throw new Error(
      "Could not create program from shaders. Aborting WebGL2 initialization."
    );
  }

  return {
    canvas,
    gl,
    program,
  };
}

export function createShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);

  if (!shader) {
    throw new Error("Could not create shader from type " + type);
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  // Abort if necessary
  if (!success) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return;
  }

  return shader;
}

export function createProgram(
  gl: WebGL2RenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) {
  const program = gl.createProgram();

  if (!program) {
    throw new Error("Error creating WebGL2 program.");
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  // Abort if necessary
  if (!success) {
    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return;
  }

  return program;
}
