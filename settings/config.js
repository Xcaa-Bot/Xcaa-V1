const fs = require("fs");
const chalk = require("chalk");

// self or public
global.self = false; 

// setting
global.ownerName = "FxSx";
global.ownerNumbers = "6283818221226";
global.botName = "Mosca-Bot";
global.thumbnail = fs.readFileSync("./settings/fotobot.jpg");
global.lolkey = "MOSCA";
global.sessionName = "session.json";

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update'${__filename}'`));
  delete require.cache[file];
  require(file);
});
