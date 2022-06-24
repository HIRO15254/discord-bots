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
const cheerio_1 = __importDefault(require("cheerio"));
const superagent_1 = __importDefault(require("superagent"));
const ChartDataManager_1 = __importDefault(require("../data/ChartDataManager"));
const Difficulty_1 = __importDefault(require("../data/class/Difficulty"));
const Level_1 = __importDefault(require("../data/class/Level"));
const WIKI_URL = "https://wikiwiki.jp/arcaea/%E3%83%91%E3%83%83%E3%82%AF%E9%A0%86";
const DIFFICULTIES = ["Past", "Present", "Future", "Beyond"];
const COLORS = ["Aqua", "Lime", "Fuchsia", "Red"];
module.exports = {
    data: {
        name: "update",
        description: "最新のデータを取得します。(かなり時間がかかります。)",
    },
    execute(interaction) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.deferReply({
                ephemeral: false,
            });
            const html = yield superagent_1.default.get(WIKI_URL);
            const $ = cheerio_1.default.load(html.text);
            const links = $("div.nobr div.h-scrollable table tbody tr td a.rel-wiki-page");
            let urls = [];
            links.each((i, link) => {
                const linkUrl = $(link).attr('href');
                if (linkUrl) {
                    urls.push(`https://wikiwiki.jp${linkUrl}`);
                }
            });
            urls = Array.from(new Set(urls)); // 重複を消す
            let counter = 0;
            for (const url of urls) {
                let title;
                let englishTitle;
                let composer = "";
                const levels = new Array(4);
                const consts = new Array(4);
                let commonReq = "";
                const requirements = new Array(4);
                let pack = "";
                if (url == undefined) {
                    continue;
                }
                const html = yield superagent_1.default.get(url);
                const $ = cheerio_1.default.load(html.text);
                title = $("h1.title").text();
                englishTitle = (_a = html.text.match(/英語版タイトル「(.+)」/)) === null || _a === void 0 ? void 0 : _a[1];
                const mainTableRows = $("div.nobr div.h-scrollable table tbody tr");
                for (const row of mainTableRows) {
                    const header = $(row).find("th:first").text();
                    if (header == "Composer") {
                        composer = $(row).find("td:first").text();
                    }
                    else if (header == "Level") {
                        $(row).find("td").each((i, elem) => {
                            $(elem).find("a.note_super").remove();
                            levels[i] = $(elem).text();
                        });
                    }
                    else if (header == "Pack") {
                        $(row).find("a.note_super").remove();
                        pack = $(row).find("td:first").text();
                    }
                }
                for (let i = 0; i < 4; i++) {
                    consts[i] = parseFloat((_c = (_b = $(`ul.list1 > li > span.wikicolor[style="color:${COLORS[i]}"] + span`).text().match(/[\d\.]+/)) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : "0");
                }
                if (consts[4] == 0) {
                    consts[4] = parseFloat((_e = (_d = $(`ul.list1 > li > span.wikicolor[style="color:red"] + span`).text().match(/[\d\.]+/)) === null || _d === void 0 ? void 0 : _d[0]) !== null && _e !== void 0 ? _e : "0");
                }
                $("div#content > div.h-scrollable > table > tbody > tr").each((i, elem) => {
                    const diff = $(elem).find("th:last").text();
                    if (diff == "共通") {
                        commonReq = $(elem).find("td").text();
                    }
                    else {
                        requirements[DIFFICULTIES.indexOf(diff)] = commonReq + $(elem).find("td").text();
                    }
                });
                for (let i = 0; i < 4; i++) {
                    if (levels[i]) {
                        const chartObj = {
                            title: title,
                            englishTitle: englishTitle,
                            composer: composer,
                            difficulty: new Difficulty_1.default(i),
                            level: new Level_1.default(levels[i]),
                            const: consts[i],
                            pack: pack,
                            requirement: requirements[i]
                        };
                        yield ChartDataManager_1.default.update(chartObj);
                    }
                    yield interaction.editReply({
                        content: `楽曲情報を取得しています... (${counter} / ${urls.length} : ${new Difficulty_1.default(i).toString()}) `,
                    });
                }
                counter++;
            }
            yield interaction.editReply({
                content: "完了しました",
            });
        });
    },
};
