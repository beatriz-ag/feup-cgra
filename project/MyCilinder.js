import { CGFobject } from '../lib/CGF.js';
/**
* MyCilinder
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
*/

export class MyCilinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.normals = [];
        this.texCoords = [];
        this.indices = [];

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;
        var coord = 0;
        var alphaCoord = 1 / this.slices;

        for (var i = 0; i <= this.slices; i++) {
            var sa = Math.sin(ang);
            var ca = Math.cos(ang);

            this.vertices.push(ca, 0, sa);
            this.vertices.push(ca, 1, sa);


            this.texCoords.push(1 - coord, 1);
            this.texCoords.push(1 - coord, 0);

            this.normals.push(ca, 0, sa);
            this.normals.push(ca, 1, sa);

            ang += alphaAng;
            coord += alphaCoord;
        }


        for (var i = 0; i <= 2 * this.slices; i += 2) {

            var var1 = i;
            var var2 = i + 1;
            var var3 = (i + 2 > 2 * this.slices) ? 0 : i + 2;
            var var4 = (i + 3 > 2 * this.slices + 1) ? 1 : i + 3;

            this.indices.push(var1, var2, var3);
            this.indices.push(var2, var4, var3);

            this.indices.push(var3, var2, var1);
            this.indices.push(var3, var4, var2);
        }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
