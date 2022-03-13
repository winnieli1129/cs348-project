import React, { useEffect, useState } from "react"
import { MdPerson } from "react-icons/md";
import { DeleteIcon, EditIcon, LockIcon, SearchIcon } from '@chakra-ui/icons';

import {
    Flex,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    ButtonGroup,
    IconButton,
    Collapse,
    useDisclosure,



} from "@chakra-ui/react"

import axios from 'axios';

const BrowseInventory = () => {

    const { isOpen: first, onToggle: firstT } = useDisclosure()
    const { isOpen: sec, onToggle: secT } = useDisclosure()
    return (
        <Flex direction="column" w="100%" h="100%">
            <Flex justifyContent="space-between" align="center" padding={35}>
                <Flex><Text fontSize='4xl' color='#EE852F' >Inventory</Text></Flex>
                <Flex mr="15">
                    <InputGroup>
                        <Input variant='flushed' placeholder='Search' w="150px" />
                        <InputRightElement children={<SearchIcon color="gray.300" />} />
                    </InputGroup>
                </Flex>

            </Flex>
            <Flex borderWidth="1px" borderRadius="10px" mx="20" overflowY="scroll">

                <Table variant="simple"  >
                    <TableCaption>Inventory</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Serial Number</Th>
                            <Th>Name</Th>
                            <Th isNumeric>multiply by</Th>
                            <Th isNumeric>In Stock</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        <Tr _hover={{
                            background: "#EE852F",
                            color: "white",
                        }}>
                            <Td>inches</Td>
                            <Td>millimetres (mm)</Td>
                            <Td isNumeric>25.4</Td>
                            <Td isNumeric>10</Td>
                            <Td >
                                <Flex mr="-10">
                                    <ButtonGroup variant='ghost' spacing='1'>
                                        <IconButton onClick={firstT} aria-label='Edit' icon={<EditIcon />} />
                                        <IconButton aria-label='Delete' icon={<DeleteIcon />} />
                                    </ButtonGroup>
                                </Flex>
                            </Td>
                        </Tr>

                        <Collapse in={first} animateOpacity>
                            <Flex bg="grey" >
                                <Input
                                    variant='flushed'
                                    placeholder='serial number'
                                />
                            </Flex>
                        </Collapse>

                        <Tr _hover={{
                            background: "#EE852F",
                            color: "white",
                        }}>
                            <Td>feet</Td>
                            <Td>centimetres (cm)</Td>
                            <Td isNumeric>30.48</Td>
                            <Td isNumeric>10</Td>
                            <Td >
                                <Flex mr="-10">
                                    <ButtonGroup variant='ghost' spacing='1'>
                                        <IconButton onClick={secT} aria-label='Edit' icon={<EditIcon />} />
                                        <IconButton aria-label='Delete' icon={<DeleteIcon />} />
                                    </ButtonGroup>
                                </Flex>
                            </Td>
                        </Tr>

                    </Tbody>

                </Table>
            </Flex>
        </Flex >
    )
}

export default BrowseInventory;