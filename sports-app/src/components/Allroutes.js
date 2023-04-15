import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Singleevent from '../pages/Singleevent'
import Allevents from '../pages/Allevents'
import Requestevent from '../pages/Requestevent'

const Allroutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/events' element={<Home/>}></Route>
            <Route path='/' element={<Allevents/>}></Route>
            <Route path='/event/:id' element={<Singleevent/>}></Route>
            <Route path='/event/request/:id' element={<Requestevent/>}></Route>
        </Routes>
    </div>
  )
}

export default Allroutes