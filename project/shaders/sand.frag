#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {

	vec4 color = texture2D(uSampler, vTextureCoord+vec2(0.01,0.01));   
	vec4 filter =  texture2D(uSampler2, vTextureCoord);

	if (filter.b < 0.5)
		color *= vec4(0.9,0.9,0.9,1.0);

	gl_FragColor = color;
}
