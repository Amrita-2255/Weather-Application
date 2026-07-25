import React, { useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { WiStrongWind } from "react-icons/wi";
import axios from 'axios';
;

function App() {
  const [search,setSearch]=useState("")
  //const [loading,setLoading]=useState(false)
  const [temperature,setTemperature]=useState(null)
  const [humidity,setHumidity]=useState(null)
  const [windSpeed,setWindSpeed]=useState(null)
  const [cityName,setCityName]=useState("")
  const [weatherIcon,setweatherIcon]=useState("01d")


  const API_KEY= import.meta.env.VITE_API_KEY;
  const fetchWeather=async()=>{
    console.log(search)
    //if(!search) return;
    //setLoading(true)
    try{
      const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`);
      console.log(data);
      if(data.cod==200){
        setTemperature(data.main.temp);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
        setCityName(data.name);
        setweatherIcon(data.weather[0].icon);
      }

    }catch(error){
      console.log(error);
      setCityName("Oops😕,Invalid city!!");
      setHumidity(null);
      setTemperature(null);
      setHumidity(null);
      setWindSpeed(null);
      setweatherIcon("01d");
    }
    //setLoading(false);
  }
    return (
  <>
  
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-purple-950 to-black text-white">

      <h1 className="text-3xl text-white text-center w=60 mb-6 animate-bounce">
          Weather App
      </h1>
      {/*searchbar and icon*/}
      

      <div className="flex items-center bg-white rounded-lg px-4 py-2 mb-6 w-80 shadow-lg">
        <IoIosSearch onClick={fetchWeather} className="text-gray-800" />
  
        <input type="text" 
        placeholder="Search City"
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="flex-1 text-black outline-none px-2"/>
        
      </div>

      {/*weather icon*/}

      <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="" className="w-20 h-20 mb-4"/>
      {/*temprature and city*/}
      <h1 className="text-4xl font-bold">{temperature==null?"--":`${temperature}℃` }</h1>
      <h2 className="text-2xl mt-2 font-semibold">{cityName || "try to check temperature"}</h2>

      {/*Humidity and wind speed*/}
      <div className="w-full max-w-md mt-7 flex flex-col md:flex-row items-center justify-between md:items-start">
        <div className="flex flex-col items-center">
          <WiHumidity className="text-3xl" />
          <span className="text-lg font-medium">{humidity==null?"--":`${humidity}%`}</span>
          <p className="text-sm">Humidity</p>
        </div>
        <div className="flex flex-col items-center">
          <WiStrongWind className="text-3xl"/>
          <span className="text-lg font-medium">{windSpeed==null?"--":`${windSpeed}km/h`}</span>
          <p className="text-sm">Wind Speed</p>
        </div>
      </div>

    </div>
  </>
  );
}

export default App
