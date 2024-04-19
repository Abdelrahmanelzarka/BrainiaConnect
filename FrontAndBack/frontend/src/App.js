import { Routes , Route} from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Keyboard from './pages/gui'
import About from './pages/about';
import SignUp from './pages/signup';
import LoginPage from './pages/login';
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  
  
  

  return (
    <>
   
  <Routes>
  <Route path='*' element={<Home/>}/>
  <Route path='/About' element={<About/>}/>
  <Route path='/gui' element={<Keyboard/>}/>
  <Route path='/signup' element={<SignUp/>}/>
  <Route path='/login' element={<LoginPage/>}/>
 </Routes>
   
  </>
    
  );
}
export default App;
