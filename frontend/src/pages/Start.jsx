
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
    <div className=" bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1683568217010-e390b4f34737?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8  flex justify-between flex-col w-full  ">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png" alt="logo" className="w-16 ml-8" />
        
        <div className="bg-white py-4 px-4 pb-7">
            <h2 className="text-3xl font-bold">Get Started With Uber</h2>
            <Link to="/login" className=" flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"> Continue</Link>
            
        </div>

    </div>
    
  
</div>
  )
}

export default Start
