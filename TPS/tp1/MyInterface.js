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
        this.gui.add(this.scene, 'displayAxis').name('Axis');
        this.gui.add(this.scene, 'displayDiamond').name('Diamond');
        /**
         * Ex1
         */
        this.gui.add(this.scene, 'displayTriangle').name('Triangle');

        this.gui.add(this.scene, 'displayParallelogram').name('Parallelogram');
        /**
         * Ex2
         */
        this.gui.add(this.scene, 'displaySmallTriangle').name('Triangle Small')
        this.gui.add(this.scene, 'displayBigTriangle').name('Triangle Big')


        //Slider element in GUI
        this.gui.add(this.scene, 'scaleFactor', 0.1, 5).name('Scale Factor');

        return true;
    }
}