import { GoogleSpreadsheet } from 'google-spreadsheet';

// SpreadSheetのデータを表すクラス
export default class MySpreadsheet {
  spreadsheet: GoogleSpreadsheet;

  /**
   * SpreadSheetのデータを表すクラスを作成する(外部からは呼ばない)
   * @param sheetId SpreadSheetのid
   * @memberof MySpreadsheet
   */
  private constructor(sheetId: string) {
    this.spreadsheet = new GoogleSpreadsheet(sheetId);
  }

  /**
   * SpreadSheetのデータを表すクラスの初期化(外部からは呼ばない)
   * @param spreadsheet 初期化するデータが格納されたSpreadSheet
   * @memberof MySpreadsheet
   */
  private static async initialize(spreadsheet: GoogleSpreadsheet) {
    let credentials;
    try {
      credentials = require('../../credentials.json');
    }
    catch {
      credentials = require("/app/google-credentials.json");
    }
    await spreadsheet.useServiceAccountAuth(credentials);
    await spreadsheet.loadInfo()
  }

  /**
   * SpreadSheetのデータを表すクラスを作成する(外部から呼ぶ用)
   * @param sheetId SpreadSheetのid
   * @return SpreadSheetのデータを表すクラスのインスタンス
   * @memberof MySpreadsheet
   */
  public static async  createMySpreadsheet(sheetId: string) {
    if (sheetId == undefined) {
      console.error("Spreadsheet id is undefined.");
      return undefined;
    }
    const mySpreadsheet = new MySpreadsheet(sheetId);
    await this.initialize(mySpreadsheet.spreadsheet);
    return mySpreadsheet;
  }

  /**
   * 指定したidのSheetから列を取得する
   * @param id
   * @returns 取得したSheetの行を表すオブジェクトのリスト
   * @memberof MySpreadsheet
   */
  public async getRowsById(id: number) {
    return await this.spreadsheet.sheetsById[id].getRows();
  }

  /**
   * 指定したidのSheetに行を追加する
   * @param id
   * @param values 追加する行のオブジェクト
   * @param options 行追加のオプション(省略可)
   * @return 追加した行を表すオブジェクト
   * @memberof MySpreadsheet
   */
  public async createRow(id: number, values: { [header: string]: string | number | boolean; } | (string | number | boolean)[], options?: { raw: boolean; insert: boolean; } | undefined) {
    return await this.spreadsheet.sheetsById[id].addRow(values, options);
  }

  /**
   * 指定したidのSheetからヘッダを取得する
   * @param id
   * @return 取得したSheetのヘッダを表すオブジェクト
   * @memberof MySpreadsheet
   */
  public async getHeaders(id: number): Promise<string[]> {
    await this.spreadsheet.sheetsById[id].loadHeaderRow();
    return this.spreadsheet.sheetsById[id].headerValues;
  }
}