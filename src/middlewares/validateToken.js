import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import User from "../models/user.model.js";

export const authRequired = (req, res, next) => {
    const {token} = req.cookies
    if(!token) 
        return res.status(401).json({message: "No token, authorization denied"});

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        err ? res.status(403).json({message: "Invalid token"}) : req.user = user
    })

    next();
}

// Middleware para verificar si el usuario es administrador (admin)
export const adminRequired = async (req, res, next) => {
    // Verificar si el usuario está autenticado y es administrador
    try {
        const id = req.user.id; // Obtener el id del usuario autenticado
        const user = await User.findById(id); 
        console.log(user);// Obtener el usuario por su email
        if (!user || user.Admin !== 1 || user.Admin == null) {
            return res.status(403).json({ message: 'Acceso denegado. Se requieren permisos de administrador.' });
        }

        next(); // Si es administrador, permitir el acceso a la siguiente ruta
    } catch (error) {
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
};