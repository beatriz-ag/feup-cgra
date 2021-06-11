import { CGFobject } from '../lib/CGF.js';
import { MyPyramid } from "./MyPyramid.js";
import { MyDiamond } from "./MyDiamond.js";
import { Utils } from './Utils.js';


/**
 * MyMovinObject
 * @constructor
 */
export class MyMovingObject extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers(scene);
    }

    initBuffers(scene) {
        this.object = new MyPyramid(scene, 4, 1);
        this.diamond = new MyDiamond(scene);
        this.sceneSpeed = 1;
        this.reset();
    }

    display() {
        this.scene.pushMatrix();
        this.move();
        this.defaultPosition();
        this.scene.popMatrix();
    }

    update() {
        this.direction = [Math.sin(this.orientation) * this.horzSpeed * this.sceneSpeed, this.vertSpeed * this.sceneSpeed, Math.cos(this.orientation) * this.horzSpeed * this.sceneSpeed];

        for (var i = 0; i < 3; i++) {
            this.position[i] += this.direction[i];
        }
    }

    turn(val) {
        this.orientation = (this.orientation + val) % (Math.PI * 2);
    }

    accelerateH(val) {
        this.horzSpeed = (this.horzSpeed + val * this.sceneSpeed <= 0) ? 0 : this.horzSpeed + val * this.sceneSpeed;
    }

    accelerateV(val) {
        this.vertSpeed = this.vertSpeed + val * this.sceneSpeed;
    }

    reset() {
        this.orientation = 0;
        this.position = [0, 0, 0];
        this.horzSpeed = 0;
        this.vertSpeed = 0;
    }

    move() {
        Utils.translate(this.scene, this.position); //W, S, P and L
        Utils.selfRotate(this.scene, this.position, this.orientation); //A and D
    }

    defaultPosition() {
        /* DEFAULT POSITION */
        Utils.translate(this.scene, [0, 0, -1]);
        this.diamond.display();
        Utils.rotateX(this.scene, Math.PI / 2);
        Utils.scalating(this.scene, [1, 2, 1]);
        this.object.display();
    }

    multSpeed(val) {
        this.sceneSpeed = (val >= 0) ? val : this.sceneSpeed;
    }

    getPosition() {
        return this.position;
    }

    setPosition(position) {
        this.position = position;
    }
}
