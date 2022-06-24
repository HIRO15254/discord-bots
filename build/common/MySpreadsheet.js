"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_spreadsheet_1 = require("google-spreadsheet");
class MySpreadsheet {
    constructor(sheetId) {
        this.spreadsheet = new google_spreadsheet_1.GoogleSpreadsheet(sheetId);
    }
    static initialize(spreadsheet) {
        return __awaiter(this, void 0, void 0, function* () {
            let credentials;
            try {
                credentials = require('../../credentials.json');
            }
            catch (_a) {
                credentials = require("/app/google-credentials.json");
            }
            yield spreadsheet.useServiceAccountAuth(credentials);
            yield spreadsheet.loadInfo();
        });
    }
    static createMySpreadsheet(sheetId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sheetId == undefined) {
                console.error("Spreadsheet id is undifined.");
                return undefined;
            }
            const mySpreadsheet = new MySpreadsheet(sheetId);
            yield this.initialize(mySpreadsheet.spreadsheet);
            return mySpreadsheet;
        });
    }
    getRowsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.spreadsheet.sheetsById[id].getRows();
        });
    }
    createRow(id, values, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.spreadsheet.sheetsById[id].addRow(values, options);
        });
    }
    getHeaders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.spreadsheet.sheetsById[id].loadHeaderRow();
            return this.spreadsheet.sheetsById[id].headerValues;
        });
    }
}
exports.default = MySpreadsheet;
