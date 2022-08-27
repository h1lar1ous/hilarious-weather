import React, { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  }

  const handleSearchClick = () => {
    city !== '' ? setQuery({q: city}) : alert('Enter the city')
  }

  const handleLocationClick = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-6 inputs-wrapper">
        
        <div className="flex flex-row w-3/4 items-center info-buttons
        justify-center space-x-4">

            <input 
            type="text" 
            value={city}
            onChange={(e) => setCity(e.currentTarget.value)}
            className="text-xl font-light p-2 w-full
            shadow-xl focus:outline-none capitalize placeholder:lowercase"
            placeholder="Search for city..."
            />
            <UilSearch 
            size={25} 
            className="text-white cursor-pointer search-button 
            transition ease-out hover:scale-125"
            onClick={handleSearchClick}
            />
            <UilLocationPoint 
            onClick={handleLocationClick}
            size={25} 
            className="text-white cursor-pointer location-button
            transition ease-out hover:scale-125"
            />
        </div>

            <div className="units-buttons flex flex-row w-1/4 items-center justify-center">
                <button 
                onClick={handleUnitsChange}
                name="metric" 
                className="text-xl text-white font-light transition ease-out hover:scale-125">
                °C
                </button>
                <p className="text-xl text-white mx-1">|</p>
                <button 
                onClick={handleUnitsChange}
                name="imperial" 
                className="text-xl text-white font-light transition ease-out hover:scale-125"> 
                °F
                </button>
            </div>

    </div>
  )
}

export default Inputs;