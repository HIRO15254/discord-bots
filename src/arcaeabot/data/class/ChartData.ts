import { GoogleSpreadsheetRow } from "google-spreadsheet";
import Level from './Level';
import Difficulty from './Difficulty';
import ChartObj from '../interface/ChartObj';

export default class ChartData {
  spreadSheetRow: GoogleSpreadsheetRow;
  chartObj: ChartObj

  constructor(spreadSheetrow: GoogleSpreadsheetRow) {
    this.spreadSheetRow = spreadSheetrow;
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

  getDictName() {
    return this.chartObj.title + "_" + this.chartObj.difficulty?.toString();
  }
}