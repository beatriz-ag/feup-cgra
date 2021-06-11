import { CGFinterface, dat } from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/

export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {

        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        var obj = this;

        var f0 = this.gui.addFolder("Scene");
        var f1 = this.gui.addFolder("Sphere");
        var f2 = this.gui.addFolder("Cilinder");
        var f3 = this.gui.addFolder("Moving Object");
        var f4 = this.gui.addFolder("Big Cube");
        var f5 = this.gui.addFolder("Fish");
        var f6 = this.gui.addFolder("Sea");


        //Checkbox element in GUI
        f0.add(this.scene, 'displayAxis').name('Display Axis');
        f0.add(this.scene, 'scaleFactorMovObj', 0.5, 3.0).name('Scale');
        f0.add(this.scene, 'sceneSpeed', 0.1, 3.0).name('Speed').onChange(this.scene.sceneChangeSpeed.bind(this.scene));

        f1.add(this.scene, 'displaySphere').name('Display Sphere');
        f1.add(this.scene, 'sphereSelectedTexture', this.scene.sphereTextureIds).name('Selected Texture').onChange(this.scene.updateSphereTexture.bind(this.scene));

        f2.add(this.scene, 'displayCilinder').name('Display Cilinder');
        f2.add(this.scene, 'cilinderSelectedTexture', this.scene.cilinderTextureIds).name('Selected Texture').onChange(this.scene.updateCilinderTexture.bind(this.scene));

        f3.add(this.scene, 'displayMovObj').name('Display Mov Obj');

        f4.add(this.scene, 'displayBigCube').name('Display Big Cube');
        f4.add(this.scene, 'bigCubeSelectedTexture', this.scene.bigCubeTexturesIds).name('Selected Texture').onChange(this.scene.updateBigCubeTexture.bind(this.scene));

        f5.add(this.scene, 'displayFish').name('Display Fish');
        f5.add(this.scene, 'selectedFish', this.scene.fishIds).name('Selected Fish').onChange(this.scene.verifyRockPosition.bind(this.scene));
        f5.add(this.scene, 'fishSelectedTexture', this.scene.fishTexturesIds).name('Selected Texture').onChange(this.scene.updateFishTexture.bind(this.scene));

        f6.add(this.scene, 'displaySea').name('Display Sea');
        f6.add(this.scene, 'displayRandomFishSet').name('Display FishSet');

        this.initKeys();

        return true;
    }

    initKeys() {

        // create reference from the scene to the GUI
        this.scene.gui = this;

        // disable the processKeyboard function
        this.processKeyboard = function () { };

        // create a named array to store which keys are being pressed
        this.activeKeys = {};

    };

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        if (this.activeKeys[keyCode] === true &&
            (keyCode == "keyL" || keyCode == "keyP")) {
            this.activeKeys[keyCode] = false;
            return true;
        }
        return this.activeKeys[keyCode] || false;
    }
}