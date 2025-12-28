
import { Contact,Building, MapPin, Calendar, Mail, Share2,Download ,Globe, Github, Linkedin, UserRound   } from 'lucide-react';
import { ProjectListStyles } from './ProjectListStyles';
import { useState } from 'react';
  
 import { UserAvatar } from './UserAvatar';
  
 import { Plus } from 'lucide-react';
 

 
const mockProjects = [
  {
    id: "36362",
    projectName: "Taskify Pro",
    demoUrl: "https://taskify-pro.vercel.app",
    repositoryURL: "https://github.com/user123/taskify-pro",
    description: "Una app para gestionar tareas con drag-and-drop y vistas por usuario.",
    createdAt: new Date("2024-01-15"),
    technologies: ["React", "TypeScript", "Tailwind"],
    stars: 124,
    views: 1250,
    category: "Productividad",
    user: {
      id: "64f0d9ad2c1e88a9321f1234",
      name: "Ana Torres",
      profilePicture: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
  },
  {
    id: "890756",
    projectName: "DevFinder",
    demoUrl: "https://devfinder.dev",
    repositoryURL: "https://github.com/devhunter/devfinder",
    description: "Buscador de perfiles de desarrolladores usando la API de GitHub.",
    createdAt: new Date("2023-11-03"),
    technologies: ["Next.js", "API", "CSS"],
    stars: 89,
    views: 890,
    category: "Herramientas",
    user: {
      id: "64f0d9ad2c1e88a9321f1234",
      name: "Ana Torres",
      profilePicture: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
  },
  {
    id: "4560",
    projectName: "FoodSnap",
    demoUrl: "https://foodsnap.app",
    repositoryURL: "https://github.com/chefcode/foodsnap",
    description: "Aplicación que sube fotos de comida y sugiere recetas relacionadas.",
    createdAt: new Date("2024-04-22"),
    technologies: ["React Native", "AI", "Firebase"],
    stars: 256,
    views: 2100,
    category: "Lifestyle",
    user: {
      id: "64f0d9ad2c1e88a9321f1234",
      name: "Ana Torres",
      profilePicture: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
  },
  {
    id: "56290",
    projectName: "CryptoPulse",
    demoUrl: "https://cryptopulse.io",
    repositoryURL: "https://github.com/traderx/cryptopulse",
    description: "Dashboard en tiempo real para monitorear precios y tendencias de criptomonedas.",
    createdAt: new Date("2023-09-28"),
    technologies: ["Vue.js", "WebSocket", "Chart.js"],
    stars: 342,
    views: 3200,
    category: "Finanzas",
    user: {
      id: "64f0d9ad2c1e88a9321f1234",
      name: "Ana Torres",
      profilePicture: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
  },
  {
    id: "10748",
    projectName: "GreenRoute",
    demoUrl: "https://greenroute.vercel.app",
    repositoryURL: "https://github.com/envirotech/greenroute",
    description: "App que sugiere rutas de transporte más eco-amigables en tiempo real.",
    createdAt: new Date("2024-02-10"),
    technologies: ["React", "Maps API", "Node.js"],
    stars: 178,
    views: 1680,
    category: "Medio Ambiente",
    user: {
      id: "64f0d9ad2c1e88a9321f1234",
      name: "Ana Torres",
      profilePicture: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    },
  },
]
 
export const Porfolio = ({projects, user, imgUrl,handleSubmitContact, handleChange, email, stats}) => {
  
  const [showContact, setShowContact] = useState(false)
  

  const handleContact = () => {
    setShowContact(!showContact)
  }

 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100  pt-1 "> 
      {/* Hero Section */}
      <div className=" relative">
        {/* Background Image */}
        <div className='h-64 md:h-80  relative overflow-hidden'>
          <img 
            src={imgUrl} 
            alt="" 
            className="h-full w-full object-cover"
            
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent'/> 
        </div>

         {/* Profile Section */}
         <div className='relative max-w-6xl mx-auto  px-4  -mt-20'>
          <article className='bg-white/90 backdrop-blur-sm rounded-lg border-white/20 shadow-xl'>
            <section className='p-6 md:p-8'>
              <div className='flex flex-col md:flex-row gap-6 items-start' >
                {/* Avatar */}
                <div className='relative'> 
                   
                  <UserAvatar
                     className="w-32 h-32 border-4"
                     user={user}
                  />
                  <div className='absolute  -bottom-2 -right-2 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center bg-[#7676d7]'>
                    <div className='w-3 h-3 bg-green-400 rounded-full ' title="Disponible para proyectos"/>  
                  </div>
                </div>

                {/* Info Principal */}
                <div className='flex-1 space-y-4'>
                  <div> 
                    <h1 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
                      {user && user.userName}
                    </h1>
                    <div className='flex flex-wrap items-center gap-4  text-gray-600 mb-3 '>
                      <div className='flex items-center gap-2'>
                          <Building className="h-4 w-4" />
                          <span className='font-medium'>
                            {user && user.jobTitle}
                          </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <MapPin className="h-4 w-4" />
                        <span>
                          { user && user.location}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Calendar className="h-4 w-4" />
                        <span>Desde {new Date(user && user.createdAt).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "short",
                          day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <p className='text-gray-700 leading-relaxed mb-4'>
                      {user &&  user.biography}
                    </p>

                    {/* Tecnologías */}

                    <div className='flex flex-wrap gap-4 mb-4  '>
                      { user && user.technologies.map((tech, index) => (
                        <div key={index} className='text-xs bg-gray-100 border border-gray-300   p-1 rounded-lg font-semibold'>
                            {tech}
                        </div>
                      ))}

                      {user && user.technologies.length > 6 && (
                        <div className='text-xs'>
                          +{user && user.technologies.length - 6} mas
                        </div>
                      )}
                      
                    </div>
                  </div>

                    {/* Botones de acción */}
                  <div className='flex flex-wrap gap-3'>
                    <button 
                      onClick={handleContact}
                      className='flex items-center py-1 px-2 rounded-lg  text-white hover:opacity-90 bg-[#7676d7]'
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contactar
                    </button>
                  </div>
                </div>

                {/* Estadísticas */}
                <div className='grid  grid-cols-3 gap-4 text-center md:text-left'>
                  <div> 
                    <div className='text-2xl font-bold text-[#7676d7]'>
                      { projects && projects.length}
                    </div>
                    <div className='text-sm text-gray-600'>
                      Proyectos
                    </div>
                  </div>
                  <div>
                    <div className='text-2xl font-bold text-[#7676d7]'>
                        {stats?.totalFavorites || 0}
                    </div>
                    <div className="text-sm text-gray-600">
                      Estrellas
                    </div>
                  </div>
                   
                </div>
              </div>

              {/* Información de contacto expandible */}
              {
                showContact && (
                  <div className='mt-6 pt-6 border-t border-gray-200'>
                    <div className='flex items-center justify-center'>
                      <form  onSubmit={handleSubmitContact}>
                        <div className='w-[500px] h-[120px] '> 
                        <textarea 
                          name="email" 
                          id="" 
                          value={email}
                          cols="30"
                          onChange={handleChange}
                          className="w-full h-full border p-2 rounded border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                          placeholder={`Escribe un mensaje a ${user && user.userName}`}
                        />
                      </div>


                        <div className=' flex justify-end mt-2 mr-1'>
                        <button type='submit' className="flex justify-betwen bg-blue-600 text-white py-1 px-2 rounded">
                          Enviar mensaje
                        </button>
                        </div>
                      </form>
                    </div>
                    
                    {/*<h3 className='font-semibold text-gray-900'>
                      Información de contacto
                    </h3>
                    <div className='grid md:grid-cols-2 gap-4'>
                      <div className='space-y-3'>
                        <div className='flex items-center gap-3'>
                          <Mail className="h-4 w-4 text-gray-500" />
                          <a 
                            href={`mailto:${user && user[0].email}`}
                            className='text-blue-600 hover:underline'
                            >
                            {user && user[0].email}
                          </a>
                        </div>
                        <div className='flex items-center gap-3'>
                          <Globe className="h-4 w-4 text-gray-500" />
                          <a 
                            href={mockUser.website}
                            target='_blank'
                            className='text-blue-600 hover:underline'
                          >
                              {mockUser.website}
                          </a>
                        </div>
                      </div>
                      <div className='space-y-3'>
                        <div className='flex items-center gap-3'>
                          <Github className="h-4 w-4 text-gray-500" />
                          <a 
                            href={`https://github.com/${mockUser.github}`}
                            target='_blank'
                            rel="noopener noreferrer"
                            className='text-blue-600 hover:underline'
                          >
                            github.com/{mockUser.github}
                          </a>
                        </div>
                        <div className='flex items-center gap-3'>
                          <Linkedin className="h-4 w-4 text-gray-500" />
                          <a 
                            href={`https://linkedin.com/in/${mockUser.linkedin}`}
                            target='_blank'
                            rel="noopener noreferrer"
                            className='text-blue-600 hover:underline'
                          >
                             linkedin.com/in/{mockUser.linkedin}
                          </a>
                        </div>
                      </div>
                    </div>*/}
                  </div>
                )
              }
            </section>
          </article>
         </div>
      </div>

      {/* Sección de Proyectos */}
      <div className='max-w-6xl mx-auto  px-4 py-12'>
        <div className='mb-8'>
          <h2 className='text-2xl font-bold text-gray-900 mb-2 '>
            Proyectos Destacados
          </h2>
          <p className='text-gray-600'>
            Una selección de mis trabajos más recientes y destacados
          </p>
        </div>

        <ProjectListStyles projects={projects} projectList={false} />
      </div>

        
    </div>
  )
}
    