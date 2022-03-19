import React, { useEffect, useState } from "react"
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
    Button,
    Image,
    Divider,
    Editable,
    EditableInput,
    EditablePreview,

} from "@chakra-ui/react"

import axios from 'axios';

const CustomerProfile = () => {
    if (!localStorage.getItem('jwt_token')) {
        window.location.href = `/login`;
    }
    return (
        <Flex w="100%" h="100%">
            <Flex w="25%" direction="column" bg="white" alignItems='center' mt='32'>
                <Image w="150px" h="150px" src='https://bit.ly/dan-abramov' />
                <Text fontSize='xl'>
                    Apple A
                </Text>
                <Text fontSize='xs' color='#8D8D8D' >
                    Member Since 2/22/22
                </Text>
                <Divider orientation='horizontal' color='#BCD8C1' w='200px' />

            </Flex>
            <Flex w="75%" bg='#BCD8C1' align='center' padding={50} >
                <Flex direction='column' w='100%' h='100%' bg='white' borderRadius='7px' shadow='md' >
                    <Text fontSize='xl' as='b' mx='40px' mt='40px' color='black'>Personal Info</Text>
                    <Divider borderColor='#BCD8C1' w='780px' mx='40px' />
                    <Flex>
                        <Flex direction='column' ml='40px'>
                            <Text fontSize='sm' mt='10' mb='3'>First Name</Text>
                            <Input w='300px' variant='flushed' borderColor='#BCD8C1' defaultValue='Banana' />
                            <Text fontSize='sm' mt='10' mb='3'>Email Address</Text>
                            <Input w='300px' variant='flushed' borderColor='#BCD8C1' defaultValue='banana2022@gmail.com' />
                            <Text fontSize='sm' mt='10' mb='3'>Phone Number</Text>
                            <Input w='300px' variant='flushed' borderColor='#BCD8C1' defaultValue='987654321' />
                            <Text fontSize='sm' mt='10' mb='3'>Password</Text>
                            <Input w='300px' variant='flushed' borderColor='#BCD8C1' defaultValue='penpinealpplepen' />
                        </Flex>
                        <Flex direction='column' mx='100px'>
                            <Text fontSize='sm' mt='10' mb='3'>Last Name</Text>
                            <Input w='300px' variant='flushed' borderColor='#BCD8C1' defaultValue='Banana' />
                            <Text as='b' fontSize='md' mt='20'>Rewards</Text>
                            <Text fontSize='6xl' mt='20' mb='3' align='center'>5634</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>

    )
}

export default CustomerProfile;