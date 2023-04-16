import { Button, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { url } from '../components/url'
import React, { useState } from 'react'
import '../styles/Requests.css'
import Counter from './Counter'

const Requests = ({el,event}) => {

    const token=localStorage.getItem('token')
    const user=JSON.parse(localStorage.getItem('user'))
    const toast=useToast()
    // console.log(el,event)

    const handleaccept=()=>{
        if(event.count===event.players){
            toast({
                title: 'Players limit full',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:'top-right'
              })
            return;
        }
        axios({
            method:'patch',
            url:`${url}/request/updatereq/${el._id}`,
            headers:{
                Authorization:token
            },
            data:{
                event_id:event._id,
                status:'accepted',
                // event:event
            }
        })
        .then((res)=>{
            // console.log(res)
            if(res.data.msg==='Request updated'){
                toast({
                    title: 'Request accepted',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position:'top-right'
                  })
                handelpayercount()
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handlereject=()=>{
        axios({
            method:'patch',
            url:`${url}/request/updatereq/${el._id}`,
            headers:{
                Authorization:token
            },
            data:{
                status:'rejected'
            }
        })
        .then((res)=>{
            // console.log(res)
            if(res.data.msg==='Request updated'){
                toast({
                    title: 'Request rejected',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position:'top-right'
                  })
                }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handelpayercount=()=>{
        
        axios({
            method:'patch',
            url:`${url}/event/update/${el.event_id}`,
            headers:{
                Authorization:token
            },
            data:{
                count:event.count+1,
                playerdetails:[...event.playerdetails,el.player]
            }
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className='req'>
        {/* <Counter el={el} event={event} /> */}
        <p>Playername : {el.player.username}</p>
        <Button isDisabled={el.status==='accepted'||el.status==='rejected'?true:false} onClick={handleaccept}>Accept</Button>
        <Button isDisabled={el.status==='accepted'||el.status==='rejected'?true:false} onClick={handlereject}>Reject</Button>
        <p>Status : {el.status}</p>
    </div>
  )
}

export default Requests