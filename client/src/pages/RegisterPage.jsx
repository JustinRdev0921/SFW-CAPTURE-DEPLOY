import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom'


function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  //Contexto
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate()

  //validar que existe autenticacion de usuario: no se pq en el registro
  useEffect(() => {
    if (isAuthenticated) navigate('/cargaDocs')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values)
  });

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-300 max-w-md w-full p-10 rounded-md'>
        {
          registerErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
              {error}
            </div>
          ))
        }
        <h1 className="text-2xl font-bold">Registro de Usuario</h1>
        <form onSubmit={onSubmit}>
          <input type="text" {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre de Usuario"
          />
          {
            errors.username && (<p className="text-red-500">El nombre de usuario es requerido</p>)
          }
          <input type="email" {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo electrónico"
          />
          {
            errors.email && (<p className="text-red-500">El correo electrónico es requerido</p>)
          }
          <input type="text" {...register("nombreUsuario", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre Completo"
          />
          {
            errors.nombreUsuario && (<p className="text-red-500">El nombre completo es requerido</p>)
          }
          <input type="password" {...register("contrasena", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {
            errors.contrasena && (<p className="text-red-500">La contrasena requerida</p>)
          }

          <button type="submit" className=" bg-zinc-700 text-white py-2 px-3 rounded-md my-2">Registrarse</button>
        </form>
        <p className='flex  justify-between'>
          ¿Ya tienes cuenta? <Link className='text-sky-500' to="/login">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage