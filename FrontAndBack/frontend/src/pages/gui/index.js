
import React, { useState,useEffect } from 'react'; 
import Loader from 'react-loaders'
import './index.scss'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft,faMicrophone,faPowerOff} from '@fortawesome/free-solid-svg-icons' 

export default function Keyboard() { 
    const [complete, setComplete] = useState('');
	const [preinput, setPreinput] = useState('');
	const [flag, setFlag] = useState(0);
    async function auto(preinput) {
		console.log(preinput)
		const url = 'https://typewise-ai.p.rapidapi.com/completion/complete';
		const options = {
		  method: 'POST',
		  headers: {
			'content-type': 'application/json',
			'X-RapidAPI-Key': '822faa135cmsh46dd819c637e709p1b2a20jsnb0f996ce58b9',
			'X-RapidAPI-Host': 'typewise-ai.p.rapidapi.com'
		  },
		  body: JSON.stringify({  // Stringify the object into a JSON string
			text: preinput,
			correctTypoInPartialWord: false,
			language: 'en'
		  })
		};
	  
		try {
		  const response = await fetch(url, options);
		  const result = await response.text();
		  const responseObject = JSON.parse(result);
		  
		  console.log(responseObject.predictions[0].text);
		  setComplete(responseObject.predictions[0].text.slice(preinput.length))

		} catch (error) {
		  console.error(error);
		  setComplete("")
		}
	  }

	async function getVoiceFromText(inputText) {
		if(inputText.length==0)
		{
			return;
		}
		const apiKey = "a2cf0958d6b24e1cb1e5040d37608cd1"; // Replace with your actual API key
		const voiceRssUrl = `http://api.voicerss.org/?key=${apiKey}&hl=en-us&src=${inputText}&c=MP3&r=0&v=John`; // Specify audio format (MP3)
	  
		try {
		  const response = await fetch(voiceRssUrl);
	  
		  if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		  }
	  
		  const audioBlob = await response.blob();
	  
		  const audioContext = new AudioContext();
		  const audioUrl = URL.createObjectURL(audioBlob);
	  
		  const audioSource = await fetch(audioUrl);
		  const audioSourceData = await audioSource.arrayBuffer();
	  
		  audioContext.decodeAudioData(audioSourceData, (buffer) => {
			const audioBufferSource = audioContext.createBufferSource();
			audioBufferSource.buffer = buffer;
			audioBufferSource.connect(audioContext.destination);
			audioBufferSource.start(0);
		  });
		} catch (error) {
		  console.error("Error fetching audio:", error);
		}
	  }
	  
	  

	const [loading, setLoading] = useState(true);
	useEffect(() => {
	  if (loading) {
		setTimeout(() => {
		setLoading(false);
	  }, 1500);
	  }
	}, [loading]);

	const [inputText, setInputText] = useState(''); 

	const handleKeyClick = (key) => { 
        if (key === 'No') { 
			handleDeleteKey(); 
		}
		else if (key=="back"){
			window.history.back();
		}
		else if(key == 'Sound'){
			getVoiceFromText(inputText);
			auto(inputText)
			setTimeout(() => {
				setInputText("");
				setPreinput("");
			  }, 2000);
			

		}else if(key=="Yes"){

			setInputText(inputText+complete);
			setComplete("")
			setPreinput("")
		}
		else { 
			handleRegularKey(key); 
		} 
	}; 

	const handleDeleteKey = () => { 
		if(complete.length>0)
		{
			setFlag(1)
			setComplete("")
			return;
		}
		if (inputText.length === 0) { 
			return; 
		} 
		const newContent = inputText.slice(0, inputText.length - 1); 
		setInputText(newContent);
		if(preinput.length>0)
		{
		const newContent = preinput.slice(0, preinput.length - 1); 
		setPreinput(newContent);
		}
	}; 

	

	const handleRegularKey = (key) => { 
		
		setInputText(inputText+key);
		if(key==" "){
			setPreinput("")
			return;
		}
		else
		{
		setPreinput(preinput+key)
		}

		if(preinput.length>1)
			{
			auto(preinput+key)
			}

	}; 

	return ( 
		<>

		{loading ?
			<div className='main'>
		   <Loader type="ball-clip-rotate-multiple" />
		   </div>:

		<div className='keyboard'> 
			<div className="textcontainer"> 
				<pre>{inputText}</pre><pre style={{marginLeft:"-20px",color:"grey"}}>{complete}</pre>  {complete.length>0?  <p>?</p>:<p>|</p>}
			</div> 
			<div className="keyboardcontainer"> 
            <div className='cloumnskeys'>
            <div key="back" className="key_40" onClick={() => handleKeyClick("back")} >
								
									<span  ><FontAwesomeIcon icon={faArrowLeft} size="2x" /> </span> 
								
							</div> 

                            <div key="No" className="key_39"  onClick={() => handleKeyClick("No")} >	
									<span >NO</span> 
								
							</div>
                            </div> 
				<div className="containerKeyboard"> 
					<div className="rowkeyboard"> 
						{['1', '2', '3', '4', '5', 
						'6', '7', '8', '9', '0'] 
						.map((keyvalue,index) => 
						( 
							<div key={keyvalue} className={`key_${index}` }
								onClick={() => handleKeyClick(keyvalue)}> 
								{
										<span >{keyvalue}</span> 
									
								} 
							</div> 
						))} 
					</div> 
					<div className="rowkeyboard"> 
						{['q', 'w', 'e', 'r', 't', 'y', 
						'u', 'i', 'o', 'p'] 
						.map((keyvalue,index) => ( 
							<div key={keyvalue} className={`key_${index+10}` }
								onClick={() => handleKeyClick(keyvalue)}> 
								{
								<span >{keyvalue}</span>
								} 
							</div> 
						))} 
					</div> 
					<div className="rowkeyboard"> 
						{['a', 's', 'd', 'f', 'g', 'h', 
						'j', 'k', 'l'] 
							.map((keyvalue,index) => ( 
							<div key={keyvalue}  className={`key_${index+20}` }
								onClick={() => handleKeyClick(keyvalue)}> 
								{
									<span>{keyvalue}</span>
								} 
							</div> 
						))} 
					</div> 
					<div className="rowkeyboard"> 
						{['z', 'x', 'c', 'v', 'b', 'n', 'm'].map((keyvalue, index) => ( 
							<div className={`key_${index+29}` }
								onClick={() => handleKeyClick(keyvalue)}> 
								{
									<span >{keyvalue}</span> 
								} 
							</div> 
						))} 
					</div> 
					<div className="rowkeyboard"> 
						{[' '] 
							.map((keyvalue, index) => ( 
							<div key={index}  className={`key_${index+36}` }
							onClick={() => handleKeyClick(keyvalue)}> 
								<span>{keyvalue}</span>
							</div> 
						))} 
					</div> 
				</div> 
               <div className='cloumnskeys'>
                <div key="Sound" className='key_37' onClick={() => handleKeyClick("Sound")} >
								
									<span  ><FontAwesomeIcon icon={faMicrophone}  size="2x" /> </span> 
								
							</div> 

                            <div key="Yes" className='key_38'  onClick={() => handleKeyClick("Yes")}  >	
									<span>YES/<FontAwesomeIcon icon={faPowerOff} /> </span> 
								
							</div> 

                            </div>

                
			</div> 
		</div> }
	</>
	) 
} 
