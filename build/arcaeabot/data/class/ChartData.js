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
const Level_1 = __importDefault(require("./Level"));
const Difficulty_1 = __importDefault(require("./Difficulty"));
class ChartData {
    constructor(spreadSheetrow) {
        this.spreadSheetRow = spreadSheetrow;
        this.chartObj = {
            title: this.spreadSheetRow.title,
            englishTitle: this.spreadSheetRow.english_title,
            composer: this.spreadSheetRow.composer,
            difficulty: new Difficulty_1.default(this.spreadSheetRow.difficulty),
            level: this.spreadSheetRow.level ? new Level_1.default(this.spreadSheetRow.level) : undefined,
            const: this.spreadSheetRow.const ? parseFloat(this.spreadSheetRow.const) : undefined,
            pack: this.spreadSheetRow.pack,
            requirement: this.spreadSheetRow.requirement
        };
    }
    update(chartObj) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return __awaiter(this, void 0, void 0, function* () {
            let updated = false;
            if (this.chartObj.englishTitle != chartObj.englishTitle) {
                this.spreadSheetRow.english_title = (_a = chartObj.englishTitle) !== null && _a !== void 0 ? _a : "";
                if (chartObj.englishTitle) {
                    updated = true;
                }
            }
            if (this.chartObj.composer != chartObj.composer) {
                this.spreadSheetRow.composer = (_b = chartObj.composer) !== null && _b !== void 0 ? _b : "";
                if (chartObj.composer) {
                    updated = true;
                }
            }
            if (((_c = this.chartObj.level) === null || _c === void 0 ? void 0 : _c.toString()) != ((_d = chartObj.level) === null || _d === void 0 ? void 0 : _d.toString())) {
                this.spreadSheetRow.level = (_f = (_e = chartObj.level) === null || _e === void 0 ? void 0 : _e.toString()) !== null && _f !== void 0 ? _f : "";
                if (chartObj.level) {
                    updated = true;
                }
            }
            if (this.chartObj.const != chartObj.const) {
                this.spreadSheetRow.const = (_g = chartObj.const) !== null && _g !== void 0 ? _g : "";
                if (chartObj.const) {
                    updated = true;
                }
            }
            if (this.chartObj.pack != chartObj.pack) {
                this.spreadSheetRow.pack = (_h = chartObj.pack) !== null && _h !== void 0 ? _h : "";
                if (chartObj.pack) {
                    updated = true;
                }
            }
            this.chartObj = chartObj;
            if (updated) {
                yield new Promise(resolve => setTimeout(resolve, 1000));
                yield this.spreadSheetRow.save();
            }
        });
    }
    getDictName() {
        var _a;
        return this.chartObj.title + "_" + ((_a = this.chartObj.difficulty) === null || _a === void 0 ? void 0 : _a.toString());
    }
}
exports.default = ChartData;
