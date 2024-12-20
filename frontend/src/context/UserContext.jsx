/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

export const UserDataContext = createContext()
const UserContext = ({children}) => {
    const [user, setUser]= useState({
        email:'',
        fullname:{
            firstname:'',
            lastname:''
        }
    })
  return (
    <div>
       <UserDataContext.Provider value={{user,setUser}}>
         {children}
       </UserDataContext.Provider>

      
    </div>
  )
}

export default UserContext





