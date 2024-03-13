import './index.scss';
import { useState,useEffect, React} from 'react'
import { useLocation } from 'react-router-dom'
import Loader from 'react-loaders'

import { Link } from 'react-router-dom';



function Home() {
  

  return (
    <> 
     <div className='main'>
     <Loader type="ball-clip-rotate-multiple" />
     </div>
     </>
  );
}

export default Home;
