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
    Divider

} from "@chakra-ui/react"

import axios from 'axios';

const CustomerProfile = () => {

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
            <Flex w="75%" bg='#BCD8C1' opacity='50%' align='center' padding={50} >
                <Flex w='100%' h='100%' bg='white' borderRadius='10px' shadow='md'>
                    hello
                </Flex>
            </Flex>
        </Flex>

    )
}

export default CustomerProfile;