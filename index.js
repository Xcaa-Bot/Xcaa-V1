const {
   WAConnection: _WAConnection,
   MessageType,
	Presence,
	MessageOptions,
	Mimetype,
	WALocationMessage,
	WA_MESSAGE_STUB_TYPES,
	WA_DEFAULT_EPHEMERAL,
	WAMessageProto,
	WAMetric,
	ReconnectMode,
	ProxyAgent,
	GroupSettingChange,
	waChatKey,
	relayWAMessage,
	mentionedJid,
	processTime
} = require('@adiwajshing/baileys')
const simple = require('./lib/simple.js')
const fs = require('fs')
const util = require('util')
const axios = require("axios")
const moment = require('moment-timezone')
const { spawn, exec, execSync } = require('child_process')
const fetch = require('node-fetch')
const FormData = require('form-data')
const ig = require('insta-fetcher');
const hx = require("hxz-api")
const ffmpeg = require('fluent-ffmpeg')
const yts = require( 'yt-search')
const got = require("got");
const googleImage = require('g-i-s')
const { error } = require("qrcode-terminal")
const { removeBackgroundFromImageFile } = require('remove.bg')
const imgbb = require('imgbb-uploader')
const lolis = require('lolis.life')
const loli = new lolis()

const { bahasa } = require('./lib/bahasa')
const { antiSpam } = require('./lib/antispam')
const { color, bgcolor } = require('./lib/color')
const { mediafireDl } = require('./lib/mediafire.js')
const { yta, ytv, igdl, upload, formatDate } = require('./lib/ytdl')
const { fetchJson, getBase64, kyun, createExif } = require('./lib/fetcher')
const { getBuffer, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')

const setting = JSON.parse(fs.readFileSync('./settings.json'))
const user = JSON.parse(fs.readFileSync('./database/user.json'))
const _stikcmd = JSON.parse(fs.readFileSync('./database/scmd.json'))
const afk = JSON.parse(fs.readFileSync('./database/afk.json'))

let prefa = setting.prefix

const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n'
            + 'FN:FxSx\n'
            + 'ORG:Xie-Dev-Team;\n'
            + 'TEL;type=CELL;type=VOICE;waid=6283815956151:+62 838-1595-6151\n'
            + 'END:VCARD'

public = false
multi = true
fx = "▢"
blocked = []
ban = []
hit_today = []

var nameNya = ["Xcaa-Bot","XieCaa-Bot","Xcaa-Md","XieCaa-Md"]
var namabot = nameNya[Math.floor(Math.random() * nameNya.length)];

const sCmd = (id, command) => {
    const obj = { id: id, chats: command }
    _stikcmd.push(obj)
    fs.writeFileSync('./database/scmd.json', JSON.stringify(_stikcmd))
}

const getCommandPosition = (id) => {
    let position = null
    Object.keys(_stikcmd).forEach((i) => {
        if (_stikcmd[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return position
    }
}

const getCmd = (id) => {
    let position = null
    Object.keys(_stikcmd).forEach((i) => {
        if (_stikcmd[i].id === id) {
            position = i
        }
    })
    if (position !== null) {
        return _stikcmd[position].chats
    }
}

const checkSCommand = (id) => {
    let status = false
    Object.keys(_stikcmd).forEach((i) => {
        if (_stikcmd[i].id === id) {
            status = true
        }
    })
    return status
}

   module.exports = xcaa = async (xcaa, xie) => {
			try {
         if (!xie.hasNewMessage) return
         xie = xie.messages.all()[0]
         if (!xie.message) return
         if (xie.key && xie.key.remoteJid == 'status@broadcast') return
         if ((Object.keys(xie.message)[0] === 'ephemeralMessage' && JSON.stringify(xie.message).includes('EPHEMERAL_SETTING')) && xie.message.ephemeralMessage.message.protocolMessage.type === 3) {
         }
         global.blocked
         m = simple.smsg(xcaa, xie)
        	xie.message = (Object.keys(xie.message)[0] === 'ephemeralMessage') ? xie.message.ephemeralMessage.message : xie.message
        	const content = JSON.stringify(xie.message)
	   	const from = xie.key.remoteJid
		   const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = new Date().toLocaleDateString()
			const time = moment.tz('Asia/Jakarta').format('HH:mm:ss')
			const jam = moment.tz('Asia/Jakarta').format('HH:mm')
         const type = Object.keys(xie.message)[0]
         const cmd = (type === 'conversation' && xie.message.conversation) ? xie.message.conversation : (type == 'imageMessage') && xie.message.imageMessage.caption ? xie.message.imageMessage.caption : (type == 'videoMessage') && xie.message.videoMessage.caption ? xie.message.videoMessage.caption : (type == 'extendedTextMessage') && xie.message.extendedTextMessage.text ? xie.message.extendedTextMessage.text : (type == 'stickerMessage') && (getCmd(xie.message.stickerMessage.fileSha256.toString('hex')) !== null && getCmd(xie.message.stickerMessage.fileSha256.toString('base64')) !== undefined) ? getCmd(xie.message.stickerMessage.fileSha256.toString('base64')) : "".slice(1).trim().split(/ +/).shift().toLowerCase()
			if (multi){
         var prefix = /^[°•π÷×¶∆£¢€¥®™|~!#%^&.?/\\©^z+*@,;]/.test(cmd) ? cmd.match(/^[°•π÷×¶∆£¢€¥®™|~!#$%^&.?/\\©^z+*,;]/gi) : '#'          	
         } else {
        	prefix = prefa
         }
			body = type === "conversation" && xie.message.conversation.startsWith(prefix) ? xie.message.conversation : type == "imageMessage" && xie.message.imageMessage.caption.startsWith(prefix) ? xie.message.imageMessage.caption : type == "videoMessage" && xie.message.videoMessage.caption.startsWith(prefix) ? xie.message.videoMessage.caption : type == "extendedTextMessage" && xie.message.extendedTextMessage.text.startsWith(prefix) ? xie.message.extendedTextMessage.text : type == "listResponseMessage" && xie.message[type].singleSelectReply.selectedRowId ? xie.message[type].singleSelectReply.selectedRowId : type == "buttonsResponseMessage" && xie.message[type].selectedButtonId ? xie.message[type].selectedButtonId : type == "stickerMessage" && getCmd(xie.message[type].fileSha256.toString("base64")) !== null && getCmd(xie.message[type].fileSha256.toString("base64")) !== undefined ? getCmd(xie.message[type].fileSha256.toString("base64")) : "";
   		budy = (type === 'conversation') ? xie.message.conversation : (type === 'extendedTextMessage') ? xie.message.extendedTextMessage.text : ''
		   const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
		   hit_today.push(command)
			const arg = body.substring(body.indexOf(' ') + 1)
			const args = body.trim().split(/ +/).slice(1)
			const ar = args.map((v) => v.toLowerCase())
			chats = (type === 'conversation') ? xie.message.conversation : (type === 'extendedTextMessage') ? xie.message.extendedTextMessage.text : ''
		   const argss = chats.slice(command.length + 2, chats.length)
			const q = args.join(' ')
			const run = process.uptime()
			const xcneh = m.isBaileys
			const isCmd = body.startsWith(prefix)

			const botNumber = xcaa.user.jid
			const ownerNumber = ["6283818221226@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? xie.participant : xie.key.remoteJid
			const totalchat = await xcaa.chats.all()
		   const totalgroup = await xcaa.chats.array.filter(v => v.jid.endsWith('g.us'))
         const totalkontak = await xcaa.chats.array.filter(v => v.jid.endsWith('s.whatsapp.net'))
			isStc = Object.keys(xie.message)[0] == "stickerMessage" ? xie.message.stickerMessage.fileSha256.toString('hex') : ""
	      isStc = `${isStc}`
         const isStcQ = isStc !== "" && content.includes("extendedTextMessage") ||
         isStc !== "" && content.includes("conversation")
	      const isStcMedia = isStc !== "" && content.includes("quotedMessage") && !content.includes("extendedTextMessage") || isStc !== "" && content.includes("quotedMessage") && !content.includes("conversation")
			const groupMetadata = isGroup ? await xcaa.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const itsMeXie = sender == botNumber ? true : false
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isOwner = ownerNumber.includes(sender)
			const isUser = user.includes(sender)
			const isBanned = ban.includes(sender)
			const conts = xie.key.fromMe ? xcaa.user.jid : xcaa.contacts[sender] || { notify: jid.replace(/@.+/, '') }
         const pushname = xie.key.fromMe ? xcaa.user.name : conts.notify || conts.vname || conts.name || '-'
			const mentionByTag = type == "extendedTextMessage" && xie.message.extendedTextMessage.contextInfo != null ? xie.message.extendedTextMessage.contextInfo.mentionedJid : []
			const mentionByReply = type == "extendedTextMessage" && xie.message.extendedTextMessage.contextInfo != null ? xie.message.extendedTextMessage.contextInfo.participant || "" : ""
			const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
			mention != undefined ? mention.push(mentionByReply) : []
			const mentionUser = mention != undefined ? mention.filter(n => n) : []
			hit_total =axios.get('https://api.countapi.xyz/hit/fatiharridho.my.id/visits').then(({data}) => hitall = data.value)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				xcaa.sendMessage(from, teks, text, {quoted:xie})
			}
			const sendMess = (hehe, teks) => {
				xcaa.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? xcaa.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : xcaa.sendMessage(from, teks.trim(), extendedText, {quoted: xie, contextInfo: {"mentionedJid": memberr}})
			}
			const ftroli = {key: {fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },message:{"orderMessage":{"orderId":"174238614569481","thumbnail": fs.readFileSync('./src/foto1.jpg'),"itemCount": 1,"status":"INQUIRY","surface":"CATALOG","message": name,"token":"AR6xBKbXZn0Xwmu76Ksyd7rnxI+Rx87HfinVlW4lwXa6JA=="}}}
			
			const fakethumb = (teks, yes) => {
            xcaa.sendMessage(from, teks, image, {thumbnail: teks, quoted: xie, caption: yes})
         }
         
         const sendButLoc = async(id, text1, desc1, vid1, but = [], options = {}) => {
         kma = vid1
         const mediaxxaa = await xcaa.prepareMessage(id, kma, MessageType.location, {thumbnail: kma})
         mhan = mediaxxaa.message["ephemeralMessage"] ? mediaxxaa.message.ephemeralMessage : mediaxxaa
         const buttonMessages = {
         locationMessage: mhan.message.locationMessage,
         contentText: text1,
         footerText: desc1,
         buttons: but,
         headerType: 6
         }
         xcaa.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
         }

         const sendButtLocation = async (id, text1, desc1, gam1, but = [], options = {}) => {
             data = fs.readFileSync('./lib/imagexie.js');
             jsonData = JSON.parse(data);
             randxcaa = Math.floor(Math.random() * jsonData.length);
             randKey = jsonData[randxcaa];
             buff = await getBuffer(randKey.image)
         const medaxxaa = await xcaa.prepareMessage(id, buff, MessageType.location, {thumbnail: buff})
             imgnya = medaxxaa.message["ephemeralMessage"] ? medaxxaa.message.ephemeralMessage : medaxxaa
         const buttonMessages = {
             locationMessage: imgnya.message.locationMessage,
             contentText: text1,
             footerText: desc1,
             buttons: but,
             headerType: 6
         }
         xcaa.sendMessage(id, buttonMessages, MessageType.buttonsMessage, options)
         }
         
         const sendButMessage = (id, text1, desc1, but = [], options = {}) => {
         const buttonMessage = {
           contentText: text1,
           footerText: desc1,
           buttons: but,
           headerType: 1,
         };
         xcaa.sendMessage(
           id,
           buttonMessage,
           MessageType.buttonsMessage,
           options
         );
         };
         
         const daftar1 = `Hai ${pushname}\nKamu Belum Terdaftar Silahkan Klik Dibawah`
         const daftar2 = 'Author FxSx'
         const daftar3 = [
          {
            buttonId: `${prefix}daftar`,
            buttonText: {
              displayText: `Daftar User`,
            },
            type: 1,
         },]
         
         const banned1 = `Maaf ${pushname}\nNomer Kamu Sudah Dibanned Oleh Owner`
         const banned2 = 'Jika Ingin Dibuka Banned Nya Silahkan Hubungi Owner!\n\nAuthor FxSx'
         const banned3 = [
          {
            buttonId: `${prefix}owner`,
            buttonText: {
              displayText: `Owner Bot`,
            },
            type: 1,
         },]
			
			const sendMediaURL = async(url, text="", mids=[]) =>{
         if(mids.length > 0){
          text = normalizeMention(to, text, mids)
         }
         const fn = Date.now() / 10000;
         const filename = fn.toString()
         let mime = ""
         var download = function (uri, filename, callback) {
           request.head(uri, function (err, res, body) {
             mime = res.headers['content-type']
             request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
          });
         };
         download(url, filename, async function () {
           console.log('done');
           let media = fs.readFileSync(filename)
           let type = mime.split("/")[0]+"Message"
           if(mime === "image/gif"){
            type = MessageType.video
            mime = Mimetype.gif
          }
          if(mime.split("/")[0] === "audio"){
            mime = Mimetype.mp4Audio
          }
          xcaa.sendMessage(from, media, type, { quoted: xie, mimetype: mime, caption: text,contextInfo: {"mentionedJid": mids}})
                    
          fs.unlinkSync(filename)
         });
         }
         const sendFileFromUrl = async(link, type, options) => {
                hasil = await getBuffer(link)
                 xcaa.sendMessage(from, hasil, type, options).catch(e => {
                  fetch(link).then((hasil) => {
                    xcaa.sendMessage(from, hasil, type, options).catch(e => {
                    xcaa.sendMessage(from, { url : link }, type, options).catch(e => {
                  console.log(e)
                })
              })
            })
          })
         }
         
         const getpc = async function(totalchat){
         let pc = []
         let a = []
         let b = []
         for (c of totalchat){
             a.push(c.jid)
         }
         for (d of a){
             if (d && !d.includes('g.us')){
             b.push(d)
           }
         }
         return b
         }

         const getGroup = async function(totalchat){
         let grup = []
         let a = []
         let b = []
         for (c of totalchat){
             a.push(c.jid)
         }
         for (d of a){
             if (d && d.includes('g.us')){
             b.push(d)
           }
         }
         for (e of b){
             let ingfo = await xcaa.groupMetadata(e)
             grup.push(ingfo)
         }
         return grup
         }  
         let ii = []
			let giid = []
		   for (mem of totalchat){
				 ii.push(mem.jid)
			}
			for (id of ii){
				 if (id && id.includes('g.us')){
				 giid.push(id)
			  }
		   }
			
			mess = {
				wait: '*Sedang Diproses*',
				sucess: '*Sukses*',
				error: {
					eror: '*Eror*',
					link: '*Link Invalid*'
				},
				only: {
					group: '*Khusus Group*',
					benned: '*Maaf Nomer Kamu Tidak Bisa Gunakan Xie-Bot*',
					ownerG: '*Khusus Owner Group*',
					ownerB: '*Khusus Owner Xie*',
					premium: '*Khusus Premium Xie*',
					admin: '*Khusus Admin Group*',
					Badmin: '*Jadikan Xie-Bot Admin Dulu*'
				}
			}
         
         if (itsMeXie){
         if(chats.toLowerCase() == `${prefix}self`){
         public = false
         reply(`Success`, `Status : Self`)
         }
         if (chats.toLowerCase() == 'status'){
         reply(`STATUS : ${public ? 'Public' : 'Self'}`)
         }
         }
         if (!public){
         if (!xie.key.fromMe) return
         }
         
         if (isCmd && antiSpam.isFiltered(from) && !isGroup) {
         console.log(color('[SPAM]', 'aqua'), color(time, 'blue'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'aqua'))
         return reply('Mohon Jangan Spam\nKasih Waktu 4 Detik!')
         }
        
         if (isCmd && antiSpam.isFiltered(from) && isGroup) {
         console.log(color('[SPAM]', 'aqua'), color(time, 'blue'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'blue'), 'in', color(groupName, 'aqua'))
         return reply('Mohon Jangan Spam\nKasih Waktu 4 Detik!')
         }
         
			colors = ['red','white','black','blue','yellow','green']
         const isMedia = (type === 'imageMessage' || type === 'videoMessage')
		   const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
		   const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
		   const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
		   const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
		   const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
         const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
         const isQuotedDocs = type === 'extendedTextMessage' && content.includes('documentMessage')
         const isQuotedTeks = type === 'extendedTextMessage' && content.includes('quotedMessage')
         const isQuotedTag = type === 'extendedTextMessage' && content.includes('mentionedJid')
         const isQuotedProd = type === 'extendedTextMessage' && content.includes('productMessage')
         const isQuotedReply = type === 'extendedTextMessage' && content.includes('Message')
                  
         for (let x of mentionUser) {
                if (afk.hasOwnProperty(x.split('@')[0])) {
                    ini_txt = "User Yang Anda Tag/Reply Sedang Afk"
                    if (afk[x.split('@')[0]] != "") {
                        ini_txt += "Dengan Alasan : " + afk[x.split('@')[0]]
                    }
                    reply(ini_txt)
               }
         }
         if (afk.hasOwnProperty(sender.split('@')[0])) {
            reply(`Anda Telah Keluar Dari Mode Afk\n\nSaat Nya Mulu Yak ${pushname}`)
              delete afk[sender.split('@')[0]]
          fs.writeFileSync("./database/afk.json", JSON.stringify(afk))
         }

         if (budy.startsWith('>')){
         try {
     	   if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
         return xcaa.sendMessage(from, JSON.stringify(eval(budy.slice(2)),null,'\t'),text, {quoted: xie})
         } catch(err) {
         e = String(err)
         reply(e)
         }
         }
         
         if (isCmd && !isGroup) console.log(color('[ PRIVAT ]', 'green'), color(time, 'aqua'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'aqua'))
         if (isCmd && isGroup) console.log(color('[ GROUP ]', 'green'), color(time, 'aqua'), color(`${command} [${args.length}]`, 'yellow'), 'from', color(pushname, 'aqua'), 'in', color(groupName, 'yellow'))
			
			if (isCmd && !isOwner) antiSpam.addFilter(from)
			
			switch(command) {
			case 'menu':
	      case 'help':
			     if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
			     if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
			     menunya = `
╭「 *INFO BOT* 」
├ Author: FxSx
├ Nama Bot: ${namabot}
├ Prefix: Multi
├ Lib: Baileys
├ Type: NodeJs
├ Hit Today: ${hit_today.length}
├ Total Hit: ${hitall}
├ Total Chat: ${totalchat}
├ Total Kontak: ${totalkontak}
└ Total Grup: ${totalgroup}

╭「 *ABOUT* 」
├ ${prefix}owner
├ ${prefix}status
├ ${prefix}info
├ ${prefix}speed
├ ${prefix}blocklist
├ ${prefix}banlist
├ ${prefix}listscmd
├ ${prefix}listrespon
├ ${prefix}chatlist
└ ${prefix}bahasa

╭「 *GROUP* 」
├ ${prefix}grup buka/tutup
├ ${prefix}add
├ ${prefix}linkgc
├ ${prefix}resetlinkgc
├ ${prefix}kick
├ ${prefix}tagall
├ ${prefix}hidetag
├ ${prefix}infogrup
├ ${prefix}listadmin
├ ${prefix}pemilikgrup
├ ${prefix}here
└ ${prefix}delete

╭「 *FUNNY* 」
├ ${prefix}afk
├ ${prefix}sticker
├ ${prefix}toimg
├ ${prefix}tts
├ ${prefix}truth
├ ${prefix}dare
├ ${prefix}tomp3
└ ${prefix}darkjokes

╭「 *DOWNLOAD* 」
├ ${prefix}play
├ ${prefix}ytsearch
├ ${prefix}ytmp3
├ ${prefix}ytmp4
├ ${prefix}cariaudio
├ ${prefix}fb
├ ${prefix}ig
├ ${prefix}igstalk
├ ${prefix}igstory
├ ${prefix}tiktok
├ ${prefix}tiktokaudio
├ ${prefix}twitter
├ ${prefix}mediafire
├ ${prefix}lirik
├ ${prefix}pinterest
├ ${prefix}ggimg
└ ${prefix}asupan

╭「 *OWNER* 」
├ ${prefix}setprefix
├ ${prefix}sethias
├ ${prefix}setthumb
├ ${prefix}scmd
├ ${prefix}delscmd
├ ${prefix}clearall
├ ${prefix}bc
├ ${prefix}clone
├ ${prefix}join
├ ${prefix}leave
└ ${prefix}take
`
              data = fs.readFileSync('./lib/imagexie.js');
              jsonData = JSON.parse(data);
              randxcaa = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randxcaa];
              randImg = await getBuffer(randKey.image)
              imgnya = await xcaa.prepareMessage(from, randImg, MessageType.location, {thumbnail: randImg})
              bakekok = imgnya.message["ephemeralMessage"] ? imgnya.message.ephemeralMessage : imgnya
              gbutsan = [
                 {buttonId:`${prefix}speed`,buttonText:{displayText:'Speed Bot'},type:1},
                 {buttonId:`${prefix}info`,buttonText:{displayText:'Info Bot'},type:1}
              ]
              const buttonMessages = {
              locationMessage: bakekok.message.locationMessage,
              contentText: `${menunya}`,
              footerText: `${namabot}`,
              buttons: gbutsan,
              headerType: 6
              }
              await xcaa.sendMessage(from, buttonMessages, MessageType.buttonsMessage, {contextInfo: {"mentionedJid": [sender]}})
              break
         case 'daftar':
				  xcaa.updatePresence(from, Presence.composing)
				  if (isUser) return reply('*Kamu Sudah Jadi User XieCaa*')
			     if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
			     user.push(sender)
				  fs.writeFileSync('./database/user.json', JSON.stringify(user))
				  try {
				  ppimg = await xcaa.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
				  } catch {
				  ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
			 	  }
				  captionnya = `╭─𖧹「 *PENDAFTARAN* 」\n┴𖧹\n├ Pada ${date} ${time}\n├ Nama : ${pushname}\n├ Nomer : @${sender.split('@')[0]}\n├ Total User : ${user.length} Orang`
              daftarimg = await getBuffer(ppimg)
              imgnya = await xcaa.prepareMessage(from, daftarimg, MessageType.location, {thumbnail: daftarimg})
              bakeok = imggnya.message["ephemeralMessage"] ? imgnya.message.ephemeralMessage : imgnya
              gbuttonan = [
                 {buttonId:`${prefix}menu`,buttonText:{displayText:'All Cmd'},type:1}
              ]
              const buttonMessages = {
              locationMessage: bakeok.message.locationMessage,
              contentText: `${captionnya}`,
              footerText: `${namabot}`,
              buttons: gbuttonan,
              headerType: 6
              }
              await xcaa.sendMessage(from, buttonMessages, MessageType.buttonsMessage, {contextInfo: {"mentionedJid": [sender]}})
              break
//>>>>>>>>>[ KHUSUS INFO BOT ]<<<<<<<<<<\\
         case 'owner': case 'creator':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              let ini_list = []
              ini_ownerNumber = ["6283818221226@s.whatsapp.net"]
              for (let i of ini_ownerNumber) {
              const vname = xcaa.contacts[i] != undefined ? xcaa.contacts[i].vname || xcaa.contacts[i].notify : undefined
              ini_list.push({
              "displayName": `FxSx`,
              "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:${vname_ ? `${vname_}` : `${xcaa.user.name}`}\nORG: `Owner ${namabot}`;\nitem1.TEL;waid=${i.split('@')[0]}:${i.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
              })
              }
              hehe = await xcaa.sendMessage(from, {
              "displayName": `${ini_list.length} kontak`,
              "contacts": ini_list 
              }, 'contactsArrayMessage', { quoted: xie })
              xcaa.sendMessage(from,'Owner Ku Tuh Kak',text,{quoted: hehe})
              break
         case 'status':
			     if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
			     const status = public ? 'Public': 'Self'
			     return reply(`「 Status Bot 」\n\n ${status}`)
			     break
         case 'info':
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              me = xcaa.user
              infonya = `*Nama bot* : ${me.name}\n*Nomor Bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Total Block Contact* : ${blocked.length}\n*Online Bot* : ${kyun(run)}`
              sendButtLocation(from, `${infonya}`, "Bot Ini Tersedia Anti Spam\nJika Spam Cmd Yang Kamu Kirim Tidak Akan Dibalas\n\nAuthor FxSx", {jpegThumbnail: fs.readFileSync('./src/foto1.jpg')}, 
              [
                {buttonId:`${prefix}chatlist`,buttonText:{displayText:'Chat List'},type:1},

                {buttonId:`${prefix}listgrup`,buttonText:{displayText:'Grup List'},type:1},

                {buttonId:`${prefix}blocklist`,buttonText:{displayText:'Block List'},type:1}

              ], {contextInfo: {mentionedJid: [me.jid]}})
              break
         case 'speed': case 'ping':
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              var times = speed();
              const latensi = speed() - times 
              xcaa.sendMessage(from, `Speed: ${latensi.toFixed(4)} _Second_`, text, {quoted: xie})
              break
         case 'blocklist': case 'listblock':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              teks = 'Daftar Block :\n'
              for (let block of blocked) {
              teks += `~> @${block.split('@')[0]}\n`
              }
              teks += `Total : ${blocked.length}`
              xcaa.sendMessage(from, teks.trim(), extendedText, {quoted: xie, contextInfo: {"mentionedJid": blocked}})
              break
         case 'banlist':
				  ben = '```List Banned``` :\n'
				  for (let banned of ban) {
				   	ben += `~> @${banned.split('@')[0]}\n`
				  }
				  ben += `Total : ${ban.length}`
			     xcaa.sendMessage(from, ben.trim(), extendedText, {quoted: xie, contextInfo: {"mentionedJid": ban}, contextInfo: {text: 'XieCaa',"forwardingScore": 99999,isForwarded: true,sendEphemeral: true,"externalAdReply": {"title": `Hai ${pushname}`,"body": ``,"previewType": "PHOTO","thumbnailUrl": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","thumbnail": "https://i.ibb.co/fHXQHVZ/PinkyCaa.jpg","sourceUrl": ""}}})
				  break
         case 'listscmd':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              let teksnyee = `「 LIST CMD STICKER 」`
              let cemde = [];
              for (let i of _stikcmd) {
              cemde.push(i.id)
              teksnyee += `\n\n*${fx} ID :* ${i.id}\n*${fx} Cmd :* ${i.chats}`
              }
              reply(teksnyee)
              break
         case 'chatlist':
         case 'listchat':
		   case 'cekchat':
		        if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
		        if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
		        teks = `Total : ${totalchat.length}`
              reply(teks)
              break
         case 'listgrup':
         case 'listgc':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
		        if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              tekks = `Total : ${totalgroup.length}`
              reply(tekks)
              break
         case 'bahasa':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              xcaa.sendMessage(from, bahasa(), text)
              break
//>>>>>>>>>[ END INFO BOT ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS FUNNY ]<<<<<<<<<<\\
         case 'afk':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length == 0) return reply('Teksnya Mana')
              alasan = args.join(" ")
              afk[sender.split('@')[0]] = alasan.toLowerCase()
              fs.writeFileSync("./database/afk.json", JSON.stringify(afk))
              ini_txt = "Anda Telah Afk\n"
              if (alasan != "") {
              ini_txt += "Dengan alasan : " + alasan
              }
              reply(ini_txt)
              break
         case 'stiker':
         case 'sticker':
         case 'stik':
         case 'stick':
         case 's':
         case 'sgif':
         case 'stickergif':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              pe = args.join(' ').split('|')
		        var a = pe[0] !== '' ? pe[0] : `Xcaa-Bot`
		        var b = typeof pe[1] !== 'undefined' ? pe[1] : `By FxSx`
		        if (isMedia && !xie.message.videoMessage || isQuotedImage ) {
		        const encmedia___ = isQuotedImage   ? JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo : xie
		        media___ = await xcaa.downloadAndSaveMediaMessage(encmedia___)
		        await createExif(a,b)
		        out = getRandom('.webp')
		        ffmpeg(media___)
		        .on('error', (e) => {
		        console.log(e)
		        xcaa.sendMessage(from, 'Terjadi kesalahan', 'conversation', { quoted: xie })
		        fs.unlinkSync(media___)
		        })
		        .on('end', () => {
		        _out = getRandom('.webp')
		        spawn('webpmux', ['-set','exif','./lib/data.exif', out, '-o', _out])
		        .on('exit', () => {
		        xcaa.sendMessage(from, fs.readFileSync(_out),'stickerMessage', { quoted: xie })
		        fs.unlinkSync(out)
		        fs.unlinkSync(_out)
		        fs.unlinkSync(media___)
		        })
		        })
		        .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
		        .toFormat('webp')
		        .save(out) 
		        } else if ((isMedia && xie.message.videoMessage.seconds < 11 || isQuotedVideo && xie.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
		        const encmedia___ = isQuotedVideo ? JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo : xie
		        const media___ = await xcaa.downloadAndSaveMediaMessage(encmedia___)
		        pe = args.join(' ').split('|')
		        var a = pe[0] !== '' ? pe[0] : `Xcaa-Bot`
		        var b = typeof pe[1] !== 'undefined' ? pe[1] : `By FxSx`
		        await createExif(a,b)
		        out = getRandom('.webp')
		        ffmpeg(media___)
		        .on('error', (e) => {
		        console.log(e)
		        xcaa.sendMessage(from, 'Terjadi kesalahan', 'conversation', { quoted: xie })
		        fs.unlinkSync(media___)
		        })
		        .on('end', () => {
		        _out = getRandom('.webp')
		        spawn('webpmux', ['-set','exif','./lib/data.exif', out, '-o', _out])
		        .on('exit', () => {
		        xcaa.sendMessage(from, fs.readFileSync(_out),'stickerMessage', { quoted: xie })
		        fs.unlinkSync(out)
		        fs.unlinkSync(_out)
		        fs.unlinkSync(media___)
		        })
		        })
		        .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
		        .toFormat('webp')
		        .save(out)       
		        } else {
		        reply(`Kirim atau reply gambar dengan caption ${prefix + command}\n\n*Note:* _Durasi Untuk Sticker Video 1-9 Detik☕_`)
		        }
              break
         case 'toimg':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isQuotedSticker) return reply('Reply Stickernya')
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo
              media = await xcaa.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.png')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply(mess.error.eror)
              buffer = fs.readFileSync(ran)
              xcaa.sendMessage(from, buffer, image, {quoted: xie, caption: '>//<'})
              fs.unlinkSync(ran)
              })
              break
         case 'tts':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply(`Kode Bahasanya Mana\nSilahkan Ketik : ${prefix}bahasa`)
              const gtts = require('./lib/gtts')(args[0])
              if (args.length < 2) return reply('Textnya Mana')
              dtt = body.slice(9)
              ranm = getRandom('.mp3')
              rano = getRandom('.ogg')
              dtt.length > 600
              ? reply('Textnya Kebanyakan')
              : gtts.save(ranm, dtt, function() {
              exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
              fs.unlinkSync(ranm)
              buff = fs.readFileSync(rano)
              if (err) return reply(mess.error.eror)
              xcaa.sendMessage(from, buff, audio, {quoted: xie, ptt:true})
              fs.unlinkSync(rano)
              })
              })
              break
         case 'tomp3':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isQuotedVideo) return reply('Reply Videonya')
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await xcaa.downloadAndSaveMediaMessage(encmedia)
              ran = getRandom('.mp4')
              exec(`ffmpeg -i ${media} ${ran}`, (err) => {
              fs.unlinkSync(media)
              if (err) return reply(`Err: ${err}`)
              buf = fs.readFileSync(ran)
              xcaa.sendMessage(from, buf, audio, {mimetype: 'audio/mp4', quoted: xie})
              fs.unlinkSync(ran)
              })
              break
         case 'truth':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              const trut = ['Pernah suka sama siapa aja? berapa lama?', 'Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)', 'apa ketakutan terbesar kamu?', 'pernah suka sama orang dan merasa orang itu suka sama kamu juga?', 'Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?', 'pernah gak nyuri uang nyokap atau bokap? Alesanya?', 'hal yang bikin seneng pas lu lagi sedih apa', 'pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?', 'pernah jadi selingkuhan orang?', 'hal yang paling ditakutin', 'siapa orang yang paling berpengaruh kepada kehidupanmu', 'hal membanggakan apa yang kamu dapatkan di tahun ini', 'siapa orang yang bisa membuatmu sange', 'siapa orang yang pernah buatmu sange', '(bgi yg muslim) pernah ga solat seharian?', 'Siapa yang paling mendekati tipe pasangan idealmu di sini', 'suka mabar(main bareng)sama siapa?', 'pernah nolak orang? alasannya kenapa?', 'Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget', 'pencapaian yang udah didapet apa aja ditahun ini?', 'kebiasaan terburuk lo pas di sekolah apa?']
				  const ttrth = trut[Math.floor(Math.random() * trut.length)]
				  logotruth = await getBuffer('https://telegra.ph/file/f69b58216b0c109107952.jpg')
				  sendButLoc(from, `${ttrth}`, `Truth Or Dare\n${namabot}`, logotruth, 
				  [
				  {buttonId: `truth`,buttonText: {displayText: `TRUTH`},type: 1},
              {buttonId: `dare`,buttonText: {displayText: `DARE`},type: 1}
              ], {contextInfo: {"mentionedJid": [sender]}})
				  break
		   case 'dare':
		        if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
				  const dare = ['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu', 'telfon crush/pacar sekarang dan ss ke pemain', 'pap ke salah satu anggota grup', 'Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo', 'ss recent call whatsapp', 'drop emot 🤥 setiap ngetik di gc/pc selama 1 hari', 'kirim voice note bilang can i call u baby?', 'drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu', 'pake foto sule sampe 3 hari', 'ketik pake bahasa daerah 24 jam', 'ganti nama menjadi "gue anak lucinta luna" selama 5 jam', 'chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you', 'prank chat mantan dan bilang " i love u, pgn balikan', 'record voice baca surah al-kautsar', 'bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini', 'sebutkan tipe pacar mu!', 'snap/post foto pacar/crush', 'teriak gajelas lalu kirim pake vn kesini', 'pap mukamu lalu kirim ke salah satu temanmu', 'kirim fotomu dengan caption, aku anak pungut', 'teriak pake kata kasar sambil vn trus kirim kesini', 'teriak " anjimm gabutt anjimmm " di depan rumah mu', 'ganti nama jadi " BOWO " selama 24 jam', 'Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
				  const der = dare[Math.floor(Math.random() * dare.length)]
				  logodare = await getBuffer('https://telegra.ph/file/407800b89e1b077c3aae9.jpg')
				  sendButLoc(from, `${der}`, `Truth Or Dare`, logodare, 
				  [
				  {buttonId: `truth`,buttonText: {displayText: `TRUTH`},type: 1},
              {buttonId: `dare`,buttonText: {displayText: `DARE`},type: 1}
              ], {contextInfo: {"mentionedJid": [sender]}})
              break
         case 'darkjoke':
         case 'darkjokes':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
				  if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
				  data = fs.readFileSync('./lib/drak.js');
              jsonData = JSON.parse(data);
              randIndex = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randIndex];
              darkjokes = await getBuffer(randKey.result)
				  imgnya = await xcaa.prepareMessage(from, darkjokes, image, {thumbnail: darkjokes})
				  ucapnya = `Dark Jokes Done!`
              gbutsan = [
                {buttonId: `${prefix + command}`, buttonText: {displayText: 'Dark Jokes'}, type: 1}
              ]
              gbuttonan = {
                imageMessage: imgnya.message.imageMessage,
                contentText: `${ucapnya}`,
                footerText: `Jika Ingin Lagi Silahkan Klik Dibawah!`,
                buttons: gbutsan,
                headerType: 4
              }
              await xcaa.sendMessage(from, gbuttonan, MessageType.buttonsMessage, {thumbnail: fs.readFileSync('foto1.jpg'),caption: ucapnya,"contextInfo": {mentionedJid: [sender]}, quoted: xie})
              break
//>>>>>>>>>[ END FUNNY ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS GROUP ]<<<<<<<<<<\\
         case 'tagall':
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              members_id = []
              teks = (args.length > 1) ? body.slice(8).trim() : ''
              teks += '\n\n'
              for (let mem of groupMembers) {
              teks += `*#* @${mem.jid.split('@')[0]}\n`
              members_id.push(mem.jid)
              }
              mentions(teks, members_id, true)
              break
         case 'hidetag':
              if (!isGroup) return reply(mess.only.group)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              var value = body.slice(9)
              var group = await xcaa.groupMetadata(from)
              var member = group['participants']
              var mem = []
              member.map( async adm => {
              mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
              })
              var options = {
              text: value,
              contextInfo: { mentionedJid: mem },
              quoted: xie
              }
              xcaa.sendMessage(from, options, text)
              break
         case 'liston':
         case 'listonline':
         case 'here':                
              if (!isGroup) return reply(mess.only.group)
              try {
              let fxsxdev = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
              let online = [...Object.keys(xcaa.chats.get(fxsxdev).presences), xcaa.user.jid]
              xcaa.sendMessage(from, 'List Nyimak:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join `\n`, text, {quoted: xie, contextInfo: {mentionedJid: online}})
              } catch (e) {
              reply(`${e}`)
              }
              break
         case 'delete':
         case 'del':
         case 'd':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              xcaa.deleteMessage(from, { id: xie.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
              break
         case 'add':
				  try {
				  if (!isGroup) return reply(mess.only.group)
				  if (!isGroupAdmins && !isOwner && !xie.key.fromMe) return reply(mess.only.admin)  
				  if (!isBotGroupAdmins) return reply(mess.only.BAdmin)
			     if (!q) return reply(`Contoh ${prefix + command} @nomer/reply`)
				  if (xie.message.extendedTextMessage === null || xie.message.extendedTextMessage === undefined) {
              entah = q.replace(new RegExp("[()+-/ +/]", "gi"), "") + `@s.whatsapp.net`
              response = await xcaa.groupAdd(from, [entah])
              o = response.participants[0]
              let inv = (Object.values(o))
              if(inv[0].code == 409) return reply('Target Sudah Di Didalam Group!')
              if(inv[0].code == 403) return reply('Gagal, Karena Di Private')
              if(inv[0].code == 408) return reply('Gagal, Karena Target Baru² Saja Keluar')
              if(inv[0].code == 401) return reply('Gagal, Karena Bot Di Block Oleh Target')
              } else {
              entah = xie.message.extendedTextMessage.contextInfo.participant
              response = await xcaa.groupAdd(from, [entah])
              o = response.participants[0]
              let inv = (Object.values(o))
              if(inv[0].code == 409) return reply('Target Sudah Di Didalam Group!')
              if(inv[0].code == 403) return reply('Gagal, Karena Di Private')
              if(inv[0].code == 408) return reply('Gagal, Karena Target Baru² Saja Keluar')
              if(inv[0].code == 401) return reply('Gagal, Karena Bot Di Block Oleh Target')
              }
              } catch {
              return reply(mess.sucess)
              }
              break
         case 'kick': case 'tendang': case 'sampah':
              if (!isGroup) return reply(mess.only.group)
              if (!isOwner && !xie.key.fromMe && !isGroupAdmins) return reply(mess.only.admin)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
			     if (xie.message.extendedTextMessage === undefined || xie.message.extendedTextMessage === null) return reply('Reply Targetnya!')
			     kicknya = xie.message.extendedTextMessage.contextInfo.participant
		        await xcaa.groupRemove(from, [kicknya])
		 	     break
         case 'infogc':
         case 'groupinfo':
         case 'infogrup':
         case 'grupinfo':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              try {
              ppUrl = await xcaa.getProfilePicture(from)
              } catch {
              ppUrl = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
              }
			     buffer = await getBuffer(ppUrl)
		        captionnya = `*NAME* : ${groupName}\n*MEMBER* : ${groupMembers.length}\n*ADMIN* : ${groupAdmins.length}\n*DESK* : ${groupDesc}`
              imgnya = await xcaa.prepareMessage(from, buffer, location, {thumbnail: buffer})
              gbutsan = [
                {buttonId:`${prefix}pemilikgrup`,buttonText:{displayText:'Pemilik Group'},type:1},
                {buttonId:`${prefix}listadmin`,buttonText:{displayText:'List Admin'},type:1}
              ]
              const buttonMessages = {
                locationMessage: imgnya.message.locationMessage,
                contentText: `${captionnya}`,
                footerText: `Mohon Patuhi Peraturan Grup Ini\n\nAuthor FxSx`,
                buttons: gbutsan,
                headerType: 6
              }
              await xcaa.sendMessage(from, buttonMessages, MessageType.buttonsMessage, {contextInfo: {mentionedJid: [sender]}})
              break
         case 'listadmins':
         case 'listadmin':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
              no = 0
              for (let admon of groupAdmins) {
              no += 1
              teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
              }
              mentions(teks, groupAdmins, true)
              break
         case 'ownergrup':
         case 'pemilikgrup':
         case 'pemilikgc':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              xie.updatePresence(from, Presence.composing) 
              options = {
              text: `Pemilik Group : wa.me/${from.split("-")[0]}`,
              contextInfo: { mentionedJid: [from] }
              }
              xcaa.sendMessage(from, options, text, {quoted: xie})
              break
         case 'linkgroup':
         case 'linkgrup':
         case 'linkgc':
         case 'gruplink':
         case 'grouplink':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isGroup) return reply(mess.only.group)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              linkgc = await xcaa.groupInviteCode (from)
              linknya = `https://chat.whatsapp.com/${linkgc}\n\nLink Group *${groupName}*`
              xcaa.sendMessage(from, linknya, text, {quoted: xie})
              break
         case 'resetlinkgc':
         case 'resetlinkgroup':
         case 'revoke':
              if (!isGroup) return reply(mess.only.group)
              if (!isGroupAdmins) return reply(mess.only.admin)
              if (!isBotGroupAdmins) return reply(mess.only.Badmin)
              json = ['action', 'inviteReset', from]
              xcaa.query({json, expect200: true})
              reply(mess.sucess)
              break
         case 'grup':
         case 'gc':
         case 'group':	
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args[0] === 'buka') {
					reply(mess.sucess)
					xcaa.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
					reply(mess.sucess)
					xcaa.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
//>>>>>>>>>[ END GROUP ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS DOWNLOAD ]<<<<<<<<<<\\
         case 'play':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length === 0) return reply(`Silahkan Ketik : ${prefix}play Nama Lagunya`)
              var srch = args.join('')
              find = await yts(srch)
              res = find.all
              var reslink = res[0].url;
              try {
              yta(reslink)
              .then((res) => {
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then(async (a) => {
              if (Number(filesize) >= 100000) return sendMediaURL(thumb, `*PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\n_Untuk durasi lebih dari batas disajikan dalam bentuk link_`)
              sendMediaURL(thumb, `*PLAY MUSIC*\n\n*Title* : ${title}\n*Ext* : MP3\n*Size* : ${filesizeF}\n*Link* : ${a.data}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`)
              await sendMediaURL(dl_link).catch(() => reply(mess.error.eror))
              })
              })
              l} catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'ytsearch':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply("masukan judul video")
              var search = args.join('')
              try {
              var find = await yts(search)
              } catch {
              return await reply(mess.error.eror)
              }
              result = find.all
              var tbuff = await getBuffer(result[0].image)
              var ytres = `*[ YT SEARCH ]*\n*━━━━━━━*\n\n`
              find.all.map((video) => {
              ytres += `${fx} Title:` + video.title + '\n'
              ytres += `${fx} Link:` + video.url + '\n'
              ytres += `${fx} Durasi:` + video.timestamp + '\n'
              ytres += `${fx} Upload:` + video.ago +`\n*━━━━━━━*\n\n`
              })
              await fakethumb(tbuff, ytres)
              break
         case 'ytmp3':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply('masukan link youtube yang mau di download')
              var link = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
              if (!link) return reply(mess.error.eror)
              try {
              reply(mess.wait)
              yta(args[0])
              .then((res) =>{
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then((a) => {
              if (Number(filesize) >= 30000) return sendMediaURL(thumb, `*Data Berhasil Didapatkan!*\n\n*Title* : ${title}\n*Ext* : MP3\n*Filesize* : ${filesizeF}\n*Link* : ${a.data}\n\nDurasi Terlalu Panjang, Saya Kasih Link Aja`)
              const caption = `*[ YT MP3 ]*\n\n${fx} *Title* : ${title}\n${fx} *Ext* : MP3\n${fx} *Size* : ${filesizeF}\n\n*Silahkan Tunggu Audio Sedang Dikirim*`
              sendMediaURL(thumb, caption)
              sendMediaURL(dl_link).catch(() => reply("File Eror"))
              })
              })
              } catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'ytmp4':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply('masukan link youtube yang mau di download')
              var link = args[0].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)
              if (!link) return reply(mess.error.link)
              try {
              reply(mess.wait)
              ytv(args[0])
              .then((res) =>{
              const { dl_link, thumb, title, filesizeF, filesize } = res
              axios.get(`https://tinyurl.com/api-create.php?url=${dl_link}`)
              .then((a) => {
              if (Number(filesize) >= 30000) return sendMediaURL(thumb, `*Data Berhasil Didapatkan!*\n\n${fx} *Title* : ${title}\n${fx} *Ext* : MP3\n${fx} *Filesize* : ${filesizeF}\n${fx} *Link* : ${a.data}\n\nDurasi Terlalu Panjang, Saya Kasih Link Aja`)
              const caption = `*[ YT MP4 ]*\n\n${fx} *Title* : ${title}\n${fx} *Ext* : MP3\n${fx} *Size* : ${filesizeF}\n\n_Silahkan tunggu file media sedang dikirim mungkin butuh beberapa menit_`
              sendMediaURL(thumb, caption)
              sendMediaURL(dl_link).catch(() => reply("file error"))
              })
              })
              } catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'fb':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('facebook.com') && args.length < 1) return reply("Link Eror")
              reply(mess.wait)
              hx.fbdown(args[0])
              .then(res => {
              link = `${res.HD}`
              sendMediaURL(link, `*Link video_normal* : ${re.Normal_video}`)
              })
              break
         case 'ig':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('instagram.com') && args.length < 1) return reply("coba check link nya")
              reply(mess.wait)
              hx.igdl(args[0])
              .then(async (res) => {
              for (let i of res.medias) {
              if (i.url.includes("mp4")){
              let bufff = await getBuffer(i.url)
              xcaa.sendMessage(from, bufff, video, {quoted: xie, caption: `Type : ${i.type}`})
              } else {
              let buff = await getBuffer(i.url)
              xcaa.sendMessage(from, buff, image, {quoted: xie, caption: `Type : ${i.type}`})
              }
              }
              })
              break
         case 'igstalk':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply("Masukan Nama IG Nya")
              ig.fetchUser(args[0])
              .then(user => {
              thum = `${user.profile_pic_url_hd}`
              desc = `*ID* : ${user.profile_id}\n*Username* : ${args.join('')}\n*Full Name* : ${user.full_name}\n*Bio* : ${user.biography}\n*Followers* : ${user.followers}\n*Following* : ${user.following}\n*Private* : ${user.is_private}\n*Verified* : ${user.is_verified}\n\n*Link* : https://instagram.com/${args.join('')}`
              sendMediaURL(thum, desc)
              })
              break
         case 'igstory':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if(!q) return reply('Masukan Nama IG Nya')
              hx.igstory(q)
              .then(async result => {
              for(let i of result.medias){
              if(i.url.includes('mp4')){
              let bufff = await getBuffer(i.url)
              xcaa.sendMessage(from, bufff, video, {quoted: xie, caption: `Type : ${i.type}`})
              } else {
              let buff = await getBuffer(i.url)
              xcaa.sendMessage(from, buff, image, {quoted: xie, caption: `Type : ${i.type}`})
              }
              }
              });
              break
         case 'tiktok':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('tiktok.com') && !q) return reply("Linknya Mana")
              sek = await reply(mess.wait)
              hx.ttdownloader(args[0])
              .then(res => {
              const {
              nowm
              } = res;
              axios.get(`https://tinyurl.com/api-create.php?url=${nowm}`)
              .then(async (a) => {
              me = `link: ${a.data}`
              xcaa.sendMessage(from,{url:`${nowm}`},video,{mimetype:'video/mp4', quoted: xie, caption:me})
              setTimeout(() => {
              xcaa.deleteMessage(from, sek.key)
              }, 10000)
              })
              })
              .catch( e => console.log(e))
              break
         case 'tiktokaudio':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.eror)
              if (!q) return ('Linknya Mana')
              hx.ttdownloader(`${args[0]}`)
              .then(result => {
              const { audio} = result
              sendMediaURL(from,audio,'')
              })
              .catch(e => console.log(e))
              break
         case 'twitter':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (!isUrl(args[0]) && !args[0].includes('twitter.com') && !q) return reply("Linknya Mana")
              var res = await hx.twitter(args[0])
              sendMediaURL(res.HD, "Done!")
              break
         case 'mediafire': case 'mdf':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply('Linknya Mana')
              if(!isUrl(args[0]) && !args[0].includes('mediafire')) return reply(mess.error.eror)
              if (Number(filesize) >= 90000) return reply(`${fx} *Nama :* ${res[0].nama}\n${fx} *Ukuran :* ${res[0].size}\n${fx} *Link :* ${res[0].link}\n\n*Maaf Size Melebihi Batas Maksimal, Silahkan Klik Link Diatas*`)
              reply(mess.wait)
              teks = args.join(' ')
              res = await mediafireDl(teks)
              result = `${fx} *Nama :* ${res[0].nama}
${fx} *Ukuran :* ${res[0].size}

*File Sedang Dikirim*`
              reply(result)
              sendFileFromUrl(res[0].link, document, {mimetype: res[0].mime, filename: res[0].nama, quoted: xie})
              break
         case 'lirik':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if(!q) return reply('Judul Lagunya Apa')
              let song = await hx.lirik(q);
              sendMediaURL(song.thumb, song.lirik)
              break
         case 'pinterest': case 'img':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if(!q) return reply('Mau Cari Gambar Apa')
              let pin = await hx.pinterest(q)
              let ac = pin[Math.floor(Math.random() * pin.length)]
              let buff = await getBuffer(ac)
              await xcaa.sendMessage(from, buff, image, {quoted: xie})
              break
         case 'image': case 'ggimg':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              if (args.length < 1) return reply('Mau Cari Gambar Apa')
              teks = args.join(' ')
              res = await googleImage(teks, google)
              function google(error, result){
              if (error) return reply(mess.error.eror)
              else {
              var gugIm = result
              var random =  gugIm[Math.floor(Math.random() * gugIm.length)].url
              sendFileFromUrl(random, image, {quoted: xie, caption: `*Hasil Pencarian Dari :* ${teks}`})
              }
              }
              break
         case 'penyegar': case 'asupan':
              if (!isUser) return sendButMessage (from, daftar1, daftar2, daftar3, {quoted: ftroli})
              if (isBanned) return sendButMessage (from, banned1, banned2, banned3, {quoted: ftroli})
              xcaa.updatePresence(from, Presence.composing)
              data = fs.readFileSync('./lib/asupan.js')
              jsonData = JSON.parse(data)
              randxcaa = Math.floor(Math.random() * jsonData.length);
              randKey = jsonData[randxcaa];
              asupan = await getBuffer(randKey.result)
              const vidnya = await xcaa.prepareMessage(from, asupan, video, {thumbnail: fs.readFileSync('./src/foto1.jpg'), quoted: xie})
              manca = vidnya.message["ephemeralMessage"] ? vidnya.message.ephemeralMessage : vidnya
              const butt = [
                    {buttonId:`${prefix + command}`,buttonText:{displayText:'Next'},type:1}
              ]
              const buttonMessages = {
              videoMessage: manca.message.videoMessage,
              contentText: 'Video Asupan Done',
              footerText: `${namabot}`,
              buttons: butt,
              headerType: 5
              }
              await xcaa.sendMessage(from, buttonMessages, MessageType.buttonsMessage, {mimetype: 'video/mp4', contextInfo: {mentionedJid: [sender]}})
              break
//>>>>>>>>>[ END DOWNLOAD ]<<<<<<<<<<\\

//>>>>>>>>>[ KHUSUS OWNER ]<<<<<<<<<<\\
         case 'self':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              public = false
              return reply(`*MODE : SELF*`)
              break
			case 'public':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              public = true
              return reply(`*MODE : PUBLIC*`)
              break
         case 'setprefix':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              prefix = args[0]
              reply(`Sukses Menjadi : ${prefix}`)
              break
         case 'sethias':
         case 'sethiasan':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              fx = args[0]
              reply(`Sukses Menjadi : ${fx}`)
              break
         case 'clearall':
              if (!isOwner) return reply(mess.only.ownerB)
              anu = await xcaa.chats.all()
              xcaa.setMaxListeners(25)
              for (let _ of anu) {
              xcaa.deleteChat(_.jid)
              }
              reply(mess.sucess)
              break
         case 'ban':
				  xcaa.updatePresence(from, Presence.composing) 
				  if (args.length < 1) return
				  if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
				  mentioned = xie.message.extendedTextMessage.contextInfo.mentionedJid
			     ban = mentioned
				  reply(`Berhasil Banned : ${ban}`)
				  break
         case 'bc':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Textnya Mana')
              anu = await xcaa.chats.all()
              if (isMedia && !xie.message.videoMessage || isQuotedImage) {
              const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo : xie
              buff = await xcaa.downloadMediaMessage(encmedia)
              for (let _ of anu) {
              xcaa.sendMessage(_.jid, buff, image, {caption: `[ Ini Broadcast ]\n\n${body.slice(4)}`})
              }
              reply(mess.sucess)
              } else {
              for (let _ of anu) {
              sendMess(_.jid, `[ Ini Broadcast ]\n\n${body.slice(4)}`)
              }
              reply(mess.sucess)
              }
              break
         case 'clone':
              if (!isOwner) return reply(mess.only.ownerB)
              if (args.length < 1) return reply('Tag target yang ingin di clone')
              if (xie.message.extendedTextMessage === undefined || xie.message.extendedTextMessage === null) return reply('Tag cvk')
              mentioned = xie.message.extendedTextMessage.contextInfo.mentionedJid[0]
              let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
              try {
              pp = await xcaa.getProfilePicture(id)
              buffer = await getBuffer(pp)
              xcaa.updateProfilePicture(botNumber, buffer)
              mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
              } catch (e) {
              reply(mess.error.eror)
              }
              break
         case 'scmd':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              if (isQuotedSticker) {
              if (!q) return reply(`Penggunaan : ${prefix + command} cmdnya dan tag stickernya`)
              var kodenya = xie.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
              sCmd(kodenya, q)
              reply(mess.sucess)
              } else {
              reply('Reply Stickernya')
              }
              break
          case 'delscmd':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              if (!isQuotedSticker) return reply(`Penggunaan : ${prefix + command} tagsticker`)
              var kodenya = xie.message.extendedTextMessage.contextInfo.quotedMessage.stickerMessage.fileSha256.toString('base64')
              _stikcmd.splice(getCommandPosition(kodenya), 1)
              fs.writeFileSync('./database/scmd.json', JSON.stringify(_stikcmd))
              reply(mess.sucess)
              break
         case 'join':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              setTimeout( () => {
              xcaa.query({json:["action", "invite", `${args[0].replace('https://chat.whatsapp.com/','')}`]})
              reply('Sukses Beb')
              }, 10000)
              setTimeout( () => {
              reply('Oke Beb')
              }, 0)
              break
         case 'leave':
         case 'outgc':
              if (!isGroup) return reply(mess.only.group)
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              anu = await xcaa.groupLeave(from, `Bye All Member *${groupMetadata.subject}*`, groupId)
              break
         case 'setthumb':
         case 'setffoto':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
              media = await xcaa.downloadMediaMessage(encmedia)
              fs.writeFileSync('./src/foto1.jpg', media)
              reply(mess.sucess)
              break
         case 'take':
         case 'colong':
              if (!isOwner && !xie.key.fromMe) return reply(mess.only.ownerB)
    		     if (!isQuotedSticker) return reply(`Contoh : ${prefix + command} nama|nama`)
              encmedia = JSON.parse(JSON.stringify(xie).replace('quotedM','m')).message.extendedTextMessage.contextInfo
		        take = await xcaa.downloadAndSaveMediaMessage(encmedia)
              yoi = args.join(' ').split('|')
              satu = yoi[0] !== '' ? yoi[0] : `XC-XieCaa`
              dua = typeof yoi[1] !== 'undefined' ? yoi[1] : `By FxSx`
              require('./lib/fetcher.js').createExif(satu, dua)
			     require('./lib/fetcher.js').modStick(take, xcaa, xie, from)
		        break
//>>>>>>>>>[ END OWNER ]<<<<<<<<<<\\
         default:
			     if (isGroup && budy != undefined) {
              } else {
              console.log(color('[ CHAT ]', 'aqua'), 'Tidak Ada Perintah', color(pushname))
              }		
              } catch (e) {
              e = String(e)
              if (!e.includes("this.isZero")) {
              console.log('Message : %s', color(e, 'red'))
            }
        }
    }
}
