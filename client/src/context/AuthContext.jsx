import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  profileRequest,
} from "../api/auth";
import { updateUserRequest } from "../api/usuarios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debería estar dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      //console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      //console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };
  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
    setIsAdmin(false);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const profile = async () => {
    try {
      const res = await profileRequest();
      return res.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const changePassword = async (id, newPassword) => {
    try {
      const res = await updateUserRequest(id, { contrasena: newPassword }); // Envía el nuevo valor de la contraseña
      console.log(res.data); // Puedes manejar la respuesta según tus necesidades
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };

  useEffect(() => {
    //VALIDAR SI ESTA AUTENTICADO CON TOKEN Y SI ES ADMIN
    setLoading(true);

    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);

        //console.log(res.data);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
     
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
        setIsAdmin(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        isAdmin,
        errors,
        profile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
