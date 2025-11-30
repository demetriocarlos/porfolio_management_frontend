
import { useCreateUser } from "../hooks/useUsers"
import { AuthFormsStyles } from "./Styles/AuthForms"
import { useState } from "react"

export const CreateAccount = () => {
  const [credentials, setCredentials] = useState({userName:'', email:'', password:''})
  const mutate= useCreateUser()

  const handleChange = (e) => {
    const {name,value} = e.target;
    setCredentials({...credentials, [name]: value})
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    setCredentials({
      userName:'', 
      email:'', 
      password:''
    })

    mutate.mutate(credentials)

  }

  return (
    <div> 

      <AuthFormsStyles
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        texto={'Crear cuenta'}
        descriptionLink={'¿Ya tienes cuenta?'}
        namelink={'Iniciar Sesion'}
        login={false}
        credentials={credentials}
      />
      
    </div>
  )
}
