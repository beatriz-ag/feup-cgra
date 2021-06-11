import { CGFappearance } from '../lib/CGF.js';
import { CGFobject } from '../lib/CGF.js';
import { MyRock } from './MyRock.js';
import { Utils } from './Utils.js';

/**
* MyRockSet
* @constructor
* @param scene - Reference to MyScene object
*/

export class MyRockSet extends CGFobject {

    constructor(scene) {
        super(scene);
        this.rockArray = [];

        this.initBuffers();
    }
    initBuffers() {

        this.rockAppearance = new CGFappearance(this.scene);
        this.rockAppearance.setAmbient(0.1, 0.1, 0.1, 1.0);
        this.rockAppearance.setDiffuse(0.1, 0.1, 0.1, 1.0);
        this.rockAppearance.setSpecular(0.1, 0.1, 0.1, 1.0);
        this.rockAppearance.setEmission(0.1, 0.1, 0.1, 1);
        this.rockAppearance.setShininess(10.0);

        this.nrRocks = Utils.generateRand(30, 35);
        var deltaAng = Math.PI * 2 / this.nrRocks;
        var ang = 0;
        for (var i = 0; i < this.nrRocks; i++, ang += deltaAng) {
            this.myRock = new MyRock(this.scene, 8, 8);
            this.myRock.P4 = [1.8 * (0.8 + Math.cos(ang)), -0.4, 1.8 * (0.5 + Math.sin(ang))];
            this.rockArray.push(this.myRock);
        }
    }


    display() {

        this.scene.pushMatrix();

        this.rockAppearance.apply();

        for (var i = 0; i < this.nrRocks; i++) {
            if (this.rockArray[i].falling)
                this.rockArray[i].update();

            this.scene.pushMatrix();
            this.scale = this.rockArray[i].scaleFactor;
            this.translateAfterScale = this.scale * 10;
            Utils.translate(this.scene, this.rockArray[i].getPos());
            Utils.scalating(this.scene, [this.scale, this.scale, this.scale]);
            this.rockArray[i].display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }

    /**
     * returns the nearest rock, null if no rock nearby
     */
    isNearRock(movingObjPos) {
        for (var i = 0; i < this.nrRocks; i++) {
            if (Utils.calculateDist(this.rockArray[i].getPos(), movingObjPos) <= 1.5) {
                if (!this.rockArray[i].RockinNest)
                    return this.rockArray[i];
            }
        }
        return null;
    }

    /**
     * Returns true if movingObjPos is near nest, false otherwise
     */
    isNearNest(movingObjPos) {
        return Utils.calculateDist([1.2, 0, 1.08], movingObjPos) <= 1;
    }

    /**
     * Resets the rocks
     */
    reset() {
        for (var i = 0; i < this.nrRocks; i++) {
            this.rockArray[i].reset();
        }
    }
}
