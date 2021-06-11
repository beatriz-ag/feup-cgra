import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { CGFtexture, CGFscene, CGFcamera, CGFaxis, CGFappearance } from "../lib/CGF.js";


/**
 * MyTangram
 * @constructor
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {

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

    initMaterials() {

        this.myTexture = new CGFtexture(this.scene, "images/tangram.png");
        this.myMaterial = new CGFappearance(this.scene);

    }

    display() {
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
        var pinkTriangleMatrix = [
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
            -1 / 3, 1 / 3, 0, 1
        ]

        //Rotation & Scale left
        var leftbigTriagnleMatrix1 = [
            -1.5, 0, 0, 0,
            0, 3 / 2, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1

        ]

        // Translation left
        var leftbigTriagnleMatrix2 = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            -10 / 3, 1 / 3, 0, 1
        ]
        /* End big triangle matrixs*/

        /**
         * Pink triangle texture coord
         */
        var pinkCoords = [
            0.00, 0.50,
            0.50, 1.00,
            0.00, 1.00
        ]
        /**
         * Blue triangle texture coord
         */
        var blueCoords = [
            1.0, 0.0,
            0.0, 0.0,
            0.5, 0.5
        ]
        /**
         * Orange triangle texture coord
         */
        var orangeCoord = [
            1.0, 0.0,
            0.5, 0.5,
            1.0, 1.0
        ]
        /**
         * Red Triangle texture coord
         */
        var redCoord = [
            0.25, 0.75,
            0.50, 0.50,
            0.75, 0.75
        ]
        /**
         * Purple Triangle texture coord
         */
        var purpleCoord = [
            0.00, 0.00,
            0.25, 0.25,
            0.00, 0.50
        ]

        this.myMaterial.setTexture(this.myTexture);

        this.scene.pushMatrix();
        this.scene.multMatrix(diamondMatrix);
        this.myMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.myMaterial.apply();
        this.scene.multMatrix(parallelogramMatrix1);
        this.scene.multMatrix(parallelogramMatrix2);
        this.parallelogram.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.myMaterial.apply();
        this.purpleTriangle.updateTexCoords(purpleCoord);
        this.scene.multMatrix(purpleTriangleMatrix);
        this.purpleTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.myMaterial.apply();
        this.redTriangle.updateTexCoords(redCoord);
        this.scene.multMatrix(redTriangleMatrix1);
        this.scene.multMatrix(redTriangleMatrix2);
        this.redTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.pinkTriangle.updateTexCoords(pinkCoords);
        this.scene.multMatrix(pinkTriangleMatrix);
        this.pinkTriangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.rightBigTriangle.updateTexCoords(orangeCoord);
        this.myMaterial.apply();
        this.scene.multMatrix(rightbigTriagnleMatrix2);
        this.scene.multMatrix(bigTriangleMatrix1);
        this.rightBigTriangle.display();
        this.scene.popMatrix()

        this.scene.pushMatrix();
        this.leftBigTriangle.updateTexCoords(blueCoords);
        this.myMaterial.apply();
        this.scene.multMatrix(leftbigTriagnleMatrix2);
        this.scene.multMatrix(leftbigTriagnleMatrix1);
        this.leftBigTriangle.display();
        this.scene.popMatrix();
    }

    updateBuffers(complexity) {
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.purpleTriangle.enableNormalViz();
        this.redTriangle.enableNormalViz();
        this.pinkTriangle.enableNormalViz();
        this.leftBigTriangle.enableNormalViz();
        this.rightBigTriangle.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.purpleTriangle.disableNormalViz();
        this.redTriangle.disableNormalViz();
        this.pinkTriangle.disableNormalViz();
        this.leftBigTriangle.disableNormalViz();
        this.rightBigTriangle.disableNormalViz();
    }

}