import * as React from "react"
import { MdPerson } from "react-icons/md";
import { LockIcon } from '@chakra-ui/icons';

import {
   Flex,
   Text,
   Input,
   InputGroup,
   InputLeftElement,
   InputRightElement,
   Icon,
   Button
   
  } from "@chakra-ui/react"
  

const Login = () => (
    <Flex w="100%" h="100%">
        <Flex w="50%" bg="#EE852F" justify="center" align="center">
            <Text fontSize='5xl' color='white'> 
                Welcome! 
            </Text>
        </Flex>
        <Flex w="50%" direction="column" p={44}>
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
                    <Input variant='flushed' placeholder='Username' />
                        <InputRightElement children={<Icon as={MdPerson} />} />
                </InputGroup>
            </Flex>
            <Flex mb="12">
                <InputGroup>
                    <Input variant='flushed' placeholder='Password' />
                        <InputRightElement children={<LockIcon/>} />
                </InputGroup>
            </Flex>
            <Flex>
                <Button bg='#EE852F' size='md' color='white' width='100%'>
                    Login
                </Button>
            </Flex>
        </Flex>

    </Flex>
)

export default Login;