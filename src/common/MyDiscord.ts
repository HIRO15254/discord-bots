import Discord from 'discord.js';
import getCommandPath from './getCommandPath';

// Discord Botのデータを表すクラス
export default class MyDiscord {
  client: any;
  token: string;
  commands: any = {};

  /**
   * Discord Botのデータを表すクラスを作成する
   * @param token Discordの認証トークン
   * @param commandsPath このbotのコマンドのパスの配列
   * @memberof MyDiscord
   */
  private constructor(token: string, commandsPath: string[]) {
    this.client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS]})
    this.token = token;
    for (const file of commandsPath) {
      const command = require(getCommandPath(file))
      this.commands[command.data.name] = command;
    }

    this.client.once('ready', async () => {
      const data = [];
      for (const commandName in this.commands) {
        data.push(this.commands[commandName].data);
      }
      console.log(data);
      await this.client.application?.commands.set(data, "918371121131311145"); //TODO: サーバーID消す
    });

    this.client.on('interactionCreate', async (interaction: Discord.CommandInteraction) => {
      if (!interaction.isCommand()) {
        return;
      }
      const command = this.commands[interaction.commandName];
      try {
        await command.execute(interaction);
      }
      catch (error) {
        console.error(error);
        await interaction.editReply({
          content: 'There was an error while executing this command!',
        });
      }
    });
  }

  /**
   * Discord Botにログインする
   * @param client Discordのクライアント
   * @param token Discordの認証トークン
   * @memberof MyDiscord
   */
  private static async login(client: Discord.Client, token: string) {
    await client.login(token);
  }

  /**
   * Discord Botを起動する
   * @param token Discordの認証トークン
   * @param commandsPath このbotのコマンドのパスの配列
   * @memberof MyDiscord
   */
  //TODO: サーバーIDを受け取るようにする
  public static async createMyDiscord(token: string, commandsPath: string[]) {
    const myDiscord = new MyDiscord(token, commandsPath);
    await this.login(myDiscord.client, myDiscord.token);
  }
}