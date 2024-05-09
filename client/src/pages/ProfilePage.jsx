import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, profile, changePassword } = useAuth();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resp = await profile();
        setUserData(resp);
      } catch (error) {
        setError('Error fetching profile information');
      }
    };
    fetchProfile();
  }, [profile]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!userData) {
      setError('Error: Profile data not available');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await changePassword(userData.id, newPassword);
      setNewPassword('');
      setConfirmPassword('');
      setSuccessMessage('Contraseña cambiada correctamente');
    } catch (error) {
      setError('Error en cambio de contraseña');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {userData && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Información del Usuario</h2>
          <p>Nombre: {userData.nombreUsuario}</p>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
      <form onSubmit={handlePasswordChange} className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Cambio de Contraseña</h2>
        <label className="block mb-2">Nueva Contraseña:</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md py-1 px-3 mb-2"
        />
        <label className="block mb-2">Confirma la Contraseña:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md py-1 px-3 mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Cambiar Contraseña
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
