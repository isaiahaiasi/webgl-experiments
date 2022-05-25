import "./style.css";
import vertSrc from "./shaders/simple.vert?raw";
import fragSrc from "./shaders/simple.frag?raw";
import { initializeWebGLGroup } from "./webGLUtils";
import { createIntroText } from "./introText";
import { createCanvasStats } from "./canvasStats";
import { getCanvasResizer } from "./resizeCanvas";

const c = document.querySelector<HTMLCanvasElement>("#c");

function initWebGL(canvas: HTMLCanvasElement) {
  const { gl, program } = initializeWebGLGroup(canvas, vertSrc, fragSrc);

  // This is an obvious candidate for extracting to a function,
  // but don't know enough to generalize yet
  const positionAttribLocation = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now that the buffer is bound, I can send data to it
  const positions = [-1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Now need to specify how to get that data OUT of buffer
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionAttribLocation);
  {
    // Create a new block to prevent these generic variables from leaking out
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(
      positionAttribLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );
  }

  // iniitialize canvas resizer
  const resizeCanvasToDisplaysize = getCanvasResizer(canvas);

  function drawScene(_now: number) {
    // set up viewport
    resizeCanvasToDisplaysize();
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use our shader program
    gl.useProgram(program);

    // Set uniforms
    {
      const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
      gl.uniform3fv(resolutionLocation, [canvas.width, canvas.height, 1]);
    }

    // Which buffers to use
    gl.bindVertexArray(vao);

    // Execute our program!
    {
      const primitiveType = gl.TRIANGLES;
      const offset = 0;
      const count = 6;
      gl.drawArrays(primitiveType, offset, count);
    }

    // Render loop
    requestAnimationFrame(drawScene);
  }

  // Initiate render loop
  requestAnimationFrame(drawScene);
}

if (c) {
  initWebGL(c);
  const app = document.querySelector("#app");
  app?.appendChild(createIntroText());
  app?.appendChild(createCanvasStats(c));
} else {
  console.error("Could not find canvas for webGL context!");
}
