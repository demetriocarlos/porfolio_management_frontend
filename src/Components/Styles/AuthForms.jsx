
import { Link } from "react-router-dom"
import { Github } from "lucide-react"


export const AuthFormsStyles = ({handleChange,handleSubmit,handleGithubLogin, credentials, login, texto, descriptionLink, namelink}) => {
    return (
        <div className="main-h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200   p-6">
            <div className="w-full max-w-md bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-xl  text-black p-10">
                <div className="text-center mb-8">
                     
                        <div className="flex items-center justify-center mb-7">
                        <p className="text-3xl  text-[#5a5ac4] ">{'</>'}</p>
                        <h2 className="text-3xl font-bold text-gray-700">DevLog</h2>
                    </div>
                     
                    
                    <p className="text-gray-800  mt-2 text-gray-600">{texto}</p>
                </div>

                <button
                    className="flex items-center justify-center   w-full mb-8 bg-[#24292e]  hover:bg-[#1b1f23] text-white text-base font-medium py-2 px-4 rounded-md transition-colors duration-300 ease-in-out focus:outline-none   "
                    onClick={handleGithubLogin}
                >
                   
                    <div className="flex">
                        <Github   className="mr-1"/>
                         <p className="text-sm">Acceder con GitHub</p>
                    
                    </div>
                </button>
                
                <form  onSubmit={handleSubmit}  className="space-y-6">
                    { 
                    login ? '' :
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium  mb-1">
                            Nombre de usuario
                        </label>
                        <input 
                            type="text"
                            name="userName" 
                            onChange={handleChange}
                            value={credentials.userName}
                            className="w-full px-3 py-2  border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            placeholder="UserName"
                            required
                        />
                    </div>
                    }
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium  mb-1">
                            Correo electrónico
                        </label>
                        <input 
                            type="email" 
                            name="email"
                            onChange={handleChange}
                            value={credentials.email}
                            className="w-full px-3 py-2  border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            placeholder="tu@correo.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium  mb-1">
                            Contraseña
                        </label>
                        <input 
                            type="password" 
                            name="password"
                            onChange={handleChange}
                            value={credentials.password}
                            className="w-full px-3 py-2  border border-gray-600 rounded-md text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                     <div>
                         
                         <Link 
                            className=" underline underline-offset-2   text-gray-800  hover:text-gray-900"
                            to='/forgot-password'
                         
                         >
                            ¿Olvidaste la contraseña?
                         </Link>
                    </div>

                    
                    <div>
                        <button
                            type="submit"
                            //bg-gray-700
                            //#7676d7
                            className="w-full bg-[#7676d7]   hover:bg-[#5a5ac4] text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 "
                        >
                            Enviar
                        </button>
                    </div>

                   
                    <div className="flex">
                        <p className="  py-1">{descriptionLink}</p>
                         <Link
                            className="rounded-md px-3 py-2  text-sm font-medium  text-blue-500 hover:text-blue-600"
                            to={login ? '/createAccount': '/login'}
                         >
                            {namelink}
                         </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}