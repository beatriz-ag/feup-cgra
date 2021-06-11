#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {

    vec4 filter = texture2D(uSampler2, vTextureCoord + vec2(timeFactor*0.0025,timeFactor*0.0025));

    vec2 offset = vec2(filter.r, filter.g) - 0.5;

    vec2 newTextureCoord = vTextureCoord + offset * 0.3;

    float sValue = (newTextureCoord.s < 0.0 || newTextureCoord.s > 1.0) ? vTextureCoord.s:newTextureCoord.s;
    float tValue = (newTextureCoord.t < 0.0 || newTextureCoord.t > 1.0) ? vTextureCoord.t:newTextureCoord.t;

    vec4 color = texture2D(uSampler, vec2(sValue, tValue));
    
    gl_FragColor =  color;
}
