import { Button, useToast } from '@chakra-ui/react'
import axios from 'axios'
import { url } from '../components/url'
import React, { useState } from 'react'

const Requests = (prop) => {

    const token=localStorage.getItem('token')
    const user=JSON.parse(localStorage.getItem('user'))
    const toast=useToast()
    // console.log(prop.count,prop.total_players)

    const handleaccept=()=>{
        if(prop.count===prop.total_players){
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
            url:`${url}/request/updatereq/${prop.request_id}`,
            headers:{
                Authorization:token
            },
            data:{
                status:'accepted',
            }
        })
        .then((res)=>{
            console.log(res)
            if(res.data.msg==='Request updated'){
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
            url:`${url}/request/updatereq/${prop.request_id}`,
            headers:{
                Authorization:token
            },
            data:{
                status:'rejected'
            }
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handelpayercount=()=>{
        
        axios({
            method:'patch',
            url:`${url}/event/update/${prop.event_id}`,
            headers:{
                Authorization:token
            },
            data:{
                count:prop.count+1,
                playerdetails:[...prop.playerdetails,prop.player]
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
    <div>
        <p>{prop.player.username}</p>
        <Button onClick={handleaccept}>Accept</Button>
        <Button onClick={handlereject}>Reject</Button>
    </div>
  )
}

export default Requests