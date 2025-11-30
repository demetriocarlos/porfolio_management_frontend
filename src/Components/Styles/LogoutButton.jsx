 
 import { LogOut } from "lucide-react"
 import { useAuth } from "../../hooks/useAuth"

export const LogoutButton = () => {
    const { logout } = useAuth();
    const handleLogout = () => {
        if(window.confirm('¿Desea cerrar sesión?')) {
            logout()
        }
    }
  return (
    <div> 
        <button onClick={handleLogout} className="p-1 hover:bg-gray-100 rounded-lg px-2 flex items-center gap-2 text-red-600 hover:text-black transition duration-300 ease-in-out focus:outline-none focus:ring-2">
            <LogOut className="h-4 w-4" />
            Cerrar Sesión
        </button>
    </div>
  )
}
