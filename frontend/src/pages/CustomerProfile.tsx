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
//{ id, name, email, phone_number, password, rewards }: { id: any, name: any, email: any, phone_number: any, password: any, rewards: any }
const CustomerProfile = ({ customer_id, name, email, phone_number, password, rewards }: { customer_id: any, name: any, email: any, phone_number: any, password: any, rewards: any }) => {

    const { isOpen, onToggle } = useDisclosure()

    const [editedName, setEditedName] = useState("")
    const [editedEmail, setEditedEmail] = useState("")
    const [editedPhone, setEditedPhone] = useState("")
    const [editedPassword, setEditedPassword] = useState("")

    if (!localStorage.getItem('jwt_token')) {
        window.location.href = `/login`;
    }

    const handleDelete = () => {
        axios.post(`http://localhost:8080/delete-customer`, {
            customer_id: customer_id,
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
            customer_id: customer_id,
            name: editedName === "" ? name : editedName,
            email: editedEmail === "" ? email : editedEmail,
            phone_number: editedPhone === "" ? phone_number : editedPhone,
            password: editedPassword === "" ? password : editedPassword,

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
                                onChange={e => setEditedName(e.target.value)}
                            />
                            <Text fontSize='sm' mt='10' mb='3'>Email</Text>
                            <Input
                                w='300px'
                                variant='flushed'
                                borderColor='#BCD8C1'
                                defaultValue={email}
                                onChange={e => setEditedEmail(e.target.value)}
                            />
                            <Text fontSize='sm' mt='10' mb='3'>Phone Number</Text>
                            <Input
                                w='300px'
                                variant='flushed'
                                borderColor='#BCD8C1'
                                defaultValue={phone_number}
                                onChange={e => setEditedPhone(e.target.value)}
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
                                    onChange={e => setEditedPassword(e.target.value)}
                                />
                                <ButtonGroup size='sm' mt='20' variant='outline' spacing='6' alignSelf='flex-end'>
                                    <Button color='#EE852F' onClick={onToggle}>Cancel</Button>
                                    <Button bg='#EE852F' color='white'onClick={handleUpdate} >Save</Button>
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