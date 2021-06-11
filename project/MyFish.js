import { CGFappearance, CGFtexture } from '../lib/CGF.js';
import { CGFobject } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";
import { MyTriangle } from './MyTriangle.js';
import { Utils } from './Utils.js';


/**
* MyFish
* @constructor
 * @param scene - Reference to MyScene object
*/

export class MyFish extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.initBuffers(texture);
    }
    initBuffers(texture) {
        this.sphereTex = new CGFtexture(this.scene, 'images/cute_attempt/top.jpg');
        this.eye = new CGFtexture(this.scene, 'images/fish/eye.png');

        this.eyeAppearance = new CGFappearance(this.scene);
        this.eyeAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.eyeAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.eyeAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.eyeAppearance.setEmission(1, 1, 1, 1);
        this.eyeAppearance.setShininess(10.0);

        this.fishColor = [0.7,0.8,1.0,1.0];

        this.fishAppearance = new CGFappearance(this.scene);
        this.fishAppearance.setAmbient(0.7, 0.8, 1.0, 1.0);
        this.fishAppearance.setDiffuse(0.7, 0.8, 1.0, 1.0);
        this.fishAppearance.setSpecular(0.7, 0.8, 1.0, 1.0);
        this.fishAppearance.setShininess(120);
        this.fishAppearance.setTexture(texture);

        this.sphere = new MySphere(this.scene, 64, 64);

        this.triangle = new MyTriangle(this.scene);

        this.tailAng = 0;
        this.finAngRight = 0;
        this.finAngLeft = 0;

        this.tailBack = false;
        this.finBackRight = false;
        this.finBackLeft = false;
        this.moveRighFin = true;
        this.moveLeftFin = true;

    }

    update(speed) {
        if (this.tailBack) {
            this.tailAng -= Math.PI / (40 - Math.min(speed * 100, 39.99));
            if (this.tailAng <= -Math.PI / 9) {
                this.tailAng = -Math.PI / 9;
                this.tailBack = false;
            }
        } else {
            this.tailAng += Math.PI / (40 - Math.min(speed * 100, 39.99));
            if (this.tailAng >= Math.PI / 9) {
                this.tailAng = Math.PI / 9;
                this.tailBack = true;
            }
        }

        if(this.moveRighFin) {
            if (this.finBackRight) {
                this.finAngRight -= Math.PI / 80;

                if (this.finAngRight <= 0) {
                    this.finBackRight = false;
                }
            } else {
                this.finAngRight += Math.PI / 80;

                if (this.finAngRight >= Math.PI / 6) {
                    this.finBackRight = true;
                }
            }
        }

        if(this.moveLeftFin) {
            if (this.finBackLeft) {
                this.finAngLeft -= Math.PI / 80;

                if (this.finAngLeft <= 0) {
                    this.finBackLeft = false;
                }
            } else {
                this.finAngLeft += Math.PI / 80;

                if (this.finAngLeft >= Math.PI / 6) {
                    this.finBackLeft = true;
                }
            }
        }

        this.moveRighFin = true;
        this.moveLeftFin = true;
    }

    displayBody(shader) {
        //Fish body
        this.fishAppearance.apply();
        this.updateShaderColor(shader);

        this.scene.pushMatrix();
        Utils.scalating(this.scene, [0.15, 0.15, 0.25]);
        this.sphere.display();
        this.scene.popMatrix();
    }

    displayOthers(shader) {

        this.updateShaderColor(shader);
        this.fishAppearance.apply();

        //Tail
        this.scene.pushMatrix();
        Utils.translate(this.scene, [0, 0, -0.25]);
        Utils.rotateY(this.scene, this.tailAng);
        Utils.rotateY(this.scene, Math.PI / 2);
        Utils.scalating(this.scene, [0.15, 0.15, 0.15]);
        this.triangle.display();
        this.scene.popMatrix();

        //Left fin
        this.scene.pushMatrix();
        Utils.translate(this.scene, [0.12, 0.0, 0.0]);
        Utils.rotateZ(this.scene, this.finAngLeft);
        Utils.translate(this.scene, [0.0, 0.0, 0.065]);
        Utils.rotateZ(this.scene, Math.PI / 6);
        Utils.translate(this.scene, [0, -0.135, 0]);
        Utils.rotateY(this.scene, Math.PI / 2);
        Utils.rotateZ(this.scene, Math.PI / 4);
        Utils.scalating(this.scene, [0.07, 0.07, 0.07]);
        this.triangle.display();
        this.scene.popMatrix();

        //Right fin
        this.scene.pushMatrix();
        Utils.translate(this.scene, [-0.12, 0.0, 0.0]);
        Utils.rotateZ(this.scene, -this.finAngRight);
        Utils.translate(this.scene, [0.0, 0.0, 0.065]);
        Utils.rotateZ(this.scene, -Math.PI / 6);
        Utils.translate(this.scene, [0, -0.135, 0]);
        Utils.rotateY(this.scene, Math.PI / 2);
        Utils.rotateZ(this.scene, Math.PI / 4);
        Utils.scalating(this.scene, [0.07, 0.07, 0.07]);
        this.triangle.display();
        this.scene.popMatrix();

        //Upper fin
        this.scene.pushMatrix();
        Utils.translate(this.scene, [0, 0.05, -0.1]);
        Utils.scalating(this.scene, [0.15, 0.15, 0.15]);
        Utils.rotateY(this.scene, -Math.PI / 2);
        Utils.rotateZ(this.scene, Math.PI / 4);
        this.triangle.display();
        this.scene.popMatrix();

        //Left eye
        this.scene.pushMatrix();
        this.eyeAppearance.setTexture(this.eye);
        Utils.translate(this.scene, [0.09, 0.03, 0.20]);
        Utils.scalating(this.scene, [0.02, 0.02, 0.02]);
        Utils.rotateY(this.scene, Math.PI / 4);
        this.eyeAppearance.apply();
        this.sphere.display();
        this.scene.popMatrix();

        //Right eye
        this.scene.pushMatrix();
        this.eyeAppearance.setTexture(this.eye);
        Utils.translate(this.scene, [-0.09, 0.03, 0.20]);
        Utils.scalating(this.scene, [0.02, 0.02, 0.02]);
        Utils.rotateY(this.scene, Math.PI / 5);
        this.eyeAppearance.apply();
        this.sphere.display();
        this.scene.popMatrix();
    }

    setAppearance(fishAppearance) {
        this.fishAppearance = fishAppearance;
    }

    updateTexture(texture) {
        this.fishAppearance.setTexture(texture);
    }
    
    updateFishColor(color) {
        this.fishColor = color;
    }

    updateShaderColor(shader) {
        shader.setUniformsValues( {fishColor: this.fishColor} );
    }
    
    getPosition() {
        return [0, 0, 0];
    }

    getNegPosition() {
        return [0, 0, 0];
    }
}
