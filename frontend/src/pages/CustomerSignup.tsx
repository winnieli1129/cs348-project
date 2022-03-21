import React, {useEffect, useState} from "react"
import { MdPerson, MdEmail, MdPhone } from "react-icons/md";
import { LockIcon } from '@chakra-ui/icons';

import {
   Flex,
   Text,
   Input,
   InputGroup,
   InputRightElement,
   Icon,
   Button
   
  } from "@chakra-ui/react"

import axios from 'axios';

const CustomerSignup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => {
        axios.post(`http://localhost:8080/customer-register`, {
            name: name,
            email: email,
            phone_number: phone,
            password: password
        })
      .then(res => {
        const data = res.data;
        window.location.href = `/login`;
      })
      .catch(err => {
          alert(err.response.data)
      })
    }
    
    return (
        <Flex w="100%" h="100%">
            <Flex w="50%" direction="column" p={44} justify="center">
                <Flex mb="8">
                    <InputGroup>
                        <Input 
                            onChange={e => {
                                setName(e.target.value)
                            }} 
                            value={name} 
                            variant='flushed' 
                            placeholder='Name' 
                        />
                            <InputRightElement children={<Icon as={MdPerson} />} />
                    </InputGroup>
                </Flex>
                <Flex mb="8">
                    <InputGroup>
                        <Input 
                            onChange={e => {
                                setEmail(e.target.value)
                            }} 
                            value={email} 
                            type="email"
                            variant='flushed' 
                            placeholder='Email' 
                        />
                            <InputRightElement children={<Icon as={MdEmail} />} />
                    </InputGroup>
                </Flex>
                <Flex mb="8">
                    <InputGroup>
                        <Input 
                            onChange={e => {
                                setPhone(e.target.value)
                            }} 
                            value={phone} 
                            variant='flushed' 
                            placeholder='Phone Number'
                            type="number"
                        />
                            <InputRightElement children={<Icon as={MdPhone} />} />
                    </InputGroup>
                </Flex>
                <Flex mb="12">
                    <InputGroup>
                        <Input 
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                            value={password} 
                            type="password" 
                            variant='flushed' 
                            placeholder='Password' 
                        />
                            <InputRightElement children={<LockIcon/>} />
                    </InputGroup>
                </Flex>
                <Flex>
                    <Button 
                        disabled={!(!!password && !!email && !!phone && !!name)}
                        onClick={handleSubmit} 
                        bg='#EE852F' 
                        size='md' 
                        color='white' 
                        width='100%'
                    >
                        Sign Up
                    </Button>
                </Flex>
            </Flex>
            <Flex w="50%" bg="#EE852F" justify="center" align="center">
                <Text fontSize='5xl' color='white'> 
                    Sign Up 
                </Text>
            </Flex>
    
        </Flex>
    )
}

export default CustomerSignup;