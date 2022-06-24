"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PlayerData {
    constructor(spreadSheetRow, headers) {
        this.pack = {};
        this.chart = {};
        this.spreadSheetRow = spreadSheetRow;
        this.id = this.spreadSheetRow.id;
        headers.forEach((header) => {
            if (header.indexOf("_") != -1) {
                this.chart[header] = spreadSheetRow[header] == "TRUE";
            }
            else if (header != "name" && header != "id") {
                this.pack[header] = spreadSheetRow[header] == "TRUE";
            }
        });
    }
    have(chart) {
        console.log(chart.chartObj.pack);
        console.log(chart.getDictName());
        if (chart.chartObj.pack && chart.chartObj.pack.trim() in this.pack && !this.pack[chart.chartObj.pack.trim()]) { //TODO: ここ以外でTrim処理やる
            return false;
        }
        if (chart.getDictName() in this.chart && !this.chart[chart.getDictName()]) {
            return false;
        }
        return true;
    }
}
exports.default = PlayerData;
