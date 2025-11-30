import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from './hooks/useAuth';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { CreateAccount } from "./Components/CreateAccount"
import { Login } from "./Components/Login"
import { GithubCallback } from './pages/GithubCallback';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { ProjectList } from './Components/ProjectList';
import { Navbar } from './Components/Styles/Navbar';
import { ProfileSetting } from './Components/ProfileSetting';
import { ProjectSetting } from './Components/ProjectSetting';
 import { SearchUser } from './Components/SearchUser';
import { PorfolioSettings } from './Components/PorfolioSettings';
import { ScrollToTop } from './Components/ScrollToTop';


function App() {
  const {state, dispatch} = useAuth()

   

  useEffect(() => {
    const loggedUserJSON = localStorage.getItem('loggedInUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      dispatch({type:'LOGIN', payload:user})
    }
  }, [dispatch])

  if (!state) {
    return <div>Cargando...</div>;
  }


//<CreateCount />
  return (
    <>
      <div>
        {
          <Router>
              <ScrollToTop />
              <ToastContainer /> 
              <nav>
                {state.userName && <Navbar />}
              </nav>
            <Routes>
              <Route path='/'  element={state.userName ?  <ProjectList/> : <Navigate to="/login"/> }/>
              <Route path='/profile-setting'  element={state && state.userName ? <ProfileSetting /> : <Navigate to="/login"/>} />

              <Route path='/project-setting' element={  <ProjectSetting /> } />
              <Route path='/portfolio' element={<PorfolioSettings />} />
              <Route path='/portfolio/:id' element={<PorfolioSettings />} />
              <Route path='/searchUser'  element={<SearchUser/>} />

              <Route path='/login' element={state.userName ? <Navigate to="/"/> : <Login/>}/>
              <Route path='/createAccount' element={state.userName ? <Navigate to="/"/> : <CreateAccount/>} />
              <Route path='/github-callback' element={/*state.userName ? <Navigate to="/"/> :*/ <GithubCallback/>}/>
              <Route path='/forgot-password'  element={<ForgotPassword/>}/>
              <Route path='/reset-password'  element={<ResetPassword/>}/>
            </Routes>
          </Router>
        }
      </div>
       
    </>
  )
}

export default App
