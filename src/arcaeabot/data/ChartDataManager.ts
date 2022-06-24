import ChartData from './class/ChartData';
import MySpreadsheet from '../../common/MySpreadsheet';
import ChartObj from './interface/ChartObj';

class ChartDataManager {
  chartData: { [name: string] : ChartData } = {};
  chartDataSpreadsheet?: MySpreadsheet = undefined;

  async load() {
    this.chartData = {};
    this.chartDataSpreadsheet = await MySpreadsheet.createMySpreadsheet(process.env.ARCAEA_CHARTDATA_SPREADSHEET_ID ?? "");
    const songDataRows = await this.chartDataSpreadsheet?.getRowsById(0);
    if(songDataRows == undefined) { return; }
    songDataRows.forEach(songRow => {
      const chartData = new ChartData(songRow);
      this.chartData[chartData.getDictName()] = chartData;
    })
  }

  public async update(data: ChartObj) {
    const objectKey = data.title + "_" + data.difficulty.toString();
    if(objectKey in this.chartData) {
      await this.chartData[objectKey].update(data);
    } else {
      const spreadsheetRow = await this.chartDataSpreadsheet?.createRow(0, {
        'title': data.title,
        'english_title': data.englishTitle ?? "",
        'composer': data.composer ?? "",
        'difficulty': data.difficulty.toString(),
        'level': data.level?.toString() ?? "",
        'const': data.const ?? "",
        'pack': data.pack ?? "",
        'requirement': data.requirement ?? ""
      });
      if(!spreadsheetRow) {
        throw new Error("譜面データマネージャへの譜面の追加に失敗しました。");
      }
      this.chartData[objectKey] = new ChartData(spreadsheetRow);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  public getChartList(): ChartData[] {
    return Object.values(this.chartData);
  }
}

export default new ChartDataManager();