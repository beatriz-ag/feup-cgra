import {CGFappearance, CGFobject} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, textures) {
		super(scene);
		this.initBuffers();
        this.textures = textures;
	}
	
	initBuffers() {
        this.myMaterial = new CGFappearance(this.scene);
		this.myQuad = new MyQuad(this.scene);
	}

    display(){

        var ex5_front = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0.5, 1
        ]
    
        var ex5_y = [
            0, 0, -1, 0,
            0, 1, 0, 0,
            1, 0, 0, 0,
            0, 0, 0, 1
        ]
    
        var ex5_x = [
            1, 0, 0, 0,
            0, 0, 1, 0,
            0, -1, 0, 0,
            0, 0, 0, 1
        ]

        
        //Face de cima
        this.myMaterial.setTexture(this.textures[0]);
        this.myMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MIN_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.multMatrix(ex5_x);
        this.scene.multMatrix(ex5_x);
        this.scene.multMatrix(ex5_x);
        this.scene.multMatrix(ex5_front);
        this.myQuad.display();
        this.scene.popMatrix();
        
        //Face da frente
        this.myMaterial.setTexture(this.textures[1]);
        this.myMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST );

        this.scene.pushMatrix();
        this.scene.multMatrix(ex5_front);
        this.myQuad.display();
        this.scene.popMatrix();

        //Face direita
        this.myMaterial.setTexture(this.textures[2]);
        this.myMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.multMatrix(ex5_y);
        this.scene.multMatrix(ex5_front);
        this.myQuad.display();
        this.scene.popMatrix();

        //Face de trás
        this.myMaterial.setTexture(this.textures[3]);
        this.myMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.multMatrix(ex5_y);
        this.scene.multMatrix(ex5_y);
        this.scene.multMatrix(ex5_front);
        this.myQuad.display();
        this.scene.popMatrix();
        
        //Face esquerda
        this.myMaterial.setTexture(this.textures[4]);
        this.myMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.multMatrix(ex5_y);
        this.scene.multMatrix(ex5_y);
        this.scene.multMatrix(ex5_y);
        this.scene.multMatrix(ex5_front);
        this.myQuad.display();
        this.scene.popMatrix();

        //Face de baixo
        this.myMaterial.setTexture(this.textures[5]);
        this.myMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();
        this.scene.multMatrix(ex5_x);
        this.scene.multMatrix(ex5_front);
        this.myQuad.display();
        this.scene.popMatrix();
    }
}
