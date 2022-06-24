import PlayerData from './class/PlayerData';
import MySpreadsheet from '../../common/MySpreadsheet';

class PlayerDataManager {
  playerData: { [name: string] : PlayerData } = {};
  #chartDataSpreadsheet?: MySpreadsheet = undefined;

  constructor() {
  }

  async load() {
    this.playerData = {};
    this.#chartDataSpreadsheet = await MySpreadsheet.createMySpreadsheet(process.env.ARCAEA_PLAYERDATA_SPREADSHEET_ID);
    const playerDataHeaders = await this.#chartDataSpreadsheet?.getHeaders(937636320); //TODO: べた書きよくない
    const playerDataRows = await this.#chartDataSpreadsheet?.getRowsById(937636320); //TODO: べた書きよくない
    if(!playerDataRows) { return; }
    if(!playerDataHeaders) { return; }
    playerDataRows.forEach(songRow => {
      const playerData = new PlayerData(songRow, playerDataHeaders);
      this.playerData[playerData.id] = playerData;
    })
  }
}

export default new PlayerDataManager();