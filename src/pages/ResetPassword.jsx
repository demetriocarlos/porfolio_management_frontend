
 import { ResetPassworForm } from "../Components/Styles/ResetPassworForm"
 import { useState } from "react"
 import { useEmail } from "../hooks/useEmail"
 import { useResetPassword } from "../hooks/usePassword"
  

export const ResetPassword = () => {
  const {email, setEmail} = useEmail();
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({email:email, code:'', password:''})
  const [error, setError] = useState('')
  const mutate = useResetPassword(setLoading)
  
  
  
  const handleChange = (e) => {
    const {name, value} = e.target;
      //  Aplicar trim() según el campo
    let cleanedValue = value;
    if (name === 'email') {
      // Para email: trim y lowercase
      cleanedValue = value.trim().toLowerCase();
    }else if (name === 'password') {
      // Para password: solo trim (sin espacios en los extremos)
      cleanedValue = value;
      // Mostrar advertencia si hay espacios al inicio/final
      if (value !== value.trim()) {
        setError('La contraseña no debe tener espacios al inicio o final');
      } else {
        setError('');
      }
    } else {
      // Para code y otros campos: solo trim
      cleanedValue = value.trim();
    }


    setCredentials({...credentials, [name]:  cleanedValue})
  }



  const handleSubmit = (e) => {
    e.preventDefault()
    //   VALIDAR antes de enviar
    const trimmedCredentials = {
      email: credentials.email.trim().toLowerCase(),
      code: credentials.code.trim(),
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
      email:() => setEmail(''),
      code:'',
      password:''
    })
    setEmail('');
    setLoading(true)

    mutate.mutate( trimmedCredentials)
    
  }
  return (
    <div>     
        <ResetPassworForm
            onlyEmail={false}
            textButton={'Restablecer'}
            subTitle={'Ingresa el código enviado a tu correo electrónico y escribe tu nueva contraseña.'}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            credentials= {credentials}
            loading={loading}
            error= {error}
        />

    </div>
  )
}
