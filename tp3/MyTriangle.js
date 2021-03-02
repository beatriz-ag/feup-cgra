import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-1, 1, 0,	//canto dir sup -> 0
			-1, -1, 0,	//canto esq inf -> 1
			1, -1, 0,	//canto dir inf -> 2

			-1, 1, 0,	//canto dir sup -> 0
			-1, -1, 0,	//canto esq inf -> 1
			1, -1, 0	//canto dir inf -> 2

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 0
		];

		/*this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];*/
		this.normals = [];
		for(var n = 0; n < 6; n++){
			if(n < 3) this.normals.push(0, 0, 1);
			else this.normals.push(0, 0, -1);
		}

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

