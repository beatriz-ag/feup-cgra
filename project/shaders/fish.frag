#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
varying vec4 coords;

uniform vec4 fishColor;

void main() {

    vec4 color = texture2D(uSampler, vTextureCoord);

    if (coords.z > 0.05)
		  gl_FragColor =  fishColor;
    else
        gl_FragColor =  color;
}
