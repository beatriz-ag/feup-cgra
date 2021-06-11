import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MySeaWeed } from './MySeaWeed.js';
import { Utils } from './Utils.js';

/**
* MySeaWeedSet
* @constructor
 * @param scene - Reference to MyScene object
 * @param position - Position of the set of seaweeds
*/

export class MySeaWeedSet extends CGFobject {
    constructor(scene, position) {
        super(scene);
        this.position = position;
        this.initBuffers();
    }
    initBuffers() {
        this.quantity = Utils.generateRand(2, 6);
        this.mySeaWeeds = [];
        var g;
        this.seaWeedAppearance = new CGFappearance(this.scene);
        g = Utils.generateRand(-0.45, 0.35);

        this.seaWeedAppearance.setAmbient(0.50 + g, 0.65 + g, 0.15 + g, 1.0);
        this.seaWeedAppearance.setDiffuse(0.5, 0.65 + g, 0.15, 1.0);
        this.seaWeedAppearance.setSpecular(0.5, 0.65 + g, 0.15, 1.0);
        this.seaWeedAppearance.setEmission(0.0, 0.0, 0.0, 1);
        this.seaWeedAppearance.setShininess(10.0);

        for (var i = 0; i < this.quantity; i++) {
            var x = Utils.generateRand(-1.5, 1.5);
            var z = Utils.generateRand(-1.5, 1.5);
            this.mySeaWeeds[i] = new MySeaWeed(this.scene, 4, 10, x, z);
        }
    }

    display() {
        this.scene.pushMatrix();
        this.seaWeedAppearance.apply();
        Utils.scalating(this.scene, [0.15, 1.0, 0.15]);
        Utils.translate(this.scene, this.position);

        for (var i = 0; i < this.quantity; i++) {
            var x = this.mySeaWeeds[i].x;
            var z = this.mySeaWeeds[i].z;
            Utils.translate(this.scene, [x, 0.0, z]);
            this.mySeaWeeds[i].display();
            Utils.translate(this.scene, [-x, 0.0, -z]);
        }

        this.scene.popMatrix();
    }
}



