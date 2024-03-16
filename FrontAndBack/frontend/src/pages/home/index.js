import './index.scss';
import { useState,useEffect, React} from 'react'
import { useLocation } from 'react-router-dom'
import Loader from 'react-loaders'

import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';





function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
      setLoading(false);
    }, 1500);
    }
  }, [loading]);
  

  return (
    <> 
      {loading ?
      <div className='main'>
     <Loader type="ball-clip-rotate-multiple" />
     </div>:

<>     
<Navbar/>

<div style={{height:"600px",width:"100%"}}>

</div>

<Footer/>
</>


      }

     
     </>
  );
}

export default Home;
