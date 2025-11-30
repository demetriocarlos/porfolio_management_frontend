
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../Contexts/AuthContext";
import loginServices from "../services/loginServices";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
    return useContext(AuthContext)
}   



export const useLogin = () => {
    const {login:loginContext}= useAuth();// Obtener la función de login del contexto
    const navigate = useNavigate()
    const newMutation =   useMutation({
        mutationFn: loginServices.Login,
        onSuccess:(data) =>{
              

            const userData = {userName:data.userName, token:data.token, id:data.id, email:data.email};
            // Almacenar el token y los datos del usuario en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('loggedInUser', JSON.stringify(userData))

            loginContext(userData.userName,userData.token,userData.id, userData.email);// Guardar la información del usuario en el contexto

            navigate('/')

    },onError:(error) => {
        console.error('Error al inicio de sesion', error)
    }
    })
     return newMutation;  
}



export const useLoginGithub= () => {
    const {login:loginContext}= useAuth();// Obtener la función de login del contexto
    const navigate= useNavigate()
    
    const newMutation = useMutation({
        mutationFn: loginServices.loginGithub,
        onSuccess:(data) => {
             
            const userData ={userName:data.userName, token:data.token, id: data.id,email:data.email}
            localStorage.setItem('token', data.token)
            localStorage.setItem('loggedInUser', JSON.stringify(userData))
            
            loginContext(userData.userName,userData.token,userData.id, userData.email); // Guardar la información del usuario en el contexto

            navigate("/")
        },onError:(error) => {
            console.error('Errorl  en el inicio de sesion con github', error)
        }
    })

    return newMutation;
}



