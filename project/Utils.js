export class Utils {
    static translate(scene, position) {
        var translateMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            position[0], position[1], position[2], 1
        ];

        scene.multMatrix(translateMatrix);
    }

    static selfRotate(scene, position, ang) {
        this.translate(scene, [0, position[1], 0]);
        this.rotateY(scene, ang);
        this.translate(scene, [0, -position[1], 0]);
    }

    static absSelfRotate(scene, position, ang) {
        this.translate(scene, [position[0], position[1], position[2]]);
        this.rotateY(scene, ang);
        this.translate(scene, [-position[0], -position[1], -position[2]]);
    }

    static rotateX(scene, ang) {
        var rotateXMatrix = [
            1, 0, 0, 0,
            0, Math.cos(ang), Math.sin(ang), 0,
            0, - Math.sin(ang), Math.cos(ang), 0,
            0, 0, 0, 1
        ];

        scene.multMatrix(rotateXMatrix);
    }

    static rotateY(scene, ang) {
        var rotateYMatrix = [
            Math.cos(ang), 0, - Math.sin(ang), 0,
            0, 1, 0, 0,
            Math.sin(ang), 0, Math.cos(ang), 0,
            0, 0, 0, 1
        ]

        scene.multMatrix(rotateYMatrix);
    }

    static rotateZ(scene, ang) {
        var rotateZMatrix = [
            Math.cos(ang), Math.sin(ang), 0, 0,
            - Math.sin(ang), Math.cos(ang), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]

        scene.multMatrix(rotateZMatrix);
    }

    static scalating(scene, values) {
        var scalatingMatrix = [
            values[0], 0, 0, 0,
            0, values[1], 0, 0,
            0, 0, values[2], 0,
            0, 0, 0, 1
        ];

        scene.multMatrix(scalatingMatrix);
    }

    static generateRand(min, max) {
        return (Math.random() * (max - min) + min);
    }

    static generateRandBetween(min, stop, start, max) {
        var f1 = this.generateRand(min, stop);
        var f2 = this.generateRand(start, max);
        var decision = this.generateRand(-1, 1);
        if (decision >= 0) return f1;
        return f2;
    }

    static calculateDist(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1[2] - pos2[2], 2) + Math.pow(pos1[1] - pos2[1], 2) + Math.pow(pos1[0] - pos2[0], 2));
    }

    //used in throw
    static calculateNestDistXZ(pos){
        //nestPos: [1.2, 0, 1.08]
        return Math.sqrt(Math.pow(1.2 - pos[0], 2) + Math.pow(1.08-pos[2],2));
    }

    static isInRange(x, point, range) {
        return (x <= point + range && x >= point - range);
    }

    static isEqualPos(pos1, pos2, error) {
        return this.isInRange(pos1[0], pos2[0], error) && this.isInRange(pos1[1], pos2[1], error) && this.isInRange(pos1[2], pos2[2], error);
    }
}
