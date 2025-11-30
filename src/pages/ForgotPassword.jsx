
import { ResetPassworForm } from "../Components/Styles/ResetPassworForm"
import { useEmail } from "../hooks/useEmail"
import { useForgotPassword } from "../hooks/usePassword";
import { useState } from "react";
export const ForgotPassword = () => {
  const {email, setEmail} = useEmail();
  const [loading, setLoading] = useState(false)
  const mutate = useForgotPassword(setLoading)

  const handleChange = (e) => {
    
    setEmail(e.target.value)
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    mutate.mutate(email)
     
  }

   
  return (
     <div>
        <ResetPassworForm
          onlyEmail={true}
          textButton={'Siguiente'}
          subTitle={'Ingresa tu correo electrónico para buscar tu cuenta.'}
          handleChange={handleChange}
          handleSubmit= {handleSubmit}
          email={email}
          loading={loading}
        />
     </div>
  )        
}
