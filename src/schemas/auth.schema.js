import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: 'El usuario es requerido'
    }),
    email: z.string({
        required_error: 'El correo electrónico es requerido'
    }).email({
        message: 'Correo electrónico inválido'
    }),
    contrasena: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, 
        { message: 'La contraseña debe tener al menos 6 caracteres' 
    }),
    nombreUsuario: z.string({
        required_error: 'El nombre del usuario es requerido'
    })
})

export const loginSchema = z.object({
    email: z.string({
        required_error: 'El correo electrónico es requerido'
    }).email({
        message: 'Correo electrónico inválido'
    }),
    contrasena: z.string({
        required_error: 'La contraseña es requerida'
    }).min(6, {
        message: 'La contraseña debe tener al menos 6 caracteres'
    })
})