import axios from "axios";
import { toast } from "react-toastify";
 const baseUrl = import.meta.env.VITE_API_URL;



const forgotPassword = async (email) =>{

    try{
        const response = await axios.post(`${baseUrl}/forgot-password`, {email} )
        return response.data;
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido', {
            autoClose:10000
        })
        console.error('Error al enviar el correo para restablecer contraseña', error)
    }
}




const resetPassword = async (credentials) =>{
    try{
        const response = await axios.put(`${baseUrl}/reset-password`, credentials);
        toast.success('Ya puedes iniciar sesion')
        response.data;
    }catch(error) {
        toast.error(error.response?.data?.error || 'Error desconocido', {
            autoClose:10000
        })
        console.error('Error al restablecer la contraseña', error)
    }
}
export default {
    forgotPassword,
    resetPassword
}