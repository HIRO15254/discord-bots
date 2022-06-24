"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DIFFICULTIES = ["Past", "Present", "Future", "Beyond"];
class Difficulty {
    constructor(difficulty) {
        this.difficulty = -1;
        if (typeof (difficulty) == 'number') {
            this.difficulty = difficulty;
        }
        else if (typeof (difficulty) == 'string') {
            this.difficulty = DIFFICULTIES.indexOf(difficulty);
        }
        if (difficulty < 0 || DIFFICULTIES.length < difficulty) {
            throw new Error(`Difficultyクラスの初期化に失敗しました。\n初期化に使用した値: ${difficulty}`);
        }
    }
    toNumber() {
        return this.difficulty;
    }
    toString() {
        return DIFFICULTIES[this.difficulty];
    }
}
exports.default = Difficulty;
