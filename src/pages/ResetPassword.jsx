
 import { ResetPassworForm } from "../Components/Styles/ResetPassworForm"
 import { useState } from "react"
 import { useEmail } from "../hooks/useEmail"
 import { useResetPassword } from "../hooks/usePassword"
  

export const ResetPassword = () => {
  const {email, setEmail} = useEmail();
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({email:email, code:'', password:''})
  const mutate = useResetPassword(setLoading)
  
  
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setCredentials({...credentials, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setCredentials({
      email:() => setEmail(''),
      code:'',
      password:''
    })
    setLoading(true)

    mutate.mutate(credentials)
    
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
        />

    </div>
  )
}
