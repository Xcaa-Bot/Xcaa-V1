require("./settings/config.js");
const {
  WAConnection,
  MessageType,
  Presence,
  MessageOptions,
  Mimetype,
  WALocationMessage,
  WA_MESSAGE_STUB_TYPES,
  WA_DEFAULT_EPHEMERAL,
  ReconnectMode,
  ProxyAgent,
  GroupSettingChange,
  waChatKey,
  mentionedJid,
  processTime,
} = require("@adiwajshing/baileys");
const fs = require("fs");
const CFonts = require("cfonts");
const { color } = require("./lib/color");
const { banner, getBuffer, start, success } = require("./lib/functions");

require("./xcaa.js");
nocache("./xcaa.js", (module) => console.log(`${module} is now updated!`));

const starts = async (xcaa = new WAConnection()) => {
  xcaa.logger.level = "warn";
  xcaa.version = [2, 2204, 13];
  xcaa.browserDescription = ["Xcaa-Bot", "Chrome", "3.0"];
  CFonts.say("X I E C A A", {
    font: "block",
    color: ["#ff9c00"],
    align: "center",
  });
  CFonts.say(`Created By FxSx`, {
    font: "console",
    align: "center",
    gradient: ["red", "magenta"],
  });

  xcaa.on("qr", () => {
    console.log(color("[ SCAN ]", "white"), color(" Code Qr Now 20 Second"));
  });
  fs.existsSync("./session.json") && xcaa.loadAuthInfo("./session.json");
  xcaa.on("connecting", () => {
    start("2", "Connecting...");
  });
  xcaa.on("open", () => {
    success("2", "Connected");
  });
  await xcaa.connect({ timeoutMs: 30 * 1000 });
  fs.writeFileSync("./session.json", JSON.stringify(xcaa.base64EncodedAuthInfo(), null, "\t"));

  xcaa.on("chat-update", async (message) => {
    require("./xcaa.js")(xcaa, message);
  });
  
  
  xcaa.on('group-participants-update', async (anu) => {
		   try {
			const mdata = await xcaa.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await xcaa.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				halo = await fs.readFileSync('./sound/welcome.mp3')
				let buff = await getBuffer(ppimg)
			   xcaa.sendMessage(mdata.id, halo, MessageType.audio, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Welcome @${num.split('@')[0]} 👋`, orderTitle: `Welcome @${num.split('@')[0]} 👋`, thumbnail: buff, sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true});
		    } else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await xcaa.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				leave = await fs.readFileSync('./sound/leave.mp3')
				let buff = await getBuffer(ppimg)
			   xcaa.sendMessage(mdata.id, leave, MessageType.audio, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Sayonara Pantek\n@${num.split('@')[0]} 👋`, orderTitle: `Sayonara Pantek\n@${num.split('@')[0]} 👋`, thumbnail: buff, sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true});
			 }
		    } catch (e) {
			   console.log("Error : %s", color(e, "red"))
		  }
    });
};

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional>
 */
function nocache(module, cb = () => {}) {
  console.log("Module", `'${module}'`, "is now being watched for changes");
  fs.watchFile(require.resolve(module), async () => {
    await uncache(require.resolve(module));
    cb(module);
  });
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = ".") {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(module)];
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}

starts();
