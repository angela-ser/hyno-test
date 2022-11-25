/** 
 * Dont't edit or remove this plugin
 * ---------------------------------
 * 
 * Special thanks to adiwajshing/Baileys for Baileys (library)
 *
 * GITHUB 😺
 * 
 * 
 * HyNOBOT: https://github.com/hyno-ir/hyno-md
 * Creator: https://github.com/hyno-ir
 * Baileys: https://github.com/adiwajshing/Baileys
 * -----------------------------------------------
 * 
 * HyNO is the first and best Iranian WhatsApp bot
 * Don't forget to give a star on our github page for this reposity
 * ---------------------------------------------------------------
 * 
 * Creator WaLink: https://wa.me/989389383634
 * -------------------------------------------------
 * 
 * © HyNOBOT (GNU General Public License v3.0)
 *
 *╔╗─╔╗───╔═╗─╔╦═══╗
 *║║─║║───║║╚╗║║╔═╗║
 *║╚═╝╠╗─╔╣╔╗╚╝║║─║║
 *║╔═╗║║─║║║╚╗║║║─║║
 *║║─║║╚═╝║║─║║║╚═╝║
 *╚╝─╚╩═╗╔╩╝─╚═╩═══╝
 *────╔═╝║
 *────╚══╝
 **/

const config = require("../config");
const { parseJid } = require(".");
const { getStatus, getMessage } = require("./database/greetings");
async function Greetings(data, conn) {
  let metadata = await conn.groupMetadata(data.id);
  for (let user of data.participants) {
    let userpp;
    try {
      userpp = await conn.profilePictureUrl(user, "image");
    } catch {
      userpp = "https://i.imgur.com/HALR80J.jpeg";
    }

    switch (data.action) {
      case "add":
        {
          let status = await getStatus(data.id, "welcome");
          if (!status) return;
          let welcome_message = getMessage(data.id, "welcome");
          console.log(welcome_message)
          let msg = welcome_message.message
            .replace(/@user/gi, "@" + user.split("@")[0])
            .replace(/@gname/gi, metadata.subject)
            .replace(/@count/gi, metadata.participants.length);
          if (/{pp}/.test(msg)) {
            conn.sendMessage(data.id, {
              image: { url: userpp },
              caption: msg.replace(/{pp}/, ""),
              mentions: parseJid(msg),
            });
          } else {
            conn.sendMessage(data.id, { text: msg, mentions: parseJid(msg) });
          }
        }
        break;
      case "remove":
        {
          let status = await getStatus(data.id, "goodbye");
          if (!status) return;
          let GOODBYE_MSG = getMessage(data.id, "goodbye");
          let msg = GOODBYE_MSG.message
            .replace(/@user/gi, "@" + user.split("@")[0])
            .replace(/@gname/gi, metadata.subject)
            .replace(/@count/gi, metadata.participants.length);
          if (/{pp}/.test(msg)) {
            conn.sendMessage(data.id, {
              image: { url: userpp },
              caption: msg.replace(/{pp}/, ""),
              mentions: parseJid(msg),
            });
          } else {
            conn.sendMessage(data.id, { text: msg, mentions: parseJid(msg) });
          }
        }
        break;
    }
  }
}
module.exports = Greetings;
