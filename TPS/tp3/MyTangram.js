import {CGFobject} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";


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
        
        this.initMaterials();
        this.normals = [];
        this.diamond = new MyDiamond(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
        this.leftBigTriangle = new MyTriangle(this.scene);
        this.rightBigTriangle = new MyTriangle(this.scene);

    }

    initMaterials(){
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.yellow.setDiffuse(1.0, 1.0, 0.0, 1.0);
        this.yellow.setSpecular(1.0, 1.0, 0.0, 1.0);
        this.yellow.setShininess(10.0);
        
        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(1.0, 0.65, 0.0, 1.0);
        this.orange.setDiffuse(1.0, 0.65, 0.0, 1.0);
        this.orange.setSpecular(1.0, 0.65, 0.0, 1.0);
        this.orange.setShininess(10.0);
        
        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1.0, 0.0, 0.0, 1.0);
        this.red.setDiffuse(1.0, 0.0, 0.0, 1.0);
        this.red.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.red.setShininess(10.0);

        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0.0, 1.0, 0.0, 1.0);
        this.green.setDiffuse(0.0, 1.0, 0.0, 1.0);
        this.green.setSpecular(0.0, 1.0, 0.0, 1.0);
        this.green.setShininess(10.0);

        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0.0, 0.61, 1.0, 1.0);
        this.blue.setDiffuse(0.0, 0.61, 1.0, 1.0);
        this.blue.setSpecular(0.0, 0.61, 1.0, 1.0);
        this.blue.setShininess(10.0);

        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(0.59, 0.31, 0.75, 1.0);
        this.purple.setDiffuse(0.59, 0.31, 0.75, 1.0);
        this.purple.setSpecular(0.59, 0.31, 0.75, 1.0);
        this.purple.setShininess(10.0);

        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(1.0, 0.61, 0.81, 1.0);
        this.pink.setDiffuse(1.0, 0.61, 0.81, 1.0);
        this.pink.setSpecular(0, 0, 0, 1.0);
        this.pink.setShininess(10.0);
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
        //Scale Right
        
        var bigTriangleMatrix1 = [
            1.5, 0, 0, 0,
            0, 1.5, 0, 0,
            0, 0, 1.5, 0,
            0, 0, 0, 1
        ]
        //Transaltion Right
        var rightbigTriagnleMatrix2 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -1/3, 1/3, 0, 1
        ]

        //Rotation & Scale left
        var leftbigTriagnleMatrix1 = [
            -1.5, 0, 0, 0,
            0, 3/2, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1

        ]

        // Translation left
        var leftbigTriagnleMatrix2 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -10/3, 1/3, 0, 1
        ]
        /* End big triangle matrixs*/

        this.scene.pushMatrix();
        this.scene.multMatrix(diamondMatrix);
        if(this.scene.tangramApplyCustom) this.scene.customMaterial.apply();
        else this.green.apply();
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(parallelogramMatrix1);
        this.scene.multMatrix(parallelogramMatrix2);
        this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(purpleTriangleMatrix);
        this.purple.apply();
        this.purpleTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(redTriangleMatrix1);
        this.scene.multMatrix(redTriangleMatrix2);
        this.red.apply();
        this.redTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(pinkTriangleMatrix);
        this.pink.apply();
        this.pinkTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.multMatrix(rightbigTriagnleMatrix2);
        this.scene.multMatrix(bigTriangleMatrix1);
        this.orange.apply();
        this.rightBigTriangle.display();
        this.scene.popMatrix()
  
        this.scene.pushMatrix();
        this.scene.multMatrix(leftbigTriagnleMatrix2);
        this.scene.multMatrix(leftbigTriagnleMatrix1);
        this.blue.apply();
        this.leftBigTriangle.display();
        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.purpleTriangle.enableNormalViz();
        this.redTriangle.enableNormalViz();
        this.pinkTriangle.enableNormalViz();
        this.leftBigTriangle.enableNormalViz();
        this.rightBigTriangle.enableNormalViz();
    }

    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.purpleTriangle.disableNormalViz();
        this.redTriangle.disableNormalViz();
        this.pinkTriangle.disableNormalViz();
        this.leftBigTriangle.disableNormalViz();
        this.rightBigTriangle.disableNormalViz();
    }

}