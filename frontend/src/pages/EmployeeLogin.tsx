import React, {useEffect, useState} from "react"
import { MdPerson } from "react-icons/md";
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

const EmployeeLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => {
        axios.post(`http://localhost:8080/employee-login`, {
            email: username,
            password: password
        })
      .then(res => {
        const data = res.data;
        console.log(data)
        localStorage.setItem('jwt_token', data.jwt_token);
      })
    }
    
    return (
        <Flex w="100%" h="100%">
            <Flex w="50%" bg="#EE852F" justify="center" align="center">
                <Text fontSize='5xl' color='white'> 
                    Welcome! 
                </Text>
            </Flex>
            <Flex w="50%" direction="column" p={44} justify="center">
                <Flex mb="2">
                    <Text fontSize='4xl' color='black'> 
                        Employee Login
                    </Text>
                </Flex>
                <Flex mb="10">
                    <Text fontSize='sm' color='black'> 
                        Welcome Back! Login to your account.
                    </Text>
                </Flex>
                <Flex mb="8">
                    <InputGroup>
                        <Input 
                            onChange={e => {
                                setUsername(e.target.value)
                            }} 
                            value={username} 
                            variant='flushed' 
                            placeholder='Username' 
                        />
                            <InputRightElement children={<Icon as={MdPerson} />} />
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
                    <Button onClick={
                        handleSubmit
                    } bg='#EE852F' size='md' color='white' width='100%'>
                        Login
                    </Button>
                </Flex>
            </Flex>
    
        </Flex>
    )
}

export default EmployeeLogin;