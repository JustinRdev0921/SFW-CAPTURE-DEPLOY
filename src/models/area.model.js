// Importa la conexión desde db.js
import { TYPES } from 'tedious';
import connection from '../db.js';
import { Request } from 'tedious';
import  logger  from "../logger.js";


class Areas {
    constructor(id, nombreArea) {
        this.id = id;
        this.nombreArea = nombreArea;
    }

    static async find() {
        try {
            const request = new Request('GetAreas', (err) => {
                if (err) {
                    logger.error('Error al ejecutar el procedimiento almacenado:', err);
                }
            });

            const result = await new Promise((resolve, reject) => {
                const areas = [];
                request.on('row', (columns) => {
                    const area = {};
                    columns.forEach(column => {
                        area[column.metadata.colName] = column.value;
                    });
                    areas.push(area);
                });

                request.on('requestCompleted', () => {
                    resolve(areas);
                });

                connection.callProcedure(request);
            });

            return result;
        } catch (error) {
            logger.error('Error al buscar areas:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }

}

export default Areas;