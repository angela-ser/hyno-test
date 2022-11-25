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


const config = require("../../config");
const { DataTypes } = require("sequelize");

const GreetingsDB = config.DATABASE.define("Greetings", {
  chat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: { type: DataTypes.BOOLEAN, allowNull: false },
});

async function getMessage(jid = null,type = null) {
  var Msg = await GreetingsDB.findAll({
    where: {
      chat: jid,
      type: type,
    },
  });

  if (Msg.length < 1) {
    return false;
  } else {
    return Msg[0].dataValues;
  }
}

async function setMessage(jid = null, type = null, text = null) {
  var Msg = await GreetingsDB.findAll({
    where: {
      chat: jid,
      type: type,
    },
  });

  if (Msg.length < 1) {
    return await GreetingsDB.create({
      chat: jid,
      message: text,
      type,
      status: true,
    });
  } else {
    return await Msg[0].update({ chat: jid, message: text });
  }
}

async function toggleStatus(jid=null,type=null) {
  var Msg = await GreetingsDB.findAll({
    where: {
      chat: jid,
      type: type,
    },
  });

  if (Msg.length < 1) return false;
  if (Msg[0].dataValues.status) {
    return await Msg[0].update({ chat: jid, status: false });
  } else {
    return await Msg[0].update({ chat: jid, status: true });
  }
}

async function delMessage(jid = null,type=null) {
  var Msg = await GreetingsDB.findAll({
    where: {
      chat: jid,
      type: type,
    },
  });

  return await Msg[0].destroy();
}



async function getStatus(jid = null,type=null) {
  return new Promise(async (resolve, reject) => {
    try {
      var Msg = await GreetingsDB.findAll({
        where: {
          chat: jid,
          type:type
        },
      });

      if (Msg.length < 1) {
        resolve(false);
      } else {
        resolve(Msg[0].dataValues.status);
      }
    } catch {
      resolve(false);
    }
  });
}

module.exports = {
  GreetingsDB,
  setMessage,
  getMessage,
  delMessage,
  toggleStatus,
  getStatus,
};
