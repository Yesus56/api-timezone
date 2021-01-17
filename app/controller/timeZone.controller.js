const { VAR } = require("../../configs")
const {API_RESP} = require("../utils");
const timeZoneServices =  require("../services/timeZone.Services");
const {matchedData ,validationResult}= require("express-validator");

module.exports = {
    timeZone : async (req, res) => {
      const api = new API_RESP("OP", res );
      let checkErrors = validationResult(req);
      if (!checkErrors.isEmpty())
      return api.send(
        400,
        VAR.API_TEXT_VAL_DEF,
        checkErrors.mapped("param"),
        "vE001",
        null
      );
     let body = matchedData(req, {locations : ["body"]});
     try {
         let data = await timeZoneServices.timeZoneService(body.hour, body.time)
        
         api.send("200", "hora convertida" , data, "S001", null);
     } catch (error) {
        api.send("410", "VAR.API_TEXT_DEF" , error, "E001", "[CATH][CODE]");
     }
    }
}