require("../settings/config.js");
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
const axios = require("axios");
const chalk = require("chalk");
const { exec, spawn, execSync } = require("child_process");
const crypto = require("crypto");
const { EmojiAPI } = require("emoji-api");
const emoji = new EmojiAPI();
const fetch = require("node-fetch");
const ffmpeg = require("fluent-ffmpeg");
const figlet = require("figlet");
const fs = require("fs");
const gis = require("g-i-s");
const hx = require("hxz-api");
const ms = require("parse-ms");
const moment = require("moment-timezone");
const request = require("request");
const speed = require("performance-now");
const util = require("util");
const yts = require("yt-search");
const ytdl = require("ytdl-core");

// From Lib
const { fetchJson, kyun, fetchText } = require("../lib/fetcher");
const { color, bgcolor } = require("../lib/color");
const { yta, ytv } = require("../lib/y2mate");
const simple = require("../lib/simple");
const { uploadImages } = require("../lib/uploadimage");
const { getBuffer, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require("../lib/functions");

// From Database
const _registered = JSON.parse(fs.readFileSync("./database/user/registered.json"));
const { addRegisteredUser, createSerial, checkRegisteredUser } = require("../database/user/register.js");


const { ind } = require(`./help`);
lang = ind;

// Time
const salam = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("a");

module.exports = xcaa = async (xcaa, mek) => {
  try {
    if (!mek.hasNewMessage) return;
    mek = mek.messages.all()[0];
    if (!mek.message) return;
    if (mek.key && mek.key.remoteJid == "status@broadcast") return;
    mek.message = Object.keys(mek.message)[0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
    const content = JSON.stringify(mek.message);
    const from = mek.key.remoteJid;
    const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType;
    const time = moment(Date.now()).tz("Asia/Jakarta").locale("id").format("HH:mm:ss z");
    const wita = moment(Date.now()).tz("Asia/Makassar").locale("id").format("HH:mm:ss z");
    const wit = moment(Date.now()).tz("Asia/Jayapura").locale("id").format("HH:mm:ss z");
    const type = Object.keys(mek.message)[0];
    const cmd = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(mek.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(mek.message.stickerMessage.fileSha256.toString('base64')) : "".slice(1).trim().split(/ +/).shift().toLowerCase();
    const prefix = /^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*@,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™=|~!#$%^&.?/\\©^z+*,;]/gi) : "-";
    body = type === "conversation" && mek.message.conversation.startsWith(prefix) ? mek.message.conversation : type == "imageMessage" && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : type == "videoMessage" && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : type == "extendedTextMessage" && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : type == "listResponseMessage" && mek.message[type].singleSelectReply.selectedRowId ? mek.message[type].singleSelectReply.selectedRowId : type == "buttonsResponseMessage" && mek.message[type].selectedButtonId ? mek.message[type].selectedButtonId : type == "stickerMessage" && getCmd(mek.message[type].fileSha256.toString("base64")) !== null && getCmd(mek.message[type].fileSha256.toString("base64")) !== undefined ? getCmd(mek.message[type].fileSha256.toString("base64")) : "";
    budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : '';
    const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const isCmd = body.startsWith(prefix);
    const q = args.join(" ");
    const botNumber = xcaa.user.jid;
    const isGroup = from.endsWith("@g.us");
    const sender = mek.key.fromMe ? xcaa.user.jid : isGroup ? mek.participant : mek.key.remoteJid;
    const ownerNumber = [`${ownerNumbers}@s.whatsapp.net`];
    const isOwner = mek.key.fromMe ? xcaa.user.jid : ownerNumber.includes(sender);
    const totalchat = await xcaa.chats.all();
    const groupMetadata = isGroup ? await xcaa.groupMetadata(from) : "";
    const groupName = isGroup ? groupMetadata.subject : "";
    const groupId = isGroup ? groupMetadata.jid : "";
    const groupMembers = isGroup ? groupMetadata.participants : "";
    const groupDesc = isGroup ? groupMetadata.desc : "";
    const groupOwner = isGroup ? groupMetadata.owner : "";
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : "";
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false;
    const isGroupAdmins = groupAdmins.includes(sender) || false;
    const isUser = checkRegisteredUser(sender);
    const conts = mek.key.fromMe ? xcaa.user.jid : xcaa.contacts[sender] || { notify: jid.replace(/@.+/, "") };
    const pushname = mek.key.fromMe ? xcaa.user.name : conts.notify || conts.vname || conts.name || "-";
    const isUrl = (url) => {
      return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, "gi"));
    };
    const reply = (teks) => {
      xcaa.sendMessage(from, teks, text, { quoted: mek });
    };
    const mentions = (teks, memberr, id) => {
      id == null || id == undefined || id == false
        ? xcaa.sendMessage(from, teks.trim(), extendedText, { contextInfo: { mentionedJid: memberr } })
        : xcaa.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { mentionedJid: memberr } });
    };
    const sleep = async (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const sendStickerFromUrl = async (to, url) => {
      var names = Date.now() / 10000;
      var download = function (uri, filename, callback) {
        request.head(uri, function (err, res, body) {
          request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
        });
      };
      download(url, "./stik" + names + ".png", async function () {
        console.log("selesai");
        let filess = "./stik" + names + ".png";
        let asw = "./stik" + names + ".webp";
        exec(`ffmpeg -i ${filess} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${asw}`, (err) => {
          let media = fs.readFileSync(asw);
          xcaa.sendMessage(to, media, MessageType.sticker, { quoted: mek });
          fs.unlinkSync(filess);
          fs.unlinkSync(asw);
        });
      });
    };
    // send message button
    const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
      const buttonMessage = {
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 1,
      };
      xcaa.sendMessage(id, buttonMessage, MessageType.buttonsMessage, options);
    };
    // send location button
    const sendButLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
      them = gam1;
      mediaxxaa = await xcaa.prepareMessage(id, them, MessageType.location, { thumbnail: them });
      locmhan = mediaxxaa.message["ephemeralMessage"] ? mediaxxaa.message.ephemeralMessage : mediaxxaa;
      const buttonMessages = {
        locationMessage: locmhan.message.locationMessage,
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 6,
      };
      xcaa.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options);
    };
    // send video button
    const sendButVideo = async (id, text1, desc1, vid1, but = [], options = {}) => {
      them = vid1;
      mediaxxaa = await xcaa.prepareMessage(id, them, MessageType.video);
      vimhan = mediaxxaa.message["ephemeralMessage"] ? mediaxxaa.message.ephemeralMessage : mediaxxaa;
      const buttonMessages = {
        videoMessage: vimhan.message.videoMessage,
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 5,
      };
      xcaa.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options);
    };
    // send image button
    const sendButImage = async (id, text1, desc1, vid1, but = [], options = {}) => {
      them = vid1;
      mediaxxaa = await xcaa.prepareMessage(id, them, MessageType.image, { thumbnail: Buffer.alloc(0) });
      imgmhan = mediaxxaa.message["ephemeralMessage"] ? mediaxxaa.message.ephemeralMessage : mediaxxaa;
      const buttonMessages = {
        imageMessage: imgmhan.message.imageMessage,
        contentText: text1,
        footerText: desc1,
        buttons: but,
        headerType: 4,
      };
      xcaa.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options);
    };

    colors = ["red", "pink", "white", "black", "blue", "yellow", "green"];
    const isMedia = type === "imageMessage" || type === "videoMessage";
    const isQuotedImage = type === "extendedTextMessage" && content.includes("imageMessage");
    const isQuotedAudio = type === "extendedTextMessage" && content.includes("audioMessage");
    const isQuotedVideo = type === "extendedTextMessage" && content.includes("videoMessage");
    const isQuotedSticker = type === "extendedTextMessage" && content.includes("stickerMessage");
    const isQuotedText = type === "extendedTextMessage" && content.includes("extendedTextMessage");

    if (!isCmd) {
      console.log("|\x1b[1;33m MSG \x1b[1;33m|", time, chalk.yellow(budy), "from", chalk.green(pushname), "args :", chalk.green(args.length), "in", chalk.green(groupName ? groupName : "Private chat"));
    }
    if (!(isCmd || mek.key.fromMe)) {
      console.log("|\x1b[1;32m CMD \x1b[1;37m|", time, chalk.green(command), "from", chalk.green(pushname), "args :", chalk.green(args.length), "in", chalk.green(groupName ? groupName : "Private chat"));
    }

    if (!mek.key.fromMe && global.self === true) return;
    switch (command) {
      case "menu":
      case "help": {
        if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
        sendButLocation(
          from,
          lang.menu(prefix, salam, pushname),
          "© " + ownerName,
          thumbnail,
          [
            { buttonId: ".owner", buttonText: { displayText: "Owner" }, type: 1 },
            { buttonId: ".infobot", buttonText: { displayText: "Infobot" }, type: 1 },
          ],
          { quoted: mek }
        );
        }
        break;
      case "infobot": {
        if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
        reply("Bot Active");
        }
        break;
      case "owner": {
        if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
        reply("Maaf Fitur Owner Ditutup");
        }
        break;
      case "sticker":
      case "stiker":
      case "stickergif":
      case "stikergif":
      case "sgif":
      case "s": {
        if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
        if (((isMedia && !mek.message.videoMessage) || isQuotedImage) && args.length == 0) {
          const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo : mek;
          const media = await xcaa.downloadAndSaveMediaMessage(encmedia);
          ran = getRandom(".webp");
          await ffmpeg(`./${media}`)
            .input(media)
            .on("start", function (cmd) {
              console.log(`Started : ${cmd}`);
            })
            .on("error", function (err) {
              console.log(`Error : ${err}`);
              fs.unlinkSync(media);
              reply("Eror");
            })
            .on("end", function () {
              console.log("Finish");
              xcaa.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek });
              fs.unlinkSync(media);
              fs.unlinkSync(ran);
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(ran);
        } else if (((isMedia && mek.message.videoMessage.seconds < 11) || (isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) && args.length == 0) {
          const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo : mek;
          const media = await xcaa.downloadAndSaveMediaMessage(encmedia);
          ran = getRandom(".webp");
          await ffmpeg(`./${media}`)
            .inputFormat(media.split(".")[1])
            .on("start", function (cmd) {
              console.log(`Started : ${cmd}`);
            })
            .on("error", function (err) {
              console.log(`Error : ${err}`);
              fs.unlinkSync(media);
              tipe = media.endsWith(".mp4") ? "video" : "gif";
              reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`);
            })
            .on("end", function () {
              console.log("Finish");
              xcaa.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek });
              fs.unlinkSync(media);
              fs.unlinkSync(ran);
            })
            .addOutputOptions([
              `-vcodec`,
              `libwebp`,
              `-vf`,
              `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
            ])
            .toFormat("webp")
            .save(ran);
        } else {
          reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim\nDurasi sticker video 1-9 detik...`);
        }
        }
        break;
      case "pinterest": {
        if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
        if (!q) return reply("Masukkan query");
        async function pinterestSearch(query) {
          return new Promise((resolve, reject) => {
            fetch(
              `https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D&_=1619980301559`,
              {
                headers: {
                  accept: "application/json, text/javascript, */*, q=0.01",
                  "accept-language": "en-US,en;q=0.9",
                  "cache-control": "no-cache",
                  pragma: "no-cache",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "sec-gpc": "1",
                  "x-app-version": "9a236a4",
                  "x-pinterest-appstate": "active",
                  "x-requested-with": "XMLHttpRequest",
                },
                referrer: "https://www.pinterest.com/",
                referrerPolicy: "origin",
                body: null,
                method: "GET",
                mode: "cors",
              }
            )
              .then((res) => res.json())
              .then((json) => {
                const generatepin = json.resource_response.data.results[Math.floor(Math.random() * json.resource_response.data.results.length)];
                var result = [];
                result.push({
                  link: generatepin.images.orig.url,
                });
                resolve(result);
              })
              .catch(reject);
          });
        }

        const pinterest = (query) =>
          new Promise((resolve, reject) => {
            pinterestSearch(query)
              .then((data) => {
                resolve({
                  status: 200,
                  image: data[0].link,
                });
              })
              .catch(reject);
          });

        pinterest(q)
          .then(async (res) => {
            let we = await getBuffer(res.image);
            sendButImage(from, lang.ok(), `© ${ownerName}`, we, [{ buttonId: `.pinterest ${q}`, buttonText: { displayText: "Next" }, type: "RESPONSE" }], { thumbnail: Buffer.alloc(0), quoted: mek });
          })
          .catch(async (err) => {
            reply("Terjadi kesalahan");
          });
        }
        break;
      case "spotify": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          if (args.length == 0) return reply(`Example: ${prefix + command} https://open.spotify.com/track/0ZEYRVISCaqz5yamWZWzaA`);
          url = args[0];
          get_result = await fetchJson(`https://api.lolhuman.xyz/api/spotify?apikey=${lolkey}&url=${url}`);
          get_result = get_result.result;
          ini_txt = `Title : ${get_result.title}\n`;
          ini_txt += `Artists : ${get_result.artists}\n`;
          ini_txt += `Duration : ${get_result.duration}\n`;
          ini_txt += `Popularity : ${get_result.popularity}\n`;
          ini_txt += `Preview : ${get_result.preview_url}\n`;
          thumbnail = await getBuffer(get_result.thumbnail);
          await xcaa.sendMessage(from, thumbnail, image, { quoted: lol, caption: ini_txt });
          get_audio = await getBuffer(get_result.link);
          await xcaa.sendMessage(from, get_audio, audio, { mimetype: "audio/mpeg", filename: `${get_result.title}.mp3`, quoted: mek });
        }
        break;
      case "spotifysearch": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          if (args.length == 0) return reply(`Example: ${prefix + command} Melukis Senja`);
          query = args.join(" ");
          get_result = await fetchJson(`https://api.lolhuman.xyz/api/spotifysearch?apikey=${lolkey}&query=${query}`);
          get_result = get_result.result;
          ini_txt = "";
          for (var x of get_result) {
            ini_txt += `Title : ${x.title}\n`;
            ini_txt += `Artists : ${x.artists}\n`;
            ini_txt += `Duration : ${x.duration}\n`;
            ini_txt += `Link : ${x.link}\n`;
            ini_txt += `Preview : ${x.preview_url}\n\n\n`;
          }
          reply(ini_txt);
        }
        break;
      case "nhentai": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          if (args.length == 0) return reply(`Example: ${prefix + command} 344253`);
          henid = args[0];
          get_result = await fetchJson(`https://api.lolhuman.xyz/api/nhentai/${henid}?apikey=${lolkey}`);
          get_result = get_result.result;
          ini_txt = `Title Romaji : ${get_result.title_romaji}\n`;
          ini_txt += `Title Native : ${get_result.title_native}\n`;
          ini_txt += `Read Online : ${get_result.read}\n`;
          get_info = get_result.info;
          ini_txt += `Parodies : ${get_info.parodies}\n`;
          ini_txt += `Character : ${get_info.characters.join(", ")}\n`;
          ini_txt += `Tags : ${get_info.tags.join(", ")}\n`;
          ini_txt += `Artist : ${get_info.artists}\n`;
          ini_txt += `Group : ${get_info.groups}\n`;
          ini_txt += `Languager : ${get_info.languages.join(", ")}\n`;
          ini_txt += `Categories : ${get_info.categories}\n`;
          ini_txt += `Pages : ${get_info.pages}\n`;
          ini_txt += `Uploaded : ${get_info.uploaded}\n`;
          reply(ini_txt);
        }
        break;
      case "nhentaipdf": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          if (args.length == 0) return reply(`Example: ${prefix + command} 344253`);
          henid = args[0];
          get_result = await fetchJson(`https://api.lolhuman.xyz/api/nhentaipdf/${henid}?apikey=${lolkey}`);
          get_result = get_result.result;
          ini_buffer = await getBuffer(get_result);
          await xcaa.sendMessage(from, ini_buffer, document, { quoted: mek, mimetype: Mimetype.pdf, filename: `${henid}.pdf` });
        }
        break;
      case "nhentaisearch": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`);
          query = args.join(" ");
          get_result = await fetchJson(`https://api.lolhuman.xyz/api/nhentaisearch?apikey=${lolkey}&query=${query}`);
          get_result = get_result.result;
          ini_txt = "Result : \n";
          for (var x of get_result) {
            ini_txt += `Id : ${x.id}\n`;
            ini_txt += `Title English : ${x.title_english}\n`;
            ini_txt += `Title Japanese : ${x.title_japanese}\n`;
            ini_txt += `Native : ${x.title_native}\n`;
            ini_txt += `Upload : ${x.date_upload}\n`;
            ini_txt += `Page : ${x.page}\n`;
            ini_txt += `Favourite : ${x.favourite}\n\n`;
          }
          reply(ini_txt);
        }
        break;
      //maker ephoto
      case "wetglass":
      case "multicolor3d":
      case "watercolor":
      case "luxurygold":
      case "galaxywallpaper":
      case "lighttext":
      case "beautifulflower":
      case "puppycute":
      case "royaltext":
      case "heartshaped":
      case "birthdaycake":
      case "galaxystyle":
      case "hologram3d":
      case "greenneon":
      case "glossychrome":
      case "greenbush":
      case "metallogo":
      case "noeltext":
      case "glittergold":
      case "textcake":
      case "starsnight":
      case "wooden3d":
      case "textbyname":
      case "writegalacy":
      case "galaxybat":
      case "snow3d":
      case "birthdayday":
      case "goldplaybutton":
      case "silverplaybutton":
      case "freefire": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          if (args.length == 0) return reply(`Example: ${prefix + command} Mosca`);
          ini_txt = args.join(" ");
          var po = await getBuffer(`https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=${lolkey}&text=${ini_txt}`);
          xcaa.sendMessage(from, po, image, { quoted: mek, caption: "Selesai" });
        }
        break;
      //maker textpro
      case "blackpink":
      case "neon":
      case "greenneon":
      case "advanceglow":
      case "futureneon":
      case "sandwriting":
      case "sandsummer":
      case "sandengraved":
      case "metaldark":
      case "neonlight":
      case "holographic":
      case "text1917":
      case "minion":
      case "deluxesilver":
      case "newyearcard":
      case "bloodfrosted":
      case "halloween":
      case "jokerlogo":
      case "fireworksparkle":
      case "natureleaves":
      case "bokeh":
      case "toxic":
      case "strawberry":
      case "box3d":
      case "roadwarning":
      case "breakwall":
      case "icecold":
      case "luxury":
      case "cloud":
      case "summersand":
      case "horrorblood":
      case "thunder": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          if (args.length == 0) return reply(`Example: ${prefix + command} Mosca`);
          ini_txt = args.join(" ");
          let gambar = await getBuffer(`https://api.lolhuman.xyz/api/textprome/${command}?apikey=${lolkey}&text=${ini_txt}`);
          xcaa.sendMessage(from, gambar, image, { quoted: mek, caption: "Sukses" });
        }
        break;
      //islami
      case "listsurah": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          get = await fetchJson(`https://api.lolhuman.xyz/api/quran?apikey=${lolkey}`);
          get_result = get.result;
          ini_txt = "List Surah:\n";
          for (var x in get_result) {
            ini_txt += `${x}. ${get_result[x]}\n`;
          }
          reply(ini_txt);
        }
        break;
      case "alquran": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          if (args.length < 1) return reply(`Example: ${prefix + command} 18 or ${prefix + command} 18/10 or ${prefix + command} 18/1-10`);
          urls = `https://api.lolhuman.xyz/api/quran/${args[0]}?apikey=${lolkey}`;
          quran = await fetchJson(urls);
          result = quran.result;
          ayat = result.ayat;
          ini_txt = `QS. ${result.surah} : 1-${ayat.length}\n\n`;
          for (var x of ayat) {
            arab = x.arab;
            nomor = x.ayat;
            latin = x.latin;
            indo = x.indonesia;
            ini_txt += `${arab}\n${nomor}. ${latin}\n${indo}\n\n`;
          }
          ini_txt = ini_txt.replace(/<u>/g, "").replace(/<\/u>/g, "");
          ini_txt = ini_txt.replace(/<strong>/g, "").replace(/<\/strong>/g, "");
          ini_txt = ini_txt.replace(/<u>/g, "").replace(/<\/u>/g, "");
          reply(ini_txt);
        }
        break;
      case "asmaulhusna": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          get_result = await fetchJson(`https://api.lolhuman.xyz/api/asmaulhusna?apikey=${lolkey}`);
          get_result = get_result.result;
          ini_txt = `No : ${get_result.index}\n`;
          ini_txt += `Latin: ${get_result.latin}\n`;
          ini_txt += `Arab : ${get_result.ar}\n`;
          ini_txt += `Indonesia : ${get_result.id}\n`;
          ini_txt += `English : ${get_result.en}`;
          reply(ini_txt);
        }
        break;
      case "kisahnabi": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          if (args.length == 0) return reply(`Example: ${prefix + command} Muhammad`);
          query = args.join(" ");
          get_result = await fetchJson(`https://api.lolhuman.xyz/api/kisahnabi/${query}?apikey=${lolkey}`);
          get_result = get_result.result;
          ini_txt = `Name : ${get_result.name}\n`;
          ini_txt += `Lahir : ${get_result.thn_kelahiran}\n`;
          ini_txt += `Umur : ${get_result.age}\n`;
          ini_txt += `Tempat : ${get_result.place}\n`;
          ini_txt += `Story : \n${get_result.story}`;
          reply(ini_txt);
        }
        break;
      case "alquranaudio": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          if (args.length == 0) return reply(`Example: ${prefix + command} 18 or ${prefix + command} 18/10`);
          surah = args[0];
          ini_buffer = await getBuffer(`https://api.lolhuman.xyz/api/quran/audio/${surah}?apikey=${lolkey}`);
          await xcaa.sendMessage(from, ini_buffer, audio, { quoted: mek, mimetype: "audio/mpeg" });
        }
        break;
      case "jadwalsholat": {
          if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
          if (args.length == 0) return reply(`Example: ${prefix + command} Yogyakarta`);
          daerah = args.join(" ");
          get_result = await fetchJson(`https://api.lolhuman.xyz/api/sholat/${daerah}?apikey=${lolkey}`);
          get_result = get_result.result;
          ini_txt = `Wilayah : ${get_result.wilayah}\n`;
          ini_txt += `Tanggal : ${get_result.tanggal}\n`;
          ini_txt += `Sahur : ${get_result.sahur}\n`;
          ini_txt += `Imsak : ${get_result.imsak}\n`;
          ini_txt += `Subuh : ${get_result.subuh}\n`;
          ini_txt += `Terbit : ${get_result.terbit}\n`;
          ini_txt += `Dhuha : ${get_result.dhuha}\n`;
          ini_txt += `Dzuhur : ${get_result.dzuhur}\n`;
          ini_txt += `Ashar : ${get_result.ashar}\n`;
          ini_txt += `Maghrib : ${get_result.imsak}\n`;
          ini_txt += `Isya : ${get_result.isya}`;
          reply(ini_txt);
        }
        break;

      //group
      case "daftar":
      case "verify":
      case "verif": {
        if (isUser) return reply(lang.regis());
        try {
          ppregis = await xcaa.getProfilePicture(sender);
        } catch {
          ppregis = "https://i.ibb.co/rvsVF3r/5012fbb87660.png";
        }
        const serialUser = createSerial(20);
        await addRegisteredUser(sender.split("@")[0] + "@s.whatsapp.net", pushname, time, serialUser);
        await sendButImage(from, lang.daftar(sender, pushname, time, serialUser, _registered), `© ${botName}`, await getBuffer(ppregis), [{ buttonId: ".menu", buttonText: { displayText: `MENU` }, type: 1 }], {
          thumbnail: Buffer.alloc(0),
          quoted: mek,
        });
        }
        break;
      case "memegenerator":
      case "memegen": {
          if (args.length < 1) return reply(`Kirim perintah *${prefix + command}* teks atas|teks bawah`);
          if (!q.includes("|")) return reply(`Kirim perintah *${prefix + command}* teks atas|teks bawah`);
          try {
            if (!isQuotedImage) return reply(`Reply Gambar!`);
            reply(lang.wait());
            var teks1 = q.split("|")[0] ? q.split("|")[0] : "";
            var teks2 = q.split("|")[1] ? q.split("|")[1] : "";
            var enmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo : mek;
            var mediiia = await xcaa.downloadMediaMessage(enmedia);
            var njay = await uploadImages(mediiia);
            var resu = await getBuffer(`https://api.memegen.link/images/custom/${teks1}/${teks2}.png?background=${njay}`);
            xcaa.sendMessage(from, resu, image, { caption: ".stikerin bang", thumbnail: Buffer.alloc(0), quoted: mek });
            fs.unlinkSync(mediiia);
          } catch (e) {
            reply(lang.err());
            console.log(e);
          }
        }
        break;
      case "stickermeme":
      case "memesticker":
      case "memestick":
      case "stickmeme":
      case "stcmeme":
      case "smeme": {
          if (args.length < 1) return reply(`Kirim perintah *${prefix + command}* Alphabot`);
          if (q.includes("|")) return reply(`Kirim perintah *${prefix + command}* Alphabot`);
          try {
            if (!isQuotedImage) return reply(`Reply Gambar!`);
            reply(lang.wait());
            var teks2 = args.join(" ");
            var enmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo : mek;
            var mediia = await xcaa.downloadMediaMessage(enmedia);
            var njay = await uploadImages(mediia);
            var resu = `https://api.memegen.link/images/custom/-/${teks2}.png?background=${njay}`;
            sendStickerFromUrl(from, `${resu}`);
          } catch (e) {
            reply(lang.err());
            console.log(e);
          }
        }
        break;
      case "leave": {
        if (!isGroup) return reply(lang.group());
        if (!isOwner) return reply(lang.owner(botName));
        setTimeout(() => {
          xcaa.groupLeave(from);
        }, 2000);
        setTimeout(() => {
          xcaa.sendMessage(from, "Sayonara👋", text);
        }, 0);
        }
        break;
      case "hidetag": {
        if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
        if (!isGroup) return reply(lang.group());
        if (!isGroupAdmins) return reply(lang.admin(groupName));
        var value = q;
        var group = await xcaa.groupMetadata(from);
        var member = group["participants"];
        var mem = [];
        member.map(async (adm) => {
          mem.push(adm.id.replace("c.us", "s.whatsapp.net"));
        });
        var options = {
          text: value,
          contextInfo: { mentionedJid: mem },
          quoted: mek,
        };
        xcaa.sendMessage(from, options, text);
        }
        break;
      case "linkgrup":
      case "linkgroup":
      case "linkgc": {
        if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
        if (!isGroup) return reply(lang.group());
        linkgc = await xcaa.groupInviteCode(from);
        yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`;
        xcaa.sendMessage(from, yeh, text, { quoted: mek });
        }
        break;
      case "tagall": {
        if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
        if (!isGroup) return reply(lang.group());
        if (!isGroupAdmins) return reply(lang.admin(groupName));
        members_id = [];
        taga = args.length > 1 ? body.slice(8).trim() : "";
        taga += "\n\n";
        for (let mem of groupMembers) {
          taga += `➸ @${mem.jid.split("@")[0]}\n`;
          members_id.push(mem.jid);
        }
        mentions(taga, members_id, true);
        }
        break;
      case "setname": {
        if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
        if (!isGroup) return reply(lang.group());
        if (!isGroupAdmins) return reply(lang.admin(groupName));
        if (!isBotGroupAdmins) return reply(lang.adminB());
        await xcaa.groupUpdateSubject(from, `${q}`);
        xcaa.sendMessage(from, `Sukses Mengubah Nama Grup Menjadi ${q}`, text, { quoted: mek });
        }
        break;
      case "setdesc":
      case "setdesk": {
        if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
        if (!isGroup) return reply(lang.group());
        if (!isGroupAdmins) return reply(lang.admin(groupName));
        if (!isBotGroupAdmins) return reply(lang.adminB());
        await xcaa.groupUpdateDescription(from, `${q}`);
        xcaa.sendMessage(from, `Sukses Mengubah Desk Grup Menjadi ${q}`, text, { quoted: mek });
        }
        break;
      case "kick": {
        if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
        if (!isGroup) return reply(lang.group());
        if (!isGroupAdmins) return reply(lang.admin(groupName));
        if (!isBotGroupAdmins) return reply(lang.adminB());
        if (!q) return reply(`*Format salah!*\n\n*Example : ${prefix + command} @tag*`);
        var kickya = q.split("@")[1] + "@s.whatsapp.net";
        await xcaa.groupRemove(from, [kickya]);
        reply(`Succses kick target!`);
        }
        break;
      case "bc":
      case "broadcast": {
        if (!(mek.key.fromMe && isOwner)) return reply(lang.owner(botName));
        if (args.length === 0) return reply(`Kirim perintah *${prefix + command}* text`);
        var bcnya = await xcaa.chats.all();
        if ((isMedia && !mek.message.videoMessage) || isQuotedImage) {
          var bcnya2 = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo : mek;
          var bcnya3 = await xcaa.downloadMediaMessage(bcnya2);
          for (let _ of bcnya) {
            xcaa.sendMessage(_.jid, bcnya3, image, { caption: `*----「  BROADCAST 」----*\n\n${q}` });
          }
          reply("Sukses broadcast");
        } else {
          for (let _ of bcnya) {
            sendButLocation(
              _.jid,
              "「 PESAN SIARAN 」\n\n" + q,
              "© " + ownerName,
              thumbnail,
              [
                { buttonId: ".owner", buttonText: { displayText: "Owner" }, type: 1 },
                { buttonId: ".infobot", buttonText: { displayText: "Infobot" }, type: 1 },
              ],
              { quoted: mek }
            );
          }
          reply("Sukses broadcast");
        }
        }
        break;
      case "nightcore": {
          if (!isQuotedAudio) return reply("Reply audio nya om");
          encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo;
          media = await xcaa.downloadAndSaveMediaMessage(encmedia);
          ran = getRandom(".mp3");
          exec(`ffmpeg -i ${media} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply("Error!");
            hah = fs.readFileSync(ran);
            xcaa.sendMessage(from, hah, audio, { mimetype: "audio/mp4", ptt: true, quoted: mek, duration: 99999999999999999999999 });
            fs.unlinkSync(ran);
          });
        }
        break;
      case "bass": {
          encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo;
          media = await xcaa.downloadAndSaveMediaMessage(encmedia);
          ran = getRandom(".mp3");
          exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply("Error!");
            hah = fs.readFileSync(ran);
            xcaa.sendMessage(from, hah, audio, { mimetype: "audio/mp4", ptt: true, quoted: mek, duration: 99999999999999999999999 });
            fs.unlinkSync(ran);
          });
        }
        break;
      case "slowmo":
      case "slow": {
          try {
            encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo;
            media = await xcaa.downloadAndSaveMediaMessage(encmedia);
            ran = getRandom(".mp3");
            exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
              fs.unlinkSync(media);
              if (err) return reply("Error!");
              uhh = fs.readFileSync(ran);
              xcaa.sendMessage(from, uhh, audio, { mimetype: "audio/mp4", ptt: true, quoted: mek });
              fs.unlinkSync(ran);
            });
          } catch (e) {
            reply("Error!");
          }
        }
        break;
      case "robot": {
          encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo;
          media = await xcaa.downloadAndSaveMediaMessage(encmedia);
          ran = getRandom(".mp3");
          exec(`ffmpeg -i ${media} -filter_complex "afftfilt=real='hypot(re,im)*sin(0)':imag='hypot(re,im)*cos(0)':win_size=512:overlap=0.75" ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply("Error!");
            hah = fs.readFileSync(ran);
            xcaa.sendMessage(from, hah, audio, { mimetype: "audio/mp4", ptt: true, quoted: mek });
            fs.unlinkSync(ran);
          });
        }
        break;
      case "vibra":
      case "vibrato": {
          encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo;
          media = await xcaa.downloadAndSaveMediaMessage(encmedia);
          ran = getRandom(".mp3");
          exec(`ffmpeg -i ${media} -filter_complex "vibrato=f=16" ${ran}`, (err, stderr, stdout) => {
            fs.unlinkSync(media);
            if (err) return reply("Error!");
            hah = fs.readFileSync(ran);
            xcaa.sendMessage(from, hah, audio, { mimetype: "audio/mp4", ptt: true, quoted: mek });
            fs.unlinkSync(ran);
          });
        }
        break;
      case "tupai": {
          try {
            encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo;
            media = await xcaa.downloadAndSaveMediaMessage(encmedia);
            ran = getRandom(".mp3");
            exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
              fs.unlinkSync(media);
              if (err) return reply("Error!");
              hah = fs.readFileSync(ran);
              xcaa.sendMessage(from, hah, audio, { mimetype: "audio/mp4", ptt: true, quoted: mek, duration: 999099 });
              fs.unlinkSync(ran);
            });
          } catch (e) {
            reply(mess.error);
          }
        }
        break;
      case "fast": {
          try {
            encmedia = JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo;
            media = await xcaa.downloadAndSaveMediaMessage(encmedia);
            ran = getRandom(".mp3");
            exec(`ffmpeg -i ${media} -filter:a "atempo=1.3,asetrate=43000" ${ran}`, (err, stderr, stdout) => {
              fs.unlinkSync(media);
              if (err) return reply("Error!");
              hah = fs.readFileSync(ran);
              xcaa.sendMessage(from, hah, audio, { mimetype: "audio/mp4", ptt: true, quoted: mek });
              fs.unlinkSync(ran);
            });
          } catch (e) {
            reply("Error!");
          }
        }
        break;
      case "nulis": {
        reply(`*Example*\n${prefix}nuliskiri\n${prefix}nuliskanan\n${prefix}foliokiri\n${prefix}foliokanan`);
        }
        break;
      case "toimg":
        {
          if (!isQuotedSticker) return reply("Reply stc nya!");
          reply(lang.wait());
          encmediaa = JSON.parse(JSON.stringify(mek).replace("quotedM", "m")).message.extendedTextMessage.contextInfo;
          mediaa = await xcaa.downloadAndSaveMediaMessage(encmediaa);
          ran = getRandom(".png");
          exec(`ffmpeg -i ${mediaa} ${ran}`, (err) => {
            fs.unlinkSync(mediaa);
            if (err) return reply("Eror");
            buffer = fs.readFileSync(ran);
            xcaa.sendMessage(from, buffer, image, { quoted: mek, thumbnail: Buffer.alloc(0), caption: "Done" });
            fs.unlinkSync(ran);
          });
        }
        break;
      case "nuliskiri": {
          if (args.length < 1) return reply(`Kirim perintah *${prefix}nuliskiri* teks`);
          reply(lang.wait());
          const tulisan = q;
          const splitText = tulisan.replace(/(\S+\s*){1,9}/g, "$&\n");
          const fixHeight = splitText.split("\n").slice(0, 31).join("\n");
          spawn("convert", [
            "./database/media/nulis/images/buku/sebelumkiri.jpg",
            "-font",
            "./database/media/nulis/font/Indie-Flower.ttf",
            "-size",
            "960x1280",
            "-pointsize",
            "22",
            "-interline-spacing",
            "2",
            "-annotate",
            "+140+153",
            fixHeight,
            "./database/media/nulis/images/buku/setelahkiri.jpg",
          ])
            .on("error", () => reply(mess.error))
            .on("exit", () => {
              xcaa.sendMessage(from, fs.readFileSync("./database/media/nulis/images/buku/setelahkiri.jpg"), image, { thumbnail: Buffer.alloc(0), quoted: mek, caption: `Hati-hati ketahuan!` });
            });
        }
        break;
      case "nuliskanan": {
          if (args.length < 1) return reply(`Kirim perintah *${prefix}nuliskanan* teks`);
          reply(lang.wait());
          const tulisan = q;
          const splitText = tulisan.replace(/(\S+\s*){1,9}/g, "$&\n");
          const fixHeight = splitText.split("\n").slice(0, 31).join("\n");
          spawn("convert", [
            "./database/media/nulis/images/buku/sebelumkanan.jpg",
            "-font",
            "./database/media/nulis/font/Indie-Flower.ttf",
            "-size",
            "960x1280",
            "-pointsize",
            "23",
            "-interline-spacing",
            "2",
            "-annotate",
            "+128+129",
            fixHeight,
            "./database/media/nulis/images/buku/setelahkanan.jpg",
          ])
            .on("error", () => reply(mess.error))
            .on("exit", () => {
              xcaa.sendMessage(from, fs.readFileSync("./database/media/nulis/images/buku/setelahkanan.jpg"), image, { thumbnail: Buffer.alloc(0), quoted: mek, caption: `Hati-hati ketahuan!` });
            });
        }
        break;
      case "foliokiri": {
          if (args.length < 1) return reply(`Kirim perintah *${prefix}foliokiri* teks`);
          reply(lang.wait());
          const tulisan = q;
          const splitText = tulisan.replace(/(\S+\s*){1,13}/g, "$&\n");
          const fixHeight = splitText.split("\n").slice(0, 38).join("\n");
          spawn("convert", [
            "./media/nulis/images/folio/sebelumkiri.jpg",
            "-font",
            "./database/media/nulis/font/Indie-Flower.ttf",
            "-size",
            "1720x1280",
            "-pointsize",
            "23",
            "-interline-spacing",
            "4",
            "-annotate",
            "+48+185",
            fixHeight,
            "./database/media/nulis/images/folio/setelahkiri.jpg",
          ])
            .on("error", () => reply(mess.error))
            .on("exit", () => {
              xcaa.sendMessage(from, fs.readFileSync("./database/media/nulis/images/folio/setelahkiri.jpg"), image, { thumbnail: Buffer.alloc(0), quoted: mek, caption: `Hati-hati ketahuan!` });
            });
        }
        break;
      case "foliokanan": {
          if (args.length < 1) return reply(`Kirim perintah *${prefix}foliokanan* teks`);
          reply(lang.wait());
          const tulisan = q;
          const splitText = tulisan.replace(/(\S+\s*){1,13}/g, "$&\n");
          const fixHeight = splitText.split("\n").slice(0, 38).join("\n");
          spawn("convert", [
            "./database/media/nulis/images/folio/sebelumkanan.jpg",
            "-font",
            "./database/media/nulis/font/Indie-Flower.ttf",
            "-size",
            "960x1280",
            "-pointsize",
            "23",
            "-interline-spacing",
            "3",
            "-annotate",
            "+89+190",
            fixHeight,
            "./database/media/nulis/images/folio/setelahkanan.jpg",
          ])
            .on("error", () => reply(mess.error))
            .on("exit", () => {
              xcaa.sendMessage(from, fs.readFileSync("./database/media/nulis/images/folio/setelahkanan.jpg"), image, { thumbnail: Buffer.alloc(0), quoted: mek, caption: `Hati-hati ketahuan!` });
            });
        }
        break;
      case "semoji":
      case "emoji": {
        if (!isUser) return sendButMessage(from, lang.noregis(pushname), `Klik Button Untuk Verify`, [{ buttonId: ".daftar", buttonText: { displayText: `Daftar` }, type: 1 }], { quoted: mek });
        if (!isGroup) return reply(lang.group());
        if (!q) return reply("emojinya?");
        qes = args.join(" ");
        reply(lang.wait());
        emoji.get(`${qes}`).then(async (emojii) => {
          teks = `${emojii.images[4].url}`;
          console.log(teks);
          sendStickerFromUrl(from, `${teks}`);
        });
        }
        break;
      default:
        if (budy.startsWith(">")) {
          try {
            if (!(mek.key.fromMe && isOwner)) return reply(lang.owner(botName));
            return xcaa.sendMessage(from, JSON.stringify(eval(budy.slice(2)), null, "\t"), text, { quoted: mek });
          } catch (err) {
            e = String(err);
            reply(e);
          }
        }
        if (budy.startsWith("$")) {
          if (!(mek.key.fromMe && isOwner)) return reply(lang.owner(botName));
          qur = budy.slice(2);
          exec(qur, (err, stdout) => {
            if (err) return reply(`Xcaa-Bot :~ ${err}`);
            if (stdout) {
              reply(stdout);
            }
          });
        }
        if (budy.startsWith("=>")) {
          if (!(mek.key.fromMe && isOwner)) return reply(lang.owner(botName));
          var konsol = budy.slice(3);
          Return = (sul) => {
            var sat = JSON.stringify(sul, null, 2);
            bang = util.format(sat);
            if (sat == undefined) {
              bang = util.format(sul);
            }
            return reply(bang);
          };
          try {
            reply(util.format(eval(`;(async () => { ${konsol} })()`)));
            console.log("\x1b[1;31m~\x1b[1;37m>", "[", "\x1b[1;32m EXC \x1b[1;37m", "]", time, chalk.green("=>"), "from", chalk.green(pushname), "args :", chalk.green(args.length));
          } catch (e) {
            reply(String(e));
          }
        }
    }
  } catch (e) {
    e = String(e);
    if (!e.includes("this.isZero") && !e.includes("jid")) {
      console.log("Message : %s", chalk.green(e));
    }
  }
};
