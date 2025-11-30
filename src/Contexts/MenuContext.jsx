
import { createContext,  useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const MenuContext = createContext();

export const MenuProvider = ({children}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <MenuContext.Provider value={{isMenuOpen,toggleMenu}}>
            {children}
        </MenuContext.Provider>
    )
}

//export const useMenu = () => useContext(MenuContext)
