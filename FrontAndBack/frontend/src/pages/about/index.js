import './index.css';
import { useState,useEffect, React} from 'react'
import Loader from 'react-loaders'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Team from '../../components/Team';





function About() {
  

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
<h1 style={{paddingLeft:"50px", color:"#01212e"}}>Meet the team:</h1>
<Team/>

<Footer/>
</>


      }

     
     </>
  );
}

export default About;
