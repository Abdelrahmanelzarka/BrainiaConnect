import './index.css';
import { useState,useEffect, React} from 'react'
import Loader from 'react-loaders'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Team from '../../components/Team';
import axios from 'axios';
import HeadSet from '../../components/HeadSet';
import HowToUse from '../../components/HowToUse';
import TechSpecs from '../../components/TechSpecs';
import Locations from '../../components/Locations';
import Unicorn from '../../components/Unicorn';
import DiscoverUnicorn from '../../components/DiscoverUnicorn';
import Electrodes from '../../components/Electrodes';
import IonBattery from '../../components/IonBattery';





function About() {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/@me')
            .then(function (response) {
                console.log(response);
                setUser(response);
            })
            .catch(function (error) {
                console.log(error, 'error Not authenticated');
            });
  }, []);
  

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
<Navbar user={user} />
<div style={{height:"70px",width:"70%"}}></div>

<div style={{margin:"50px"}}>
<HeadSet/>
</div>

<div style={{margin:"40px"}}>
<Unicorn/>
</div>

<div style={{margin:"40px"}}>
<DiscoverUnicorn/>
</div>

<div style={{margin:"40px"}}>
<Electrodes/>
</div>

<div style={{margin:"40px"}}>
<IonBattery/>
</div>

<div style={{margin:"40px"}}>
<TechSpecs/>
</div>



<div style={{margin:"40px"}}>
<HowToUse/>
</div>

<div style={{margin:"40px"}}>
<h1 className="Location-title">Worldwide Locations</h1>
<Locations/>
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
