import Discord from "discord.js"
import cheerio from "cheerio";
import superagent from 'superagent';
import ChartDataManager from "../data/ChartDataManager";
import ChartObj from '../data/interface/ChartObj';
import Difficulty from "../data/class/Difficulty";
import Level from "../data/class/Level";

// wikiの楽曲一覧ページのURL
const WIKI_URL = "https://wikiwiki.jp/arcaea/%E3%83%91%E3%83%83%E3%82%AF%E9%A0%86";
const DIFFICULTIES = ["Past", "Present", "Future", "Beyond"];
const COLORS = ["Aqua", "Lime", "Fuchsia", "Red"];

// 最新の収録楽曲データを取得するコマンド
module.exports = {
  data: {
    name: "update",
    description: "最新のデータを取得します。(かなり時間がかかります。)",
  },
  // コマンド実行時の処理
  async execute(interaction: Discord.CommandInteraction) {
    // 仮のメッセージを表示する
    await interaction.deferReply({
      ephemeral: false,
    });
    const html = await superagent.get(WIKI_URL);
    const $ = cheerio.load(html.text);
    const links = $("div.nobr div.h-scrollable table tbody tr td a.rel-wiki-page");
    let urls: string[] = [];
    links.each((i, link) => {
      const linkUrl = $(link).attr('href')
      if(linkUrl) { urls.push(`https://wikiwiki.jp${linkUrl}`); }
    });
    urls = Array.from(new Set(urls)); // 重複を消す
    let counter = 0;

    for(const url of urls) {
      let composer = "";
      const levels: string[] = new Array(4);
      const consts: number[] = new Array(4);
      let commonReq = "";
      const requirements: string[] = new Array(4);
      let pack = "";

      if(url == undefined) { continue; }
      const html = await superagent.get(url);
      const $ = cheerio.load(html.text);

      const title = $("h1.title").text();
      const englishTitle = html.text.match(/英語版タイトル「(.+)」/u)?.[1];
      const mainTableRows = $("div.nobr div.h-scrollable table tbody tr");
      for(const row of mainTableRows) {
        const header = $(row).find("th:first").text()
        if(header == "Composer") {
          composer = $(row).find("td:first").text();
        } else if(header == "Level") {
          $(row).find("td").each((i, elem) => {
            $(elem).find("a.note_super").remove();
            levels[i] = $(elem).text();
          });
        } else if(header == "Pack") {
          $(row).find("a.note_super").remove();
          pack = $(row).find("td:first").text();
        }
      }
      for(let i = 0; i < 4; i++) {
        consts[i] = parseFloat($(`ul.list1 > li > span.wikicolor[style="color:${COLORS[i]}"] + span`).text().match(/[\d\.]+/)?.[0] ?? "0");
      }
      if(consts[4] == 0) {
        consts[4] = parseFloat($(`ul.list1 > li > span.wikicolor[style="color:red"] + span`).text().match(/[\d\.]+/)?.[0] ?? "0");
      }
      $("div#content > div.h-scrollable > table > tbody > tr").each((i, elem) => {
        const diff = $(elem).find("th:last").text();
        if (diff == "共通") {
          commonReq = $(elem).find("td").text();
        } else {
          requirements[DIFFICULTIES.indexOf(diff)] = commonReq + $(elem).find("td").text();
        }
      });
      for(let i = 0; i < 4; i++) {
        if(levels[i]) {
          const chartObj: ChartObj = {
            title: title,
            englishTitle: englishTitle,
            composer: composer,
            difficulty: new Difficulty(i),
            level: new Level(levels[i]),
            const: consts[i],
            pack: pack,
            requirement: requirements[i]
          }
          await ChartDataManager.update(chartObj);
        }
        await interaction.editReply({
          content: `楽曲情報を取得しています... (${counter} / ${urls.length} : ${new Difficulty(i).toString()}) `,
        });
      }
      counter++;

    }
    await interaction.editReply({
      content: "完了しました",
    });
  },
}

