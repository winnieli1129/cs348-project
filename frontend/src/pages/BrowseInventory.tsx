import React, {useState, useEffect} from "react"
import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons';

import {
    Flex,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Table,
    Thead,
    Tbody,  
    Tr,
    Th,
    Td,
    TableCaption,
    ButtonGroup,
    IconButton,   
    useDisclosure,
    Image,
    Button,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    ModalCloseButton
} from "@chakra-ui/react"

import axios from 'axios';

import Kermit from './kermit.jpeg'

const Inventory = () => {
    if (!localStorage.getItem('jwt_token')) {
        window.location.href = `/employee/login`;
    }
    const { isOpen, onToggle } = useDisclosure()
    
    return (
        <>
            <Tr _hover={{
                background: "#EE852F",
                opacity: '90%',
                color: "white",
            }}>
                <Td>123456</Td>
                <Td>Apple</Td>
                <Td isNumeric>$25.4</Td>
                <Td isNumeric>10</Td>
                <Td>
                    <Flex mr="-10">
                        <ButtonGroup variant='ghost' spacing='1'>
                            <IconButton onClick={onToggle} aria-label='Edit' icon={<EditIcon />} _hover={{
                                color: "black"
                            }} />
                            <IconButton aria-label='Delete' icon={<DeleteIcon />} _hover={{
                                color: "black"
                            }} />
                        </ButtonGroup>
                    </Flex>
                </Td>
            </Tr>

            <Tr hidden={!isOpen}>
                <Td colSpan={5}>
                    <Flex h="230px">
                        <Image w="150px" h="150px" src={Kermit} />
                        <Flex direction='column' w='100%' ml='20'>
                            <Flex justifyContent='space-between'>
                                <Flex direction='column' >
                                    <Text fontSize='sm' mt='10' mb='3'>Serial Number</Text>
                                    <Input
                                        variant='flushed'
                                        placeholder='123456'
                                        w='150px'
                                    />
                                </Flex>
                                <Flex direction='column' ml='30px'>
                                    <Text fontSize='sm' mt='10' mb='3'>Name</Text>
                                    <Input
                                        variant='flushed'
                                        placeholder='Apple'
                                        w='150px'
                                    />
                                </Flex>
                                <Flex direction='column' ml='30px'>
                                    <Text fontSize='sm' mt='10' mb='3'>Price</Text>
                                    <Input
                                        variant='flushed'
                                        placeholder='25.4'
                                        w='150px'
                                    />
                                </Flex>
                                <Flex direction='column' ml='30px'>
                                    <Text fontSize='sm' mt='10' mb='3'>In Stock</Text>
                                    <Input
                                        variant='flushed'
                                        placeholder='10'
                                        w='150px'
                                    />
                                </Flex>
                            </Flex>
                            <ButtonGroup variant='outline' spacing='6' mt='10' justifyContent='flex-end'>
                                <Button color='#EE852F'>Cancel</Button>
                                <Button bg='#EE852F' color='white'>Save</Button>
                            </ButtonGroup>
                        </Flex>
                    </Flex>
                </Td>
            </Tr>
        </>
    )

}

const BrowseInventory = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [products, setProducts] = useState<any[]>([]);

    const CreateProductModal = () => {

        const [serial, setSerial] = useState("")
        const [productName, setProductName] = useState("")
        const [price, setPrice] = useState(0)


        const handleSubmit = () => {
            axios.post(`http://localhost:8080/create-product`, {
                serial_number: serial,
                product_name: productName,
                price: price
            }, {
                headers: {
                    'Authorization': localStorage.getItem('jwt_token') || ""
                }
            })
          .then(res => {
            onClose()
            alert("The product is added!")
          })
          .catch(err => {
              alert(err)
          })
        }

        return (
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel>Product Name</FormLabel>
                    <Input placeholder='Product Name' value={productName} onChange={
                        e => {
                            setProductName(e.target.value)
                        }
                    }/>
                    </FormControl>

                    <FormControl mt={4}>
                    <FormLabel>Serial Number</FormLabel>
                    <Input placeholder='Serial Number' value={serial} onChange={
                        e => {
                            setSerial(e.target.value)
                        }
                    }/>
                    </FormControl>

                    <FormControl mt={4}>
                    <FormLabel>Price</FormLabel>
                    <Input placeholder='Price' value={price} onChange={
                        e => {
                            setPrice(parseFloat(e.target.value))
                        }
                    }/>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button disabled={!(!!serial && !!productName)} colorScheme='blue' mr={3} onClick={handleSubmit}>
                    Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }
    
    useEffect(() => {
        axios.get(`http://localhost:8080/get-products`,
        {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        }
        )
        .then(res => {
            setProducts(res.data)
        })
    }, [])
    console.log(products)
    return (
        <Flex direction="column" w="100%" h="100%">
            <Flex justifyContent="space-between" align="center" padding={30}>
                <Flex><Text fontSize='4xl' color='#EE852F' >Inventory</Text></Flex>
                <Flex mr="20">
                    <InputGroup>
                        <Input variant='flushed' placeholder='Search' w="150px" />
                        <InputRightElement children={<SearchIcon color="gray.300" />} />
                    </InputGroup>
                    <Button w="250px" onClick={onOpen}>Add Product</Button>
                </Flex>
            </Flex>
            <Flex w='300px' ml='20' mb='5'>
                <Select placeholder='Select Store'>
                    <option value='option1'>Store 1</option>
                    <option value='option2'>Store 2</option>
                    <option value='option3'>Store 3</option>
                </Select>
            </Flex>
            <Flex borderWidth="1px" borderRadius="10px" mx="20" overflowY="scroll">
                <Table variant="simple"  >
                    <TableCaption>Inventory</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Serial Number</Th>
                            <Th>Name</Th>
                            <Th isNumeric>Price</Th>
                            <Th isNumeric>In Stock</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        <Inventory />
                        <Inventory />
                        <Inventory />
                        <Inventory />
                        <Inventory />
                    </Tbody>
                </Table>
            </Flex>
            <CreateProductModal />
        </Flex >
    )
}

export default BrowseInventory;