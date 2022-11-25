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


var cron = require("node-cron");
const { db } = require(".");
module.exports = {
  cron: async (time, func) => {
    let [hr, min] = time.split(":");
    let task = cron.schedule(
      `${min} ${hr} * * *`,
      () => {
        func();
      },
      {
        scheduled: false,
        timezone: "Asia/Tehran",
      }
    );
    return task.start();
  },
  saveSchedule: async (chat, time, func) => {
    let crondb = (db.data.cron = []);
    crondb.push({
      time,
      func:JSON.stringify(func),
      chat,
    });
    await db.write();
  },
  getSchedule: async (jid) => {
    if (db.data.cron !== []) {
      return db.data.cron.filter((a) => {
        a.chat == jid;
      });
    } else {
      return [];
    }
  },
  startSchedule: async (chat = "all") => {
    if (chat == "all") {
      for (let i of db.data.cron) {
        this.cron(i.time, i.func);
      }
    } else {
      let Db = db.data.cron.filter((sch) => {
        sch.chat == chat;
      });
      for (let i of Db) {
        this.cron(i.time, i.func);
      }
    }
  },
};
