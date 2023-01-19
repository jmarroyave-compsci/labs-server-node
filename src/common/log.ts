import * as winston from "winston";

const myFormat = winston.format.printf(({ level, message, label, timestamp, req }) => {
    return `${timestamp.substr(0,19)} ${(req && "id" in req) ? req['id'] : ""}[${level.toUpperCase()}] ${message}`;
  });

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.splat(),
    winston.format.simple(),
    myFormat,
  ),
  transports: [
    new winston.transports.Console()
  ]
});

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'white',
    debug: 'green'
});

export default logger;
