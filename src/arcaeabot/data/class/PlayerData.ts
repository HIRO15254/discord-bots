import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import ChartData from './ChartData';

export default class PlayerData {
  pack: { [name: string] : Boolean } = {}
  chart: { [name: string] : Boolean } = {}
  id: string;
  spreadSheetRow: GoogleSpreadsheetRow

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