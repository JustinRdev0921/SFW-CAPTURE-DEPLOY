import Area from "../models/area.model.js";
import Grupo from "../models/grupos.model.js";
import TipoDoc from "../models/tipoDoc.model.js";
import Procesamiento from "../models/procesamiento.model.js";
import logger from "../logger.js";


export const getAreas = async (req, res) => {
    try {
        const areas = await Area.find()
        res.json(areas)
    } catch (error) {
        logger.error('Error al traer areas', error)
        res.status(400).json({message: error.message});
    }
};

export const getGrupos = async (req, res) => {
    try {
        const grupos = await Grupo.find()
        res.json(grupos)
    } catch (error) {
        logger.error('Error al traer grupos', error)
        res.status(400).json({message: error.message});
    }
};

export const getTiposDoc = async (req, res) => {
    try {
        const tiposDoc = await TipoDoc.find();
        res.json(tiposDoc)
    } catch (error) {
        logger.error('Error al traer tipos', error)
        res.status(400).json({message: error.message});
    }
};

export const getProcesamientos = async (req, res) => {
    try {
        const procesamientos = await Procesamiento.find();
        res.json(procesamientos)
    } catch (error) {
        logger.error('Error al traer procesamientos', error)
        res.status(400).json({message: error.message});
    }
};

export const createProcesamiento = async (req, res) => {
    try {
        const { numeroExpediente, idProcesamiento, idSitio, idCiudad, idArea, idGrupo, idTipoDoc, fechaProcesamiento, nombreArchivo, username, cedula, apellidos, nombres, cargo, division, seleccion, ciudad, tipoContrato, estadoEmpleado} = req.body
        const newProceso = new Procesamiento(numeroExpediente, idProcesamiento, idSitio, idCiudad, idArea, idGrupo, idTipoDoc, fechaProcesamiento, nombreArchivo, username, cedula, apellidos, nombres, cargo, division, seleccion, ciudad, tipoContrato, estadoEmpleado)
        console.log(newProceso);
        const savedProceso = await newProceso.create()
        res.json({
            id: savedProceso,
            numeroExpediente: newProceso.numeroExpediente,
            idProcesamiento: newProceso.idProcesamiento,
            idSitio: newProceso.idSitio,
            idCiudad: newProceso.idCiudad,
            idArea: newProceso.idArea,
            idGrupo: newProceso.idGrupo,
            idTipoDoc: newProceso.idTipoDoc,
            fechaProcesamiento: newProceso.fechaProcesamiento,
            nombreArchivo: newProceso.nombreArchivo,
            username: newProceso.username,
            cedula: newProceso.cedula,
            apellidos: newProceso.apellidos,
            nombres: newProceso.nombres,
            cargo: newProceso.cargo,
            division: newProceso.division,
            seleccion: newProceso.seleccion,
            ciudad: newProceso.ciudad,
            tipoContrato: newProceso.tipoContrato,
            estadoEmpleado: newProceso.estadoEmpleado,
            message: "Proceso registrado correctamente"
        });
    } catch (error) {
        logger.error('Error al crear procesamiento', error)
        res.status(500).json({message: error.message});
    }

};