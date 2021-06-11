import { MyFish } from './MyFish.js';
import { MyMovingObject } from './MyMovingObject.js';

/**
* MyMovingFish
* @constructor
 * @param scene - Reference to MyScene object
 * @param max - Fish max height
 * @param min - Fish min height
 * @param texture - Fish texture
*/

export class MyMovingFish extends MyMovingObject {
    constructor(scene, max, min, texture) {
        super(scene);
        this.setPosition([0, 5, 0]);
        this.myFish = new MyFish(this.scene, texture);
        this.max = 5;
        this.min = min;
        this.rock = null;
    }

    displayBody(shader) {
        this.scene.pushMatrix();
        this.move();
        this.myFish.displayBody(shader);
        this.scene.popMatrix();
    }

    displayOthers(shader) {
        this.scene.pushMatrix();
        this.move();
        this.myFish.displayOthers(shader);
        this.scene.popMatrix()
    }

    update() {

        this.direction = [Math.sin(this.orientation) * this.horzSpeed * this.sceneSpeed,
        this.vertSpeed * this.sceneSpeed,
        Math.cos(this.orientation) * this.horzSpeed * this.sceneSpeed];

        this.position[0] += this.direction[0];

        var ypos = this.position[1] + this.direction[1];

        if (ypos <= this.max && ypos >= this.min) {
            this.position[1] = ypos;
        }
        else if (ypos > this.max) {
            this.position[1] = this.max;
            this.vertSpeed = 0;
        }
        else {
            this.position[1] = this.min;
            this.vertSpeed = 0;
        }

        this.myFish.update(this.horzSpeed);
        this.position[2] += this.direction[2];
    }

    /**
     * Returns true if the fish has a rock, false otherwise
     */
    hasRock() {
        if (this.rock == null)
            return false;
        return true;
    }

    /**
     * Sets a rock to this fish
     */
    pickRock(rock) {
        this.rock = rock;
    }

    /**
     * Unsets this fish rock
     */
    dropRock() {
        this.rock = null;
    }

    /**
     * Returns this fish rock
     */
    getRock() {
        return this.rock;
    }

    /**
     * Updates the the texture of the fish
     * @param texture - New texture 
     */
    updateTexture(texture) {
        this.myFish.updateTexture(texture);
    }

    /**
     * Removes the moviment of the left fin
     */
    stopLeftFin() {
        this.myFish.moveLeftFin = false;
    }

    /**
     * Removes the moviment of the right fin 
     */
    stopRightFin() {
        this.myFish.moveRighFin = false;
    }

    /**
     * Verifies if the left fin ang and right fin ang are the same
     */
    sameAng() {
        this.myFish.finAngLeft = this.myFish.finAngRight;
    }

    /**
     * Resets the moving fish
     */
    reset() {
        super.reset();
        this.setPosition([0, 5, 0]);
        this.rock = null;
    }

    /**
     * @returns  -position
     */
    getNegPosition() {
        return [-this.position[0], -this.position[1], -this.position[2]];
    }

    /**
     * Puts a rock in the nest
     */
    putRockInNest() {
        console.log(this.rock);
        this.rock.inNest();
        this.rock = null;
    }
}
