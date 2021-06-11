import { CGFobject } from '../lib/CGF.js';
import { Utils } from './Utils.js';

/**
 * MyRock
 * @constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     * @param  {integer} stacks - number of stacks along Y axis, from the center to the poles (half of sphere)
 */

export class MyRock extends CGFobject {

    constructor(scene, slices, stacks) {
        super(scene);
        this.latDivs = stacks * 2;
        this.longDivs = slices;

        this.hermiteCurve = []

        //Hermite curve necessary parameters
        this.P1;
        this.P4;
        this.R1;
        this.R4;

        this.sandPosition = [];
        this.currentPosition = [];
        this.t = 0;
        this.RockinNest = false;
        this.falling = false;
        this.scaleFactor = Math.random() * 0.2;
        this.generateRandPos();
        this.initBuffers();
    }

    /**
     * @method initBuffers
    */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = 0;
        var theta = 0;
        var phiInc = Math.PI / this.latDivs;
        var thetaInc = (2 * Math.PI) / this.longDivs;
        var latVertices = this.longDivs + 1;

        // build an all-around stack at a time, starting on "north pole" and proceeding "south"
        for (let latitude = 0; latitude <= this.latDivs; latitude++) {
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            // in each stack, build all the slices around, starting on longitude 0
            theta = 0;
            for (let longitude = 0; longitude <= this.longDivs; longitude++) {
                //--- Vertices coordinates
                var rand;
                rand = Utils.generateRand(-10, 10) * 0.005;

                var x = Math.cos(theta) * sinPhi + rand;
                var y = cosPhi + rand;
                var z = Math.sin(-theta) * sinPhi + rand;
                this.vertices.push(x, y, z);

                //--- Indices
                if (latitude < this.latDivs && longitude < this.longDivs) {
                    var current = latitude * latVertices + longitude;
                    var next = current + latVertices;
                    // pushing two triangles using indices from this round (current, current+1)
                    // and the ones directly south (next, next+1)
                    // (i.e. one full round of slices ahead)

                    this.indices.push(current + 1, current, next);
                    this.indices.push(current + 1, next, next + 1);
                }

                //--- Normals
                // at each vertex, the direction of the normal is equal to 
                // the vector from the center of the sphere to the vertex.
                // in a sphere of radius equal to one, the vector length is one.
                // therefore, the value of the normal is equal to the position vectro
                this.normals.push(x, y, z);
                theta += thetaInc;

                //--- Texture Coordinates

                this.texCoords.push(longitude / this.longDivs, latitude / this.latDivs);
            }

            phi += phiInc;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    generateRandPos() {
        this.currentPosition.push(Utils.generateRandBetween(-19, -1.4, 1.4, 19));
        this.currentPosition.push(0.0);
        this.currentPosition.push(Utils.generateRandBetween(-19, -1.4, 1, 19));

        this.sandPosition.push(this.currentPosition[0]);
        this.sandPosition.push(this.currentPosition[1]);
        this.sandPosition.push(this.currentPosition[2]);
    }

    getPos() {
        return [this.currentPosition[0], this.currentPosition[1], this.currentPosition[2]];
    }

    setPos(position) {
        this.currentPosition[0] = position[0];
        this.currentPosition[1] = position[1];
        this.currentPosition[2] = position[2];
    }

    setFalling() {
        this.P1 = [this.currentPosition[0], this.currentPosition[1], this.currentPosition[2]];
        this.R1 = [this.P4[0] - this.P1[0], 0, this.P4[2] - this.P1[2]];
        this.R4 = [0, -1, 0];

        this.falling = true;
    }

    inNest() {
        this.setPos(this.P4);
        this.RockinNest = true;
    }

    update() {

        if (Utils.isEqualPos(this.P4, [this.currentPosition[0], this.currentPosition[1], this.currentPosition[2]], 0.015)) {
            this.falling = false;
            this.inNest();
            return;
        }

        this.t += 0.02;
        var P1 = this.P1;
        var P4 = this.P4;
        var R1 = this.R1;
        var R4 = this.R4;

        //Hermite formula
        if (this.falling) {
            this.currentPosition[0] = (2 * Math.pow(this.t, 3) - 3 * Math.pow(this.t, 2) + 1) * P1[0] + (-2 * Math.pow(this.t, 3) + 3 * Math.pow(this.t, 2)) * P4[0] + (Math.pow(this.t, 3) - 2 * Math.pow(this.t, 2) + this.t) * R1[0] + (Math.pow(this.t, 3) - Math.pow(this.t, 2)) * R4[0];
            this.currentPosition[1] = (2 * Math.pow(this.t, 3) - 3 * Math.pow(this.t, 2) + 1) * P1[1] + (-2 * Math.pow(this.t, 3) + 3 * Math.pow(this.t, 2)) * P4[1] + (Math.pow(this.t, 3) - 2 * Math.pow(this.t, 2) + this.t) * R1[1] + (Math.pow(this.t, 3) - Math.pow(this.t, 2)) * R4[1];
            this.currentPosition[2] = (2 * Math.pow(this.t, 3) - 3 * Math.pow(this.t, 2) + 1) * P1[2] + (-2 * Math.pow(this.t, 3) + 3 * Math.pow(this.t, 2)) * P4[2] + (Math.pow(this.t, 3) - 2 * Math.pow(this.t, 2) + this.t) * R1[2] + (Math.pow(this.t, 3) - Math.pow(this.t, 2)) * R4[2];
        }
    }

    reset() {
        this.t = 0;
        this.setPos(this.sandPosition);
        this.RockinNest = false;
        this.falling = false;
    }
}
