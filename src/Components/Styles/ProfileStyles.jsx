import { MdBrowserUpdated } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { Upload, Trash2, User, Mail, Briefcase, Save, Camera, CheckCircle, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react";
import { ImSpinner4 } from "react-icons/im";
 
import { useRef } from "react";
 
import { UserAvatar } from "./UserAvatar";
 

export const ProfileStyles = ({setFormData,  formData , editUserMutation, editImgProfileMutation,deleteImgMutation, user,        }) => {
 
  const fileInputRef = useRef(null);

  const [mensaje, setMensaje] = useState('')
 
  const [selectedImage, setSelectedImage] = useState(null);
   
 

  const handleChange =(e) => {
    const {name,value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}))
  }


  
   const handleSubmit = async (e) => {
    e.preventDefault()

     if(Object.keys(  formData).length === 0){
      return
     }

      
    if (!user || !user[0]) return;
 
  const original = user[0];
  const changes = {};


  // Detectar cambios en campos simples
  ["userName", "email", "jobTitle", "biography", "location"].forEach(key => {
    const newValue = formData[key].trim();
    const oldValue = (original[key] || "").trim();

    if ( newValue !== oldValue && newValue !== ""){
      changes[key] = newValue
    }
  });


  // Detectar cambios en technologies
  const techString = formData.technologies.trim();
  const oldTechString= Array.isArray(original.technologies)
    ? original.technologies.join(", ")
    : original.technologies || "";

  if(techString !== oldTechString) {
    changes.technologies = techString
      .split(",")
      .map(t => t.trim())
      .filter(Boolean); // evita strings vacíos
  }


    // Verificar si hay cambios
  if (Object.keys(changes).length === 0) {
     
     setMensaje('No hay cambios válidos para guardar')
    return;
  }
   
     editUserMutation.mutate({
      id:user && user[0].id,
      //...editProfile
      ...changes, 
     })
  }
 
  setTimeout(() => {
      setMensaje("");
    }, 4000);

    
  useEffect(() => {
    if(!editImgProfileMutation.isPending){
      return  setSelectedImage(null)    
    }
  },[editImgProfileMutation.isPending])  
   

//console.log('selectImg', selectedImage)

  const handleImageUpload = () => {
    if(!selectedImage || !user || !user[0]) return

    const formData = new FormData();
    formData.append("image", selectedImage);


    editImgProfileMutation.mutate({
      id:user[0].id,
      img: formData
    })
 
  }
   

  const handleImageDelete = () => {

    if(!formData.profilePicture){
      return window.confirm('No se encontro ninguna imagen')
    }
    
    if(window.confirm('¿Estás seguro que quieres eliminar la imagen?')){
      return deleteImgMutation.mutate({ id:formData.id})
    }
  }

   const handleCancelEdit = () => {
     
    if (user && user[0]) {
    setFormData({
      userName: user[0].userName || "",
      email: user[0].email || "",
      jobTitle: user[0].jobTitle || "",
      biography: user[0].biography || "",
    });
  }   
  }
  

  const cancelUpdatedImg = () => {
     
      setSelectedImage(null)
      // Limpia el input para que pueda volver a aceptar el mismo archivo
      if(fileInputRef.current){
        fileInputRef.current.value="";
      }   
     
  };
 
  
  
  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100  p-4 md:p-8 "> 

      <div className="max-w-4xl mx-auto space-y-8   ">
          {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold   text-gray-900 mb-2">Configuración del Perfil</h1>
          <p className="text-gray-600">Actualiza tu información personal y profesional</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8"> 
          {/* Sidebar - Información del perfil */}
          <div className="lg-col-span-1 ">
            <article className="bg-white/80 backdrop-blur-sm border-white/20 p-2 rounded-lg">
                <header className="text-center">
                  <div className="flex flex-col  items-center space-y-4">
                    <div className="relative">
                        {/**avatar del usuario */}
                        <UserAvatar
                            className="w-24 h-24   "
                            user={user && user[0]}
                          />
                             
                          {/**input para subir img No visible */}
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          id="profileImage"    
                          ref={fileInputRef}
                          onChange={(e) => setSelectedImage(e.target.files[0])}
                          placeholder="yfhtydvjhfyutfers"
                        />

                        {/**opcion de subir img */}
                        <label
                          htmlFor="profileImage"
                          className=" flex items-center justify-center cursor-pointer  absolute -bottom-2 -right-2 rounded-full w-8 h-8  p-0 bg-[#7676d7] "
                        >
                          <Camera className="h-4 w-4 text-white " />
                        </label>
                    </div>


                      {/* Si selecciona imagen → mostrar preview + botón subir */}
                    <div className="bg-gray-700">
                     { selectedImage && (
                          <div className="  relative border border-blue-500 z-50" >
                            
                            <div
                              className={`  flex items-center   fixed  top-0  left-0  w-full h-full   bg-white/90 backdrop-blur-sm border-white/20 p-4 rounded-lg   z-50 p-4 flex flex-col gap-4 `}
                            >
                            {/* Vista previa */}   
                            
                            <img 
                              src={URL.createObjectURL(selectedImage)} 
                              alt="Preview"
                              className="   w-48 h-48 rounded-full object-cover border border-4 border-white"
                             />

                            {/* Botón de subir */}

                            <button
                              onClick={() => handleImageUpload(selectedImage)}
                              disabled={editImgProfileMutation.isPending}
                              className="flex items-center gap-2 bg-white hover:bg-gray-200 border border-[#7676d7] rounded-lg px-3 py-1"
                            >

                              { editImgProfileMutation.isPending ? (
                                <>
                                  <ImSpinner4 className="animate-spin h-4 w-4 text-[#7676d7]" />
                                  Subiendo...
                                </>
                              ) : (
                                <>
                                  <Upload className="h-4 w-4  text-[#7676d7]" />
                                  <p className="text-[#7676d7]">Subir Imagen</p>
                                </>
                              )}
                            </button>
      
                              {/**boton para cancelar subir img*/}
                            <button
                              type="button"  
                              onClick={cancelUpdatedImg}
                              className=" border  border-gray-200 py-1 px-4 rounded-lg bg-white hover:bg-gray-100"
                              >
                              Cancelar
                            </button>
                            </div>
                          </div>
                        )
                      }
                    </div>




                    <div className="space-y-2" >
                      <h3 className="font-semibold text-lg">{formData.userName}</h3>
                      <p className="text-xs">
                        {formData.jobTitle}
                      </p>
                    </div>
                  </div>
                </header>

                <section className="space-y-4 mt-3">
                   <div className="flex justify-center gap-4">
                      <label
                         htmlFor="profileImage"
                        className="flex items-center gap-2  cursor-pointer bg-transparent border bg-gray-100 hover:bg-gray-200 rounded-lg p-1"
                      >
                        <Upload className="h-4 w-4" />
                        Actualizar
                      </label>


                      {/**boton para eliminar imagen */}
                      <button    
                        type="button"
                        onClick={handleImageDelete}
                        disabled={deleteImgMutation.isPending}
                        

                        className="flex items-center gap-2 text-red-600 hover:text-gray-700 bg-transparent border bg-gray-100 hover:bg-gray-200   rounded-lg p-1"
                      >
                        {deleteImgMutation.isPending ? (
                          <>
                            <ImSpinner4  className="h-4 w-4 animate-spin text-red-500  " />
                            Eliminando
                          </>
                        ):(
                          
                          <>
                            <Trash2 className="h-4 w-4" />
                            Eliminar
                          </>
                        )


                        }
                        

                      </button>
                   </div>
                   <hr />
                    <br />

                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="h-4 w-4" />
                        <span>{user && user[0].email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                          
                          {
                            user && user[0].jobTitle ?
                            (
                            <>
                              <Briefcase className="h-4 w-4" />
                              <span>{ user[0].jobTitle}</span>
                            </>
                            ):(
                              ""
                            )

                          }
                      </div>
                    </div>
                </section>
            </article>
          </div>

 
          {/* Formulario principal */}
          <div className="lg:col-span-2 ">
            <article className="bg-white/80 backdrop-blur-sm border-white/20 p-4 rounded-lg ">
              <header>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-[#7676d7]"/>
                  
                  <h2 className="font-semibold text-xl">Información Personal</h2>
                </div>
                <p className="text-gray-600">
                  Actualiza tu información personal y profesional
                </p>
              </header>

              <section>
                <form  onSubmit={handleSubmit} className="space-y-6 mt-5">
                  {/* Información básica */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="userName " className="text-sm text-gray-900  font-medium"> 
                        Nombre completo *
                      </label>
                      <input 
                        type="text" 
                        name="userName"
                        id="userName"
                        value={formData.userName }
                        required
                        onChange={handleChange}
                        className={`  text-gray-900 w-full px-3 py-1   border border-gray-400 rounded-md pl-2  focus:outline-none focus:ring-2 focus:border-transparent focus:ring-gray-400    `}
                      />

                       
                    </div>

                    <div className="space-y-2 md-flex-cols-1 ">
                      <label htmlFor="email" className="text-sm text-gray-900 font-medium">
                          Email *
                      </label>
                      <input 
                        id="email"
                        name="email"
                        type="email" 
                        value={formData.email } 
                        required
                        onChange={handleChange}
                        className={`  text-gray-900 w-full px-3 py-1  border border-gray-400 rounded-md pl-2  focus:outline-none focus:ring-2 focus:border-transparent focus:ring-gray-400   `}
                        placeholder="tu@email.com"
                      />
                    </div>

                  </div>

                    
                    {/* Información profesional */}
                  <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="position" className="text-sm text-gray-900 font-medium"> 
                          Cargo/Posición
                        </label>
                        <input 
                          id="position"
                          name="jobTitle"
                          type="text" 
                          value={formData.jobTitle}
                          onChange={handleChange}
                            
                          className="  text-gray-900 w-full px-3 py-1  border border-gray-400 rounded-md pl-1  focus:outline-none focus:ring-2 focus:border-transparent focus:ring-gray-400"
                          placeholder="Escribe tu cargo"
                        
                        />
                      </div>
                  </div> 

                      {/**ubicacion resolver pendiente */}
                  <div>
                    <label htmlFor="location">Ubicacion </label>
                    <input 
                       id="location" 
                      type="text" 
                      name="location" 
                      value={formData.location}
                      onChange={handleChange}
                      className="text-gray-900 w-full px-3 py-1  border border-gray-400 rounded-md pl-1  focus:outline-none focus:ring-2 focus:border-transparent focus:ring-gray-400"
                      placeholder=" Escribe tu ubicacion"
                      />
                  </div>

                  <div>
                    <label htmlFor="technologies"> Tecnologías </label>
                    <input 
                      type="text" 
                      name="technologies" 
                      id="technologies" 
                      value={formData.technologies}
                      onChange={handleChange}
                      className="text-gray-900 w-full px-3 py-1  border border-gray-400 rounded-md pl-1  focus:outline-none focus:ring-2 focus:border-transparent focus:ring-gray-400"
                      placeholder="React, TypeScript, Tailwind"
                      />
                  </div>

                  {/* Biografía */}
                  <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium text-gray-900">
                       Biografía *
                    </label>
                    <textarea 
                      name="biography" 
                      id="bio" 
                      value={formData.biography }
                      onChange={handleChange}
                     // required
                      className={`  text-gray-900 w-full px-3 py-7   min-h-[100px}  border border-gray-600 rounded-md pl-1  focus:outline-none focus:ring-2 focus:border-transparent focus:ring-gray-400 `}
                      placeholder="Cuéntanos sobre ti, tus habilidades y experiencia..."
                    />  

                    <div className="flex justify-between items-center">
                       
                        <p className="text-sm text-gray-500">{ user && user?.[0]?.biography && user?.[0]?.biography.length }/500 caracteres</p>
                      
                    </div>
                  </div>

                  <p className="text-red-500">{mensaje}</p>

                  {/* Botones de acción */}
                  <div className="flex gap-4 pt-6"> 
                    <button
                      type="submit"
                      disabled={editUserMutation.isPending}                                                                                                         // 
                      className={`flex-1 md:flex-none  flex items-center justify-center p-2 rounded-lg text-white hover:opacity-90      ${editUserMutation.isPending ? 'opacity-70 cursor-not-allowed bg-gray-400' : 'bg-[#7676d7]' }  `}
                    >
                      { editUserMutation.isPending ? (
                        <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2">
                           <ImSpinner4 />
                        </div>
                        Guardando...
                        </>
                      ): (
                        <>
                         
                          <Save className="h-4 w-4 mr-2" />
                          Guardar cambios
                        </>
                      )

                      }
                    </button>
                    <button 
                      type="button" 
                      variant="outline" 
                      onClick={handleCancelEdit}
                      className="hover:opacity border p-1 rounded-lg bg-indigo-100 hover:bg-gray-100"
                    >  
                      Cancelar
                    </button>

                  </div>
                </form>
              </section>

            </article>
          </div>

        </div>
          
      </div>
     </div>
  )
}
