import { CGFobject } from '../lib/CGF.js';
import { RandomFish } from './RandomFish.js';
import { Utils } from './Utils.js';

/**
* RandomFishSet
* @constructor
* @param scene - Reference to MyScene object
* @param textures - Set of fish textures
* @param updateTime - Scene update time
*/

export class RandomFishSet extends CGFobject {

    constructor(scene, textures, updateTime) {
        super(scene);
        this.fishSet = [];
        this.textures = textures;

        this.initBuffers(updateTime);
    }
    initBuffers(updateTime) {
        this.nrFish = Utils.generateRand(20, 30);
        for (var i = 0; i < this.nrFish; i++) {
            this.fishSet.push(new RandomFish(this.scene, this.textures[Math.round(Utils.generateRand(0, 4))], updateTime));
        }
    }

    displayOthers(shader) {
        for (var i = 0; i < this.nrFish; i++) {
            this.fishSet[i].displayOthers(shader);
        }
    }

    displayBody(shader) {
        for (var i = 0; i < this.nrFish; i++) {
            this.fishSet[i].displayBody(shader);
        }
    }

    update() {
        for (var i = 0; i < this.nrFish; i++) {
            this.fishSet[i].update();
        }
    }

}
