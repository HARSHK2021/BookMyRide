/* eslint-disable react/prop-types */
import { FaLocationDot } from "react-icons/fa6";

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
 

  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
      
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
    // setVehiclePanel(true);
    // setPanelOpen(false);
   
  };

  return (
    <div>
    {/* Display fetched suggestions */}
    {
        suggestions.map((elem, idx) => (
            <div key={idx} onClick={()=>{
              handleSuggestionClick(elem);
              
            }}  className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
              <div><h2 className='bg-[#eee] h-8 flex items-center justify-center w-8 rounded-full'><FaLocationDot /></h2></div>

                
                <div><h4 className='font-medium'>{elem}</h4></div>
            </div>
        ))
    }
</div>
  )
}
export default LocationSearchPanel;
