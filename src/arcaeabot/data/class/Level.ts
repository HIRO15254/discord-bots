const LEVELS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "9+", "10", "10+", "11"]

// 譜面のレベルを表すクラス
export default class Level {
  private level = -1;

  /**
   * 文字列またはレベルに対応する数字からレベルクラスを生成する
   * @param level レベルを表す文字列または数字
   * @memberof Level
   */
  constructor(level: number | string) {
    if(typeof(level) == 'number') {
      this.level = level;
    } else if(typeof(level) == 'string') {
      this.level = LEVELS.indexOf(level);
    }
    if(this.level < 0 || LEVELS.length < this.level) {
      throw new Error(`Levelクラスの初期化に失敗しました。\n初期化に使用した値: ${level}`)
    }
  }

  /**
   * クラスが表す難易度に対応する数字を返す
   * @return 難易度に対応する数字 
   * @memberof Level
   */
  public toNumber() {
    return this.level;
  }

  /**
   * クラスが表すレベルの文字列を返す
   * @return レベルの文字列 
   * @memberof Level
   */
  public toString() {
    return LEVELS[this.level];
  }
}