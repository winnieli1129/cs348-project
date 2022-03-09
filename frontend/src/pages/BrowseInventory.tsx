import React, {useEffect, useState} from "react"
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
   Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
   
  } from "@chakra-ui/react"

import axios from 'axios';

const BrowseInventory = () => {
    return (
        <Flex direction="column" w="100%" h="100%">
            <Flex justifyContent="space-between" align="center" padding={35}>
                <Text fontSize='4xl' color='#EE852F'>Inventory</Text>
                
                <Input w="100px"/>
            </Flex>
            <Flex borderWidth="1px" mx="10" h="60vh" overflowY="scroll">
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                    <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                    </Tr>
                    <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                    </Tr>
                    
                </Tbody>
                <Tfoot>
                    <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                    </Tr>
                </Tfoot>
                </Table>
            </Flex>
        </Flex>
    )
}

export default BrowseInventory;