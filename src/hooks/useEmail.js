import { useContext } from "react"
import { EmailContext } from "../Contexts/EmailContext"


export const useEmail = () => useContext(EmailContext);