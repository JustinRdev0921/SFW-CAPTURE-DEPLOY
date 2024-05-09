import User from "../models/userManagement.model.js";
import bcrypt from "bcryptjs";
import path from "path";
import fs from "fs";
import logger from "../logger.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    logger.error("Error al obtener los usuarios: ", error);
    res.status(400).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      contrasena,
      nombreUsuario,
      idDepartamento,
      idArea,
      idCiudad,
      Admin,
    } = req.body;
    //encriptar la contraseña
    const hashPassword = await bcrypt.hash(contrasena, 10);
    const newUser = new User(
      username,
      email,
      hashPassword,
      nombreUsuario,
      idDepartamento,
      idArea,
      idCiudad,
      Admin
    );
    console.log(newUser);
    const savedUser = await newUser.create();
    res.json({
      id: savedUser,
      username: newUser.username,
      useremail: newUser.email,
      nombreUsuario: newUser.nombreUsuario,
      idDepartamento: newUser.idDepartamento,
      idDepartamento: idDepartamento,
      idArea: newUser.idArea,
      message: "Usuario registrado correctamente",
    });
  } catch (error) {
    logger.error("Error al registrar usuario: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    !user
      ? res.status(404).json({ message: "User not found" })
      : res.json(user);
  } catch (error) {
    logger.error("Error al obtener usuario: ", error);
    return res.status(404).json({ message: "User not found" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id); // Asegúrate de obtener el ID como un número entero
    const isDeleted = await User.deleteUser(userId);
    !isDeleted
      ? res.status(400).json({ message: "No se pudo eliminar el usuario" })
      : res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    logger.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    // Verificar si se está actualizando la contraseña
    if (userData.contrasena) {
      // Encriptar la nueva contraseña
      userData.contrasena = await bcrypt.hash(userData.contrasena, 10);
    }

    const isUpdated = await User.updateUser(userId, userData);
    if (isUpdated) {
      res.json({ message: "Usuario actualizado correctamente" });
    } else {
      logger.error("Error al actualizar usuario:", error);
      res.status(400).json({ message: "No se pudo actualizar el usuario" });
    }
  } catch (error) {
    logger.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const fileUpload = async (req, res) => {
  try {
    if (!req.files || !req.files.archivo) {
      return res.status(400).send("No se ha proporcionado ningún archivo.");
    }

    const archivo = req.files.archivo;
    const { idProcesamiento, numeroExpediente } = req.body; // Obtener información de idProcesamiento y numeroExpediente del cuerpo de la solicitud
    const extension = path.extname(archivo.name); // Obtener la extensión del archivo
    const nombreArchivo = `${idProcesamiento}-_-${numeroExpediente}${extension}`; // Construir el nombre del archivo con idProcesamiento y numeroExpediente
    const rutaGuardar = path.join("C:/Users/AdminTest/Documents/Files", nombreArchivo);
    console.log(rutaGuardar)
    //C:/Users/AdminTest/Documents/Files
    // falta permiso del iis para mover archivo a la carpeta files
    // otorgar permisos a la carpeta files de escritura
    archivo.mv(rutaGuardar, (err) => {
        console.log(err);
      if (err) {
        console.log(err);
      logger.error(err);
        return res.status(500).send("Error al guardar el ARCHIVO.");
      }
      res.send("Archivo cargado y guardado correctamente");
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Error interno del servidor.");
  }
};
