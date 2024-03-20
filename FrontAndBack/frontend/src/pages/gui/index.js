// keyboard.js 
import React, { useState } from 'react'; 
import './index.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDeleteLeft,faMicrophone,faPowerOff} from '@fortawesome/free-solid-svg-icons' 

export default function Keyboard() { 
	const [inputText, setInputText] = useState(''); 

	const handleKeyClick = (key) => { 
        if (key === 'back') { 
			handleDeleteKey(); 
		} else { 
			handleRegularKey(key); 
		} 
	}; 

	const handleDeleteKey = () => { 
		if (inputText.length === 0) { 
			return; 
		} 
		const newContent = inputText.slice(0, inputText.length - 1); 
		setInputText(newContent); 
	}; 

	

	const handleRegularKey = (key) => { 
		
		setInputText(inputText+key); 
	}; 

	return ( 
		<div className='keyboard'> 
			<div className="textcontainer"> 
				<pre>{inputText}</pre> <p>|</p>
			</div> 
			<div className="keyboardcontainer"> 
            <div className='cloumnskeys'>
            <div key="back" className='keyback' onClick={() => handleKeyClick("back")} >
								
									<span><FontAwesomeIcon icon={faDeleteLeft} /> </span> 
								
							</div> 

                            <div key="No" className='keyYes' >	
									<span>NO</span> 
								
							</div>
                            </div> 
				<div className="containerKeyboard"> 
					<div className="rowkeyboard"> 
						{['1', '2', '3', '4', '5', 
						'6', '7', '8', '9', '0'] 
						.map((keyvalue) => 
						( 
							<div key={keyvalue} className='key'
								onClick={() => handleKeyClick(keyvalue)}> 
								{
										<span>{keyvalue}</span> 
									
								} 
							</div> 
						))} 
					</div> 
					<div className="rowkeyboard"> 
						{['q', 'w', 'e', 'r', 't', 'y', 
						'u', 'i', 'o', 'p'] 
						.map((keyvalue) => ( 
							<div key={keyvalue} className='key'
								onClick={() => handleKeyClick(keyvalue)}> 
								{
									<span>{keyvalue}</span> 
								} 
							</div> 
						))} 
					</div> 
					<div className="rowkeyboard"> 
						{['a', 's', 'd', 'f', 'g', 'h', 
						'j', 'k', 'l'] 
							.map((keyvalue) => ( 
							<div key={keyvalue} className='key' 
								onClick={() => handleKeyClick(keyvalue)}> 
								{
									<span>{keyvalue}</span> 
								} 
							</div> 
						))} 
					</div> 
					<div className="rowkeyboard"> 
						{['z', 'x', 'c', 'v', 'b', 'n', 'm'].map((keyvalue, index) => ( 
							<div key={index} className='key' 
								onClick={() => handleKeyClick(keyvalue)}> 
								{
									<span>{keyvalue}</span> 
								} 
							</div> 
						))} 
					</div> 
					<div className="rowkeyboard"> 
						{[' '] 
							.map((keyvalue, index) => ( 
							<div key={index} className='key2' 
							onClick={() => handleKeyClick(keyvalue)}> 
								<span>{keyvalue}</span> 
							</div> 
						))} 
					</div> 
				</div> 
               <div className='cloumnskeys'>
                <div key="Sound" className='keyback' >
								
									<span><FontAwesomeIcon icon={faMicrophone} /> </span> 
								
							</div> 

                            <div key="Yes" className='keyYes' >	
									<span>YES/<FontAwesomeIcon icon={faPowerOff} /> </span> 
								
							</div> 

                            </div>

                
			</div> 
		</div> 
	) 
} 
