import { GoogleSpreadsheetRow } from "google-spreadsheet";
import Level from './Level';
import Difficulty from './Difficulty';
import ChartObj from '../interface/ChartObj';

// 譜面データを表すクラス
export default class ChartData {
  private spreadSheetRow: GoogleSpreadsheetRow;
  chartObj: ChartObj

  /**
   * 譜面データを表すクラスを作成する
   * @param {GoogleSpreadsheetRow} spreadSheetRow 譜面データに対応するGoogleSpreadsheetRow
   * @memberof ChartData
   */
  constructor(spreadSheetRow: GoogleSpreadsheetRow) {
    this.spreadSheetRow = spreadSheetRow;
    this.chartObj = {
      title: this.spreadSheetRow.title,
      englishTitle: this.spreadSheetRow.english_title,
      composer: this.spreadSheetRow.composer,
      difficulty: new Difficulty(this.spreadSheetRow.difficulty),
      level: this.spreadSheetRow.level ? new Level(this.spreadSheetRow.level) : undefined,
      const: this.spreadSheetRow.const ? parseFloat(this.spreadSheetRow.const) : undefined,
      pack: this.spreadSheetRow.pack,
      requirement: this.spreadSheetRow.requirement
    }
  }

  /**
   * 譜面データを更新する
   * @param {ChartObj} chartObj 更新する譜面データ
   * @memberof ChartData
   */
  async update(chartObj: ChartObj) {
    let updated = false;
    if(this.chartObj.englishTitle != chartObj.englishTitle) {
      this.spreadSheetRow.english_title = chartObj.englishTitle ?? "";
      if(chartObj.englishTitle) { updated = true; }
    }
    if(this.chartObj.composer != chartObj.composer) {
      this.spreadSheetRow.composer = chartObj.composer ?? "";
      if(chartObj.composer) { updated = true; }
    }
    if(this.chartObj.level?.toString() != chartObj.level?.toString()) {
      this.spreadSheetRow.level = chartObj.level?.toString() ?? "";
      if(chartObj.level) { updated = true; }
    }
    if(this.chartObj.const != chartObj.const) {
      this.spreadSheetRow.const = chartObj.const ?? "";
      if(chartObj.const) { updated = true; }
    }
    if(this.chartObj.pack != chartObj.pack) {
      this.spreadSheetRow.pack = chartObj.pack ?? "";
      if(chartObj.pack) { updated = true; }
    }
    this.chartObj = chartObj;
    if(updated) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await this.spreadSheetRow.save();
    }
  }

  // 譜面ごとにuniqueな名前を返す
  getDictName() {
    return this.chartObj.title + "_" + this.chartObj.difficulty?.toString();
  }
}