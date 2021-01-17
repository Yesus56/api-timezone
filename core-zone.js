'use strict'

if (process.env.CC_SERVER !== "true") {
  require("dotenv").config({ path: "./.env" });
}

const app = require('./app');
const { CONF } = require('./configs');
const packJson = require("./package.json")


    app
      .listen( process.env.CC_TIMEZONE, () => {
        CONF.logs.info(
          "Conexión establecida con el servidor" + packJson.name + " Puerto: " +  process.env.CC_TIMEZONE
        );
      })
      .on("error", (err) => {
        CONF.logs.error("[ERROR] No se conectó con el puerto: " + err);
      });