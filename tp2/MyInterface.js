import {CGFinterface, dat} from '../lib/CGF.js';

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
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        this.gui.add(this.scene, 'exercise_2_1_2').name('Exercise 2.1/2.2');

        this.gui.add(this.scene, 'exercise_2_3').name('Exercise 2.3');

        this.gui.add(this.scene, 'exercise_3').name('Exercise 3');
        
        this.gui.add(this.scene, 'exercise_3_4').name('Exercise 3.4');

        this.gui.add(this.scene, 'exercise_3_5').name('Exercise 3.5');

        this.gui.add(this.scene, 'exercise_4').name('Exercise 4');
        
        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}