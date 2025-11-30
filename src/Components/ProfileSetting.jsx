
import { ProfileStyles } from "./Styles/ProfileStyles"
import { useEditUser } from "../hooks/useUsers"
import { useEditImgProfile } from "../hooks/useUsers"
import { useDeleteImg } from "../hooks/useUsers"
import { useGetProfile } from "../hooks/useUsers"
import { useState, useEffect } from "react"



 export const ProfileSetting = () => {

    const editUserMutation = useEditUser()
    const deleteImgMutation = useDeleteImg()
    const editImgProfileMutation = useEditImgProfile()
    const {data:user }=useGetProfile()

    // Estado inicial vacío
    const [formData, setFormData] = useState({
      userName: "",
      email: "",
      jobTitle: "",
      biography: "",
      profilePicture:"",
      technologies: "",
      location: "",
      id:""
    });


    // Cuando llega el user del backend, sincronizas:
    useEffect(() => {
      if (user && user[0]) {
        setFormData({
          userName: user[0].userName || "",
          email: user[0].email || "",
          jobTitle: user[0].jobTitle || "",
          biography: user[0].biography || "",
          profilePicture:user[0].profilePicture || "",
          technologies:user[0].technologies || "",
          location:user[0].location || "",
          id:user[0].id || ""

        });
      }
    }, [user]);

 

   return (
     <div>
        <ProfileStyles  
          setFormData={setFormData}
          formData={formData}
          editUserMutation={editUserMutation}
          editImgProfileMutation={editImgProfileMutation}
          deleteImgMutation={deleteImgMutation}
          user={user}
           
        />
     </div>
   )
 }
 