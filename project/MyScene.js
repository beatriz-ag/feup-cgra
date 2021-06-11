import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFtexture, CGFshader } from "../lib/CGF.js";
import { MySphere } from "./MySphere.js";
import { MyMovingObject } from "./MyMovingObject.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";
import { MyCilinder } from "./MyCilinder.js";
import { MyFish } from "./MyFish.js";
import { MyPlane } from "./MyPlane.js";
import { MySea } from "./MySea.js";
import { MyRockSet } from "./MyRockSet.js";
import { MyPier } from "./MyPier.js";
import { MyPillarSet } from "./MyPillarSet.js";
import { MySeaWeedSet } from "./MySeaWeedSet.js";
import { Utils } from "./Utils.js";
import { MyMovingFish } from "./MyMovingFish.js";
import { RandomFishSet } from "./RandomFishSet.js";

/**
* MyScene
* @constructor
*/
export class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.updateTime = 50;
        this.setUpdatePeriod(this.updateTime);

        this.enableTextures(true);

        /** Textures */
        this.top0 = new CGFtexture(this, 'images/cute_attempt/top.jpg');
        this.front0 = new CGFtexture(this, 'images/cute_attempt/front.jpg');
        this.right0 = new CGFtexture(this, 'images/cute_attempt/right.jpg');
        this.back0 = new CGFtexture(this, 'images/cute_attempt/back.jpg');
        this.left0 = new CGFtexture(this, 'images/cute_attempt/left.jpg');
        this.bottom0 = new CGFtexture(this, 'images/cute_attempt/bottom.jpg');

        this.top1 = new CGFtexture(this, 'images/demo_cubemap/top.png');
        this.front1 = new CGFtexture(this, 'images/demo_cubemap/front.png');
        this.right1 = new CGFtexture(this, 'images/demo_cubemap/right.png');
        this.back1 = new CGFtexture(this, 'images/demo_cubemap/back.png');
        this.left1 = new CGFtexture(this, 'images/demo_cubemap/left.png');
        this.bottom1 = new CGFtexture(this, 'images/demo_cubemap/bottom.png');

        this.top2 = new CGFtexture(this, 'images/test_cubemap/py.png');
        this.front2 = new CGFtexture(this, 'images/test_cubemap/pz.png');
        this.back2 = new CGFtexture(this, 'images/test_cubemap/nz.png');
        this.left2 = new CGFtexture(this, 'images/test_cubemap/nx.png');
        this.right2 = new CGFtexture(this, 'images/test_cubemap/px.png');
        this.bottom2 = new CGFtexture(this, 'images/test_cubemap/ny.png');

        this.top3 = new CGFtexture(this, 'images/underwater_cubemap/top.jpg');
        this.front3 = new CGFtexture(this, 'images/underwater_cubemap/front.jpg');
        this.back3 = new CGFtexture(this, 'images/underwater_cubemap/back.jpg');
        this.left3 = new CGFtexture(this, 'images/underwater_cubemap/left.jpg');
        this.right3 = new CGFtexture(this, 'images/underwater_cubemap/right.jpg');
        this.bottom3 = new CGFtexture(this, 'images/underwater_cubemap/bottom.jpg');

        this.top4 = new CGFtexture(this, 'images/underwater_cubemap/top2.png');
        this.front4 = new CGFtexture(this, 'images/underwater_cubemap/front2.png');
        this.back4 = new CGFtexture(this, 'images/underwater_cubemap/back2.png');
        this.left4 = new CGFtexture(this, 'images/underwater_cubemap/left2.png');
        this.right4 = new CGFtexture(this, 'images/underwater_cubemap/right2.png');
        this.bottom4 = new CGFtexture(this, 'images/underwater_cubemap/bottom2.png');

        this.waves = new CGFtexture(this, 'images/waves.png');
        this.earth = new CGFtexture(this, 'images/earth.jpg');

        //Initialize scene objects
        this.axis = new CGFaxis(this);

        /** Sphere */
        this.Sphere = new MySphere(this, 16, 8);
        this.sphereTextures = [this.waves, this.earth];
        this.sphereTextureIds = { 'Waves': 0, 'Earth': 1 };
        this.sphereSelectedTexture = 1;

        this.sphereAppearance = new CGFappearance(this);
        this.sphereAppearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.sphereAppearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.sphereAppearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.sphereAppearance.setShininess(120);
        this.sphereAppearance.setTexture(this.earth);
        this.sphereAppearance.setTextureWrap('LINEAR', 'LINEAR');

        /** Moving object */
        this.movingObject = new MyMovingObject(this);
        this.scaleFactorMovObj = 1;
        this.sceneSpeed = 1;

        /** Cilinder */
        this.cilinder = new MyCilinder(this, 10);
        this.cilinderTextures = [this.waves, this.earth];
        this.cilinderTextureIds = { 'Waves': 0, 'Earth': 1 };
        this.cilinderSelectedTexture = 0;

        this.cilinderMaterial = new CGFappearance(this);
        this.cilinderMaterial.setAmbient(0.0, 0.0, 0.0, 0.0);
        this.cilinderMaterial.setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.cilinderMaterial.setSpecular(0.0, 0.0, 0.0, 0.0);
        this.cilinderMaterial.setEmission(1, 1, 1, 1);
        this.cilinderMaterial.setTexture(this.waves);
        this.cilinderMaterial.setTextureWrap('LINEAR', 'LINEAR');

        /** Big Cube */
        this.cute_attemp = [this.top0, this.front0, this.right0, this.back0, this.left0, this.bottom0];
        this.demo_cubemap = [this.top1, this.front1, this.right1, this.back1, this.left1, this.bottom1];
        this.test_cubemap = [this.top2, this.front2, this.right2, this.back2, this.left2, this.bottom2];
        this.underwater = [this.top3, this.front3, this.right3, this.back3, this.left3, this.bottom3];
        this.underwater2 = [this.top4, this.front4, this.right4, this.back4, this.left4, this.bottom4];
        this.bigCubeTextures = [this.cute_attemp, this.demo_cubemap, this.test_cubemap, this.underwater, this.underwater2];
        this.bigCubeSelectedTexture = 0;
        this.bigCubeTexturesIds = { 'Custom': 0, 'Demo': 1, 'Test': 2, 'Underwater': 3, 'Underwater2': 4 };
        this.bigCube = new MyUnitCubeQuad(this, this.bigCubeTextures[this.bigCubeSelectedTexture]);


        /** Default */
        this.defaultAppearance = new CGFappearance(this);
        this.defaultAppearance.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.defaultAppearance.setEmission(0, 0, 0, 1);
        this.defaultAppearance.setShininess(120);


        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displaySphere = false;
        this.displayCilinder = false;
        this.displayMovObj = false;
        this.displayBigCube = false;
        this.displayFish = true;
        this.displaySea = true;
        this.displayPier = false;
        this.displayRockSet = false;
        this.displayPillarSet = false;
        this.displaySeaWeedSet = false;
        this.displayUnderwater = false;
        this.displayMovFish = true;
        this.displayRandomFishSet = true;

        /** Fish */
        this.fishSelectedTexture = 0;
        this.fishTexturesIds = { 'Texture1': 0, 'Texture2': 1, 'Texture3': 2, 'Texture4': 3, 'Texture5': 4, 'Texture6': 5 };
        this.fishTex = [
            new CGFtexture(this, './images/fish/fishTex.jpg'),
            new CGFtexture(this, './images/fish/fishTex1.jpg'),
            new CGFtexture(this, './images/fish/fishTex2.jpg'),
            new CGFtexture(this, './images/fish/fishTex3.jpg'),
            new CGFtexture(this, './images/fish/fishTex4.jpg'),
            new CGFtexture(this, './images/fish/fishTex5.jpg'),
        ];
        this.myFish = new MyFish(this, this.fishTex[this.fishSelectedTexture]);
        this.fishShader = new CGFshader(this.gl, 'shaders/fish.vert', 'shaders/fish.frag');

        /** Sand */
        this.mySea = new MySea(this);
        this.mySandFloor = new MyPlane(this, 20);

        /** Pier */
        this.myPier = new MyPier(this);

        /** RockSet */
        this.myRockSet = new MyRockSet(this);

        /** PillarSet */
        this.myPillarSet = new MyPillarSet(this);

        /** SeaWeedSet */
        this.quantity = Utils.generateRand(4, 16);
        this.setOfSeaWeedSet = [];
        for (var i = 0; i < this.quantity; i++) {
            var x = Utils.generateRandBetween(-100, -17, 10, 100);
            var z = Utils.generateRandBetween(-100, -17, 10, 100);
            this.setOfSeaWeedSet[i] = new MySeaWeedSet(this, [x, 0, z]);
        }
        this.underwaterCube = new MyUnitCubeQuad(this, this.underwater);

        /** MyMovingFish */
        this.myMovingFish = new MyMovingFish(this, 10, 0, this.fishTex[this.fishSelectedTexture]);
        this.selectedFish = 1;
        this.fishIds = { '1. staticFish': 0, '2. movingFish': 1 };
        this.whichFish = [this.myFish, this.myMovingFish];

        /** Random Fish Set */
        this.randomFishSet = new RandomFishSet(this, this.fishTex, this.updateTime);

        // set the scene update period 
        // (to invoke the update() method every 50ms or as close as possible to that )
        this.setUpdatePeriod(50);
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(1.75, 0.1, 500, vec3.fromValues(2, 2, 2), vec3.fromValues(0, 2, 0));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0, 0, 0, 1);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.randomFishSet.update();
        var movObjs = [];
        var size = 0;
        if (this.displayMovObj) {
            this.movingObject.update();
            movObjs[size] = this.movingObject;
            size++;
        }
        if (this.displayFish && this.selectedFish == 1) {
            movObjs[size] = this.myMovingFish;
            size++;
        }

        if (this.displayFish) {
            if (this.selectedFish == 1) this.myMovingFish.update();
            else this.myFish.update(0);
        }

        this.myPier.update(t);
        if (size) this.checkKeys(movObjs, size);

        if (this.myMovingFish.hasRock() && this.selectedFish == 1) {
            var position = this.myMovingFish.getPosition();
            this.myMovingFish.getRock().setPos([position[0], position[1] - 0.5 * this.scaleFactorMovObj, position[2]]);
        }
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();


        this.defaultAppearance.apply();
        // Draw axis
        if (this.displayAxis) {
            this.axis.display();
        }

        if (this.displaySphere) {
            this.sphereAppearance.apply();
            this.Sphere.display();
        }

        if (this.displayMovObj) {
            this.pushMatrix();
            this.scale(this.scaleFactorMovObj, this.scaleFactorMovObj, this.scaleFactorMovObj);
            this.movingObject.display();
            this.popMatrix();
        }

        if (this.displayBigCube) {
            this.bigCube.display();
        }

        if (this.displayCilinder) {
            this.cilinderMaterial.apply();
            this.cilinder.display();
        }

        this.setActiveShader(this.fishShader);

        if (this.displayFish) {
            this.pushMatrix();
            Utils.translate(this, this.whichFish[this.selectedFish].getPosition());
            this.scale(this.scaleFactorMovObj, this.scaleFactorMovObj, this.scaleFactorMovObj);
            Utils.translate(this, this.whichFish[this.selectedFish].getNegPosition());
            this.whichFish[this.selectedFish].displayBody(this.fishShader);
            this.popMatrix();
        }
        if (this.displayRandomFishSet)
            this.randomFishSet.displayBody(this.fishShader);
        if (this.displayRandomFishSet)
            this.randomFishSet.displayBody(this.fishShader);

        this.setActiveShader(this.defaultShader);

        if (this.displayFish) {
            this.pushMatrix();
            Utils.translate(this, this.whichFish[this.selectedFish].getPosition());
            this.scale(this.scaleFactorMovObj, this.scaleFactorMovObj, this.scaleFactorMovObj);
            Utils.translate(this, this.whichFish[this.selectedFish].getNegPosition());
            this.whichFish[this.selectedFish].displayOthers(this.fishShader);
            this.popMatrix();
        }
        if (this.displayRandomFishSet)
            this.randomFishSet.displayOthers(this.fishShader);
        if (this.displayRandomFishSet)
            this.randomFishSet.displayOthers(this.fishShader);

        if (this.displaySea) {
            this.mySea.display();
            this.myRockSet.display();
            this.myPier.display();
            this.myPillarSet.display();
            for (var i = 0; i < this.quantity; i++) {
                this.setOfSeaWeedSet[i].display();
            }
            this.underwaterCube.display();
        }

        // ---- END Primitive drawing section
    }

    checkKeys(movingObjs, size) {

        // Check for key codes e.g. in https://keycode.info/
        for (var i = 0; i < size; i++) {
            if (this.gui.isKeyPressed("KeyW")) {
                movingObjs[i].accelerateH(0.05 * this.sceneSpeed);
            }

            if (this.gui.isKeyPressed("KeyS")) {
                movingObjs[i].accelerateH(-0.05 * this.sceneSpeed);
            }

            if (this.gui.isKeyPressed("KeyP")) {
                movingObjs[i].accelerateV(0.05 * this.sceneSpeed);
            }

            if (this.gui.isKeyPressed("KeyL")) {
                movingObjs[i].accelerateV(-0.05 * this.sceneSpeed);
            }

            if (this.gui.isKeyPressed("KeyA")) {
                if (movingObjs[i] instanceof MyMovingFish) {
                    this.myMovingFish.stopLeftFin();
                }
                movingObjs[i].turn((Math.PI / 30) * this.sceneSpeed);
            }

            if (this.gui.isKeyPressed("KeyD")) {
                if (movingObjs[i] instanceof MyMovingFish) {
                    this.myMovingFish.stopRightFin();
                }
                movingObjs[i].turn((-Math.PI / 30) * this.sceneSpeed);
            }

            if (!this.gui.isKeyPressed("KeyD") && !this.gui.isKeyPressed("KeyA")) {
                if (movingObjs[i] instanceof MyMovingFish) {
                    this.myMovingFish.sameAng();
                }
            }

            if (this.gui.isKeyPressed("KeyR")) {
                movingObjs[i].reset();
                movingObjs[i].multSpeed(this.sceneSpeed);
                this.myRockSet.reset();
            }

            if (this.gui.isKeyPressed("KeyC")) {
                this.objPos = this.myMovingFish.getPosition();

                if (this.myMovingFish.hasRock()) {
                    if ((this.objPos[1] == 0) && (this.myRockSet.isNearNest(this.objPos))) {
                        this.myMovingFish.putRockInNest();
                    }
                } else {
                    if ((this.objPos[1] == 0) && (this.myRockSet.isNearRock(this.objPos) != null)) {
                        this.myMovingFish.pickRock(this.myRockSet.isNearRock(this.objPos));
                    }
                }
            }

            if (this.gui.isKeyPressed("KeyT")) {
                if (this.myMovingFish.hasRock() && (Utils.calculateNestDistXZ(this.myMovingFish.getPosition()) <= 5) && (this.myMovingFish.getPosition()[1] == this.myMovingFish.max)) {
                    this.myMovingFish.getRock().setFalling();
                    this.myMovingFish.rock = null;
                }
            }
        }
    }

    updateSphereTexture() {
        this.sphereAppearance.setTexture(this.sphereTextures[this.sphereSelectedTexture]);
    }

    updateCilinderTexture() {
        this.cilinderMaterial.setTexture(this.cilinderTextures[this.cilinderSelectedTexture]);
    }

    updateBigCubeTexture() {
        this.bigCube.updateTexture(this.bigCubeTextures[this.bigCubeSelectedTexture]);
    }

    sceneChangeSpeed() {
        this.movingObject.multSpeed(this.sceneSpeed);
    }

    updateFishTexture() {
        this.myFish.updateTexture(this.fishTex[this.fishSelectedTexture]);
        this.myMovingFish.updateTexture(this.fishTex[this.fishSelectedTexture]);
    }

    verifyRockPosition() {
        if (this.selectedFish == 0 && this.myMovingFish.hasRock()) {
            this.myMovingFish.getRock().reset();
        }
    }
}
