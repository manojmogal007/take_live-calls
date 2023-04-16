import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Singleevent from '../pages/Singleevent'
import Allevents from '../pages/Allevents'
import Requestevent from '../pages/Requestevent'
import Appliedevents from '../pages/Appliedevents'
import Privateroutes from './Privateroutes'

const Allroutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/events' element={<Privateroutes><Home/></Privateroutes>}></Route>
            <Route path='/' element={<Privateroutes><Allevents/></Privateroutes>}></Route>
            <Route path='/event/:id' element={<Privateroutes><Singleevent/></Privateroutes>}></Route>
            <Route path='/event/request/:id' element={<Privateroutes><Requestevent/></Privateroutes>}></Route>
            <Route path='/appliedevents' element={<Privateroutes><Appliedevents/></Privateroutes>}></Route>
        </Routes>
    </div>
  )
}

export default Allroutes