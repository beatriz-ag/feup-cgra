attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;

uniform float normScale;
varying vec4 coords;

void main() {
	vTextureCoord = aTextureCoord;
	
	vec4 vertex=vec4(aVertexPosition+aVertexNormal*normScale*0.1, 1.0);

	gl_Position = uPMatrix * uMVMatrix * vertex;

	coords=vertex/10.0;

}
