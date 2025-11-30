
import { AuthFormsStyles } from "./Styles/AuthForms"
import { useLogin,   } from "../hooks/useAuth"
import { useState,  } from "react"
 

export const Login = () => {
  const [credentials, setCredentials] = useState({email:'',password:''});
  const mutation = useLogin()
   
  const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;

   const VITE_URL= import.meta.env.VITE_URL

  const handleChange = (e) => {
    const {name, value} = e.target;
      setCredentials({...credentials, [name]: value})
    
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setCredentials({
      email:'',
      password:''
    })

    mutation.mutate(credentials)
  }


   
    const handleLogin = () => {
      const redirectUri = `${VITE_URL}/github-callback`;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=user:email`;
    }

     
  return (
    <div className="bg-blue-400"> 
     
    <div className="w-screen h-[28px] bg-blue-400"/>

     
      <AuthFormsStyles 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        texto={'Iniciar Sesion'}
        descriptionLink={'¿No tienes cuenta?'}
        namelink={'Registrarse'}
        login={true}
        credentials={credentials}
        handleGithubLogin={handleLogin}
      />
    </div>
  )
}    
