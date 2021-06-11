import { CGFobject, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { Utils } from "./Utils.js";

/**
 * MySea
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MySea extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {

        this.sandAppearance = new CGFappearance(this.scene);
        this.sandAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.sandAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.sandAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.sandAppearance.setEmission(0, 0, 0, 1);
        this.sandAppearance.setShininess(120);

        this.sandFloor = new MyPlane(this.scene, 90);
        this.sandTexture = new CGFtexture(this.scene, 'images/fish/sand1.png');
        this.sandMap = new CGFtexture(this.scene, 'images/fish/sandMap.png')
        this.sandShader = new CGFshader(this.scene.gl, 'shaders/sand.vert', 'shaders/sand.frag');

        this.sandShader.setUniformsValues({ uSampler2: 2, normScale: 1.0 });
    }


    display() {
        this.scene.pushMatrix();
        this.sandAppearance.apply();
        this.sandAppearance.setTexture(this.sandTexture);
        this.sandMap.bind(2);

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.REPEAT);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.REPEAT);
        this.scene.setActiveShader(this.sandShader);

        Utils.translate(this.scene, [0, - 2, 0]);
        Utils.scalating(this.scene, [40, 1, 40]);
        Utils.rotateX(this.scene, Math.PI / 2 + Math.PI);
        this.sandFloor.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);

    }
}
