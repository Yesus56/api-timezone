"use strict";

const Express = require("express");
const useragent = require("express-useragent");
const cors = require("cors");
const { VAR } = require("../configs");
const { API_RESP, FN } = require("./utils");
const packJson = require("../package.json")

// Cargar Archivos rutas
const TimeZoneRouter = require("./router/timeZone.Routes")


// Declaramos Express
const app = Express();

// Middlewares Express Request
app.use(cors());
app.use(Express.urlencoded({ extended: false }));
app.use(Express.json())
app.use(useragent.express());

// Validar SERVIDOR ACTIVO
app.get("/", function (req, res) {
  return res
    .status(200)
    .send("Bienvenido a  " + packJson.name);
});

// Seteamos rutas Rutas
app.use(TimeZoneRouter)



// Error (GENERAL NO IDENTIFICADO 500)
app.use(function (err, req, res, next) {
  let api = new API_RESP("SE", res, null);
  return api.send(411, VAR.API_TEXT_DEF, err, "E500", "[SERVER][APP]");
});

//Capture All 404 errors
app.use(function (req, res, next) {
  let api = new API_RESP("SE", res, null);
  return api.send(411, "The url not found", null, "E501", "[SERVER][APP]");
});

// Exportar module
module.exports = app;
