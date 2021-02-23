import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";
import { MyTangram } from "./MyTangram.js";
import { MyUnitCube } from "./MyUnitCube.js";
import { MyQuad } from "./MyQuad.js";


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
     * Initialize scene objetcs for the exercise 2
     */
    this.parallelogram = new MyParallelogram(this);
    this.purpleTriangle = new MyTriangleSmall(this);
    this.redTriangle = new MyTriangleSmall(this);
    this.pinkTriangle = new MyTriangle(this);
    this.bigTriangle = new MyTriangleSmall(this);

    this.myTangram = new MyTangram(this);

    /**
     * Initialize scene objects for the exercise 3
     */
    this.myCube = new MyUnitCube(this);


    /**
     * Initialize scene objects for the exercise 4
     */
    this.myQuad = new MyQuad(this);


    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;

    this.exercise_2_1_2 = false;
    this.exercise_2_3 = false;
    this.exercise_3 = false;
    this.exercise_3_4 = false;
    this.exercise_3_5 = false;

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

    /* Diamond matrix */
    //Transalation
    var diamondMatrix = [
                      1, 0, 0, 0,
                      0, 1, 0, 0,
                      0, 0, 1, 0,
                      1, 2, 0, 1
    ];
    /* End diamond matrix */


    /* Paralelogram matrixs */
    //Translation
   var parallelogramMatrix1 = [
                      1, 0, 0, 0,
                      0, 1, 0, 0,
                      0, 0, 1, 0,
                      2, 0, 0, 1       
    ];
    //Rotation
    var parallelogramMatrix2 = [
                      -1, 0, 0, 0,
                      0, 1, 0, 0,
                      0, 0, 1, 0,
                      0, 0, 0, 1       
    ];
    /* End paralelogram matrixs*/


    /* Purple triangle matrixs*/
    //Translation
    var purpleTriangleMatrix = [
                      1, 0, 0, 0,
                      0, 1, 0, 0,
                      0, 0, 1, 0,
                      0, 1, 0, 1
    ];
    /* End purple triangle matrixs */


    /* Red triangle matrixs */
    //Rotation
    var redTriangleMatrix1 = [
                      0, 1, 0, 0,
                     -1, 0, 0, 0,
                      0, 0, 1, 0,
                      0, 0, 0, 1
    ];
    //Translation
    var redTriangleMatrix2 = [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    1, -2, 0, 1
    ];
    /* End red triangle matrixs */
    

    /* Pink triangle matrix */
    //Translation
    var pinkTriangleMatrix =  [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0,
                    3, 1, 0, 1
    ];
    /* End pink triangle matrix*/


    /* Big triangle matrixs */
    //Scale
    var bigTriangleMatrix1= [
                    3, 0, 0, 0,
                    0, 3, 0, 0,
                    0, 0, 1, 0, 
                    0, 0, 0, 1
    ]
    //Translation
    var bigTriangleMatrix2= [
                    1, 0, 0, 0,
                    0, 1, 0, 0,
                    0, 0, 1, 0, 
                   -2/3,-1/3, 0, 1
    ]
    /* End big triangle matrixs*/

    /**
     * Exercise 3
     */
    var cubeMatrix =[
                  1, 0, 0, 0,
                  0, 1, 0, 0,
                  0, 0, 1, 0,
                  0, 0, 0.5, 1
    ]

    var cubeMatrix3_5 =[
                  1, 0, 0, 0,
                  0, 0, -1, 0,
                  0, 1, 0, 0,
                  0, 0, 0, 1
    ]

    var cubeMatrix3_5_2 = [
                  1, 0, 0, 0,
                  0, 1, 0, 0,
                  0, 0, 1, 0,
                  0.5, -1, 0.5, 1
    ]
    
    this.multMatrix(sca);

    // ---- BEGIN Primitive drawing section
    if(this.exercise_2_1_2){

        this.pushMatrix();
        this.multMatrix(diamondMatrix);
        this.diamond.display();
        this.popMatrix();

        this.pushMatrix();
        this.multMatrix(parallelogramMatrix1);
        this.multMatrix(parallelogramMatrix2);
        this.parallelogram.display();
        this.popMatrix();

        this.pushMatrix();
        this.multMatrix(purpleTriangleMatrix);
        this.purpleTriangle.display();
        this.popMatrix();

        this.pushMatrix();
        this.multMatrix(redTriangleMatrix1);
        this.multMatrix(redTriangleMatrix2);
        this.redTriangle.display();
        this.popMatrix();

        this.pushMatrix();
        this.multMatrix(pinkTriangleMatrix);
        this.pinkTriangle.display();
        this.popMatrix();

        this.pushMatrix();
        this.multMatrix(bigTriangleMatrix1);
        this.multMatrix(bigTriangleMatrix2);
        this.bigTriangle.display();
        this.popMatrix();
    }

    if(this.exercise_2_3) this.myTangram.display(this);

    if(this.exercise_3) this.myCube.display();

    if(this.exercise_3_4){
      this.myTangram.display(this);
      this.pushMatrix();
      this.multMatrix(cubeMatrix);
      this.myCube.display();
      this.popMatrix();
    } 

    if(this.exercise_3_5){
      this.pushMatrix();
      this.multMatrix(cubeMatrix3_5_2);
      this.multMatrix(cubeMatrix3_5);
      this.myTangram.display(this);
      this.multMatrix(cubeMatrix);
      this.myCube.display();
      this.popMatrix();

    }


    var ex5_frente = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0.5, 1
   ]

   var ex5_y = [
      0, 0, -1, 0,
      0, 1, 0, 0,
      1, 0, 0, 0,
      0, 0, 0, 1
   ]

   var ex5_x = [
      1, 0, 0, 0,
      0, 0, 1, 0,
      0, -1, 0, 0,
      0, 0, 0, 1
   ]

    this.pushMatrix();
    this.multMatrix(ex5_frente);
    this.myQuad.display();
    this.popMatrix();
    this.pushMatrix();
    this.multMatrix(ex5_y);
    this.multMatrix(ex5_y);
    this.multMatrix(ex5_frente);
    this.myQuad.display();
    this.popMatrix();
    this.pushMatrix();
    this.multMatrix(ex5_x);
    this.multMatrix(ex5_frente);
    this.myQuad.display();
    this.popMatrix();
    this.pushMatrix();
    this.multMatrix(ex5_x);
    this.multMatrix(ex5_x);
    this.multMatrix(ex5_x);
    this.multMatrix(ex5_frente);
    this.myQuad.display();
    this.popMatrix();
    this.pushMatrix();
    this.multMatrix(ex5_y);
    this.multMatrix(ex5_frente);
    this.myQuad.display();
    this.popMatrix();
    this.pushMatrix();
    this.multMatrix(ex5_y);
    this.multMatrix(ex5_y);
    this.multMatrix(ex5_y);
    this.multMatrix(ex5_frente);
    this.myQuad.display();
    this.popMatrix();
    
    // ---- END Primitive drawing section
  }
}
