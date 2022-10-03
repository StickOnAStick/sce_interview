import React from 'react';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  var zipcodes = require('zipcodes');
  const [zip, setZip] = useState<string>("Zip");
  const [city, setCity] = useState<string>("N/A");
  const [temp,setTemp] = useState<string>();



  const handleSubmit = async () => {
    const cords = zipcodes.lookup(zip);
    
    setCity(cords.city);
    const lat = cords.latitude;
    const long = cords.longitude;

    
    
    try{
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&exclude=minutely,hourly,daily,alerts&units=imperial&appid=1abf594b55e0ec1edc3ee102cd3c509d`
      )
      console.log(response);
      setTemp(response.data.main.temp);
    }catch (e) {
      alert(e)
      console.log(e)
    }

   
  }

  return (
    <div className=' bg-white h-screen w-screen text-center'>
      <header className='flex justify-center pt-2'>
        <h1 className='w-fit p-2 text-5xl text-neutral-800 font-semibold
                      border-neutral-400 rounded-md border-2'>
           Today's Weather  
        </h1>
        
      </header>
      <body className=' grid grid-cols-[1fr_3fr] gap-2 mx-10 mt-5'>
        
        <div className='bg-red-200 rounded-lg py-2'>
          
            <p>Enter your zipcode here:</p>
            <input type="text" placeholder='ZipCode' onChange={(newZip)=> {setZip(newZip.target.value)}} 
                  className='border border-black rounded-md text-opacity-60 text-gray-800 px-1 my-1'/>
            <button title="Submit" onClick={handleSubmit} className='bg-red-600 text-white px-2 rounded-xl mt-1'>Submit</button>
            
        </div>
        
        <div className='bg-red-600 rounded-lg '>
          <h3 className='text-xl text-white font-bold'>Current Weather</h3>
          <div className='grid grid-cols-[1fr_2fr] gap-3'>
            <div className='text-left text-md pl-4 text-white'>
              <p className=''>City: {city === 'N/A' ? '' : city}</p>
              <p>Zip: {zip === 'Zip' ? '' : zip}</p>
            </div>
            
            <p className='text-lg text-white'>Temperature: <p className='text-bold text-2xl'>{temp === '' ? '' : temp}</p></p>
            
            
          </div>
        </div>
      
      </body>
    
    </div>
  );
}

export default App;
