const fs = require('fs')
const crypto = require('crypto')

const _registered = JSON.parse(fs.readFileSync('./database/user/registered.json'))

const addRegisteredUser = (userid, sender, time, serials) => {
	   const obj = { id: userid, name: sender, time: time, serial: serials }
	   _registered.push(obj)
		fs.writeFileSync('./database/user/registered.json', JSON.stringify(_registered))
}

const createSerial = (size) => {
      return crypto.randomBytes(size).toString('hex').slice(0, size)
}

const checkRegisteredUser = (sender) => {
      let status = false
      Object.keys(_registered).forEach((i) => {
      if (_registered[i].id === sender) {
         status = true
      }
   })
  return status
}

module.exports = {
	addRegisteredUser,
	createSerial,
	checkRegisteredUser,
}