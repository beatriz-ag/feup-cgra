import { CGFobject } from '../lib/CGF.js';

/**
 * MyQuad
 * @constructor
 * @param {MyScene} scene - Reference to MyScene object
 * @param {Array} coords - Array of texture coordinates (optional)
 */

export class MyQuad extends CGFobject {
	constructor(scene, coords) {
		super(scene);
		this.initBuffers();
		if (coords != undefined)
			this.updateTexCoords(coords);
	}

	initBuffers() {
		this.vertices = [
			-50, -50, 0,	//0
			50, -50, 0,	//1
			-50, 50, 0,	//2
			50, 50, 0		//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 1, 0,
			2, 3, 1
		];

		//Facing Z positive
		this.normals = [
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];


		this.texCoords = [
			0.002, 0.998,
			0.998, 0.998,
			0.002, 0.002,
			0.998, 0.002
		]
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	/**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the quad
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}

