import { createLogger, format, transports } from 'winston';

require('winston-daily-rotate-file');

const { combine, timestamp, colorize, align, printf } = format;

// Format from console.logs
const logFormat = combine(
    colorize(),
    timestamp(),
    align(),
    printf(info => `${info.timestamp} ${info.level}: ${info.message.trim()}`)
);

const allTransports = [];

// Store logs after definded time into file 
allTransports.push(
    new transports.DailyRotateFile({
        json: true,
        dirname: './../log',
        filename: 'log_%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH-MM',
        zippedArchive: true,
        maxFiles: '365d',
        maxSize: '10M',
        level: 'info',
    })
);

// Set level of console.logs
allTransports.push(
    new transports.Console({
        level: 'debug',
    })
);

// Create logger
const logger = createLogger({
    format: logFormat,
    transports: allTransports,
});

export default logger;

/* // add syslog server transport
if (process.env.SYSLOG_SERVER) {
    var syslog = require('winston-syslog');
    var syslogTransport = new syslog.Syslog({
        host: process.env.SYSLOG_SERVER,
        port: process.env.SYSLOG_PORT || 514,
        localhost: os.hostname(),
        app_name: "sion"
    });

    winston.add(syslog.Syslog, syslogTransport);
}

if (process.env.GELF_SERVER) {
    var gelf = require('winston-log2gelf');
    var gelfTransport = new(winston.transports.Log2gelf)({
        level: process.env.LOG_LEVEL || 'debug',
        host: process.env.GELF_SERVER,
        port: process.env.GELF_PORT || 12201,
        protocol: process.env.GELF_PROTOCOL || 'tcp',
        handleExceptions: true
    });
    winston.add(winston.transports.Log2gelf, gelfTransport);

} */

// .remove(winston.transports.Console);
// winston.add(winston.transports.Console, consoleOptions);
