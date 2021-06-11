attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler2;
uniform sampler2D uSampler;


uniform float normScale;

void main() {
	vec3 offset=vec3(0.0,0.0,0.0);
	vTextureCoord = aTextureCoord;

	vec4 filterSand =  texture2D(uSampler2, vTextureCoord);

	offset= aVertexNormal*3.5*filterSand.g;
	
	gl_Position = uPMatrix * uMVMatrix *  vec4(aVertexPosition+offset, 1.0);

}

