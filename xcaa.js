const {
   WAConnection: _WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   WAMessageProto,
   relayWAMessage,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
   processTicksAndRejections,
   ECONNABORTED,
   apikey,
   WA_DEAFULT_EPHEMERAL,
   DataView,
   TypedArray,
   device,
   Browser
} = require('@adiwajshing/baileys')
const simple = require('./lib/simple.js')
const WAConnection = simple.WAConnection(_WAConnection);
const fs = require('fs')
const { exec } = require('child_process')
const moment = require('moment-timezone')
const { getBuffer, generateMessageID, getGroupAdmins, getRandom, start, info, success, banner, close } = require('./lib/functions')
const { color } = require('./lib/color')
blocked = []

require('./index.js')
nocache('./index.js', module => console.log(`${module} sekarang diperbarui!`))

const starts = async (xcaa = new WAConnection()) => {
      xcaa.logger.level = 'warn'
      xcaa.version = [2, 2204, 13]
      xcaa.browserDescription = ["XieCaa-Md", "EDGE", "3.0"];
      console.log(banner.string)
      xcaa.on('qr', () => {
      console.log(color('[ SCAN ]','white'), color('Now Code Qr', 'aqua'))
      })
      fs.existsSync('./session.json') && xcaa.loadAuthInfo('./session.json')
      xcaa.on('connecting', () => {
          start('2', 'Connecting...')
      })
      xcaa.on('open', () => {
          success('2', 'Connected')
      setTimeout( () => {
	   console.log(color(`XC-XIECAA MULTI-DEVICE`, 'aqua'))
	   }, 1000)    		    	     	
      }) 
      await xcaa.connect({timeoutMs: 30 * 3000})
      fs.writeFileSync('./session.json', JSON.stringify(xcaa.base64EncodedAuthInfo(), null, '\t'))
      console.log(color('<==========[ CONNECTED ]==========>', 'magenta'))
      console.log(color('> ','white'), color('WA Version : ','magenta'), color(xcaa.user.phone.wa_version,'white'))
      console.log(color('> ','white'), color('OS Version : ','magenta'), color(xcaa.user.phone.os_version,'white'))
      console.log(color('> ','white'), color('Device : ','magenta'), color(xcaa.user.phone.device_manufacturer,'white'))
      console.log(color('> ','white'), color('Model : ','magenta'), color(xcaa.user.phone.device_model,'white'))
      console.log(color('> ','white'), color('MCC : ','magenta'), color(xcaa.user.phone.mcc,'white'))
      console.log(color('> ','white'), color('MNC : ','magenta'), color(xcaa.user.phone.mnc,'white'))
      console.log(color('> ','white'), color('OS Number : ','magenta'), color(xcaa.user.phone.os_build_number,'white'))
      console.log(color('<==========[ CONNECTED ]==========>', 'magenta'))
      
      xcaa.on('chat-update', async (message) => {
          require('./index.js')(xcaa, message)
      })
      
      // Blocked
      xcaa.on('CB:Blocklist', json => {
          if (blocked.length > 2) return
              for (let i of json[1].blocklist) {
                   blocked.push(i.replace('c.us', 's.whatsapp.net'))
          }
      })
      
      // Welcome Member
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
				halo = await fs.readFileSync('./mp3/halo.mp3')
				let buff = await getBuffer(ppimg)
			   xcaa.sendMessage(mdata.id, halo, MessageType.audio, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Welcome @${num.split('@')[0]} 👋`, orderTitle: `Welcome @${num.split('@')[0]} 👋`, thumbnail: buff, sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true})
		    } else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await xcaa.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				jamet = await fs.readFileSync('./mp3/pantek.mp3')
				let buff = await getBuffer(ppimg)
			   xcaa.sendMessage(mdata.id, jamet, MessageType.audio, {quoted: {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `Sayonara Pantek\n@${num.split('@')[0]} 👋`, orderTitle: `Sayonara Pantek\n@${num.split('@')[0]} 👋`, thumbnail: buff, sellerJid: '0@s.whatsapp.net'} } }, contextInfo: {"mentionedJid": [num]}, mimetype: 'audio/mp4', ptt:true})
			 }
		    } catch (e) {
			   console.log('Error : %s', color(e, 'red'))
		    }
      })
      
      // All Setting Group
      xcaa.on('group-update', async (anu) => {
	       console.log(anu)
	       ftroli = {key : {participant : '0@s.whatsapp.net'}, message: {orderMessage: {itemCount : 1, status: 1, surface : 1, message: `XC-XieCaa`, orderTitle: `XC-XieCaa`, thumbnail: fs.readFileSync('./src/foto1.jpg'), sellerJid: '0@s.whatsapp.net'} } }
          metdata = await xcaa.groupMetadata(anu.jid)
          try {
					ppimg = await xcaa.getProfilePicture(anu.jid)
		    } catch {
					ppimg = 'https://telegra.ph/file/4f2cd42719830eba6b5f1.jpg'
			 }
			 let buff = await getBuffer(ppimg)
          if (anu.announce == 'false') {
             teks = `╭「 *GRUP OPEN* 」\n└ Group dibuka oleh admin`
             xcaa.sendMessage(metdata.id, buff, MessageType.image, {thumbnail : buff, caption : teks, quoted: ftroli})
          } else if (anu.announce == 'true') {
             teks = `╭「 *GRUP CLOSE* 」\n└ Group ditutup oleh admin`
             xcaa.sendMessage(metdata.id, buff, MessageType.image, {thumbnail : buff, caption : teks, quoted: ftroli})
          } else if (!anu.desc == '') {
             tag = anu.descOwner.split('@')[0] + '@s.whatsapp.net'
             teks = `╭「 *DESC CHANGE* 」\n├ Diubah oleh Admin @${anu.descOwner.split('@')[0]}\n└ Deskripsi Baru : ${anu.desc}`
             xcaa.sendMessage(metdata.id, buff, MessageType.image, {thumbnail : buff, caption : teks, contextInfo: {"mentionedJid": [tag]}, quoted: ftroli})
          } else if (anu.restrict == 'false') {
             teks = `╭「 *SETTING CHANGE* 」\n└ Edit Group info dibuka untuk member`
             xcaa.sendMessage(metdata.id, buff, MessageType.image, {thumbnail : buff, caption : teks, quoted: ftroli})
          } else if (anu.restrict == 'true') {
             teks = `╭「 *SETTING CHANGE* 」\n└ Edit Group info ditutup untuk member`
             xcaa.sendMessage(metdata.id, buff, MessageType.image, {thumbnail : buff, caption : teks, quoted: ftroli})
          }
     })
}


function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'sekarang telah dibaca jika diubah !')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}


function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()
