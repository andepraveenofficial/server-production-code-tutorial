/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLogger, format, transports } from 'winston';
import morgan from 'morgan';
const { combine, timestamp, json, colorize } = format;

// Custom format for console logging with colors
const consoleLogFormat = format.combine(
  // I want see console.log() like this format
  format.colorize(),
  format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level} : ${message}`;
  }),
);

// Create a Winston logger
const logger = createLogger({
  level: 'info',
  format: combine(colorize(), timestamp(), json()),
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({ filename: 'app.log' }),
  ],
});
/* -----> morgan Format <----- */
const morganFormat = ':method:url :status :response-time ms';

const loggerMorgan: any = morgan(morganFormat, {
  stream: {
    write: (message: any) => {
      const logObject = {
        method: message.split(' ')[0],
        url: message.split(' ')[1],
        status: message.split(' ')[2],
        responseTime: message.split(' ')[3],
      };
      logger.info(JSON.stringify(logObject));
    },
  },
});

export default loggerMorgan;
