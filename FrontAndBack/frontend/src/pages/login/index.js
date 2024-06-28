import React, { useState,useEffect } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Loader from 'react-loaders'
import'./index.css';
import Modal from "../../components/modal";
 
export default function LoginPage(){
    const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const closeModal = () => {
    setShowModal(false);
  };

    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (loading) {
        setTimeout(() => {
        setLoading(false);
      }, 1000);
      }
    }, [loading]);
 
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
   
    const navigate = useNavigate();
    
    const handleKeyClick=() => {navigate("/");}


    const Forgetpass=() =>{        
        axios.post('http://localhost:5000/forget-password', {
          email: email
      })
      .then(function (response) {
          console.log(response);
          setModalMessage(response.data.message);
          setShowModal(true);
      }) .catch(function (error) {
        console.log(error, 'error');
        if (error.response.status === 401) {
            setModalMessage("Please provide a registered email");
            setShowModal(true);
        }
        if (error.response.status === 500) {
            setModalMessage("There's an error please try again later");
            setShowModal(true);
        }
    });
    }
    
    const logInUser = () => {
        if(email.length === 0){
          setModalMessage("Email has left Blank!");
          setShowModal(true);
        }
        else if(password.length === 0){
          setModalMessage("password has left Blank!");
          setShowModal(true);
        }
        else{
            axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            })
            .then(function (response) {
                console.log(response);
                navigate("/");
            })
            .catch(function (error) {
                console.log(error, 'error');
                if (error.response.status === 401) {
                    setModalMessage("Invalid credentials. Please try again.");
                    setShowModal(true);
                }
            });
        }
    }
 
    let imgs = [
      'https://as1.ftcdn.net/v2/jpg/03/39/70/90/1000_F_339709048_ZITR4wrVsOXCKdjHncdtabSNWpIhiaR7.jpg',
    ];
     
  return (
    <> 
    {loading ?
    <div className='main'>
   <Loader type="ball-clip-rotate-multiple" />
   </div>:
   <>
    
    {showModal && <Modal message={modalMessage} closeModal={closeModal} />}
       <div className="login">
        <div className="container h-100 animatepop">
          <div className="container-fluid h-custom">
         
            <div className="row d-flex justify-content-center align-items-center h-100">
           
              <div className="col-md-9 col-lg-6 col-xl-5">
              <div className="key_40" style={{width:"65px", height:"38px", marginBottom:"10px",marginTop:"-50px", fontSize:"18px", fontWeight:"bold"}} onClick={() => handleKeyClick()} >back</div>
                <img src={imgs[0]} className="img-fluid" />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3"> . </p>
                  </div>
 
                  <div className="form-outline mb-4">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email" />
                    <label className="form-label" for="form3Example3">Email address</label>
                  </div>
 
             
                  <div className="form-outline mb-3">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" />
                    <label className="form-label" for="form3Example4">Password</label>
                  </div>
 
                  <div className="d-flex justify-content-between align-items-center ">
                    
                    <a onClick={Forgetpass} className="text">Forgot password?</a>
                  </div>
 
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" onClick={logInUser} >Login</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0" >Don't have an account? <a href="/signup" className="link-danger">Register</a></p>
                  </div>
 
                </form>
              </div>
            </div>
          </div>
          </div>
    </div>
    </>}
 
    </>
  );
}