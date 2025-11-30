
import { useState, useEffect } from "react"
import { CreateProject } from "./CreateProject"
import { useMenu } from "../../hooks/useToggleMenu"
import { LogoutButton } from "./LogoutButton"
import {
  Search,
  Menu,
  Plus,
  Code2,
  User,
  Settings,
  LogOut,
  Bell,
  Heart,
  Bookmark,
  Moon,
  Sun,
  Briefcase,
  X
} from "lucide-react"
import {  UserRound } from 'lucide-react';
import { useGetProfile } from "../../hooks/useUsers"
import { UserAvatar } from "./UserAvatar"
import { Link } from "react-router-dom"
 
import { useNavigate } from "react-router-dom"
 


export const Navbar = () => {
     
    const [isHovered, setIsHovered] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();


    const {data:user }=useGetProfile()
 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   
    const {toggleMenu} = useMenu()

    const navigationItems = [
    {
      name: "Portafolio",
      routes: "/portfolio",
      icon: Briefcase,
      isActive: true,
      description: "Tu perfil público y showcase",
      
    },
    {
      name: "Mis Proyectos",
      routes: "/project-setting ",
      icon: Code2,
      isActive: false,
      description: "Gestiona tus proyectos",
    },
    {
      name: "Mi Perfil",
      routes: "/profile-setting",
      icon: User,
      isActive: false,
      description: "Configuración personal",
    },
  ]



  useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }

  // Limpieza por si el componente se desmonta con el menú abierto
  return () => {
    document.body.classList.remove('overflow-hidden');
  };
}, [isMobileMenuOpen]);



  const handleSearch = () =>  {
      if(searchTerm.trim()){
        navigate('/searchUser',{state: {initialSearch: searchTerm}})
      }
  }

  const handleKeyPress = (e) => {
    if(e.key == 'Enter') {
      handleSearch();
    }
  }
 
  
  //funcion para abrir el menu donde se encuetra el avatar o imagen
 const toggleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

 
  
  return (
     <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex items-center justify-between h-16 gap-2">

          {/* Logo y nombre */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#7676d7]">
                
                <Link to={'/'}>
                  <Code2 className="h-5 w-5 text-white"/>
                </Link>
              </div>
              <div>
                <Link to={'/'}>
                  <h1 className="text-xl font-bold text-[#7676d7]">
                    DevShowcase
                  </h1>
                </Link>
                <p className="text-xs text-gray-500 -m-1">by developers</p>
              </div>
            </div>
          </div>

           {/* Navegación desktop */}
          <div className="hidden md:flex items-center gap-3">
            {
              navigationItems.map((items)=> (
                <Link key={items.name} to={items.routes}>
                <button 
                  
                  variant={items.isActive ? "default" : "ghost"}
                  size="sm"
                  className={`flex items-center gap-2 ${
                    items.isActive ? "text-white" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg p-1"
                  }`}
                  style={items.isActive ? {backgroundColor:
                    "#7676d7",padding: "4px" ,borderRadius: "6px", opacity: isHovered ? 0.9 : 1} : {}}
                  title={items.description}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  
                  
                    <items.icon className="h-4 w-4" />
                    {items.name}
                  
                </button>
                </Link>
              ))
            }
          </div>

            
          {/* Búsqueda central */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform  -translate-y-1/2 text-gray-400 h-4 w-4"/>
              
              <form  onSubmit={(e) => {
                    e.preventDefault(); // Previene refresh de la página
                    handleSearch();
                }}  >

                <input 
                value={searchTerm}
                name="searchTerm"
                type="text" 
                
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                 
                placeholder="Buscar de usuarios ..."

                // Atributos para mejor experiencia móvil:
                inputMode="search"
                enterKeyHint="search"  // Muestra "🔍 Buscar" en teclado móvil

                className=" w-full pl-10 pr-4 border  border-gray-100 rounded-md px-3 py-1 text-black placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
                
                 
              />
              </form>
            </div>
          </div> 
          {/* Acciones del usuario */}


          {/* Botón subir proyecto */}
          <Link to={'/project-setting'}>
            <button 
              onClick={toggleMenu}
              className="mr-4 hidden sm:flex items-center p-1 gap-2 text-white hover:opacity-90 bg-[#7676d7] border rounded-lg "
            >
              <Plus className=" h-4 w-4" />
              Subir Proyecto 
            </button>
           </Link>

           
          <div className="flex gap-4"> 
              {/* Menú de usuario */}
            <div className="relative">
              
              <div>
                <button 
                  onClick={toggleMenuOpen}
                  
                >
                  <UserAvatar
                    className="h-8 w-8 border-1"
                    user={user &&  user[0]}
                  />
                  
                </button>
                
              </div>

              {/* Dropdown */}
              {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md p-4 z-50" >
              
                <div className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user && user[0].userName }</p>
                    <p className="text-xs leading-none text-muted-foreground">{ user && user[0].email}</p>
                  </div>
                </div>
                <hr className="mt-3 mb-2"/> 
               
 

                {navigationItems.map((items) => (
                  <div key={items.name}>
                    <Link to={items.routes}>
                      <div className="p-1 hover:bg-gray-100 rounded-lg px-2 flex items-center gap-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2">
                        <items.icon className="h-4 w-4" />  
                        {items.name}
                      </div>
                    </Link>  
                  </div>
                ))}

                <hr className="mt-3 mb-2 border-2" /> 

                <div className="p-1 hover:bg-gray-100 rounded-lg px-2 flex items-center gap-2  transition duration-300 ease-in-out focus:outline-none focus:ring-2">
                  <Heart className="h-4 w-4" />
                  Favoritos
                </div>
                <div className="p-1 hover:bg-gray-100 rounded-lg px-2 flex items-center gap-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2">
                  <Bookmark className="h-4 w-4" />
                  Guardados
                </div>

                <div className="p-1 hover:bg-gray-100 rounded-lg px-2 flex items-center gap-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2">
                  <Settings className="h-4 w-4" />
                  Configuración
                </div>
                <hr className="mt-3 mb-2 border-2" />
                 {/**boton para cerrar sesion */}
                <LogoutButton />
              </div>
              )}

            </div>



            {/* Menú móvil */}
            <div className=" relative   z-50">
              <div className="py-2">
                <button onClick={toggleMobileMenu} className="md:hidden">
                  <Menu   className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </button>
              </div>

              {isMobileMenuOpen && (
                
               <> 
                <div
                  className="fixed inset-0  min-h-screen  bg-black/30 backdrop-blur-sm z-40"
                  onClick={toggleMobileMenu}
                />
                  
                <div className={`fixed top-0 right-0   h-screen w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
                      isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                      }`}>
                
                  <div className="fixed top-0 left-0 w-full  h-full z-50 p-4 flex flex-col gap-4    ">
                    {/* Encabezado */}  
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md flex items-center justify-center bg-[#7676d7]">
                          <Code2 className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-[#7676d7]">DevShowcase</span>
                      </div>
                      <button onClick={toggleMobileMenu}>
                        <X  size={18}/>
                      </button>
                    </div>
                  
                    <p className="text-sm text-gray-600">Descubre y comparte proyectos increíbles</p>
                    

                    <div className="mt-6 space-y-4 ">
                      {/* Búsqueda móvil */}
                      <div className="relative  ">
                        <Search   className=" text-gray-400 absolute  left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 " />
                        

                        <form  onSubmit={(e) => {
                          e.preventDefault(); // Previene refresh de la página
                          handleSearch();
                        }}>

                          <input 
                            value={searchTerm}
                            name="searchTerm"
                            type="text" 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyPress}
                 
                            placeholder="Buscar de usuarios ..."

                            // Atributos para mejor experiencia móvil:
                            inputMode="search"
                            enterKeyHint="search"  // Muestra "🔍 Buscar" en teclado móvil
                            className="pl-10 w-full px-3 py-1   border border-gray-600   rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                          />

                        </form>
                      </div>
                    </div>

                    {/* Navegación móvil */}
                    <div className="space-y-2">
                       
                      {navigationItems.map((item) => (
                        <button
                          key={item.name}
                          className=" pl-3  px-2 w-full hover:bg-gray-200   rounded-lg  "
                          style={item.isActive ? {backgroundColor: "#7676d7", color: "white",   } : {}}
                        >
                          <Link to={item.routes}> 
                            <div className="flex items-center  gap-2">
                              <item.icon className="h-4 w-4   " />
                              <span className="text-sm">{item.name}</span>
                            </div>
                            <div className="flex flex-col items-start">
                              <span 
                                className={`text-xs  ${item.isActive ? 'text-gray-300' : 'text-gray-500'}`}
                              >
                                {item.description}
                              </span>
                            </div>
                          </Link>
                        </button>
                      ))}
                    </div>

                      <hr className="border-2" />

                      {/**subir proyecto */}
                    <div className="border-t pt-4 space-y-2">
                      <Link to='/project-setting' >
                        <button 
                          className="flex p-1  w-full justify-start gap-3 bg-[#7676d7] text-white hover:opacity-90 rounded-lg " 
                          onClick={toggleMenu}
                          >
                          <Plus className="h-4 w-4 flex  mt-1" />
                          Subir Proyecto 
                        </button>
                      </Link>
                    </div>

                      {/**avatar */}
                    <div  className="border-t pt-4 space-y-2">
                      <div className="flex gap-3">
                        <Link to={'/portfolio'}>
                           
                          <UserAvatar
                            className="h-9 w-9 border-1"
                            user={user && user[0]}
                          /> 
                          
                        </Link>
                       
                        <div >
                          <p>{user && user[0].userName}</p>
                          <p className="text-xs text-gray-500">{user && user[0].email}</p>
                        </div>
                      </div>
                    </div>

                      

                  </div>
                  
                </div>
               </>
              )}
            </div>

          </div>
        </div>
      </div>
     </nav>
  )
}
