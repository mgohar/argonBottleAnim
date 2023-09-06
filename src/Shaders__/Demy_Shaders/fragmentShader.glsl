// Gaussian blur fragment shader
uniform sampler2D inputTexture;
uniform vec2 resolution;
uniform float radius;

in vec2 vUv;

void main() {
    vec2 offx = vec2(radius, 0.0);
    vec2 offy = vec2(0.0, radius);

    vec4 pixel = texture(inputTexture, vUv)               * 4.0 +
                 texture(inputTexture, vUv - offx)        * 2.0 +
                 texture(inputTexture, vUv + offx)        * 2.0 +
                 texture(inputTexture, vUv - offy)        * 2.0 +
                 texture(inputTexture, vUv + offy)        * 2.0 +
                 texture(inputTexture, vUv - offx - offy) * 1.0 +
                 texture(inputTexture, vUv - offx + offy) * 1.0;


    gl_FragColor = pixel / 14.0; // Normalize the result
}
