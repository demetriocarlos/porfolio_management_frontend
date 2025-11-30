
import { createContext, useReducer } from "react";
//import { useNavigate } from "react-router-dom";


const initialState = {
    userName: null,
    token:null,
    id:null,
    email:null
}


const authReducer = (state,action) =>{
    switch (action.type){
        case 'LOGIN':
            return {
                ...state,
                userName: action.payload.userName,
                token: action.payload.token,
                id: action.payload.id,
                email:action.payload.email
            };
        case 'LOGOUT':
            return {
                ...state,
                userName:null,
                token:null,
                id:null,
                email:null
            }
        default:
            return state
    }
}
 

// Crear el contexto de autenticación
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext()


export const AuthProvider = ({children})  => {
    
    const [state, dispatch] = useReducer(authReducer, initialState);
    //const navigate = useNavigate();
    const login = (userName, token, id, email) => {
        const userData = {userName,token,id, email};
        dispatch({type:'LOGIN', payload:userData})
    }


     // Función para manejar el cierre de sesión
    const logout = () => {
        localStorage.removeItem('loggedInUser');  // Eliminar usuario de localStorage
        localStorage.removeItem('token'); // Eliminar token de localStorage
        dispatch({type: 'LOGOUT'});
        window.location.replace('/login') 
    }
         

    return(
        <AuthContext.Provider value={{state, login, logout, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
     
}


    