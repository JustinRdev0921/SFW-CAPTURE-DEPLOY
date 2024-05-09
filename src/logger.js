import winston from 'winston';
import { fileURLToPath } from 'url';
import path from 'path';

// Obtén la ruta del archivo actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define la ruta al directorio de logs
const logsDir = path.join(__dirname, '..', 'logs');

// Configura los transportes (destinos) de logs
const transports = [
    new winston.transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        )
    }),
    new winston.transports.File({
        filename: path.join(logsDir, 'combined.log'),
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        )
    })
];

// Crea el logger principal
const logger = winston.createLogger({
    transports: transports,
    exitOnError: false // No salgas del proceso si ocurre un error en el logger
});

// Si estamos en modo de desarrollo, también muestra los logs en la consola
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

export default logger;
