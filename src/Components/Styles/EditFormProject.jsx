
import { useState } from "react"
import { Save, X } from "lucide-react"
import { useEditProject } from "../../hooks/useProject"


export const EditFormProject = ({project, handleCancelEdit}) => {
    
  //const [isLoading, setIsLoading] = useState(false)
   
  const editProjectMutation = useEditProject()
 

  const [changes, setChanges] = useState({})  // solo guarda cambios

  const handleChange = (e) => {
    const {name,value} = e.target;
    setChanges((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit= (event) => {
    event.preventDefault()

    if (Object.keys(changes).length === 0) {
       
      return
    }

    editProjectMutation.mutate({ 
      id: project.id,
      ...changes
      })

    setChanges({})
  }

   

  return (
    <div> 
      <form action="" onSubmit={handleSubmit}> 
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Editando proyecto</h3>
            <div className="flex gap-2">      
              <button
                type="submit"
                disabled={editProjectMutation.isPending}
                className={`flex items-center text-white rounded-lg py-1 px-2 hover:opacity-90 
                ${editProjectMutation.isPending ? "opacity-70 cursor-not-allowed bg-gray-400" : "bg-[#7676d7]"}`}
              >
                <Save className="h-4 w-4 mr-2" />
                {editProjectMutation.isPending ? "Guardando..." : "Guardar"}
              </button>

              <button 
                type="button"
                onClick={handleCancelEdit}
                className="flex items-center border rounded-lg py-1 px-2 hover:bg-gray-100" 
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="" className="font-semibold">Nombre del proyecto</label>
              <input   
                type="text" 
                name="projectName"
                defaultValue={project.projectName}
                required
                onChange={handleChange}
                className={`w-full border border-gray-300 text-gray-700 py-1 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 `}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="" className="font-semibold">Tecnologías</label>
              <input 
                type="text"
                name="technologies" 
                defaultValue={project.technologies}
                onChange={handleChange}
                placeholder="React, TypeScript, Tailwind"
                required
                className="w-full border border-gray-300 text-gray-700 py-1 px-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="" className="font-semibold">Descripción</label>
            <textarea 
              name="description" 
              id="" 
              defaultValue={project.description}
              onChange={handleChange}
              required
              className={`w-full rounded-lg py-5 px-2 text-gray-700 border border-gray-300 focus:outline-none focus:ring-2  focus:ring-gray-300   `}
              />  
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="" className="font-semibold">URL de Demo</label>
                <input 
                  name="demoUrl"
                  type="url"
                  defaultValue={project.demoUrl}
                  onChange={handleChange}
                  required
                  className={`w-full border border-gray-300 text-gray-700 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-gray-300  }`}
                />
            </div>

            <div className="space-y-2">
              <label htmlFor="" className="font-semibold ">URL del Repositorio</label>
              <input 
                type="url"
                name="repositoryURL" 
                defaultValue={project.repositoryURL}
                onChange={handleChange}
                required
                className={`w-full border border-gray-300 text-gray-700 rounded-lg py-1 px-2 focus:outline-none  focus:ring-2 focus:ring-gray-300  `}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
