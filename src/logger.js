const winston = require('winston');
require('winston-daily-rotate-file');

const config = require('./config');
const environment = require('./environment');

const logger = winston.createLogger({
  level: environment.isDevelopment ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),
});

if (config.LOGGING.rotation) {
  logger.add(new winston.transports.DailyRotateFile(config.LOGGING.rotation));
}

if ((environment.isDevelopment || config.LOGGING.forceEnableConsoleLogging) && !environment.isTest) {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple(),
    ),
  }));
  logger.debug('Development mode');
}

module.exports = logger;
