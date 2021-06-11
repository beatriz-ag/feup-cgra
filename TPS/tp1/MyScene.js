import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

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

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);

    /**
     * Ex1
     */
    this.triangle = new MyTriangle(this);
    this.parallelogram = new MyParallelogram(this);
    /**
     * Ex2
     */
    this.smallTriangle = new MyTriangleSmall(this);
    this.bigTriangle = new MyTriangleBig(this);


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    /**
     * Ex1
     */
    this.displayDiamond = false;
    this.displayTriangle = false;
    this.displayParallelogram = false;

    /**
     * Ex2
     */
    this.displaySmallTriangle = false;
    this.displayBigTriangle = false;

  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  
  //RED
  setDefaultAppearance() {
    this.setAmbient(1, 0, 0, 1);
    this.setDiffuse(1, 0, 0, 1);
    this.setSpecular(1, 0, 0, 1);
    this.setShininess(10.0);
  }
  
  /*
  //BLUE
  setDefaultAppearance() {
    this.setAmbient(0, 0,1, 1);
    this.setDiffuse(0, 0, 1, 1);
    this.setSpecular(0, 0, 1, 1);
    this.setShininess(10.0);
  }
  */

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

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();
    
    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section

     /**
     * Ex1
     */

    if(this.displayDiamond) this.diamond.display();
    if(this.displayTriangle) this.triangle.display();
    if(this.displayParallelogram) this.parallelogram.display();

    /**
     * Ex2
     */
    if(this.displaySmallTriangle) this.smallTriangle.display();
    if(this.displayBigTriangle) this.bigTriangle.display();

    // ---- END Primitive drawing section
  }
}
