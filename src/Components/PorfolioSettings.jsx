
 import { Porfolio } from "./Styles/Porfolio"
 import { useGetProfileId, useUserStats } from "../hooks/useUsers"
 import { useGetProjectId } from "../hooks/useProject"
 import { useParams } from "react-router-dom"
 import { useAuth } from "../hooks/useAuth"
 import { useState } from "react"
 import { useContactEmail } from "../hooks/useContact"


export const PorfolioSettings = () => {

  const id = useParams().id;
  const {state} = useAuth()
  // Decide si mostrar datos del usuario autenticado o de otro usuario
  const userIdentifier = id || state.id
  
  const {data:user} = useGetProfileId(userIdentifier)
  const {data:projects} = useGetProjectId(userIdentifier)
  const {data:stats} = useUserStats(userIdentifier)
   const  contactEmailMutation = useContactEmail()
  const [ email, setEmail] = useState("")

  
  const imgUrl=' https://plus.unsplash.com/premium_photo-1700350181261-6cfb4254d9ea?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
   

  
  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSubmitContact = (e) => {
    e.preventDefault()

    contactEmailMutation.mutate({
      message:email,
      projectOwnerId: user && user.id,
      fromEmail: state && state.email
    })

    setEmail("")
  }


  return (
    <div> 
        <Porfolio
          user={user}
          projects={projects}
          imgUrl={imgUrl}
          handleChange={handleChange}
          handleSubmitContact={handleSubmitContact}
          email={email}
          stats={stats}
        />
    </div>
  )
}
