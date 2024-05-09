// Importa la conexión desde db.js
import { TYPES } from 'tedious';
import connection from '../db.js';
import { Request } from 'tedious';
import  logger  from "../logger.js";

// Define la clase User que representa un usuario
class Grupos {
    constructor(id, nombreGrupo, idArea) {
        this.id = id;
        this.nombreGrupo = nombreGrupo;
        this.idArea = idArea;
    }

    static async find() {
        try {
            const request = new Request('GetGrupos', (err) => {
                if (err) {
                    logger.error('Error al ejecutar el procedimiento almacenado:', err);
                }
            });

            const result = await new Promise((resolve, reject) => {
                const grupos = [];
                request.on('row', (columns) => {
                    const grupo = {};
                    columns.forEach(column => {
                        grupo[column.metadata.colName] = column.value;
                    });
                    grupos.push(grupo);
                });

                request.on('requestCompleted', () => {
                    resolve(grupos);
                });

                connection.callProcedure(request);
            });

            return result;
        } catch (error) {
            logger.error('Error al buscar grupos:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }
}

export default Grupos;