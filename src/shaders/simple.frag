#version 300 es

precision highp float;

out vec4 outColor;

uniform vec3 u_resolution;

float gr = 1.61803;
float amp = 50.0;
float colstep = 1.60;
float edge = .8;

void main() {
    vec2 fragCoordNorm = gl_FragCoord.xy / u_resolution.y;
    vec2 rg1 = vec2(0, 0);
    float flatpos = gl_FragCoord.x * fragCoordNorm.x;
    vec2 rg = mod(flatpos * gr * amp, colstep) * edge < 1.0 ? rg1 : fragCoordNorm;
    outColor = vec4(rg, 0, 1).yzxw;
    // outColor = vec4(1, 0, .5, 1);
}
