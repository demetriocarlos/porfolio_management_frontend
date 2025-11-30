import api from "./api"
import { toast } from "react-toastify"


const createProject = async (newProject) => {
    try{
        const response = await api.post('/projects', newProject)
        toast.success('Proyecto creado exitosamente')
        return response.data;
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Error al crear la tarea', error)
    }
}


const editProject = async (id,changes ) =>{ 
    try{
        const response = await api.patch(`/projects/${id}`, changes)
        toast.success('Proyecto actualizado correctamente')
        return response.data;
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error('Hubo un error al editar el proyecto', error)
    }
}


const deletePoject = async (id) => {
     
    try{
        const response = await api.delete(`/projects/${id}`)
        return response.data;
    }catch(error) {
        console.error('Error al eliminar el proyecto', error)
    }
}



const getUserProject= async () => {
    try{
        const response = await api.get('/projects/myProjects')
        return response.data;
    }catch(error){
        console.error('Error al cargar los proyectos del usuario', error)
    }
}

const getProjects = async () => {
    try{
        const response = await api.get("/projects")
        return response.data;
    }catch(error){
         toast.error(error.response?.data?.error || 'Error desconocido')
        console.error("Error al cargar la lista de proyectos", error)
    }
}   


const getProjectsId = async (id) => {
    try{
        const response = await api.get(`/projects/projectsId/${id}`);
        return response.data;
    }catch(error){
        toast.error(error.response?.data?.error || 'Error desconocido')
        console.error("Error al cargar los proyectos por id", error)
    }
}


const projectsSearch = async (query)  => {
    try{
        const response = await api.get(`/projects/search?query=${query}`);
        return response.data;
    }catch(error){
        console.error("Error al realizar la busqueda del los projectos", error)
    }
}
     
 export default {
    createProject,
    editProject,
    deletePoject,
    getUserProject,
    getProjects,
    getProjectsId,
    projectsSearch
}