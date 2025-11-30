
 
import { useGetUserSearch } from "../hooks/useUsers"
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Spinner } from "./Styles/Spinner";
import { NoResults } from "./Styles/NoResults";

 
export const SearchUser = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if(location.state?.initialSearch){
      setSearchTerm(location.state.initialSearch);
    }
   
  }, [location.state])

  const  {data:users, isLoading } = useGetUserSearch(searchTerm)
       


  if(isLoading){
    return <Spinner/>
  }   
    
 
  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100  p-4 md:p-8"> 
      <div className=" max-w-7xl mx-auto  ">

    
        {
          users && users.map((user) => ( 
            <div key={ user.id}>
              <Link to={`/portfolio/${user.id}`}>
              
            <div  className=" group hover:shadow-xl transition-all duration-300  bg-white/80   backdrop-blur-sm border-white/20 hover:scale-[1.02]  mt-4 flex  items-center gap-4  border border-gray-300 rounded-xl py-2 px-3">
              <div className="w-20 h-20">
                <img 
                  src={user.profilePicture} 
                  className="w-full h-full rounded-full"
                  alt="" />
                  
              </div>
              <p className="font-semibold text-lg">{user.userName}</p>
            </div>
            </Link>
            </div>

          ))
        }

        <NoResults searchResult={users} />
      </div>
    </div>
  )
}
