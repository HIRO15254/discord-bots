import Discord from 'discord.js';
import path from 'path'
import getCommandPath from './getCommandPath';

export default class MyDiscord {
  client: any;
  token: string;
  commands: any = {};

  constructor(token: string, commandsPath: string[]) {
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
      await this.client.application.commands.set(data, "918371121131311145"); //TODO: サーバーID消す
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

  private static async login(client: Discord.Client, token: string) {
    await client.login(token);
    console.log("OK");
  }

  public static async createMyDiscord(token: string | undefined, commandsPath: string[]) {
    if (token == undefined) {
      console.error("Discord token is undifined.");
      return undefined;
    }
    const myDiscord = new MyDiscord(token, commandsPath);
    await this.login(myDiscord.client, myDiscord.token);
    return myDiscord;
  }
}