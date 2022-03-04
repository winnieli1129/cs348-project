import * as React from "react"
import { MdPerson } from "react-icons/md";
import {
   Flex,
   Text,
   Input,
   InputGroup,
   InputLeftElement,
   InputRightElement,
   Icon
   
  } from "@chakra-ui/react"

const Login = () => (
    <Flex w="100%" h="100%">
        <Flex w="50%" bg="#EE852F" justify="center" align="center">
            <Text fontSize='5xl' color='white'> 
                Welcome! 
            </Text>
            
        </Flex>
        <Flex w="50%" direction="column" p={32}>
            <Flex mb="6">
                <Text fontSize='3xl' color='black'> 
                    Login
                </Text>
            </Flex>
            <Flex>
                <Text fontSize='xl' color='black'> 
                    Welcome Back! Login to your account.
                </Text>
            </Flex>
            <Flex>
                {/* <Input variant='flushed' placeholder='Username' /> */}
                <InputGroup>
                    
                    <Input variant='flushed' placeholder='Username' />
                        <InputRightElement children={<Icon as={MdPerson} />} />
                    </InputGroup>
            </Flex>
        </Flex>

    </Flex>
)

export default Login;