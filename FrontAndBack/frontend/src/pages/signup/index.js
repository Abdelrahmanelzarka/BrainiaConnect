import React, { useState,useEffect } from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Loader from 'react-loaders'
import Modal from "../../components/modal";
import "../login/index.css";

export default function SignUp(){

  const handleKeyClick=() => {navigate("/");}

    function validateEmail(email) {
        const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return regex.test(email);
      }
      function validatePassword(password) {
        // Regular expression for password validation
        const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d\s]).{8,}$/;
      
        // Test the password against the regular expression
        return regex.test(password);
      }
      

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
    const [password2,setPassword2] = useState('');
   
    const navigate = useNavigate();
     
    const registerUser = () => {
        if(email.length === 0){
            setModalMessage("Email has left Blank!");
            setShowModal(true);
          }
          else if(validateEmail(email) === false){
            setModalMessage("Please enter a Valid Email");
            setShowModal(true);
          }
          else if(password.length === 0){
            setModalMessage("Password has left Blank!");
            setShowModal(true);
          }
          else if(password.length <8)
          {
            setModalMessage("Password length must be greater than 8!");
            setShowModal(true); 
          }
          else if(password2!==password){
            setModalMessage("Password doesn't match!");
            setShowModal(true);
          }
          else if(validatePassword(password) === false){
            setModalMessage("Password Must have at least 1 special Character, 1 Capital Character, and 1 number.");
            setShowModal(true);
          }
          else
          {
        axios.post('http://127.0.0.1:5000/signup', {
            email: email,
            password: password
        })
        .then(function (response) {
             console.log(response);
            setModalMessage("Registered successfully !");
            setShowModal(true);
            setTimeout(() => {
                navigate("/");
              }, 2000);
            
        })
        .catch(function (error) {
            console.log(error, 'error');
            if (error.response.status === 409) {
                setModalMessage("This credentials are registered");
                setShowModal(true);
            }
        });
    }
    };
     
    let imgs = [
      'https://as2.ftcdn.net/v2/jpg/03/39/70/91/1000_F_339709132_H9HSSTtTmayePcbARkTSB2qoZTubJ6bR.jpg',
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
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3"> . </p>
                  </div>
 
                  <div className="form-outline mb-4">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="form3Example3" className="form-control form-control-md" placeholder="Enter a valid email" />
                    <label className="form-label" for="form3Example3">Email address</label>
                  </div>
 
             
                  <div className="form-outline mb-3">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="form3Example4" className="form-control form-control-md" placeholder="Enter password" />
                    <label className="form-label" for="form3Example4">Password</label>
                  </div>

                  <div className="form-outline mb-3">
                    <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} id="form3Example5" className="form-control form-control-md" placeholder="Enter password again" />
                    <label className="form-label" for="form3Example4">Confirm Password</label>
                  </div>
 
                 
 
                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="button" className="btn btn-primary btn-lg" onClick={() => registerUser()} >Sign Up</button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">Login to your account <a href="/login" className="link-danger">Login</a></p>
                  </div>
 
                </form>
              </div>
              <div className="col-md-9 col-lg-6 col-xl-5">
              <div className="key_40" style={{width:"65px", height:"38px", marginBottom:"10px",marginTop:"-50px",marginLeft:"230px", fontSize:"18px", fontWeight:"bold"}} onClick={() => handleKeyClick()} >back</div>
                <img src={imgs[0]} className="img-fluid"/>
              </div>
            </div>
          </div>
        </div>
        </div>
    </>}
    </>
  );
}