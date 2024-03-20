import { Routes , Route} from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Keyboard from './pages/gui'

function App() {
  
  
  

  return (
    <>
   
  <Routes>
  <Route path='*' element={<Home/>}/>
  <Route path='/gui' element={<Keyboard/>}/>
 </Routes>
   
  </>
    
  );
}
export default App;
