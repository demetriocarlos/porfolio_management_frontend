
import { useCreateUser } from "../hooks/useUsers"
import { AuthFormsStyles } from "./Styles/AuthForms"
import { useState } from "react"

export const CreateAccount = () => {
  const [credentials, setCredentials] = useState({userName:'', email:'', password:''})
  const [error, setError] = useState('')
  const mutate= useCreateUser()

  const handleChange = (e) => {
    const {name,value} = e.target;
     //   Aplicar trim() según el campo
    let cleanedValue = value;

    if (name === 'email') {
      // Para email: trim y lowercase
      cleanedValue = value.trim().toLowerCase();
    } else if (name === 'password') {
      // Para password: solo trim (sin espacios en los extremos)
      cleanedValue = value;
      // Mostrar advertencia si hay espacios al inicio/final
      if (value !== value.trim()) {
        setError('La contraseña no debe tener espacios al inicio o final');
      } else {
        setError('');
      }
    } else {
      // Para  userName y otros campos: solo trim
      cleanedValue = value.trim();
    }
    setCredentials({...credentials, [name]:  cleanedValue})
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    //  VALIDAR antes de enviar
    const trimmedCredentials = {
      userName: credentials.userName.trim(),
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password.trim() // Trim aquí también por seguridad
    }

     // Validar longitud mínima de contraseña
    if (trimmedCredentials.password.length < 7) {
      setError('La contraseña debe tener al menos 7 caracteres, incluyendo almenos una letra mayúscula, una letra minúscula y un número.');
      return;
    }

    // Limpiar errores
    setError('');

    setCredentials({
      userName:'', 
      email:'', 
      password:''
    })

    //  Enviar credenciales con trim aplicado
    mutate.mutate(trimmedCredentials)

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
        error={error}
      />
      
    </div>
  )
}
