
'use-strict'

const { CONF, VAR } = require('../../configs');
const {name : PackName , version} = require("../../package.json")

/*
* Nota: Se creo que retorne siempre 200 para efectos de validaciones del lado del Middlewares,
* ya que no manejan la excepcion cuando se notifica el status code correcto. 
*/
module.exports = class ApiClass {

    constructor(module, res, jwt , privileges) {
        this.res = res; // --- Respuesta
        this.module = module; // --- No aplica
        this.version = version; // Version
        this.code = null; // Codigo interno Error
        this.response = null; // Respuesta o data del servicio  
        this.message = null; // Mensaje de respuesta
        this.jwt = jwt; // NO APLICA
        this.maintenance = false; // Modo mantenimiento
        this.status = null; // Estatus Code
        this.date = Date.now(); // Tiempo 
        this.privileges = privileges //privelegios
    }

    send(statusCode, message, data, code, typeError) {

        // Mensaje enviado
        this.message = message;

        // Codigo de seguimiento (CORE + MODULO + CODE ERROR O CODE SUCCESS)
        this.code = PackName + '-' + this.module + code;

        // Para mostrar en el campo de afuera mensaje uno de los errores
        // Ya que viene en el data todos los detalles de donde esta el problema
        if (String(code).substr(0, 1).toLowerCase() == 'v') {
            let key = Object.keys(data);
            this.message = data[key[0]].msg;
        }

        // Guardar el log si es un error de codigo
        if (typeError) {
            data = (data) ? data : ' Fue una consulta (N/A) ';
            CONF.logs.error(data);
            this.response = null;
        } else {
            this.response = data;
        }

        let response = this.res;
        delete this.res;
        delete this.module;

        // Si es un error logico, no tiene typeError (no es de codigo)
        // Imprimimos un warn log
        if (statusCode > 300 && typeError == null) {
            CONF.logs.warn(JSON.stringify(this));
        }

        // Cambio para Freddy
        // this.status = statusCode;

        // Retornamos
        return response.status(statusCode).send(this);
    }

};