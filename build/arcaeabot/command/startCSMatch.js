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
const ChartDataManager_1 = __importDefault(require("../data/ChartDataManager"));
const PlayerDataManager_1 = __importDefault(require("../data/PlayerDataManager"));
const discord_js_1 = __importDefault(require("discord.js"));
const NUMBER = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"];
module.exports = {
    data: {
        name: "start_cs_match",
        description: "プロセカCS方式でのマッチを開始します",
        options: [
            {
                type: "USER",
                name: "player1",
                required: true,
                description: "参加プレイヤーへのメンションです。"
            },
            {
                type: "USER",
                name: "player2",
                required: true,
                description: "参加プレイヤーへのメンションです。"
            }
        ]
    },
    execute(interaction) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({
                ephemeral: false
            });
            const player1 = interaction.options.getUser('player1');
            const player2 = interaction.options.getUser('player2');
            const assignmentableCharts = ChartDataManager_1.default.getChartList().filter((ChartData) => {
                return ChartData.chartObj.level && ChartData.chartObj.level.toNumber() >= 7;
            }).filter((chartData) => {
                if (!player1 || !PlayerDataManager_1.default.playerData[player1.id]) {
                    return true;
                }
                else {
                    return PlayerDataManager_1.default.playerData[player1.id].have(chartData);
                }
            }).filter((chartData) => {
                if (!player2 || !PlayerDataManager_1.default.playerData[player2.id]) {
                    return true;
                }
                else {
                    return PlayerDataManager_1.default.playerData[player2.id].have(chartData);
                }
            });
            for (let i = assignmentableCharts.length - 1; i >= 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [assignmentableCharts[i], assignmentableCharts[j]] = [assignmentableCharts[j], assignmentableCharts[i]];
            }
            const embed = new discord_js_1.default.MessageEmbed();
            for (let i = 0; i < 9; i++) {
                const chartobj = assignmentableCharts[i].chartObj;
                embed.addField(NUMBER[i] + " " + chartobj.title, chartobj.difficulty.toString() + " " + ((_a = chartobj.level) === null || _a === void 0 ? void 0 : _a.toString()), true);
            }
            const reply = yield interaction.editReply({ embeds: [embed] });
            if (reply instanceof discord_js_1.default.Message) {
                for (let i = 0; i < 9; i++) {
                    reply.react(NUMBER[i]);
                }
            }
        });
    }
};
