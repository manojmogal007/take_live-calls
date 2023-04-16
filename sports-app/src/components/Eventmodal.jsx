import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Input,
    Textarea,
    Select,
    useToast,
  } from '@chakra-ui/react'
import axios from 'axios'
import { url } from './url'

  const state={
    title:'',
    game:'',
    description:'',
    starttime:'',
    endtime:'',
    date:'',
    players:'',
    isfull:false,
    count:0
  }

const Eventmodal = ({allevents}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [event,setevent]=useState(state)
    const toast=useToast()
    const token=localStorage.getItem('token')
    // console.log(event)
    
    const handlevalues=(e)=>{
      const {type,name,value}=e.target
      let val=type==='number'?Number(value):value
      setevent({...event,[name]:val})
    }

    const handleevent=(e)=>{
      e.preventDefault()
      const {title,game,description,starttime,endtime,date,players}=event
      if(title===''||game===''||starttime===''||endtime===''||date===''||players===''){
        toast({
          title: 'Fill all details',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position:'top-right'
        })
        return;
      }
      axios({
        url:`${url}/event/createevent`,
        method:'post',
        headers:{
          Authorization:token
        },
        data:event
      })
      .then((res)=>{
        allevents()
        // console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    
    const {title,game,description,starttime,endtime,date,players}=event

  return (
    <div>
        <Button onClick={onOpen}>Create event</Button>

        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input mt='10px' placeholder='Title' type='text' name='title' value={title} onChange={handlevalues} />
                <Select mt='10px' placeholder='Select game' name='game' value={game} onChange={handlevalues}>
                  <option value='cricket'>Cricket</option>
                  <option value='football'>Football</option>
                  <option value='tenis'>Tenis</option>
                  <option value='badminton'>Badminton</option>
                  <option value='chess'>Chess</option>
                  <option value='hockey'>Hockey</option>
                </Select>
                <Input mt='10px' placeholder='Start time' type='time' name='starttime' value={starttime} onChange={handlevalues} />
                <Input mt='10px' placeholder='End time' type='time' name='endtime' value={endtime} onChange={handlevalues} />
                <Input mt='10px' placeholder='Date' type='date' name='date' value={date} onChange={handlevalues} />
                <Input mt='10px' placeholder='Players' type='number' name='players' value={players} onChange={handlevalues} />
                <Textarea mt='10px' placeholder='Description' type='text' name='description' value={description} onChange={handlevalues} />
            </ModalBody>

            <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
            </Button>
            <Button onClick={handleevent} variant='ghost'>Create</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </div>
  )
}

export default Eventmodal