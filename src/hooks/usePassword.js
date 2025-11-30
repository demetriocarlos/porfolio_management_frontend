 import { useMutation } from "@tanstack/react-query";
import passwordServices from "../services/passwordServices";
import { useNavigate } from "react-router-dom";

 
export const useForgotPassword = (setLoading) =>  {
     const navigate = useNavigate()
   const newMutation =useMutation({
        mutationFn:passwordServices.forgotPassword,
        onSuccess: () => {

            navigate('/reset-password')
        },
        onSettled: () => {
            setLoading(false); // se ejecuta siempre, éxito o error
        }
        ,onError: (error) => {
            console.error('Error al enviar el correo', error)
        }
    })  
    return newMutation;
    
}


export const useResetPassword = (setLoading) => {
    const navigate = useNavigate()
    const newMutation = useMutation({
        mutationFn: passwordServices.resetPassword,
        onSuccess:() => {
            navigate('/login')
        },
        onSettled: () => {
            setLoading(false); // se ejecuta siempre, éxito o error
        },
        onError:(error) =>{
            console.error('Error al restablecer la contraseña', error)
        }
    })

    return newMutation;
}




