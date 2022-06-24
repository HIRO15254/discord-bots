import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import ChartData from './ChartData';

// 各プレイヤーを表すクラス
export default class PlayerData {
  pack: { [name: string] : boolean } = {}
  chart: { [name: string] : boolean } = {}
  id: string;
  spreadSheetRow: GoogleSpreadsheetRow

  /**
   * spreadSheetRowからプレイヤーを表すクラスを作成する
   * @param {GoogleSpreadsheetRow} spreadSheetRow プレイヤーに対応するGoogleSpreadsheetRow
   * @param {string[]} headers ヘッダーのリスト
   * @memberof PlayerData
   */
  // TODO: どう考えてもObjectで受け取ったほうがいい
  constructor(spreadSheetRow: GoogleSpreadsheetRow, headers: string[]) {
    this.spreadSheetRow = spreadSheetRow;
    this.id = this.spreadSheetRow.id;
    headers.forEach((header) => {
      if(header.indexOf("_") != -1) {
        this.chart[header] = spreadSheetRow[header] == "TRUE";
      } else if (header != "name" && header != "id") {
        this.pack[header] = spreadSheetRow[header] == "TRUE";
      }
    });
  }

  public have(chart: ChartData): boolean {
    if (chart.chartObj.pack && chart.chartObj.pack.trim() in this.pack && !this.pack[chart.chartObj.pack.trim()]) { //TODO: ここ以外でTrim処理やる
      return false;
    }
    if (chart.getDictName() in this.chart && !this.chart[chart.getDictName()]) {
      return false;
    }
    return true;
  }
}