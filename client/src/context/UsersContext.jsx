import { createContext, useState, useContext } from "react";
import { createUserRequest, getUsersRequest, deleteUserRequest, getUserRequest, updateUserRequest } from "../api/usuarios";

const UserContext = createContext();

export const useUsers = () => {
    const context = useContext(UserContext)

    if (!context) {
        throw new Error("useUsers debería estar con un UserProvider")
    }
    return context;
}

export function UserProvider({ children }) {
    const [users, setUsers] = useState([]);
    const [errors, setErrors] = useState([]);

    const getUsers = async () => {
        try {
            const res = await getUsersRequest()
            setUsers(res.data)
            //console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const createUsuario = async (user) => {
        try {
            const res = await createUserRequest(user)
            console.log(res);
        } catch (error) {
            console.log(error.response);
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await deleteUserRequest(id);
            getUsers();
            //console.log(res);
        } catch (error) {
            console.log(error.response);
        }

    }

    const getUser = async(id) =>{
        try {
            const res = await getUserRequest(id);
            return res.data
        } catch (error) {
            console.log(error);
        }
    }

    const updateUser = async(id, user) =>{
        try {
            await updateUserRequest(id, user)
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <UserContext.Provider value={{
            users,
            createUsuario,
            getUsers,
            errors,
            deleteUser,
            getUser,
            updateUser
        }}>
            {children}
        </UserContext.Provider>
    )
}