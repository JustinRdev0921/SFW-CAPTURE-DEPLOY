// Importa la conexión desde db.js
import { TYPES } from 'tedious';
import connection from '../db.js';
import { Request } from 'tedious';
import  logger  from "../logger.js";


// Define la clase User que representa un usuario
class TipoDoc {
    constructor(id, nombreTipoDoc, idGrupo) {
        this.id = id;
        this.nombreTipoDoc = nombreTipoDoc;
        this.idGrupo = idGrupo;
    }

    static async find() {
        try {
            const request = new Request('GetTiposDoc', (err) => {
                if (err) {
                    logger.error('Error al ejecutar el procedimiento almacenado:', err);
                }
            });

            const result = await new Promise((resolve, reject) => {
                const tipos = [];
                request.on('row', (columns) => {
                    const tipo = {};
                    columns.forEach(column => {
                        tipo[column.metadata.colName] = column.value;
                    });
                    tipos.push(tipo);
                });

                request.on('requestCompleted', () => {
                    resolve(tipos);
                });

                connection.callProcedure(request);
            });

            return result;
        } catch (error) {
            logger.error('Error al buscar los tipos de documentos:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }
}

export default TipoDoc;