#version 300 es

precision highp float;

out vec4 outColor;

uniform vec3 u_resolution;

void main() {
    outColor = vec4(gl_FragCoord.xy / u_resolution.x, 0, 1);
    // outColor = vec4(1, 0, .5, 1);
}
