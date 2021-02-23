import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,	//0
			 0.5, -0.5, 0.5,	//1
			 0.5,  0.5, 0.5,	//2
			-0.5,  0.5, 0.5,	//3
             0.5, -0.5, -0.5,   //4
             0.5,  0.5, -0.5,   //5
            -0.5, -0.5, -0.5,   //6
            -0.5,  0.5, -0.5    //7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            //frente
			0, 1, 2,
			2, 3, 0,

            //direita
            1, 4, 5,
            5, 2, 1,

            //trás
            7, 5, 4,
            4, 6, 7,

            //esquerda
            3, 7, 6,
            6, 0, 3,

            //baixo
            4, 1, 0,
            0, 6, 4,

            //cima
            3, 2, 5,
            5, 7, 3

		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

