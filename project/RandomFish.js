import { CGFappearance } from "../lib/CGF.js";
import { MyMovingFish } from './MyMovingFish.js';
import { Utils } from './Utils.js';

/**
 * RandomFish
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Fish texture
 * @param updateTime - Scene update time
 */

export class RandomFish extends MyMovingFish {
    constructor(scene, texture, updateTime) {
        super(scene, 0, 0, texture);

        var r = Utils.generateRandBetween(0, 1);
        var g = Utils.generateRandBetween(0, 1);
        var b = Utils.generateRandBetween(0, 1);

        this.time = Utils.generateRand(2, 10);

        this.randomFishAppearance = new CGFappearance(this.scene);
        this.randomFishAppearance.setAmbient(r, g, b, 1.0);
        this.randomFishAppearance.setDiffuse(r, g, b, 1.0);
        this.randomFishAppearance.setSpecular(r, g, b, 1.0);
        this.randomFishAppearance.setEmission(r, g, b, 1);
        this.randomFishAppearance.setTexture(texture);
        this.randomFishAppearance.setShininess(10.0);
        this.myFish.setAppearance(this.randomFishAppearance);

        let color = [r, g, b, 1.0];

        this.myFish.updateFishColor(color);

        var yValue = Utils.generateRand(1, 5);
        console.log(yValue);
        this.max = yValue;
        this.min = yValue;
        this.center = [Utils.generateRand(-15, 15), yValue, Utils.generateRand(-15, 15)];

        var xValue = Utils.generateRand(this.center[0] - 5, this.center[0] + 5);
        this.position = [xValue, yValue, this.getZValue(xValue)];

        this.delta = (Math.PI * 2 / this.time) * updateTime / 1000;
    }

    displayOthers(shader) {
        this.scene.pushMatrix();
        this.randomFishAppearance.apply();
        Utils.translate(this.scene, this.center);
        Utils.absSelfRotate(this.scene, this.position, -this.orientation);
        Utils.translate(this.scene, this.position);
        this.myFish.displayOthers(shader);
        this.scene.popMatrix();
    }

    displayBody(shader) {
        this.scene.pushMatrix();
        this.randomFishAppearance.apply();
        Utils.translate(this.scene, this.center);
        Utils.absSelfRotate(this.scene, this.position, -this.orientation);
        Utils.translate(this.scene, this.position);
        this.myFish.displayBody(shader);
        this.scene.popMatrix();
    }

    update() {
        this.turn(this.delta);
        this.position = [Math.cos(this.orientation) * 5, this.position[1], Math.sin(this.orientation) * 5];
    }

    getZValue(xValue) {
        return Math.sqrt(25 - Math.pow(xValue, 2));
    }
}
