 import { FaRegCalendarAlt, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { Search } from "lucide-react";
import { UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { NoResults } from "./NoResults";
import { Spinner } from "./Spinner";
import { UserAvatar } from "./UserAvatar";

export const ProjectListStyles = ({projects, projectList,  handleChange,  projectResult }) => {
    
  
     

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${projectList ? 'p-4 md:p-8' : '' } `}>
        <div className=" max-w-7xl mx-auto ">

              {/* Header */}
              {projectList ? ( 
                <> 
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2 text-[#7676d7]">
                Showcase de Proyectos
              </h1>
              <p className=" text-lg text-gray-600 max-w-2xl mx-auto">
                Descubre proyectos increíbles creados por desarrolladores de todo el mundo
              </p>
            </div>

              {/* Filtros y búsqueda */}
            <div className="   flex items-center justify-center mb-8 bg-white/70  backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="   flex items-center justify-center"> 
              <div className="  relative flex-1">
                <Search className="text-center absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 " />
                <input 
                  type="text" 
                  name="searchTerm"
                  onChange={handleChange}
                  placeholder="Buscar proyectos..."
                  className=" w-[300px]   md:w-[600px] border border-gray-300 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 pl-10"
                />
              </div>
              </div>
            </div>
            </>
              ): ""
          }

              {/* Grid de proyectos */}
            <div className={`${!projectList  ? 'grid  grid-cols-1 lg:grid-cols-2  gap-6 ' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' }  `}>
                {
                 projects &&  projects.map((project)=> (
                    <article key={project.id} className=" group hover:shadow-xl transition-all duration-300 bg-white/80   backdrop-blur-sm border-white/20 hover:scale-[1.02]  rounded-xl p-5"  >
                       <header className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h2 className=" text-xl  font-bold text-[#7676d7] group-hover:text-blue-600 transition-colors ">{project.projectName}</h2>
                              <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                                <FaRegCalendarAlt className="h-3 w-3"  />
                                  {new Date(project.createdAt).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                              </div>
                            </div>
                          </div>
                        </header>
                        <section className="pb-4 mt-3">
                          <p className="mb-4 text-gray-600 line-clamp-2">{project.description}</p> 
                            {/* Enlaces */}
                          <div className="flex gap-4 mb-4">  
                            {/** bg-gray-800,,, [#7676d7] */}
                            <button className="flex-1 bg-gray-800 py-1 hover:opacity-90  rounded-md">
                              <a 
                                href={project.demoUrl} 
                                target="_blank"
                                className="flex  items-center justify-center gap-2 text-white" 
                              >
                                <FaExternalLinkAlt className="h-4 w-4"/>
                                Demo
                              </a>
                            </button>
                            <button className="flex-1 bg-gray-100 py-1 hover:bg-gray-200 bg-transparent   border border-[#7676d7] rounded-md" >
                              <a 
                                href={project.repositoryURL} 
                                target="_blank" 
                                className="flex text-[#7676d7]  items-center justify-center gap-2"
                              >
                                <FaGithub className="h-4 w-4"/>
                                Repositorio
                              </a>
                            </button>
                          </div>
                        </section>
                        <footer className="pt-0">
                          {/* Información del usuario */}
                          <div className="flex items-center  w-full">
                            {/**avatar del usuario */}
                            <Link to={`/portfolio/${project.user.id}`}> 
                              <UserAvatar
                                user={project.user}
                                className={'h-12 w-12'}
                              />
                            </Link>
                            <p className=" font-medium  text-gray-900 text-sm  py-3 px-3">{project.user.userName}</p>
                          </div>
                        </footer>
                    </article>
                  ))
                }
             </div> 


            {
              
            }


                
                {/**mensaje para cuando no hay proyectos */}
             {
              projectResult ?

                <NoResults searchResult={projectResult}/>
              
              :

             projects && projects.length === 0 && (
                <article className="bg-white/80 backdrop-blur-sm border-white/20">
                  <section className="p-12 text-center">
                    <div className="text-gray-400 mb-4">
                      <Plus className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">
                      No {projectList ? " Hay" : "tienes"} proyectos aún
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Crea tu primer proyecto para comenzar a construir tu portafolio
                    </p>
                     
                  </section>
                </article>
              )
            }
        </div>
        

    </div>
  )
}
