import { CGFobject, CGFappearance, CGFtexture } from "../lib/CGF.js";
import { MyCilinder } from "./MyCilinder.js";
import { Utils } from "./Utils.js";

/**
 * MyPillar
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyPillar extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.myCilinder = new MyCilinder(this.scene, 100);
        this.pillarTexture = new CGFtexture(this.scene, 'images/pillar/wood1.jpg');

        this.pillarAppearance = new CGFappearance(this.scene);
        this.pillarAppearance.setEmission(0.1, 0.1, 0.1, 1);
        this.pillarAppearance.setShininess(120);
    }

    display() {
        this.scene.pushMatrix();
        this.pillarAppearance.setTexture(this.pillarTexture);
        this.pillarAppearance.apply();
        Utils.scalating(this.scene, [1.0, 13.0, 1.0]);
        this.myCilinder.display();
        this.scene.popMatrix();
    }
}
