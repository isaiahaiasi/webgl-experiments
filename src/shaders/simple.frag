#version 300 es

precision highp float;

out vec4 outColor;

uniform vec3 u_resolution;

float gr = 1.61803;
float amp = 1.4;
float colstep = 2.4;
float edge = 1.0;

void main() {
    vec2 rg1 = gl_FragCoord.yx / u_resolution.x;
    vec2 rg2 = gl_FragCoord.xy / u_resolution.y;
    float flatpos = gl_FragCoord.x * gl_FragCoord.y;
    vec2 rg = mod(flatpos * gr * amp, colstep) * edge < 1.0 ? rg1 : rg2;
    outColor = vec4(rg, 0, 1).yzxw;
    // outColor = vec4(1, 0, .5, 1);
}
