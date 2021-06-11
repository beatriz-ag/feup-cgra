import { CGFobject } from '../lib/CGF.js';
import { MyPillar } from './MyPillar.js';
import { Utils } from './Utils.js';

/**
* MyPillarSet
* @constructor
* @param scene - Reference to MyScene object
*/

export class MyPillarSet extends CGFobject {
    constructor(scene) {
        super(scene);
        this.rockArray = [];

        this.initBuffers();
    }
    initBuffers() {

        this.myPillar = new MyPillar(this.scene);

    }

    display() {
        this.scene.pushMatrix();
        Utils.translate(this.scene, [16.0, 0.0, -0.95]);
        this.myPillar.display();
        Utils.translate(this.scene, [-2.5, 0.0, 0.0]);
        this.myPillar.display();
        Utils.translate(this.scene, [-2.5, 0.0, 0.0]);
        this.myPillar.display();
        Utils.translate(this.scene, [-2.5, 0.0, 0.0]);
        this.myPillar.display();
        Utils.translate(this.scene, [-2.5, 0.0, 0.0]);
        this.myPillar.display();
        this.scene.popMatrix();
    }
}
