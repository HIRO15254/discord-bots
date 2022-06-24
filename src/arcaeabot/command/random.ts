import Discord from 'discord.js';
module.exports = {
  data: {
    name: "random",
    description: "1～3の数字をランダムに返します",
  },
  async execute(interaction: Discord.CommandInteraction) {
    await interaction.deferReply({
      ephemeral: false
    });
    const ret = Math.floor(Math.random() * 3) + 1
    interaction.editReply(ret.toString())
  }
}