import "./style.css";
import vertSrc from "./shaders/simple.vert?raw";
import fragSrc from "./shaders/simple.frag?raw";
import { initializeWebGLGroup } from "./webgl-helpers";
import { createIntroText } from "./introText";

const c = document.querySelector<HTMLCanvasElement>("#c");

function initWebGL(canvas: HTMLCanvasElement) {
  const { gl, program } = initializeWebGLGroup(canvas, vertSrc, fragSrc);

  // this is an obvious candidate for extracting to a function,
  // but don't know enough to generalize yet
  const positionAttribLocation = gl.getAttribLocation(program, "a_position");
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // now that the buffer is bound, I can send data to it
  const positions = [-1, -1, -1, 1, 1, 1, 1, 1, -1, -1, 1, -1];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // now need to specify how to get that data OUT of buffer
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.enableVertexAttribArray(positionAttribLocation);
  {
    // (creating new block to prevent these generic variables from leaking out)
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

  // set up viewport
  const { clientWidth, clientHeight } = canvas;
  canvas.width = clientWidth;
  canvas.height = clientHeight;
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(program);

  {
    // set resolution uniform

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform3fv(resolutionLocation, [clientWidth, clientHeight, 1]);
  }

  // which buffers to use
  gl.bindVertexArray(vao);

  // execute our program!
  {
    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = 6;
    gl.drawArrays(primitiveType, offset, count);
  }
}

if (c) {
  initWebGL(c);
  document.querySelector("#app")?.appendChild(createIntroText());
} else {
  console.error("Could not find canvas for webGL context!");
}
