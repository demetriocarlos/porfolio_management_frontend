import { useContext } from "react";
 
import { MenuContext } from "../Contexts/MenuContext";

export const useMenu = () => useContext(MenuContext)