import MyDiscord from "../common/MyDiscord";
import MySpreadsheet from '../common/MySpreadsheet';
import ChartDataManager from './data/ChartDataManager';
import PlayerDataManager from "./data/PlayerDataManager";

require('dotenv').config();

export default async function startArcaeaBot(): Promise<void> {
  const commandsPath = [
    "arcaeabot/command/update",
    "arcaeabot/command/startCSMatch",
    "arcaeabot/command/random",
  ];
  const token = process.env.DISCORD_TOKEN;
  await ChartDataManager.load()
  await PlayerDataManager.load()
  const myDiscord = await MyDiscord.createMyDiscord(token, commandsPath)
}
