import { z } from "zod";

export const createUserSchema = z.object({
    username: z.string({required_error: 'Debe ingresar un nombre de usuario'}),
    email: z.string({required_error: 'Debe ingresar un email'}).email({message:'Debe ingresar un email válido'}),
    contrasena: z.string({required_error:'Debe ingresar una contraseña'}).min(6,{message:'Debe ingresar una contraseña con al menos 6 caracteres'}),
    nombreUsuario: z.string({required_error: 'Debe ingresar un nombre de usuario'})
    /*idArea: z.bigint({required_error:})
    idCiudad
    Admin*/
})