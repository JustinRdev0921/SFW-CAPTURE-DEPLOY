import { useForm } from "react-hook-form";
import { useUsers } from "../context/UsersContext";
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from "react";
import { ciudadesOptions, areasOptionsS, adminOptions, listNames, activoOptions, departamentoOptionsS } from "../api/options";

function UserFormPage() {

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const { createUsuario, getUser, updateUser } = useUsers();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadUser() {
      if (params.id) {
        const user = await getUser(params.id)
        console.log(user);
        setValue('username', user.username)
        setValue('email', user.email)
        setValue('nombreUsuario', user.nombreUsuario)
        setValue('contrasena', user.contrasena)
        setValue('idDepartamento', user.idDepartamento)
        setValue('idArea', user.idArea)
        setValue('idCiudad', parseInt(user.idCiudad))
        setValue('Activo', parseInt(user.Activo))
        setValue('Admin', parseInt(user.Admin))
      }
    }
    loadUser();
  }, [])


  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      console.log('data para actualziar:', data);
      updateUser(params.id, data)
    } else {
      createUsuario(data);
    }
    navigate('/cargaDocs')
  })

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-300 max-w-md w-full p-5 rounded-md">
        <h1 className="text-2xl font-bold ">Crear/Editar Usuario</h1>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <label htmlFor="sitio" className="block">Nombre de usuario</label>
            <input
              type="text"
              placeholder="Nombre de usuario"
              {...register('username', { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              autoFocus />
            {
              errors.username && (<p className="text-red-500">El correo electrónico es requerido</p>)
            }
          </div>
          <div className="col-span-1">
            <label htmlFor="sitio" className="block">Correo electrónico</label>
            <input
              type="email"
              placeholder="Correo electrónico"
              {...register('email', { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              autoFocus />
            {
              errors.email && (<p className="text-red-500">El correo electrónico es requerido</p>)
            }
          </div>
          <div className="col-span-1">
            <label htmlFor="sitio" className="block">Nombre Completo</label>
            <input
              type="text"
              placeholder="Nombre Completo"
              {...register('nombreUsuario', { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              autoFocus />
            {
              errors.nombreCompleto && (<p className="text-red-500">El nombre completo es requerido</p>)
            }
          </div>
          <div className="col-span-1">
            <label htmlFor="sitio" className="block">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              {...register('contrasena', { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              autoFocus />
            {
              errors.contrasena && (<p className="text-red-500">La contraseña es requerida</p>)
            }
          </div>
          <div className="col-span-1">
            <label htmlFor="sitio" className="block">Departamento</label>
            <select {...register('idDepartamento', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
              <option value="">Selecciona {listNames.departamento}</option>
              {departamentoOptionsS.map(departamento => (
                <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
              ))}
            </select>
            {
              errors.idDepartamento && (<p className="text-red-500">El departamento es requerido</p>)
            }
          </div>
          <div className="col-span-1">
            <label htmlFor="sitio" className="block">Area</label>
            <select {...register('idArea', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
              <option value="">Selecciona {listNames.area}</option>
              {areasOptionsS.map(area => (
                <option key={area.id} value={area.id}>{area.nombre}</option>
              ))}
            </select>
            {
              errors.idArea && (<p className="text-red-500">El área es requerido</p>)
            }
          </div>
          <div className="col-span-1">
            <label htmlFor="sitio" className="block">Cuidad</label>
            <select {...register('idCiudad', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
              <option value="">Selecciona {listNames.ciudad}</option>
              {ciudadesOptions.map(ciudad => (
                <option key={ciudad.id} value={ciudad.id}>{ciudad.nombre}</option>
              ))}
            </select>
            {
              errors.idCiudad && (<p className="text-red-500">La ciudad es requerida</p>)
            }
          </div>
          <div className="col-span-1">
            <label htmlFor="sitio" className="block">Estado Activo</label>
            <select {...register('Activo', { required: true })} defaultValue="1" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
              <option value="">Selecciona Estado</option>
              {activoOptions.map(opcion => (
                <option key={opcion.id} value={opcion.id}>{opcion.nombre}</option>
              ))}
            </select>
            {
              errors.Activo && (<p className="text-red-500">Indicar si el usuario está activo o no es requerido</p>)
            }
          </div>
          <div className="col-span-1">
            <label htmlFor="sitio" className="block">¿Es administrador?</label>
            <select {...register('Admin', { required: true })} className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2">
              <option value="">Selecciona {listNames.admin}</option>
              {adminOptions.map(admin => (
                <option key={admin.id} value={admin.id}>{admin.nombre}</option>
              ))}
            </select>
            {
              errors.Admin && (<p className="text-red-500">Indicar si es admin o no es requerido</p>)
            }
          </div>
          <div className="col-span-2">
          <button className=" bg-zinc-700 text-white py-2 px-2 rounded-md my-2">Guardar</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default UserFormPage