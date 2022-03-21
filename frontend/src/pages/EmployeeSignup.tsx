import React, {useEffect, useState} from "react"
import { MdPerson, MdEmail, MdStoreMallDirectory } from "react-icons/md";
import { LockIcon } from '@chakra-ui/icons';

import {
   Flex,
   Text,
   Input,
   InputGroup,
   InputRightElement,
   Icon,
   Button,
   Select
  } from "@chakra-ui/react"

import axios from 'axios';

const EmployeeSignup = () => {
    const [storeId, setStoreId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [stores, setStores] = useState<any[]>([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/get-stores`)
        .then(res => {
            setStores(res.data)
        })
    }, [])
   
    const handleSubmit = () => {
        axios.post(`http://localhost:8080/employee-register`, {
            name: name,
            store_id: storeId === "" ? null : storeId,
            email: email,
            password: password
        })
      .then(res => {
        window.location.href = `/employee/login`;
      })
      .catch(err => {
          alert(err.response.data)
      })
    }

    const options = stores.map(store => <option id={store.id} value={store.id}>{store.name}</option>)

    return (
        <Flex w="100%" h="100%">
            <Flex w="50%" direction="column" p={44} justify="center">
                <Flex mb="8">
                    <InputGroup>
                        <Select
                            onChange={e => {
                                setStoreId(e.target.value)
                            }} 
                            value={storeId} 
                            variant='flushed' 
                            placeholder='Select Your Store'
                        >
                            {options}
                        </Select>
                            <InputRightElement children={<Icon as={MdStoreMallDirectory} />} />
                    </InputGroup>
                </Flex>
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
                        disabled={!(!!password && !!email && !!name)}
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

export default EmployeeSignup;