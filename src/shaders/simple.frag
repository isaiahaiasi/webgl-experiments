#version 300 es

precision highp float;

out vec4 outColor;

uniform vec3 u_resolution;

float gr = 1.61803;
float amp = 2.10;
float colstep = 2.90;
float edge = .9;
float thresh = 1.9;

void main() {
    vec2 fragCoordNorm = gl_FragCoord.xy / u_resolution.y;
    vec2 rg1 = vec2(0, 0);
    float flatpos = gl_FragCoord.x * gl_FragCoord.y;
    vec2 rg = mod(flatpos * gr * amp, colstep) * edge < thresh ? rg1 : fragCoordNorm;
    outColor = vec4(rg, 0, 1).yzxw;
    // outColor = vec4(1, 0, .5, 1);
}
