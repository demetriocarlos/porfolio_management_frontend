
 import { UserRound } from "lucide-react"
 


export const UserAvatar = ({className, user}) => {
     
    
  return (               
     
    <div 
        className={`  border-white rounded-full shadow-lg relative overflow-hidden ${className}`}
    >             
        {
            user && user?.profilePicture 
            ? <img 
                src={user && user.profilePicture}
                alt={user && user.profilePicture} 
                className='w-full h-full rounded-full object-cover '
            />  
            : <UserRound
                className='w-full h-full rounded-full object-cover bg-gray-200 text-gray-500 '
            />
        }
    </div>
     
  )
}
