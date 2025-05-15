const fs = require('fs');
const axios = require('axios');
const path = require('path');
 
module.exports = {
  config: {
    name: "info",
    version: 2.0,
    author: "OtinXSandip",
    longDescription: "info about bot and owner",
    category: "ai",
    guide: {
      en: "{p}{n}",
    },
  },
 
  onStart: async function ({ api, event, args, message, usersData }) {
    const videoURL = "https://i.ibb.co/Gfsjms91/image.gif"; 
    const cacheFolder = path.resolve(__dirname, 'cache');
    const videoPath = path.join(cacheFolder, 'lund.mp4');
 
 
    if (!fs.existsSync(cacheFolder)) {
      fs.mkdirSync(cacheFolder);
    }
 
 
    const downloadVideo = async (url, outputPath) => {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
      });
 
      return new Promise((resolve, reject) => {
        const stream = fs.createWriteStream(outputPath);
        response.data.pipe(stream);
 
        stream.on('finish', () => resolve(outputPath));
        stream.on('error', reject);
      });
    };
 
 
    await downloadVideo(videoURL, videoPath);
 
    const id = event.senderID;
    const userData = await usersData.get(id);
    const name = userData.name;
 
    const ment = [{ id: id, tag: name }];
    const a = "Suzume🎀✨";
    const b = " - ";
    const c = "NewarniDimpy";
    const e = "Female";
    const d = "m.me/61557538632528";
    const f = "luvley.dimpyy";
    const g = "Married With Newarr 😝💗";
 
 
    message.reply({
      body: `${name}, here is the information 🌝
🌸 Bot's Name: ${a}
🌸 Bot's prefix: ${b}  
🌸 Owner: ${c}
🌸 Gender: ${e}
🌸 Messenger: ${d}
🌸 Insta: ${f}
🌸 Relationship: ${g}`,
      mentions: ment,
      attachment: fs.createReadStream(videoPath),
    });
  }
};
 
