import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.myQuad = new MyQuad(this.scene);
	}

    display(){
        /**
         * Exercise 4
         */
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
        
        //Face da frente
        this.scene.pushMatrix();
        this.scene.multMatrix(ex5_front);
        this.myQuad.display();
        this.scene.popMatrix();

        //Face de trás
        this.scene.pushMatrix();
        this.scene.multMatrix(ex5_y);
        this.scene.multMatrix(ex5_y);
        this.scene.multMatrix(ex5_front);
        this.myQuad.display();
        this.scene.popMatrix();
        
        //Face de baixo
        this.scene.pushMatrix();
        this.scene.multMatrix(ex5_x);
        this.scene.multMatrix(ex5_front);
        this.myQuad.display();
        this.scene.popMatrix();

        //Face de cima
        this.scene.pushMatrix();
        this.scene.multMatrix(ex5_x);
        this.scene.multMatrix(ex5_x);
        this.scene.multMatrix(ex5_x);
        this.scene.multMatrix(ex5_front);
        this.myQuad.display();
        this.scene.popMatrix();

        //Face direita
        this.scene.pushMatrix();
        this.scene.multMatrix(ex5_y);
        this.scene.multMatrix(ex5_front);
        this.myQuad.display();
        this.scene.popMatrix();

        //Face esquerda
        this.scene.pushMatrix();
        this.scene.multMatrix(ex5_y);
        this.scene.multMatrix(ex5_y);
        this.scene.multMatrix(ex5_y);
        this.scene.multMatrix(ex5_front);
        this.myQuad.display();
        this.scene.popMatrix();
    }
}
