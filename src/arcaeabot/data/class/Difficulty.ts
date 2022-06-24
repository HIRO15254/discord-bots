const DIFFICULTIES = ["Past", "Present", "Future", "Beyond"]

// 譜面の難易度を表すクラス
export default class Difficulty {
  private difficulty = -1;

  /**
   * 文字列または難易度に対応する数字から難易度クラスを生成する
   * @param difficulty 難易度を表す文字列または数字
   * @memberof Difficulty
   */
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

  /**
   * 難易度に対応する数字を返す
   * @return 難易度に対応する数字 
   * @memberof Difficulty
   */
  public toNumber() {
    return this.difficulty;
  }

  /**
   * 難易度を表す文字列を返す
   * @return 難易度を表す文字列 
   * @memberof Difficulty
   */
  public toString() {
    return DIFFICULTIES[this.difficulty];
  }
}