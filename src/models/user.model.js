// Importa la conexión desde db.js
import { TYPES } from 'tedious';
import connection from '../db.js';
import { Request } from 'tedious';
import  logger  from "../logger.js";

// Define la clase User que representa un usuario
class User {
    constructor(username, email, contrasena, nombreUsuario) {
        this.username = username;
        this.email = email;
        this.contrasena = contrasena;
        this.nombreUsuario = nombreUsuario;
    }

    async save() {
        try {
            // Crea una nueva solicitud (Request) para ejecutar la consulta SQL
            const request = new Request(`
                INSERT INTO Users (username, email, contrasena, nombreUsuario)
                OUTPUT INSERTED.id
                VALUES (@username, @email, @contrasena, @nombreUsuario)`, (err) => {
                if (err) {
                    logger.error('Error al ejecutar la consulta SQL:', err);
                }
            });

            // Añade parámetros a la consulta SQL
            request.addParameter('username', TYPES.NVarChar, this.username);
            request.addParameter('email', TYPES.NVarChar, this.email);
            request.addParameter('contrasena', TYPES.NVarChar, this.contrasena);
            request.addParameter('nombreUsuario', TYPES.NVarChar, this.nombreUsuario);


            //Obtener ID de usuario creado:
            const result = await new Promise((resolve, reject) => {
                request.on('row', (columns) => {
                    resolve(columns[0].value); // Obtener el ID del usuario creado
                });

                // Ejecuta la solicitud en la conexión establecida
                connection.execSql(request);
            });
           

            //console.log('Usuario creado con éxito');
            return result; // Devolver el ID del usuario creado
        } catch (error) {
            //console.error('Error al crear usuario:', error);
            logger.error('Error al crear usuario:', error);

        }
    }

    static async findOne(email) {
        try {
            const request = new Request(`
                SELECT * FROM Users WHERE email = @email
            `, (err) => {
                if (err) {
                    logger.error('Error al ejecutar la consulta SQL:', err);
                }
            });

            request.addParameter('email', TYPES.NVarChar, email);

            const result = await new Promise((resolve, reject) => {
                const users = [];
                request.on('row', (columns) => {
                    const user = {};
                    columns.forEach(column => {
                        user[column.metadata.colName] = column.value;
                    });
                    users.push(user);
                });

                request.on('requestCompleted', () => {
                    resolve(users.length > 0 ? users[0] : null);
                });

                connection.execSql(request);
            });

            return result;
        } catch (error) {
            logger.error('Error al buscar usuario:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }

    static async findById(id) {
        try {
            const request = new Request(`
                SELECT * FROM Users WHERE id = @id
            `, (err) => {
                if (err) {
                    logger.error('Error al ejecutar la consulta SQL:', err);
                }
            });

            request.addParameter('id', TYPES.Int, id);

            const result = await new Promise((resolve, reject) => {
                const users = [];
                request.on('row', (columns) => {
                    const user = {};
                    columns.forEach(column => {
                        user[column.metadata.colName] = column.value;
                    });
                    users.push(user);
                });

                request.on('requestCompleted', () => {
                    resolve(users.length > 0 ? users[0] : null);
                });

                connection.execSql(request);
            });

            return result;
        } catch (error) {
            logger.error('Error al buscar usuario por id:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }

}

export default User;