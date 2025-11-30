
import projectServices from "../services/projectServices"
import { useMutation, useQuery, useQueryClient,  } from "@tanstack/react-query"
 

export const useCreateProject = () => {
    const queryClient = useQueryClient()
    const newProjectMutation= useMutation({
        mutationFn:projectServices.createProject,
        onSuccess:() => {
            queryClient.invalidateQueries({queryKey:['Myprojects']})
        },onError:(error) => {
            console.error('error al crear un nuevo projecto', error)
        }
    })

    return newProjectMutation;

}



export const useEditProject = () => {
    const queryClient= useQueryClient()


    const editMutation = useMutation({
        mutationFn: ({id,  ...changes}) => projectServices.editProject(id, changes),
        onSuccess:(updatedProject) => {
             
            queryClient.setQueryData(['projects', updatedProject.id], (oldProject) => {
                if(!oldProject) return null;

                return {...oldProject, ...updatedProject}
            });

            queryClient.invalidateQueries(["projects"])
        }
        ,onError:(error) => {
            console.error('Error al editar el proyecto', error)   
        }
    })
    return editMutation;
}


export const useDeleteProject = () => {
    const queryClient = useQueryClient()
    
    const deleteProjectMutation = useMutation({
        mutationFn:projectServices.deletePoject,
        onSuccess:() =>{
            queryClient.invalidateQueries(["projects"])
        }
        ,onError:(error) => {
            console.error('se ha producido un error al eliminar el proyecto', error)
        }

    })

    return deleteProjectMutation
}


export const useGetUserPojects = () => {
      return useQuery({
         queryKey:['Myprojects'],
         queryFn:projectServices.getUserProject,
        onSuccess:() => {
           
        },onError:(error) => {
            console.error('Error al cargar los proyectos del usuario', error)
        }
    })
}

export const useGetProjectId = (id) => {
    return useQuery({
        queryKey:['projects', id],
        queryFn: () => projectServices.getProjectsId(id),
        enabled: !! id ,//solo ejecutar si el id es valido
        onError:(error) => {
            console.error('Error al cargar los proyectos por id', error)
        }
    })
}


export const useGetProjectSearch = (query)  => {
    return useQuery({
        queryKey:["searchProject", query],
        queryFn:() => projectServices.projectsSearch(query),
        enabled: !!query, // Solo ejecuta la búsqueda si hay un término
    })
}




export const useGetProjects = () => {
    return useQuery({
        queryKey:['projects'],
        queryFn:projectServices.getProjects,
        onSuccess:() => {
              
        },onError:(error) => {
            console.error('Error al cargar los proyectos', error)
        }
    })
}
             


