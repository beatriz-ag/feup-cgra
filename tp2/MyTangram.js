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
		this.initBuffers(scene);
	}

    initBuffers(scene){
        this.diamond = new MyDiamond(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.purpleTriangle = new MyTriangleSmall(scene);
        this.redTriangle = new MyTriangleSmall(scene);
        this.pinkTriangle = new MyTriangle(scene);
        this.bigTriangle = new MyTriangleSmall(scene);
    }

    display(scene){
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

        scene.pushMatrix();
        scene.multMatrix(diamondMatrix);
        this.diamond.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.multMatrix(parallelogramMatrix1);
        scene.multMatrix(parallelogramMatrix2);
        this.parallelogram.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.multMatrix(purpleTriangleMatrix);
        this.purpleTriangle.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.multMatrix(redTriangleMatrix1);
        scene.multMatrix(redTriangleMatrix2);
        this.redTriangle.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.multMatrix(pinkTriangleMatrix);
        this.pinkTriangle.display();
        scene.popMatrix();

        scene.pushMatrix();
        scene.multMatrix(bigTriangleMatrix1);
        scene.multMatrix(bigTriangleMatrix2);
        this.bigTriangle.display();
        scene.popMatrix();

    }

}