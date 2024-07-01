
import React, { useState,useEffect,useRef } from 'react'; 
import Loader from 'react-loaders'
import './index.scss'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft,faMicrophone,faPowerOff} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


export default function Keyboard() { 

	const [voice,setVoice]=useState('Linda');
	const [count, setCount] = useState(0);
	const [overlayClass, setoverlayClass] = useState('hide');
    const [complete, setComplete] = useState('');
	const [preinput, setPreinput] = useState('');
	const [ind, setInd] = useState(99);
	const [loading, setLoading] = useState(true);
	const [inputText, setInputText] = useState(''); 

	const fetchData = async () => {

		axios.defaults.withCredentials = true;
        axios.get('http://localhost:5000/prediction')
            .then(function (response) {
                console.log(response['data']);
				handleKeyClick(response['data']["prediction"]);
            })
            .catch(function (error) {
                console.error('Error fetching data:', error);
            });

	  };

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
		  body: JSON.stringify({  
			text: preinput,
			correctTypoInPartialWord: false,
			language: ['en'],
			maxNumberOfPredictions : 1
		  })
		};
	  
		try {
		  const response = await fetch(url, options);
		  const result = await response.text();
		  const responseObject = JSON.parse(result);

		  setComplete(responseObject.predictions[0].text.slice(preinput.length-ind-1))

		} catch (error) {
		  setComplete("")
		}
	  }

	async function getVoiceFromText(inputText) {
		if(inputText.length==0)
		{
			return;
		}

		axios.defaults.withCredentials = true;
        axios.post('http://localhost:5000/@me')
            .then(function (response) {
               
				if(response['data']['gander']=='Male')
				{
              	  setVoice('Mike');
				}
            })
            .catch(function (error) {
                console.log(error, 'error Not authenticated');
            });

		const apiKey = "a2cf0958d6b24e1cb1e5040d37608cd1";
		const voiceRssUrl = `http://api.voicerss.org/?key=${apiKey}&hl=en-us&src=${inputText}&c=MP3&r=0&v=${voice}`;
	  
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
	  
	  

	
	useEffect(() => {

	  if (loading) {
		setTimeout(() => {
		setLoading(false);
	  }, 1500);
	  }
	}, [loading]);


	const handleKeyClick = (key) => { 
		
        if (key === 'No') { 
			setCount(0);
			handleDeleteKey(); 

		}
		else if (key=="back"){
			setCount(0);
			fetchData();
			//window.history.back();
		}
		else if(key == 'Sound'){
			setCount(0);
			getVoiceFromText(inputText);
			setTimeout(() => {
				setInputText("");
                 setPreinput("")
			  }, 1800);
			

		}else if(key=="Yes"){
			setCount(count + 1);

			if(count==2)
			{
				setoverlayClass ('show_overlay');
				
			}
			if(count==4)
			{
				setoverlayClass('hide');
				setCount(0);
			}

			setInputText(inputText+complete);
			setPreinput(preinput+complete);
			setComplete("")
			
		}
		else { 
			setCount(0);
			handleRegularKey(key); 
		} 
	}; 



	const handleDeleteKey = () => { 
		if(complete.length>0)
		{
			
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
		setPreinput(preinput+key)
		setInputText(inputText+key);

		if(preinput.length>30)
			{
			setPreinput(preinput.slice(preinput.indexOf(' ') + 1))
			}
		
		if(key==" ")
		{
			setInd(preinput.length);
		}
		else if(preinput.length-ind>1)
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
		<div className={overlayClass}></div>
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
