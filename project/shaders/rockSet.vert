attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	vTextureCoord = aTextureCoord;

	vec4 filter =  texture2D(uSampler2, vTextureCoord);

	if(filter.g > 0.5)
		offset=aVertexNormal*0.25*filter.g;
	
	gl_Position = uPMatrix * uMVMatrix *  vec4(aVertexPosition+offset, 1.0);

}
