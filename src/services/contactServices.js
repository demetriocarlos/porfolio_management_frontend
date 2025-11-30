
import api from "./api"

const createContactEmail = async (mensage) =>{
    try{
        const response =  await api.post("/contact", mensage)
        return response.data;
    }catch (error){
        console.error("Error al hacer contact ", error)
    }
}


export default {
    createContactEmail
}