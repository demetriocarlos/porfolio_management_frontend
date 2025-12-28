
import  axios  from "axios";
import { toast } from "react-toastify";
import api from "./api";

const baseUrl = import.meta.env.VITE_API_URL;



const createUser = async (credentials) => {
    try{
        const response = await axios.post(`${baseUrl}/signup`, credentials);
        toast.success("cuenta creada exitosamente!");
        return response.data;
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido', {
            autoClose: 10000
        });
        console.error('Error al crear un usuario', error);
    }
}


const getProfile = async ()  => {
    try{
        const response = await api.get('/profile')
        return response.data;
    }catch(error){
        console.error('Error al cargar los datos del perfil', error)
    }
}

const getProfileId = async (id) => {
    try{
        const response = await api.get(`profile/${id}`)
        return response.data;
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error("Error al cargar el usuario por id", error)
    }
}

const getUserSearch = async (query) => {
    try{
        const response = await api.get(`/search?query=${query}`);
        return response.data;
    }catch(error){
        console.error("Error al realizar la busqueda de los usuarios", error)
    }
}

 
const getUserStats = async (userId) => {
    try {
        const response = await api.get(`/${userId}/stats`);
        return response.data;
    } catch (error) {   
        console.error("Error al obtener estadísticas", error);
        throw error;
    }
};

const  editUser = async (id,editProfile) => {
    try{
          
        const response = await api.patch(`/profile/${id}`, editProfile)
        toast.success('Actualizado correctamente')
        return response.data;
    } catch (error) {
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al actualizar los datos del usuario', error)
    }
}

const editImgProfile = async (id , img) => {
     
    try{
        const response = await api.patch(`/profile/${id}/profile-picture`, img,{
          headers: {
            "Content-Type": "multipart/form-data",
    }})
    toast.success("imagen actualizada correctamente")
    return response.data;
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('error al actualizar la imagen', error)
}}


const deleteImgProfile = async (id) => {
    try{
         
        const response = await api.patch(`/profile/${id}/delete-picture`)
        toast.success("imagen elimida con exito")
        return response.data
    }catch(error){
         toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al eliminar la imagen',error)
    }
}


 export default{
    createUser,
    getProfile,
    getProfileId,
    editUser,
    editImgProfile,
    deleteImgProfile,
    getUserSearch, 
    getUserStats
}