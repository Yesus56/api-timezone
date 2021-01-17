'use strict'

const { createLogger, transports, format } = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');


// Conexion a la Base de datos
module.exports = {

    /* Log Errores */
    logs: createLogger({
        levels: {
            "error": 0,
            "api_error": 1,
            "warn": 2,
            "info": 3,
            "api_info": 4,

        },
        transports: [
            new transports.Console({}),
            new DailyRotateFile({
                auditFile: 'logs/error/audit.json',
                level: 'error',
                datePattern: 'YYYYMMDD',
                filename: 'logs/error/error_%DATE%.log',
                handleExceptions: false,
                json: false,
                maxSize: '5m',
                colorize: true
            }),
            new DailyRotateFile({
                level: 'api_error',
                auditFile: 'logs/api_error/audit.json',
                datePattern: 'YYYYMMDD',
                filename: 'logs/api_error/%DATE%.log',
                maxSize: '5m',
                handleExceptions: false,
                json: false,
                maxSize: '5m',
                colorize: true
            }),
            new DailyRotateFile({
                level: 'warn',
                auditFile: 'logs/warn/audit.json',
                datePattern: 'YYYYMMDD',
                filename: 'logs/warn/warn_%DATE%.log',
                handleExceptions: false,
                json: false,
                maxSize: '5m',
                colorize: true
            }),
            new DailyRotateFile({
                level: 'info',
                auditFile: 'logs/info/audit.json',
                datePattern: 'YYYYMMDD',
                filename: 'logs/info/inf_%DATE%.log',
                maxSize: '5m',
                colorize: true
            }),

        ],
        format: format.combine(
            format.colorize({
                colors: {
                    info: 'cyan',
                    error: 'red',
                    api_info: 'green',
                    api_error: 'red',
                    warm: 'yellow'
                }, all: true
            }),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),

            format.simple(),
            format.printf(msg => {
                let message = `${msg.timestamp} ${msg.level} -> ${msg.message}`;
                if (msg.stack) {
                    message += '\n\n Trace -> ' + msg.stack + '\n';
                }
                return message;
            })
        ),
        exceptionHandlers: [
            new DailyRotateFile({
                auditFile: 'logs/excepcions/audit.json',
                level: 'error',
                filename: 'logs/excepcions/ex_%DATE%.log',
                datePattern: 'YYYYMMDD',
                handleExceptions: true,
                json: true,
                maxSize: '5m',
            }),
        ]
    }),
};
