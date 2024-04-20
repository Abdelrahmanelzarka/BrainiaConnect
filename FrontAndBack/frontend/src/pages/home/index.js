import './index.scss';
import { useState,useEffect, React} from 'react'
import Loader from 'react-loaders'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WelcomeParagraph from '../../components/WelcomeParagraph';


import axios from 'axios';




function Home() {
  axios.defaults.withCredentials = true;

  const [user, setUser] = useState(null);
  
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
      setLoading(false);
    }, 1500);
    }
  }, [loading]);

  useEffect(() => {
    axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/@me',{ withCredentials: true })
            .then(function (response) {
                console.log(response);
                setUser(response);
            })
            .catch(function (error) {
                console.log(error, 'error Not authenticated');
            });
  }, []);
  

  return (
    <> 
      {loading ?
      <div className='main'>
     <Loader type="ball-clip-rotate-multiple" />
     </div>:

<>     
<Navbar user={user}/>

<div style={{height:"70px",width:"100%"}}>

</div>

<WelcomeParagraph/>

<div style={{height:"600px",width:"100%"}}></div>

<Footer/>
</>


      }

     
     </>
  );
}

export default Home;
