'use strict'

const Express = require('express');
const Router = Express.Router();
const {timeZone} = require("../controller/timeZone.controller");
const TimeZOneValidate = require("../middleware/validation/timeZone.Validation")

Router.post("/timezone" , TimeZOneValidate.Validate("timeZone") , timeZone)



module.exports = Router;