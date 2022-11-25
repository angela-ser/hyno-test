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


exports.getChatjids = function (){
    const store = require('../database/store.json')
    let jid = []
    store.chats.forEach(({id})=> {
      jid.push(id)
  })
  return jid}

exports.getmsg=function(jid) {
    const store = require('../database/store.json')
    let messagea = {};
    let users = [];
    function user(){
        return users
    }
    if (jid.endsWith("@g.us")) {
      context = {
        users: messagea,
      };
      store.messages[jid].forEach((str) => {
        let msg = store.messages[jid].filter(
          ({ key }) => !users.includes(key.participant)
        );
        for (let { key, message } of msg) {
          if (!users.includes(key.participant)) {
            users.push(key.participant);
          }
        }
        store.messages[jid].forEach((str) => {
          let msg, name, mseg;
          for (let i of users) {
            mseg = store.messages[jid].filter(({ key }) => key.participant === i);
            msg = store.messages[jid]
              .filter(({ key }) => key.participant === i)
              .map((b) => JSON.stringify(b));
            name = mseg[0].pushName;
            messagea[i] = {
              name,
              messages: msg,
              total_msg: msg.length,
              text: mseg.filter(
                ({ message }) =>
                  message.hasOwnProperty("conversation") ||
                  message.hasOwnProperty("extendedTextMessage")
              ).length,
              sticker: mseg.filter(({ message }) =>
                message.hasOwnProperty("stickerMessage")
              ).length,
              image: mseg.filter(({ message }) =>
                message.hasOwnProperty("imageMessage")
              ).length,
              video: mseg.filter(({ message }) =>
                message.hasOwnProperty("videoMessage")
              ).length,
              audio: mseg.filter(({ message }) =>
                message.hasOwnProperty("audioMessage")
              ).length,
              reaction: mseg.filter(({ message }) =>
                message.hasOwnProperty("reactionMessage")
              ).length,
            };
          }
        });
        //console.log(msg)
      });
    }
    return context;
  }
