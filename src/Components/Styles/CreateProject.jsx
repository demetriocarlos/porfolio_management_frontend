 
 import { useState } from "react"
import { X } from "lucide-react"
import { useCreateProject } from "../../hooks/useProject"
import { useMenu } from "../../hooks/useToggleMenu"

export const CreateProject = ({  errors}) => {
  const mutate = useCreateProject()
  const {isMenuOpen,toggleMenu} = useMenu()
  const [newProject, setNewProject] = useState({
    projectName: "",
    demoUrl: "",
    repositoryURL: "",
    description: "",
    technologies: "",
  })

  const [isLoading, setIsLoading] = useState(false)



  const handleChange = (e) => {
    const {name, value} = e.target;
    setNewProject({...newProject, [name]:value})
  }

  const handleSubmit = (event) => {
     event.preventDefault();

     const formattedProject = {
    ...newProject,
    technologies: newProject.technologies
      .split(",")
      .map(tech => tech.trim()) // elimina espacios extra
      .filter(Boolean) // elimina elementos vacíos
  };


    mutate.mutate(formattedProject)

    setNewProject({
      projectName: "",
      demoUrl: "",
      repositoryURL: "",
      description: "",
      technologies: "",
    })
    toggleMenu()

  }

 

  return (
    <div> 
        
            {isMenuOpen && (
              <>
              <div className="relative z-50"> 
                <div
                  className="fixed inset-0  min-h-screen  bg-black/30 backdrop-blur-sm z-90"
                  onClick={toggleMenu}
                />
                  
                <div
                   className={`  flex items-center justify-center h-screen   fixed  top-0  left-0  w-full h-full     z-50 p-4 flex flex-col gap-4 `}
                >
         
                    {/**crear nuevo proyecto */}
                                
                    <div className=" grid grid-cols-1 space-y-7 sm:max-w-[600px]  bg-white p-4 rounded-xl">
                         
                         {/* Encabezado */}
                      <div className=" relative p-4 ">
                         
                         <button
                              onClick={toggleMenu}
                              className="absolute top-2  right-2 text-gray-500 hover:text-gray-700"
                            >
                              <X  size={18}/>
                          </button>
                         <div className="text-center">
                          <h3 className="  font-semibold text-xl " >Crear Nuevo Proyecto</h3>
                          <p className="text-sm text-gray-600  ">Agrega un nuevo proyecto a tu portafolio</p>
                         </div>
                      </div>

                      <form  onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <label htmlFor="projectName" className="font-semibold">
                                Nombre del proyecto *
                              </label>
                              <input 
                                id="projectName"
                                name="projectName"
                                type="text"
                                onChange={handleChange}
                                value={newProject.projectName} 
                                required
                                placeholder="Mi proyecto increíble"
                                className={`border border-gray-300  rounded-lg pl-2 w-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${errors.projectName ? "border-red-500" : ""}`}
                              />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="technologies" className="font-semibold">Tecnologías *</label>
                            <input 
                              id="Tecnologías"
                              name="technologies"
                              type="text" 
                              value={newProject.technologies}
                              onChange={handleChange}
                              
                              placeholder="React, TypeScript, Tailwind"
                              className="w-full px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  focus:ring-gray-500 focus:border-transparent" 
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="description" className="font-semibold">Descripción *</label>
                            <textarea 
                              id="description"
                              name="description"
                              value={newProject.description}
                              onChange={handleChange}
                              required
                              placeholder="Describe tu proyecto..."
                              className=" w-full  border border-gray-300 px-2 py-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                              >

                            </textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="demoUrl" className="font-semibold">URL de Demo *</label>
                            <input
                              id="demoUrl" 
                              name="demoUrl"
                              type="url" 
                              value={newProject.demoUrl}
                              onChange={handleChange}
                              required
                              placeholder="https://mi-proyecto.vercel.app"
                              className={`w-full border border-gray-300 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent ${errors.demoUrl ? "border-red-500" : ""}`} 
                              />
                          </div>
                          <div>
                            <label htmlFor="repositoryURL" className="font-semibold">URL del Repositorio *</label>
                            <input 
                              id="repositoryURL"
                              name="repositoryURL"
                              type="url" 
                              value={newProject.repositoryURL}
                              className="w-full border border-gray-300 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                              onChange={handleChange}
                              required
                              placeholder="https://github.com/usuario/proyecto"
                              />
                          </div>
                        </div>

                        <button 
                          disabled={isLoading}
                          className=" w-full py-2 bg-[#7676d7] text-white rounded-lg hover:opacity-90"
                          
                        >
                          { isLoading ? "Creando..." : "Crear Proyecto"}
                        </button>
                      </form>

                    </div>

                </div>
              </div>  
              </>
            )}
    </div>
  )
}
