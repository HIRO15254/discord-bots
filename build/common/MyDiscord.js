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
const discord_js_1 = __importDefault(require("discord.js"));
const getCommandPath_1 = __importDefault(require("./getCommandPath"));
class MyDiscord {
    constructor(token, commandsPath) {
        this.commands = {};
        this.client = new discord_js_1.default.Client({ intents: [discord_js_1.default.Intents.FLAGS.GUILDS] });
        this.token = token;
        for (const file of commandsPath) {
            const command = require((0, getCommandPath_1.default)(file));
            this.commands[command.data.name] = command;
        }
        this.client.once('ready', () => __awaiter(this, void 0, void 0, function* () {
            const data = [];
            for (const commandName in this.commands) {
                data.push(this.commands[commandName].data);
            }
            console.log(data);
            yield this.client.application.commands.set(data, "918371121131311145"); //TODO: サーバーID消す
        }));
        this.client.on('interactionCreate', (interaction) => __awaiter(this, void 0, void 0, function* () {
            if (!interaction.isCommand()) {
                return;
            }
            const command = this.commands[interaction.commandName];
            try {
                yield command.execute(interaction);
            }
            catch (error) {
                console.error(error);
                yield interaction.editReply({
                    content: 'There was an error while executing this command!',
                });
            }
        }));
    }
    static login(client, token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield client.login(token);
            console.log("OK");
        });
    }
    static createMyDiscord(token, commandsPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (token == undefined) {
                console.error("Discord token is undifined.");
                return undefined;
            }
            const myDiscord = new MyDiscord(token, commandsPath);
            yield this.login(myDiscord.client, myDiscord.token);
            return myDiscord;
        });
    }
}
exports.default = MyDiscord;
