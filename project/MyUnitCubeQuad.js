import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 * @param defaultT - default texture
 */

export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, defaultT) {
        super(scene);
        this.initBuffers();
        this.textures = defaultT;
    }

    initBuffers() {
        this.myMaterial = new CGFappearance(this.scene);
        this.myMaterial.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.myMaterial.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.myMaterial.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.myMaterial.setEmission(1, 1, 1, 1);

        this.myQuad = new MyQuad(this.scene);
    }

    display() {

        var front = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 50, 1
        ]

        var y = [
            0, 0, -1, 0,
            0, 1, 0, 0,
            1, 0, 0, 0,
            0, 0, 0, 1
        ]

        var x = [
            1, 0, 0, 0,
            0, 0, 1, 0,
            0, -1, 0, 0,
            0, 0, 0, 1
        ]


        //Face de cima
        this.myMaterial.setTexture(this.textures[0]);
        this.myMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MIN_FILTER, this.scene.gl.LINEAR);

        this.scene.pushMatrix();
        this.scene.multMatrix(x);
        this.scene.multMatrix(x);
        this.scene.multMatrix(x);
        this.scene.multMatrix(front);
        this.myQuad.display();
        this.scene.popMatrix();

        //Face da frente
        this.myMaterial.setTexture(this.textures[1]);
        this.myMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

        this.scene.pushMatrix();
        this.scene.multMatrix(front);
        this.myQuad.display();
        this.scene.popMatrix();

        //Face direita
        this.myMaterial.setTexture(this.textures[2]);
        this.myMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

        this.scene.pushMatrix();
        this.scene.multMatrix(y);
        this.scene.multMatrix(front);
        this.myQuad.display();
        this.scene.popMatrix();

        //Face de trás
        this.myMaterial.setTexture(this.textures[3]);
        this.myMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

        this.scene.pushMatrix();
        this.scene.multMatrix(y);
        this.scene.multMatrix(y);
        this.scene.multMatrix(front);
        this.myQuad.display();
        this.scene.popMatrix();

        //Face esquerda
        this.myMaterial.setTexture(this.textures[4]);
        this.myMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

        this.scene.pushMatrix();
        this.scene.multMatrix(y);
        this.scene.multMatrix(y);
        this.scene.multMatrix(y);
        this.scene.multMatrix(front);
        this.myQuad.display();
        this.scene.popMatrix();

        //Face de baixo
        this.myMaterial.setTexture(this.textures[5]);
        this.myMaterial.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.LINEAR);

        this.scene.pushMatrix();
        this.scene.multMatrix(x);
        this.scene.multMatrix(front);
        this.myQuad.display();
        this.scene.popMatrix();
    }

    updateTexture(texture) {
        this.textures = texture;
    }
}
