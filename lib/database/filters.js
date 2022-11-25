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

const FiltersDB = config.DATABASE.define("filters", {
  chat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pattern: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, 
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  regex: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
 
});

async function getFilter(jid = null, filter = null) {
  var Wher = { chat: jid };
  if (filter !== null) Wher.push({ pattern: filter });
  var Msg = await FiltersDB.findAll({
    where: Wher,
  });

  if (Msg.length < 1) {
    return false;
  } else {
    return Msg;
  }
}

async function setFilter(jid = null, filter = null, tex = null, regx = false) {
  var Msg = await FiltersDB.findAll({
    where: {
      chat: jid,
      pattern: filter,
    },
  });

  if (Msg.length < 1) {
    return await FiltersDB.create({
      chat: jid,
      pattern: filter,
      text: tex,
      regex: regx,
    });
  } else {
    return await Msg[0].update({
      chat: jid,
      pattern: filter,
      text: tex,
      regex: regx,
    });
  }
}

async function deleteFilter(jid = null, filter) {
  var Msg = await FiltersDB.findAll({
    where: {
      chat: jid,
      pattern: filter,
    },
  });
  if (Msg.length < 1) {
    return false;
  } else {
    return await Msg[0].destroy();
  }
}

module.exports = {
  FiltersDB: FiltersDB,
  getFilter: getFilter,
  setFilter: setFilter,
  deleteFilter: deleteFilter,
};
