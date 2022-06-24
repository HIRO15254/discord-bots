import ChartDataManager from '../data/ChartDataManager';
import PlayerDataManager from '../data/PlayerDataManager';
import Discord from 'discord.js';

const NUMBER = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"]

// プロセカCS式マッチの課題曲を提示するコマンド
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
  async execute(interaction: Discord.CommandInteraction) {
    await interaction.deferReply({
      ephemeral: false
    });
    const player1 = interaction.options.getUser('player1');
    const player2 = interaction.options.getUser('player2');
    const assignmentableCharts = ChartDataManager.getChartList().filter((ChartData) => {
      return ChartData.chartObj.level && ChartData.chartObj.level.toNumber() >= 7;
    }).filter((chartData) => {
      if(!player1 || !PlayerDataManager.playerData[player1.id]) {
        return true;
      } else {
        return PlayerDataManager.playerData[player1.id].have(chartData)
      }
    }).filter((chartData) => {
      if(!player2 || !PlayerDataManager.playerData[player2.id]) {
        return true;
      } else {
        return PlayerDataManager.playerData[player2.id].have(chartData)
      }
    });
    for (let i = assignmentableCharts.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [assignmentableCharts[i], assignmentableCharts[j]] = [assignmentableCharts[j], assignmentableCharts[i]];
    }
    const embed = new Discord.MessageEmbed()
    for(let i = 0; i < 9; i++) {
      const chartObj = assignmentableCharts[i].chartObj;
      embed.addField(`${NUMBER[i]} ${chartObj.title}`, `${chartObj.difficulty.toString()} ${chartObj.level?.toString() ?? ""}`, true);
    }
    const reply = await interaction.editReply({embeds: [embed]});
    if(reply instanceof Discord.Message) {
      for(let i = 0; i < 9; i++ ) {
        reply.react(NUMBER[i]);
      }
    }
  }
}