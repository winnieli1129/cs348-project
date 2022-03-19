import React, {useEffect, useState} from "react"
import { MdEmail } from "react-icons/md";
import { LockIcon } from '@chakra-ui/icons';

import {
   Flex,
   Text,
   Input,
   InputGroup,
   InputLeftElement,
   InputRightElement,
   Icon,
   Button,
   Link
  } from "@chakra-ui/react"

import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => {
        axios.post(`http://localhost:8080/customer-login`, {
            email: email,
            password: password
        })
      .then(res => {
        const data = res.data;
        window.location.href = `/profile`;
        localStorage.setItem('jwt_token', data.jwt_token);
      })
      .catch(err => {
          alert(err)
      })
    }
    
    return (
        <Flex w="100%" h="100%">
            <Flex w="50%" bg="#EE852F" justify="center" align="center">
                <Text fontSize='5xl' color='white'> 
                    Welcome! 
                </Text>
            </Flex>
            <Flex w="50%" direction="column" justify="center" p={44}>
                <Flex mb="2">
                    <Text fontSize='4xl' color='black'> 
                        Customer Login
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
                                setEmail(e.target.value)
                            }} 
                            value={email} 
                            variant='flushed' 
                            placeholder='Email' 
                        />
                            <InputRightElement children={<Icon as={MdEmail} />} />
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
                        disabled={!(!!password && !!email)}
                        onClick={handleSubmit} 
                        bg='#EE852F' 
                        size='md' 
                        color='white' 
                        width='100%'
                    >
                        Login
                    </Button>
                </Flex>
                <Flex mt="4" justify="center">
                    <Link href='/signup'>
                        Sign Up
                    </Link>
                </Flex>
            </Flex>
    
        </Flex>
    )
}

export default Login;