
 import { ProjectSettingStyles } from "./Styles/ProjectSettingStyles"
 import { useGetUserPojects } from "../hooks/useProject"
 import { Spinner } from "./Styles/Spinner"
import { ErrorMessage } from "./Styles/ErrorMessage"


export const ProjectSetting = () => {

  const {data:projects, isLoading, error  }=useGetUserPojects();

  if(isLoading){
    return <Spinner />
  }

  if(error){
    return <ErrorMessage message={'Hubo un error al cargar '} text={error.message} />
  }


  return (
    <div> 
      <ProjectSettingStyles 
        projects={projects}
      />
    </div>
  )
}
