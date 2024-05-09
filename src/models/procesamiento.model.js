import { TYPES } from 'tedious';
import connection from '../db.js';
import { Request } from 'tedious';


class Procesamiento {
    constructor(numeroExpediente, idProcesamiento, idSitio, idCiudad, idArea, idGrupo, idTipoDoc, fechaProcesamiento, nombreArchivo, username, cedula,
        apellidos,
        nombres,
        cargo,
        division,
        seleccion,
        ciudad,
        tipoContrato,
        estadoEmpleado) {
        this.numeroExpediente = numeroExpediente;
        this.idProcesamiento = idProcesamiento;
        this.idSitio = idSitio;
        this.idCiudad = idCiudad;
        this.idArea = idArea;
        this.idGrupo = idGrupo;
        this.idTipoDoc = idTipoDoc;
        this.fechaProcesamiento = fechaProcesamiento;
        this.nombreArchivo = nombreArchivo;
        this.username = username;
        this.cedula = cedula;
        this.apellidos = apellidos;
        this.nombres = nombres;
        this.cargo = cargo;
        this.division = division;
        this.seleccion = seleccion;
        this.ciudad = ciudad;
        this.tipoContrato = tipoContrato;
        this.estadoEmpleado = estadoEmpleado;
    }

    static async find() {
        try {
            const request = new Request('GetProcesamiento', (err) => {
                if (err) {
                    console.error('Error al ejecutar el procedimiento almacenado:', err);
                }
            });

            const result = await new Promise((resolve, reject) => {
                const procesamientos = [];
                request.on('row', (columns) => {
                    const procesamiento = {};
                    columns.forEach(column => {
                        procesamiento[column.metadata.colName] = column.value;
                    });
                    procesamientos.push(procesamiento);
                });

                request.on('requestCompleted', () => {
                    resolve(procesamientos);
                });

                connection.callProcedure(request);
            });

            return result;
        } catch (error) {
            console.error('Error al buscar Procesamientos:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }

    async create() {
        try {
            const request = new Request(`
                INSERT INTO Procesamiento (numeroExpediente, idProcesamiento, idSitio, idCiudad, idArea, idGrupo, idTipoDoc, fechaProcesamiento, nombreArchivo, username, cedula, apellidos, nombres, cargo, division, seleccion, ciudad, tipoContrato, estadoEmpleado)
                OUTPUT INSERTED.id
                VALUES (@numeroExpediente, @idProcesamiento, @idSitio, @idCiudad, @idArea, @idGrupo, @idTipoDoc, @fechaProcesamiento, @nombreArchivo, @username, @cedula, @apellidos, @nombres, @cargo, @division, @seleccion, @ciudad, @tipoContrato, @estadoEmpleado)`, (err) => {
                if (err) {
                    console.error('Error al ejecutar la consulta SQL:', err);
                }
            });

            request.addParameter('numeroExpediente', TYPES.Int, this.numeroExpediente);
            request.addParameter('idProcesamiento', TYPES.NVarChar, this.idProcesamiento);
            request.addParameter('idSitio', TYPES.NVarChar, this.idSitio);
            request.addParameter('idCiudad', TYPES.NVarChar, this.idCiudad);
            request.addParameter('idArea', TYPES.NVarChar, this.idArea);
            request.addParameter('idGrupo', TYPES.NVarChar, this.idGrupo);
            request.addParameter('idTipoDoc', TYPES.NVarChar, this.idTipoDoc);
            request.addParameter('fechaProcesamiento', TYPES.Date, this.fechaProcesamiento);
            request.addParameter('nombreArchivo', TYPES.NVarChar, this.nombreArchivo);
            request.addParameter('username', TYPES.NVarChar, this.username);
            request.addParameter('cedula', TYPES.NVarChar, this.cedula);
            request.addParameter('apellidos', TYPES.NVarChar, this.apellidos);
            request.addParameter('nombres', TYPES.NVarChar, this.nombres);
            request.addParameter('cargo', TYPES.NVarChar, this.cargo);
            request.addParameter('division', TYPES.NVarChar, this.division);
            request.addParameter('seleccion', TYPES.NVarChar, this.seleccion);
            request.addParameter('ciudad', TYPES.NVarChar, this.ciudad);
            request.addParameter('tipoContrato', TYPES.NVarChar, this.tipoContrato);
            request.addParameter('estadoEmpleado', TYPES.NVarChar, this.estadoEmpleado);


            const result = await new Promise((resolve, reject) => {
                request.on('row', (columns) => {
                    resolve(columns[0].value); // Obtener el ID del procesamiento
                });

                connection.execSql(request);
            });

            console.log('Procesamiento creado con éxito');
            return result; // Devolver el ID del procesamiento creado
        } catch (error) {
            console.error('Error al crear usuario:', error);
            throw error; // Lanzar el error para manejarlo en el controlador
        }
    }
}

export default Procesamiento;