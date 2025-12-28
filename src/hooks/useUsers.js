
import userServices from "../services/userServices"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


export const useCreateUser = () => {
    const navigate = useNavigate()
    const newUserMutation = useMutation({
        mutationFn:userServices.createUser,
        onSuccess: (data) => {
            // Redirige al componente de inicio de sesión
            if(data !== undefined){
                navigate('/login')
                toast.success("Ya puedes iniciar sesion", {
                    autoClose:10000
                })
            }
           
        },
        onError:(error) => {
            console.error('Error al crear la cuenta', error)
            toast.error(error.response?.data?.error || 'Error desconocido')
        }
    })

    return newUserMutation;
}

export const useGetProfile = () => {
    return useQuery({
        queryKey:["profile"],
        queryFn: userServices.getProfile,
        onSuccess:{},
        onError:(error)=> {
            console.error("Error al cargar la informacion del perfil", error)
        }

    })
}

export const  useEditUser = () => {
    const queryClient = useQueryClient()
    const editMutation =  useMutation({
        mutationFn:({id, ...editProfile}) => userServices.editUser(id, editProfile),
        onSuccess:(updatedUser) => {
            queryClient.setQueryData(["profile", updatedUser.id ], (oldUser)  => {
                if(!oldUser) return null;

                return {...oldUser, ...updatedUser}
            })
            queryClient.invalidateQueries(["profile"])

        }, onError: (error) => {
            console.error('Error al actualizar informacion del usuario', error)
        }
    })
    return editMutation;
}


export const useEditImgProfile = () => {  
    const queryClient = useQueryClient()
    const editMutation= useMutation({
        mutationFn:({id, img}) => userServices.editImgProfile(id, img),
        onSuccess: (updatedImg) => {
            queryClient.setQueryData(["profile", updatedImg.id], (oldUser) => {
                if(!oldUser) return null

                return {...oldUser,...updatedImg}
            })

            queryClient.invalidateQueries(["profile"])
        }
    })

    return editMutation;
}


export const useDeleteImg = () => {
    const queryClient = useQueryClient()
    const deleteMutation = useMutation({
        mutationFn: ({id}) => userServices.deleteImgProfile(id),
        onSuccess:(data) => {
            queryClient.setQueryData(["profile", data.user.id], data.user);
             queryClient.invalidateQueries(["profile"])
        },
        onError: (error) => {
        toast.error(error.response?.data?.error || "Error desconocido");
    },
    })

    return deleteMutation
}


export const useGetProfileId = (id)  => {
    
     return useQuery({
        queryKey: ["profile", id],
        queryFn: () => userServices.getProfileId(id),
        enabled: !! id ,//solo ejecutar si el id es valido
        onError: (error) => {
            console.error("Error al cargar  el profile id", error)
        }
     })
}


export const useGetUserSearch = (query)  => {
    const navigate = useNavigate()
    return useQuery({
        queryKey:["userSearch", query],
        queryFn:() => userServices.getUserSearch(query),
        enabled: !!query, // Solo ejecuta la búsqueda si hay un término
        onSuccess:(data) => {
             
             if (data && data.length > 0) {
                navigate('/searchUser')
            }
        },
        onError: (error) => {
            console.error('Error en búsqueda:', error)
             
        }
    })
}


// hooks/useUserStats.js
export const useUserStats = (userId) => {   
    return useQuery({
        queryKey: ['userStats', userId],
        queryFn: () => userServices.getUserStats(userId),
        enabled: !!userId, // Solo ejecutar si hay userId
    });
};

