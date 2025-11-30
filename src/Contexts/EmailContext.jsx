import { createContext,  useState } from "react";



// eslint-disable-next-line react-refresh/only-export-components
export const EmailContext= createContext();  

export const EmailProvider =({children})  => {
    const [email,setEmail] = useState('');
     
    return (
        <EmailContext.Provider value={{email,setEmail}}>
            {children}
        </EmailContext.Provider>
    )
}

 
//export const useEmail = () => useContext(EmailContext);