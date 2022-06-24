const LEVELS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "9+", "10", "10+", "11"]

export default class Level {
  private level: number = -1;

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

  public toNumber() {
    return this.level;
  }

  public toString() {
    return LEVELS[this.level];
  }
}