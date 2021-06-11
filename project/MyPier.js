import { CGFobject, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";
import { Utils } from "./Utils.js";

/**
 * MyPier
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyPier extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {

        this.myPlane = new MyPlane(this.scene, 90);

        this.pierTexture = new CGFtexture(this.scene, 'images/fish/pier.jpg');
        this.pierMap = new CGFtexture(this.scene, 'images/fish/distortionmap.png');
        this.pierShader = new CGFshader(this.scene.gl, 'shaders/pier.vert', 'shaders/pier.frag');
        this.pierShader.setUniformsValues({ uSampler2: 2, timeFactor: 0 });

        this.pierAppearance = new CGFappearance(this.scene);
        this.pierAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.pierAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.pierAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.pierAppearance.setEmission(1, 1, 1, 1);
        this.pierAppearance.setShininess(120);
    }

    update(t) {
        this.pierShader.setUniformsValues({ timeFactor: t / 100 % 100 });
    }

    display() {
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.pierShader);
        this.pierAppearance.apply();
        this.pierMap.bind(2);
        this.pierAppearance.setTexture(this.pierTexture);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.REPEAT);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.REPEAT);

        Utils.translate(this.scene, [0.0, 13.0, 0.0]);
        Utils.scalating(this.scene, [40, 1, 40]);
        Utils.rotateX(this.scene, Math.PI / 2);
        this.myPlane.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}
