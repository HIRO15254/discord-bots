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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _PlayerDataManager_chartDataSpreadsheet;
Object.defineProperty(exports, "__esModule", { value: true });
const PlayerData_1 = __importDefault(require("./class/PlayerData"));
const MySpreadsheet_1 = __importDefault(require("../../common/MySpreadsheet"));
class PlayerDataManager {
    constructor() {
        this.playerData = {};
        _PlayerDataManager_chartDataSpreadsheet.set(this, undefined);
    }
    load() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.playerData = {};
            __classPrivateFieldSet(this, _PlayerDataManager_chartDataSpreadsheet, yield MySpreadsheet_1.default.createMySpreadsheet(process.env.ARCAEA_PLAYERDATA_SPREADSHEET_ID), "f");
            const playerDataHeaders = yield ((_a = __classPrivateFieldGet(this, _PlayerDataManager_chartDataSpreadsheet, "f")) === null || _a === void 0 ? void 0 : _a.getHeaders(937636320)); //TODO: べた書きよくない
            const playerDataRows = yield ((_b = __classPrivateFieldGet(this, _PlayerDataManager_chartDataSpreadsheet, "f")) === null || _b === void 0 ? void 0 : _b.getRowsById(937636320)); //TODO: べた書きよくない
            if (!playerDataRows) {
                return;
            }
            if (!playerDataHeaders) {
                return;
            }
            playerDataRows.forEach(songRow => {
                const playerData = new PlayerData_1.default(songRow, playerDataHeaders);
                this.playerData[playerData.id] = playerData;
            });
        });
    }
}
_PlayerDataManager_chartDataSpreadsheet = new WeakMap();
exports.default = new PlayerDataManager();
