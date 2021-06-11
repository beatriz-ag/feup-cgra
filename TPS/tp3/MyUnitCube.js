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
			/**
			 * +Z
			 */
			-0.5, -0.5, 0.5,	//0
			 0.5, -0.5, 0.5,	//1
			 0.5,  0.5, 0.5,	//2
			-0.5,  0.5, 0.5,	//3
			
			/**
			 * +X
			 */
             0.5, -0.5, -0.5,   //4
             0.5,  0.5, -0.5,   //5
			 /**
			  * -Z
			  */
            -0.5, -0.5, -0.5,   //6
            -0.5,  0.5, -0.5,   //7

			/**
			 * -Y
			 */
			-0.5, -0.5, 0.5,	//0
			0.5, -0.5, 0.5,		//1
			0.5, -0.5, -0.5,	//4
			-0.5, -0.5, -0.5,	//6

			/**
			 * -X
			 */
			-0.5, -0.5, 0.5,	//0
			-0.5,  0.5, 0.5,	//3
			-0.5, -0.5, -0.5,   //6
		 	-0.5,  0.5, -0.5,   //7

			 /**
			  * +Y
			  */
			 0.5,  0.5, 0.5,	//2
			-0.5,  0.5, 0.5,	//3
			 0.5,  0.5, -0.5,   //5
			-0.5,  0.5, -0.5,   //7

			/**
			 * +X
			 */
			 0.5, -0.5, 0.5,	//1
			 0.5,  0.5, 0.5,	//2
			 /**
			  * -Z
			  */
		     0.5, -0.5, -0.5,   //4
		   	 0.5,  0.5, -0.5   //5

		];

		//Counter-clockwise reference of vertices
		this.indices = [
            //frente
			0, 1, 2,
			2, 3, 0,

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

		this.normals = [];

		for(var n = 0; n < 4; n++)
			this.normals.push(0, 0, 1); //+z
		
		for(var n = 0; n < 4; n++){
			if(n < 2) this.normals.push(1, 0, 0); //+x
			else this.normals.push(0, 0, -1);     //-z
		}

		for(var y_neg = 0; y_neg < 4; y_neg++){
			this.normals.push(0, -1, 0);  //-y
		}

		for(var x_neg = 0; x_neg < 4; x_neg++){
			this.normals.push(-1, 0, 0);  //-x
		}

		for(var y_pos = 0; y_pos < 4; y_pos++){
			this.normals.push(0, 1, 0);  //+y
		}

		for(var n = 0; n < 4; n++){
			if(n < 2) this.normals.push(1, 0, 0);	//+x
			else this.normals.push(0, 0, -1); 		//-z
		}


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

