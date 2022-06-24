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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ChartData_1 = __importDefault(require("./class/ChartData"));
const MySpreadsheet_1 = __importDefault(require("../../common/MySpreadsheet"));
class ChartDataManager {
    constructor() {
        this.chartData = {};
        this.chartDataSpreadsheet = undefined;
    }
    load() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.chartData = {};
            this.chartDataSpreadsheet = yield MySpreadsheet_1.default.createMySpreadsheet(process.env.ARCAEA_CHARTDATA_SPREADSHEET_ID);
            const songDataRows = yield ((_a = this.chartDataSpreadsheet) === null || _a === void 0 ? void 0 : _a.getRowsById(0));
            if (songDataRows == undefined) {
                return;
            }
            songDataRows.forEach(songRow => {
                const chartData = new ChartData_1.default(songRow);
                this.chartData[chartData.getDictName()] = chartData;
            });
        });
    }
    update(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            const objectKey = data.title + "_" + data.difficulty.toString();
            if (objectKey in this.chartData) {
                yield this.chartData[objectKey].update(data);
            }
            else {
                const spreadsheetRow = yield ((_a = this.chartDataSpreadsheet) === null || _a === void 0 ? void 0 : _a.createRow(0, {
                    'title': data.title,
                    'english_title': (_b = data.englishTitle) !== null && _b !== void 0 ? _b : "",
                    'composer': (_c = data.composer) !== null && _c !== void 0 ? _c : "",
                    'difficulty': data.difficulty.toString(),
                    'level': (_e = (_d = data.level) === null || _d === void 0 ? void 0 : _d.toString()) !== null && _e !== void 0 ? _e : "",
                    'const': (_f = data.const) !== null && _f !== void 0 ? _f : "",
                    'pack': (_g = data.pack) !== null && _g !== void 0 ? _g : "",
                    'requirement': (_h = data.requirement) !== null && _h !== void 0 ? _h : ""
                }));
                if (!spreadsheetRow) {
                    throw new Error("譜面データマネージャへの譜面の追加に失敗しました。");
                }
                this.chartData[objectKey] = new ChartData_1.default(spreadsheetRow);
                yield new Promise(resolve => setTimeout(resolve, 1000));
            }
        });
    }
    getChartList() {
        return Object.values(this.chartData);
    }
}
exports.default = new ChartDataManager();
