import { GoogleSpreadsheet } from 'google-spreadsheet';

export default class MySpreadsheet {
  spreadsheet: GoogleSpreadsheet;

  constructor(sheetId: string) {
    this.spreadsheet = new GoogleSpreadsheet(sheetId);
  }

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

  public static async  createMySpreadsheet(sheetId: string | undefined) {
    if (sheetId == undefined) {
      console.error("Spreadsheet id is undifined.");
      return undefined;
    }
    const mySpreadsheet = new MySpreadsheet(sheetId);
    await this.initialize(mySpreadsheet.spreadsheet);
    return mySpreadsheet;
  }

  public async getRowsById(id: number) {
    return await this.spreadsheet.sheetsById[id].getRows();
  }

  public async createRow(id: number, values: { [header: string]: string | number | boolean; } | (string | number | boolean)[], options?: { raw: boolean; insert: boolean; } | undefined) {
    return await this.spreadsheet.sheetsById[id].addRow(values, options);
  }

  public async getHeaders(id: number): Promise<string[]> {
    await this.spreadsheet.sheetsById[id].loadHeaderRow();
    return this.spreadsheet.sheetsById[id].headerValues;
  }
}