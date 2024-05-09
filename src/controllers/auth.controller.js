import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";
import logger from "../logger.js";
import connection from '../db.js';

export const register = async (req, res) => {
    const { email, username, contrasena, nombreUsuario } = req.body
    const usuarioRepetido = await User.findOne(email);
    if (usuarioRepetido) {
        return res.status(400).json(["El correo electrónico ya existe"])
    }

    try {
        //encriptar la contraseña
        const hashPassword = await bcrypt.hash(contrasena, 10)
        //Crea una instancia del modelo User con los datos del cuerpo de la solicitud
        const newUser = new User(username, email, hashPassword, nombreUsuario);

        //console.log(newUser);
        //Guardar el nuevo usuario en la BD
        const userID = await newUser.save();
        const token = await createAccessToken({ id: userID })

        //Guardar la cookie en el header
        res.cookie('token', token)
        // Envía la respuesta al cliente incluyendo el ID del usuario creado
        res.json({
            id: userID,
            username: newUser.username,
            useremail: newUser.email,
            nombreUsuario: newUser.nombreUsuario,
            message: "Usuario registrado correctamente"
        });


        //res.send("Usuario registrado correctamente");
    } catch (error) {
        //console.log("Error al registrar usuario: ", error);
        logger.error("Error al registrar usuario: ", error);
        res.status(500).json({ message: error.message });
    }
}

export const login = async (req, res) => {
    const { email, contrasena } = req.body
    try {
        const userFound = await User.findOne(email)
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
        if (userFound.Activo == null || userFound.Activo == 0) return res.status(400).json({ message: "Usuario Inactivo" });
        const isMatch = await bcrypt.compare(contrasena, userFound.contrasena)
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = await createAccessToken({ id: userFound.id })

        //Guardar la cookie en el header
        res.cookie('token', token)
        // Envía la respuesta al cliente incluyendo el ID del usuario creado
        res.json({
            id: userFound.id,
            username: userFound.username,
            useremail: userFound.email,
            Activo: userFound.Activo,
            Admin: userFound.Admin,
            nombreUsuario: userFound.nombreUsuario,
            message: "Inicio de sesión exitoso"
        });

    } catch (error) {
        logger.error("Error al registrar usuario: ", error);
        res.status(500).json({ message: error.message });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('token', '', { expires: new Date(0) })
        return res.sendStatus(200)
    } catch (error) {
        logger.error("Error en logout: ", error);
        res.status(500).json({ message: error.message });
    }

}

export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id)
        !userFound ? res.status(400).json({ message: "User not found" }) : res.json({ id: userFound.id, username: userFound.username, email: userFound.email, nombreUsuario: userFound.nombreUsuario })
    } catch (error) {
        logger.error("Error en profile: ", error);
        res.status(400).json({ message: "User not found" })
    }
}


export const verifyToken = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.send(false);

        jwt.verify(token, TOKEN_SECRET, async (error, user) => {
            if (error) return res.sendStatus(401);

            const userFound = await User.findById(user.id);
            if (!userFound) return res.sendStatus(401);

            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                Activo: userFound.Activo,
                Admin: userFound.Admin,
                nombreUsuario: userFound.nombreUsuario
            });
        });
    } catch (error) {
        logger.error("Error en verify token: ", error);
    }

};



/*export const verifyToken = async (req, res) => {
    try {
        // Verificar si la conexión está activa antes de continuar
        if (!connection) {
            return res.status(500).json({ message: "Error de conexión a la base de datos" });
        }

        // Escuchar el evento 'connect' para verificar si la conexión está activa
        connection.on('connect', () => {
            // La conexión está activa, continuar con la verificación del token
            const { token } = req.cookies;
            if (!token) return res.sendStatus(401); // Cambiado a enviar un estado 401 si no hay token

            // Verificar el token
            jwt.verify(token, TOKEN_SECRET, async (error, user) => {
                if (error) return res.sendStatus(401);

                // Verificar si la conexión está activa antes de continuar con la consulta
                if (!connection) {
                    return res.status(500).json({ message: "Error de conexión a la base de datos" });
                }

                // Buscar al usuario en la base de datos
                const userFound = await User.findById(user.id);
                if (!userFound) return res.sendStatus(401);

                // Enviar la respuesta con los datos del usuario
                return res.json({
                    id: userFound._id,
                    username: userFound.username,
                    email: userFound.email,
                    Activo: userFound.Activo,
                    Admin: userFound.Admin,
                    nombreUsuario: userFound.nombreUsuario
                });
            });
        });
    } catch (error) {
        logger.error("Error en verify token: ", error);
        res.status(500).json({ message: "Error interno del servidor" }); // Enviar un estado 500 en caso de error interno
    }
};*/
