 

import { ProjectListStyles } from "./Styles/ProjectListStyles"
import { useGetProjects } from "../hooks/useProject"
import { Spinner } from "./Styles/Spinner"
import { ErrorMessage } from "./Styles/ErrorMessage"
import { useGetProjectSearch } from "../hooks/useProject"
import { useState } from "react"
import { useUpdatedFavorites} from "../hooks/useProject"



export const  ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const {data:projects, isLoading, error  } = useGetProjects()
  const   {data : projectResult } = useGetProjectSearch(searchTerm)
  const updatedFavoriteProject= useUpdatedFavorites();
   

   if(isLoading  ){
    return <Spinner/>
   }

   if(error){
    return <ErrorMessage  message={'Hubo un error al cargar los proyectos '} text={error.message} />
   }

   const  handleChange = (e) => {
    setSearchTerm(e.target.value)
   }

    const sortedProject = projects && projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
   const sortedProjectResult = projectResult && projectResult.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div> 
      <ProjectListStyles 
        projects={sortedProjectResult ? sortedProjectResult : sortedProject} 
        projectList={true}
        projectResult={projectResult}
        handleChange={handleChange}
        updatedFavoriteProject={updatedFavoriteProject}
      />
    </div>
  )
}
