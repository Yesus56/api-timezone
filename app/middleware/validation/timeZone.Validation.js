const {check, checkSchema} = require("express-validator");

const {CONF} = require("../../../configs")

exports.Validate = (method) => {
    switch (method) {
        case "timeZone":{
            return [
                check('time')
                    .exists().withMessage("Debe enviar el parametro time")
                    .not().isEmpty().withMessage("El time no puede estar vacio")
                    .matches(/^(Z|[+-](?:2[0-3]|[01]?[0-9])(?::?(?:[0-5]?[0-9]))?)$/),
                check('hour')
                    .exists().withMessage("Debe enviar la hora que desea cambiar")
                    .not().isEmpty().withMessage("la hora no puede estar vacia")
            ]}

        default:{
            CONF.logs.error("[ERROR] La validacion esta en default")
            return [
                check("ErrorValidate")
                    .exists().withMessage("El validate esta en default")
            ]
        };
    }
}