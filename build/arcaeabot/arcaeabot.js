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
const MyDiscord_1 = __importDefault(require("../common/MyDiscord"));
const ChartDataManager_1 = __importDefault(require("./data/ChartDataManager"));
const PlayerDataManager_1 = __importDefault(require("./data/PlayerDataManager"));
require('dotenv').config();
function startArcaeaBot() {
    return __awaiter(this, void 0, void 0, function* () {
        const commandsPath = [
            "arcaeabot/command/update",
            "arcaeabot/command/startCSmatch",
            "arcaeabot/command/random",
        ];
        const token = process.env.DISCORD_TOKEN;
        yield ChartDataManager_1.default.load();
        yield PlayerDataManager_1.default.load();
        const myDiscord = yield MyDiscord_1.default.createMyDiscord(token, commandsPath);
    });
}
exports.default = startArcaeaBot;
