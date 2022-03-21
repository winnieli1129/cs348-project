import React, { useEffect, useState } from "react"
import { MdPerson } from "react-icons/md";
import { LockIcon, DeleteIcon } from '@chakra-ui/icons';

import {
    Flex,
    Text,
    Input,
    Icon,
    Button,
    ButtonGroup,
    Image,
    Divider,
    IconButton,
    useDisclosure,

} from "@chakra-ui/react"

import axios from 'axios';
import jwt_decode from "jwt-decode";

const CustomerProfile = () => {

    
    const { isOpen, onToggle } = useDisclosure()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [rewards, setRewards] = useState("")

    var token = localStorage.getItem('jwt_token');

    if (!token) {
        window.location.href = `/login`;
    } else {
        var decoded = jwt_decode(token);
    }
    
    const handleDelete = () => {
        axios.post(`http://localhost:8080/delete-customer`, {
            //customer_id: decoded,
        }, {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        })
            .then(res => {
                alert("The profile is deleted!")
                window.location.reload();
            })
            .catch(err => {
                alert(err)
            })
    }

    const handleUpdate = () => {
        axios.post(`http://localhost:8080/update-customer`, {
            //customer_id: id,
            name: name === "" ? name : name,
            email: email === "" ? email : email,
            phone_number: phone_number === "" ? phone_number : phone_number,
            password: password === "" ? password : password,

        }, {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        })
            .then(res => {
                alert("Customer profile is updated!")
                window.location.reload();
            })
            .catch(err => {
                alert(err)
            })
    }

    return (
        <Flex w="100%" h="100%">
            <Flex w="25%" direction="column" bg="white" alignItems='center' mt='32'>
                <Image w="150px" h="150px" src='https://bit.ly/dan-abramov' />
                <Text fontSize='xl'>
                    Name
                </Text>
                <Text fontSize='xs' color='#8D8D8D' >
                    Member Since 2/22/22
                </Text>
                <Divider orientation='horizontal' color='#BCD8C1' w='200px' />

            </Flex>
            <Flex w="75%" bg='#BCD8C1' align='center' padding={50} >
                <Flex direction='column' w='100%' h='100%' bg='white' borderRadius='7px' shadow='md' overflow='Y'>
                    <Flex justifyContent='space-between'>
                        <Text fontSize='xl' as='b' mx='40px' mt='40px' color='black'>Personal Info</Text>
                        <IconButton
                            variant='ghost'
                            color='#EE852F'
                            mt='40px'
                            mx='40px'
                            aria-label='Delete'
                            icon={<DeleteIcon />}
                            _hover={{
                                color: "black"
                            }}
                            onClick={handleDelete} />
                    </Flex>
                    <Divider borderColor='#BCD8C1' w='780px' mx='40px' />
                    <Flex>
                        <Flex direction='column' ml='40px'>
                            <Text fontSize='sm' mt='10' mb='3'>Name</Text>
                            <Input
                                w='300px'
                                variant='flushed'
                                borderColor='#BCD8C1'
                                defaultValue={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <Text fontSize='sm' mt='10' mb='3'>Email</Text>
                            <Input
                                w='300px'
                                variant='flushed'
                                borderColor='#BCD8C1'
                                defaultValue={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Text fontSize='sm' mt='10' mb='3'>Phone Number</Text>
                            <Input
                                w='300px'
                                variant='flushed'
                                borderColor='#BCD8C1'
                                defaultValue={phone_number}
                                onChange={e => setPhone(e.target.value)}
                            />


                        </Flex>
                        <Flex direction='column' mx='100px'>
                            <Text fontSize='sm' mt='10' mb='3'>Rewards</Text>
                            <Input w='300px' variant='flushed' borderColor='#BCD8C1' defaultValue={rewards} />
                            <Text fontSize='sm' mt='10' mb='3'>Password</Text>
                            <Input
                                w='300px'
                                variant='flushed'
                                borderColor='#BCD8C1'
                                defaultValue={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <ButtonGroup size='sm' mt='20' variant='outline' spacing='6' alignSelf='flex-end'>
                                <Button color='#EE852F' onClick={onToggle}>Cancel</Button>
                                <Button bg='#EE852F' color='white' onClick={handleUpdate} >Save</Button>
                            </ButtonGroup>
                        </Flex>
                    </Flex>
                    <Text mx='40px' as='b' fontSize='md' mt='10'>Orders</Text>
                </Flex>
            </Flex>
        </Flex>

    )
}

export default CustomerProfile;