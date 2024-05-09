// Importa la conexión desde db.js
import { TYPES } from 'tedious';
import connection from '../db.js';
import { Request } from 'tedious';
import  logger  from "../logger.js";


// Define la clase User que representa un usuario
class User {
    constructor(username, email, contrasena, nombreUsuario, idDepartamento, idArea, idCiudad, Admin) {
        this.username = username;
        this.email = email;
        this.contrasena = contrasena;
        this.nombreUsuario = nombreUsuario;
        this.idDepartamento = idDepartamento;
        this.idArea = idArea;
        this.idCiudad = idCiudad;
        this.admin = Admin;
    }

    static async find() {
        try {
            const request = new Request('GetUsers', (err) => {
                if (err) {
                    logger.error('Error al ejecutar el procedimiento almacenado:', err);
                }
            });

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
                    resolve(users);
                });

                connection.callProcedure(request);
            });

            return result;
        } catch (error) {
            logger.error('Error al buscar usuarios:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }

    async create() {
        try {
            const request = new Request(`
                INSERT INTO Users (username, email, contrasena, nombreUsuario, idDepartamento, idArea, idCiudad, Admin)
                OUTPUT INSERTED.id
                VALUES (@username, @email, @contrasena, @nombreUsuario, @idDepartamento, @idArea, @idCiudad, @Admin)`, (err) => {
                if (err) {
                    logger.error('Error al ejecutar la consulta SQL:', err);
                }
            });

            request.addParameter('username', TYPES.NVarChar, this.username);
            request.addParameter('email', TYPES.NVarChar, this.email);
            request.addParameter('contrasena', TYPES.NVarChar, this.contrasena);
            request.addParameter('nombreUsuario', TYPES.NVarChar, this.nombreUsuario);
            request.addParameter('idDepartamento', TYPES.NVarChar, this.idDepartamento);
            request.addParameter('idArea', TYPES.NVarChar, this.idArea);
            request.addParameter('idCiudad', TYPES.Int, this.idCiudad);
            request.addParameter('Admin', TYPES.Int, this.admin);

            const result = await new Promise((resolve, reject) => {
                request.on('row', (columns) => {
                    resolve(columns[0].value); // Obtener el ID del usuario creado
                });

                connection.execSql(request);
            });

            console.log('Usuario creado con éxito');
            return result; // Devolver el ID del usuario creado
        } catch (error) {
            logger.error('Error al crear usuario:', error);
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

    static async deleteUser(id) {
        try {
            const request = new Request(`
                UPDATE Users 
                SET Activo = 0
                WHERE id = @IdUsuario`, (err) => {
                if (err) {
                    logger.error('Error al ejecutar la consulta SQL:', err);
                }
            });

            request.addParameter('IdUsuario', TYPES.Int, id);

            await new Promise((resolve, reject) => {
                request.on('requestCompleted', () => {
                    resolve(true);
                });

                connection.execSql(request);
            });

            console.log('Usuario eliminado con éxito');
            return true;
        } catch (error) {
            logger.error('Error al eliminar usuario:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }

    static async updateUser(id, userData) {
        try {
            // Convertir los valores a enteros solo si son válidos
            if (userData.Admin !== undefined) {
                userData.Admin = userData.Admin === 1 ? 1 : 0; // Asegurarse de que sea 1 o 0
            }
    
            if (userData.idCiudad !== undefined) {
                userData.idCiudad = parseInt(userData.idCiudad);
            }

            if (userData.Activo !== undefined) {
                userData.Activo = parseInt(userData.Activo);
            }
    
            const request = new Request(`
                UPDATE Users 
                SET ${Object.keys(userData).map(key => `${key} = @${key}`).join(', ')}
                WHERE id = @id`, (err) => {
                if (err) {
                    logger.error('Error al ejecutar la consulta SQL:', err);
                }
            });
    
            request.addParameter('id', TYPES.Int, id);
    
            // Agregar parámetros para cada columna especificada en userData
            Object.keys(userData).forEach(key => {
                if (key === 'Admin' || key === 'idCiudad' || key === 'Activo') {
                    request.addParameter(key, TYPES.Int, userData[key]);
                } else {
                    request.addParameter(key, TYPES.NVarChar, userData[key]);
                }
            });
    
            await new Promise((resolve, reject) => {
                request.on('requestCompleted', () => {
                    resolve(true);
                });
    
                connection.execSql(request);
            });
    
            console.log('Usuario actualizado con éxito');
            return true;
        } catch (error) {
            logger.error('Error al actualizar usuario:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }

}

export default User;