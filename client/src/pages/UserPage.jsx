import { useEffect } from "react";
import { useUsers } from "../context/UsersContext"
import { useNavigate, Link } from 'react-router-dom'


function UserPage() {
  const {getUsers, users, deleteUser} = useUsers();
  const navigate = useNavigate();

  useEffect(()=>{
    getUsers();
  }, [])

  if(users.length === 0) return (<h1>No existen Usuarios</h1>)

  return (
    <div className="bg-white p-4">
      <h1 className="text-2xl mb-4">Usuarios</h1>
      <table className="w-full border border-collapse">
        <thead className="bg-black text-white">
          <tr>
            <th className="p-2 text-center">Username</th>
            <th className="p-2 text-center">Email</th>
            <th className="p-2 text-center">Nombre de Usuario</th>
            <th className="p-2 text-center">ID de Departamento</th>
            <th className="p-2 text-center">ID de Área</th>
            <th className="p-2 text-center">ID de Ciudad</th>
            <th className="p-2 text-center">Activo</th>
            <th className="p-2 text-center">Admin</th>
            <th className="p-2 text-center">Editar</th>
            <th className="p-2 text-center">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="p-2 text-center">{user.username}</td>
              <td className="p-2 text-center">{user.email}</td>
              <td className="p-2 text-center">{user.nombreUsuario}</td>
              <td className="p-2 text-center">{user.idDepartamento}</td>
              <td className="p-2 text-center">{user.idArea}</td>
              <td className="p-2 text-center">{user.idCiudad}</td>
              <td className="p-2 text-center">{user.Activo}</td>
              <td className="p-2 text-center">{user.Admin}</td>
              <td className="p-2 text-center">
                <Link to={`/user/${user.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  Editar
              </Link>
              </td>
              <td className="p-2 text-center">
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={()=>{
                  deleteUser(user.id)
                  navigate('/users')
                }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage