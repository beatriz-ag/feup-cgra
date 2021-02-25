import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";

/**
 * MyTangram
 * @constructor
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}

    initBuffers(){
        this.diamond = new MyDiamond(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
        this.bigTriangle = new MyTriangleSmall(this.scene);
    }

    display(){
        /* Diamond matrix */
        //Transalation
        var diamondMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            1, 2, 0, 1
        ];
        /* End diamond matrix */


        /* Paralelogram matrixs */
        //Translation
        var parallelogramMatrix1 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            2, 0, 0, 1       
        ];
        //Rotation
        var parallelogramMatrix2 = [
           -1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1       
        ];
        /* End paralelogram matrixs*/


        /* Purple triangle matrixs*/
        //Translation
         var purpleTriangleMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 1, 0, 1
        ];
        /* End purple triangle matrixs */


        /* Red triangle matrixs */
        //Rotation
         var redTriangleMatrix1 = [
            0, 1, 0, 0,
           -1, 0, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        //Translation
        var redTriangleMatrix2 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            1, -2, 0, 1
        ];
        /* End red triangle matrixs */


        /* Pink triangle matrix */
        //Translation
        var pinkTriangleMatrix =  [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            3, 1, 0, 1
        ];
        /* End pink triangle matrix*/


        /* Big triangle matrixs */
        //Scale
        var bigTriangleMatrix1= [
            3, 0, 0, 0,
            0, 3, 0, 0,
            0, 0, 1, 0, 
            0, 0, 0, 1
        ]
        //Translation
        var bigTriangleMatrix2= [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0, 
            -2/3,-1/3, 0, 1
        ]
        /* End big triangle matrixs*/

        this.scene.pushMatrix();
        this.scene.multMatrix(diamondMatrix);
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(parallelogramMatrix1);
        this.scene.multMatrix(parallelogramMatrix2);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(purpleTriangleMatrix);
        this.purpleTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(redTriangleMatrix1);
        this.scene.multMatrix(redTriangleMatrix2);
        this.redTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(pinkTriangleMatrix);
        this.pinkTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(bigTriangleMatrix1);
        this.scene.multMatrix(bigTriangleMatrix2);
        this.bigTriangle.display();
        this.scene.popMatrix();

    }

}