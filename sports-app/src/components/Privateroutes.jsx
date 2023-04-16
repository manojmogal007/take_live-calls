import React from 'react'
import { Navigate } from 'react-router-dom'

const Privateroutes = ({children}) => {
    const token=localStorage.getItem('token')
    if(token===null){
        return <Navigate to='/login' />
    }
  return children
}

export default Privateroutes