


export const ResetPassworForm = ({onlyEmail, textButton, subTitle, handleChange,email, handleSubmit, credentials, loading, error}) => {
     
  return (
     <div className="main-h-screen  flex items-center justify-center h-screen  bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 p-6"> 
        <div className="w-full max-w-md bg-white/20 backdrop-blur-md border border-white/30 rounded-lg shadow-xl  text-black p-10">
        <div>
              
          <div>
            <h1 className="text-xl mb-5 font-bold text-gray-800"> Recupera tu cuenta</h1>
          </div>
          <p className="mb-3"> {subTitle} </p>
        </div>

          <form onSubmit={handleSubmit}  className="space-y-6">
           {  onlyEmail ?  
            <div>
              <label 
                htmlFor="email" 
                className="ml-1 block text-sm font-medium "
                >
                email
              </label>
              <input 
                type="text" 
                name='email'
                value={email}
                onChange={handleChange}
                placeholder="user@gmail.com"
                
                className="w-full px-3 py-2 border border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                required
                />
            </div>
            :( 
            <>
            <div>
              <label 
                htmlFor="code" 
                className="ml-2 block text-sm font-medium "
                >
                code
              </label>
              <input 
                type="text" 
                name='code'
                value={credentials.code}
                onChange={handleChange}
                placeholder="your code"
                 
                className="w-full px-3 py-2 border  border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                required
               />
            </div>
            <div>
              <label 
                htmlFor="password" 
                className="ml-2 block text-sm font-medium "
                >
                Passwors
              </label>
              <input 
                type="password" 
                name='password'
                value={credentials.password}
                onChange={handleChange}
                placeholder="*******"
                className="w-full px-3 py-2 border  border-gray-600 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                required
                />
            </div>
            {
              error ? (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              ⚠️ {error}
            </div>
              ) : (
                ""
              )
            }
            
      
            </>
            )}

            <div className="flex justify-end">  
               <button
                  type="submit"
                  disabled={loading}
                  className={`${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#5a5ac4] hover:bg-[#4b4bb0]"
                  } text-white font-bold py-2 px-3 rounded-md transition duration-300 ease-in-out flex items-center justify-center gap-2`}
                >
                  {loading && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                  )}
                    {loading ? "Enviando..." : textButton}
                </button>

            </div>
          </form>
        </div>     
    </div>
  )
}
