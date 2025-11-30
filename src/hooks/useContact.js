
import contactServices from "../services/contactServices"
import { useMutation } from "@tanstack/react-query"

export const useContactEmail = () => {
    const contactMutation = useMutation({
        mutationFn:contactServices.createContactEmail,
        onSuccess:() => {

        },
        onError: () => {
            console.error('Error al crear contacto via email')
        }
    })

    return contactMutation;
}