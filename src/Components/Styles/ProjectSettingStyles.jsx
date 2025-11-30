import { useState , useEffect} from "react";
 import { FaRegCalendarAlt, FaExternalLinkAlt, FaGithub, FaUserCircle } from "react-icons/fa";
import { CreateProject } from "./CreateProject";
import { EditFormProject } from "./EditFormProject";
import { useMenu } from "../../hooks/useToggleMenu";
import { useDeleteProject } from "../../hooks/useProject";
import { BeatLoader, BounceLoader, MoonLoader, SkewLoader } from "react-spinners";
import { UserAvatar } from "./UserAvatar";

  const mockProjects = [
  {
    id:"36362",
    projectName: "Taskify Pro",
    demoUrl: "https://taskify-pro.vercel.app",
    repositoryURL: "https://github.com/user123/taskify-pro",
    description: "Una app para gestionar tareas con drag-and-drop y vistas por usuario.",
    createdAt: new Date("2024-01-15"),
    technologies: ["React Native", "AI", "Firebase"],
    user: {
      id: "64f0d9ad2c1e88a9321f1234",
      name: "Ana Torres",
      profilePicture: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    }
  },
  {
    id:"890756",
    projectName: "DevFinder",
    demoUrl: "https://devfinder.dev",
    repositoryURL: "https://github.com/devhunter/devfinder",
    description: "Buscador de perfiles de desarrolladores usando la API de GitHub.",
    createdAt: new Date("2023-11-03"),
    technologies: ["React Native", "AI", "Firebase"],
    user: {
       id: "64f0d9ad2c1e88a9321f1234",
      name: "Ana Torres",
      profilePicture: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    }
  },
  {
    id:"4560",
    projectName: "FoodSnap",
    demoUrl: "https://foodsnap.app",
    repositoryURL: "https://github.com/chefcode/foodsnap",
    description: "Aplicación que sube fotos de comida y sugiere recetas relacionadas.",
    createdAt: new Date("2024-04-22"),
    technologies: ["React Native", "AI", "Firebase"],
    user: {
       id: "64f0d9ad2c1e88a9321f1234",
      name: "Ana Torres",
      profilePicture: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    }
  },
  {
    id:"56290",
    projectName: "CryptoPulse",
    demoUrl: "https://cryptopulse.io",
    repositoryURL: "https://github.com/traderx/cryptopulse",
    description: "Dashboard en tiempo real para monitorear precios y tendencias de criptomonedas.",
    createdAt: new Date("2023-09-28"),
    technologies: ["React Native", "AI", "Firebase"],
    user: {
       id: "64f0d9ad2c1e88a9321f1234",
      name: "Ana Torres",
      profilePicture: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    }
  },
  {
    id:"10748",
    projectName: "GreenRoute",
    demoUrl: "https://greenroute.vercel.app",
    repositoryURL: "https://github.com/envirotech/greenroute",
    description: "App que sugiere rutas de transporte más eco-amigables en tiempo real.",
    createdAt: new Date("2024-02-10"),
    technologies: ["React Native", "AI", "Firebase"],
    user: {
       id: "64f0d9ad2c1e88a9321f1234",
      name: "Ana Torres",
      profilePicture: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
    }
  }
]

import {
  Plus,
  ExternalLink,
  Github,
  Calendar,
  Edit3,
  Trash2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Eye,
  Star,
} from "lucide-react"

 



export const ProjectSettingStyles = ({projects}) => {

  
   
  const [deletingId, setDeletingId] = useState(null);
  const {isMenuOpen,toggleMenu} = useMenu()

  const [errors, setErrors] = useState({})
   
  const [editingProject, setEditingProject] = useState(null)
  const [editForm, setEditForm] = useState(mockProjects)
  const deleteProjectMutation= useDeleteProject();

  


 
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  
    // Limpieza por si el componente se desmonta con el menú abierto
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMenuOpen]);


const handleEditProject = (project) => {
    setEditingProject(project.id)
    setEditForm({
      ...project,
      technologies: project.technologies.join(", "),
    })
  }


  const handleCancelEdit = () => {
    setEditingProject(null)
    setEditForm({})
    setErrors({})
  }


  const deleteProject = (id) => {
    if (window.confirm('¿Eestas seguro que quieres eliminar este Proyecto?')){
      setDeletingId(id);// <- marcamos el proyecto que se está eliminando

      return deleteProjectMutation.mutate(id, {
        onSettled: () => {
        setDeletingId(null); // <- limpiamos al terminar
      }
      })
    }

  }
 
   
 
  const sortedProject = projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));



  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8 ">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className=" flex  items-center justify-between" >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestión de Proyectos
            </h1>
            <p className="text-gray-600 ">
              Administra tus proyectos y mantén tu portafolio actualizado  
            </p>
          </div>

            {/* Botón crear proyecto */}
           
          <div className="">
            
            <div > 
              <button 
                onClick={toggleMenu}
                className="inline-flex  items-center   px-3 py-1  text-white hover:opacity-90 bg-[#7676d7] rounded-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </button>
            </div>

            <CreateProject
              errors={errors}
            />

            
          </div>

        </div>

          {/* Lista de proyectos */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Tus Proyectos
          </h2>

            <div className="space-y-4">
              {sortedProject && sortedProject.map((project) => (
                <article key={project.id} className="bg-white/80 backdrop-blur-sm border-white/20">
                  <section className="p-6">
                    { editingProject ===   project.id ?(
                      /* Modo edición */
                        <>
                      <EditFormProject 
                        project={project}
                        handleCancelEdit={handleCancelEdit}
                      />
                    </>
                    ):(
                      /* Modo vista */
                      <div className="space-y-4">
                        <div className="flex items-start justify-between ">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-xl font-bold text-gray-900">
                                {project.projectName}
                              </h3>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(project.createdAt).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                               
                              </div>
                            </div>

                            <p className="text-gray-600 mb-4">
                              {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {
                                project.technologies.map((tech) => (
                                  <div key={tech} className="text-xs">
                                    {tech}
                                  </div>
                                ))}
                            </div>

                            <div className="flex gap-4">
                                <button
                                  className="border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-100"
                                >
                                  <a 
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                    Demo
                                  </a>
                                </button>
                                <button
                                  className="border border-gray-300 px-3 py-1 rounded-lg hover:bg-gray-100"
                                >
                                  <a 
                                    href={project.repositoryURL} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2"
                                  >
                                    <Github className="h-4 w-4" />
                                    Código
                                  </a>
                                </button>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button
                              className="border px-3 py-2 rounded-lg bg-transparent hover:bg-gray-100"
                              onClick={() => handleEditProject(project)}
                            >
                              <Edit3 className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteProject(project.id)}
                              className={`border px-3 py-2 rounded-lg text-red-600 hover:text-red-700 bg-transparent hover:bg-gray-100 
                                ${deletingId === project.id  ? "opacity-70 cursor-not-allowed bg-gray-400" : ""}
                                `}
                              
                            >
                              
                              { deletingId === project.id  ? < SkewLoader size={10} color="red" className="h-4 w-4" />  :  <Trash2 className="h-4 w-4" /> }

                            </button>
                          </div>
                                 
                        </div>
                        
                        <hr />
                    {/**avatar del usuario */}
                        <div className="flex items-center gap-3">
                          <div>

                            <UserAvatar 
                              user={project.user} 
                              className={'w-10 h-10'}
                            />
                            
                          </div>
                          <span className="text-sm text-gray-600">
                            {project.user.userName}
                          </span>
                        </div>
                      </div>
                    )}
                  </section>
                </article>
              ))}
            </div>

            {
              projects.length === 0 && (
                <article className="bg-white/80 backdrop-blur-sm border-white/20">
                  <section className="p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <Plus className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No tienes proyectos aún
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Crea tu primer proyecto para comenzar a construir tu portafolio
                    </p>
                    <button
                      onClick={toggleMenu}
                      className=" rounded-lg text-white hover:opacity-90 bg-[#7676d7]"
                    >
                      
                      <div className="flex items-center px-2 py-1 ">
                        <Plus className="h-4 w-4 mr-2" />
                        Crear Primer Proyecto
                      </div>
                    </button>
                  </section>
                </article>
              )
            }
        </div>
      </div>
    </div>
  )
}
