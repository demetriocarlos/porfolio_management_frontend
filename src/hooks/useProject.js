
import projectServices from "../services/projectServices"
import { useMutation, useQuery, useQueryClient,  } from "@tanstack/react-query"
import { useAuth } from "./useAuth"

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
 
export const useUpdatedFavorites = () => {
    const queryClient = useQueryClient();
    const { state } = useAuth();
    
    const editMutation = useMutation({
        mutationFn: ({ id }) => projectServices.updatedFavorites(id),
        
        onMutate: async ({ id }) => {

             // 1. Cancelar cualquier query activa de 'projects' para evitar conflictos durante la actualización optimista
            await queryClient.cancelQueries(
                // Predicado que identifica qué queries cancelar:
        // Solo las queries cuyo primer elemento del queryKey sea 'projects'
                { predicate: (query) => 
                query.queryKey[0] === 'projects'
            });
            
            // 2. Crear un "snapshot" (copia de seguridad) de los datos actuales antes de modificarlos
            // Se usará para revertir los cambios en caso de que la mutación falle
            const snapshot = new Map();
            
            // 3. Obtener TODOS los datos cacheados relacionados con proyectos
            queryClient.getQueriesData({ predicate: (query) => 
                query.queryKey[0] === 'projects'
            }).forEach(([queryKey, data]) => {
                // 4. Guardar los datos ORIGINALES en el snapshot usando el queryKey como identificador
                snapshot.set(queryKey, data);
                
                 // 5. Aplicar "optimistic update" (actualización optimista) solo si los datos son un array
                if (Array.isArray(data)) {
                    // 6. Actualizar el cache de React Query inmediatamente, sin esperar la respuesta del servidor
                    queryClient.setQueryData(queryKey, data.map(project => {
                        // 7. Verificar si este proyecto es el que el usuario está marcando/desmarcando como favorito
                        if (project.id === id) {
                            // 8. Determinar si el usuario actual ya tiene este proyecto como favorito
                            const isFavorite = project.favorites.includes(state.id);
                            // 9. Crear la nueva versión del proyecto con los favoritos actualizados:
                            return {
                                // 10. Copiar todas las propiedades existentes del proyecto
                                ...project,
                                // 11. Actualizar el array de favoritos basado en el estado actual:
                                favorites: isFavorite 
                                    // Si YA es favorito: remover al usuario de la lista
                                    ? project.favorites.filter(favId => favId !== state.id)
                                    // Si NO es favorito: agregar al usuario a la lista
                                    : [...project.favorites, state.id]
                            };
                        }
                        // 12. Si no es el proyecto que estamos actualizando, devolverlo sin cambios
                        return project;
                    }));
                }
            });
             // 13. Devolver el snapshot para uso posterior (reversión en caso de error)
            return { snapshot };
        },
        
        onSuccess: (data ) => {
             
            // Actualizar solo el proyecto modificado en la lista
             queryClient.setQueryData(['projects'], (oldList) => {
                if (!oldList) return oldList;
                return oldList.map(project => 
                    project.id === data.id ? data : project
                );
            });

            //queryClient.setQueryData(['projects',  data.id],  data);

            //queryClient.invalidateQueries(["projects"]);
            
            
        },
        
        onError: (error, variables, context) => {
            // Revertir todas las listas
            if (context?.snapshot) {
                context.snapshot.forEach((data, queryKey) => {
                    queryClient.setQueryData(queryKey, data);
                });
            }
            
           // toast.error("Error al actualizar favoritos");
        }
    });

    return editMutation;
};


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
             




