import axios from 'axios'
import { url } from '../components/url'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, useToast } from '@chakra-ui/react'
import Requests from '../components/Requests'

// const state={
//     event_id:'',
//     creator_id:'',
//     player_id:'',
//     player:'',
//     status:'pending'
// }

const Requestevent = () => {
    const {id}=useParams()
    const [singleevent,setsingleevent]=useState(null)
    const {_id}=JSON.parse(localStorage.getItem('user'))
    const user=JSON.parse(localStorage.getItem('user'))
    const token=localStorage.getItem('token')
    const [requests,setrequests]=useState([])
    const toast=useToast()
    const [see,setsee]=useState(false)
    // console.log(token)


    const fetchevent=()=>{
        axios.get(`${url}/event/singleevent/${id}`)
        .then((res)=>{
            // console.log(res)
            setsingleevent(res.data.event)
            if(res.data.msg==='Events found'){
                    seerequest()
                }            // fetchrequest()
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handlerequest=()=>{
        if(singleevent.count===singleevent.players){
            toast({
                title: 'Players limit full',
                description:'Apply to any other game',
                status: 'warning',
                duration: 3000,
                isClosable: true,
                position:'top-right'
              })
            return;
        }
        axios({
            method:'post',
            url:`${url}/request/createreq`,
            data:{
                event_id:id,
                creator_id:singleevent.creator_id,
                player_id:user._id,
                status:'pending',
                player:user,
                event:singleevent
            }
        })
        .then((res)=>{
            // console.log(res)
           if(res.data.msg==='Request created'){
            seerequest()
           } 
        })
        .catch((err)=>{
            // console.log(err)
        })
    }

    const seerequest=()=>{
        axios({
            method:'post',
            url:`${url}/request/getbyplayer`,
            data:{
                player_id:user._id,
                event_id:id
            }
        })
        .then((res)=>{
            // console.log(res)
            setrequests(res.data.requests)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handlebutton=()=>{
        if(requests[0].status!=='accepted'){
            toast({
                title: 'Cannot see all players',
                description:'You can only see players if your request accepted',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'top-right'
              })
            return;
        }
        setsee(!see)
    }

    useEffect(()=>{
        fetchevent()
    },[])

  return (
    <div>
        {
            singleevent!==null&&<div>
            <h2>{singleevent.title}</h2>
            <p>{singleevent.description}</p>
            <p>Date : {singleevent.date}</p>
            <p>Time : {singleevent.starttime} to {singleevent.endtime}</p>
            
            <Link to='/'><p style={{color:'blue',textDecoration:'underline'}}>Back to home</p></Link>
        </div>
        }
        <div>
            {
                requests?.length>0?'':<Button onClick={handlerequest} >Request to join</Button>
            }
        </div>
        <div>
            {
                requests?.map((el)=>(
                    <div>
                        <p>{el.player.username}</p>
                        <p>Status : {el.status}</p>
                    </div>
                ))
            }
            <div>
                {
                    see&&requests.length!==0&&requests[0].status==='accepted'?<div>
                        <Button onClick={()=>setsee(!see)}>Hide all players</Button>
                        {
                            singleevent.playerdetails.map((el)=>(
                                <p>{el.username}</p>
                            ))
                        }
                    </div>:requests.length>0&&<Button onClick={handlebutton}>See all participated players</Button>
                }
            </div>
        </div>
    </div>
  )
}

export default Requestevent