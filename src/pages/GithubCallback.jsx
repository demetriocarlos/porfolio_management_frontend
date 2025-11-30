import { useEffect,  } from "react";
import { useLoginGithub } from "../hooks/useAuth";
 
import {PulseLoader} from "react-spinners"


export const GithubCallback = () => {
     
    const githubMutation= useLoginGithub();
     
    
     
    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get("code");
         
        if(code){
               githubMutation.mutate(code);
        }
    },[])

     
     
    return (
        <div className="  flex items-center justify-center h-screen  ">
           
            <p className="mb-2 text-lg font-medium text-gray-700 animate-pulse">Procesando inicio de sesión con GitHub</p>
            <PulseLoader size={5}  color="#7676d7" />
        </div>
    
)
}








