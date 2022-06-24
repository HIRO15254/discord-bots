const DIFFICULTIES = ["Past", "Present", "Future", "Beyond"]

export default class Difficulty {
  private difficulty: number = -1;

  constructor(difficulty: number | string) {
    if(typeof(difficulty) == 'number') {
      this.difficulty = difficulty;
    } else if(typeof(difficulty) == 'string') {
      this.difficulty = DIFFICULTIES.indexOf(difficulty);
    }
    if(difficulty < 0 || DIFFICULTIES.length < difficulty) {
      throw new Error(`Difficultyクラスの初期化に失敗しました。\n初期化に使用した値: ${difficulty}`);
    }
  }

  public toNumber() {
    return this.difficulty;
  }

  public toString() {
    return DIFFICULTIES[this.difficulty];
  }
}