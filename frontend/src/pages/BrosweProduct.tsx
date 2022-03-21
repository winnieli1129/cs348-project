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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    ModalCloseButton,
    NumberInputField,
    NumberInput
} from "@chakra-ui/react"

import axios from 'axios';
import EmployeeMenuSection from "../Menu";
import Kermit from './kermit.jpeg'

const Product = ({price, id, name, serial}: {price:any, id:any, name:any, serial: any}) => {
   
    const { isOpen, onToggle } = useDisclosure()
    const [editedSerial, setEditedSerial] = useState("")
    const [editedProductName, setEditedProductName] = useState("")
    const [editedPrice, setEditedPrice] = useState(-1)

    const handleDelete = () => {
        axios.post(`http://localhost:8080/delete-product`, {
            serial_number: serial,
        }, {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        })
      .then(res => {
        alert("The product is deleted!")
        window.location.reload();
      })
      .catch(err => {
          alert(err)
      })
    }

    const handleUpdate = () => {
        axios.post(`http://localhost:8080/update-product`, {
            product_id: id,
            serial_number: editedSerial === "" ? serial : editedSerial,
            product_name: editedProductName  === "" ? name : editedProductName,
            price: editedPrice  === -1 ? price : editedPrice

        }, {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        })
      .then(res => {
        alert("The product is updated!")
        window.location.reload();
      })
      .catch(err => {
          alert(err)
      })
    }
    
    return (
        <>
            <Tr 
                key={id}
                _hover={{
                    background: "#EE852F",
                    opacity: '90%',
                    color: "white",
                }}
            >
                <Td>{serial}</Td>
                <Td>{name}</Td>
                <Td isNumeric>${price}</Td>
                <Td>
                    <Flex mr="-10">
                        <ButtonGroup variant='ghost' spacing='1'>
                            <IconButton onClick={onToggle} aria-label='Edit' icon={<EditIcon />} _hover={{
                                color: "black"
                            }} />
                            <IconButton 
                                aria-label='Delete' 
                                icon={<DeleteIcon />} 
                                _hover={{
                                    color: "black"
                                }} 
                                onClick={handleDelete}
                            />
                        </ButtonGroup>
                    </Flex>
                </Td>
            </Tr>

            <Tr hidden={!isOpen}>
                <Td colSpan={5}>
                    <Flex h="230px">
                        <Image w="150px" h="150px" src={Kermit} />
                        <Flex direction='column' w='100%' ml='20'>
                            <Flex justifyContent='space-around'>
                                <Flex direction='column' >
                                    <Text fontSize='sm' mt='10' mb='3'>Serial Number</Text>
                                    <Input
                                        variant='flushed'
                                        placeholder={serial}
                                        w='150px'
                                        value={editedSerial}
                                        onChange={e => setEditedSerial(e.target.value)}
                                    />
                                </Flex>
                                <Flex direction='column' ml='30px'>
                                    <Text fontSize='sm' mt='10' mb='3'>Name</Text>
                                    <Input
                                        variant='flushed'
                                        placeholder={name}
                                        w='150px'
                                        value={editedProductName}
                                        onChange={e => setEditedProductName(e.target.value)}
                                    />
                                </Flex>
                                <Flex direction='column' ml='30px'>
                                    <Text fontSize='sm' mt='10' mb='3'>Price</Text>
                                    <Input
                                        variant='flushed'
                                        placeholder={price}
                                        w='150px'
                                        value={editedPrice === -1 ? price : editedPrice}
                                        onChange={e => setEditedPrice(parseFloat(e.target.value))}
                                    />
                                </Flex>
                            </Flex>
                            <ButtonGroup variant='outline' spacing='6' mt='10' justifyContent='flex-end'>
                                <Button color='#EE852F' onClick={onToggle}>Cancel</Button>
                                <Button bg='#EE852F' color='white'onClick={handleUpdate} >Save</Button>
                            </ButtonGroup>
                        </Flex>
                    </Flex>
                </Td>
            </Tr>
        </>
    )

}

const BrowseProduct = () => {
    if (!localStorage.getItem('jwt_token')) {
        window.location.href = `/employee/login`;
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [products, setProducts] = useState<any[]>([]);

    const CreateProductModal = () => {

        const [serial, setSerial] = useState("")
        const [productName, setProductName] = useState("")
        const [price, setPrice] = useState("0")


        const handleSubmit = () => {
            axios.post(`http://localhost:8080/create-product`, {
                serial_number: serial,
                product_name: productName,
                price: parseFloat(price)
            }, {
                headers: {
                    'Authorization': localStorage.getItem('jwt_token') || ""
                }
            })
          .then(res => {
            onClose()
            alert("The product is added!")
            window.location.reload();
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
                    <NumberInput placeholder='Price' value={price} defaultValue={0} precision={2}>
                    <NumberInputField 
                        onChange={
                            e => {
                                setPrice(e.target.value)
                            }
                        }
                    />
                    </NumberInput>
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

    const productsList = products.map(product => <Product serial={product.serial_number} name={product.product_name} price={product.price} id={product.id}/>)
    return (
        <Flex direction="column" w="100%" h="100%">
            <EmployeeMenuSection/>
            <Flex justifyContent="space-between" align="center" padding={30}>
                <Flex><Text fontSize='4xl' color='#EE852F' >Product</Text></Flex>
                <Flex mr="20">
                    <InputGroup>
                        <Input variant='flushed' placeholder='Search' w="150px" />
                        <InputRightElement children={<SearchIcon color="gray.300" />} />
                    </InputGroup>
                    <Button w="250px" onClick={onOpen}>Add Product</Button>
                </Flex>
            </Flex>
            <Flex borderWidth="1px" borderRadius="10px" mx="20" overflowY="scroll">
                <Table variant="simple"  >
                    <TableCaption>Product</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Serial Number</Th>
                            <Th>Name</Th>
                            <Th isNumeric>Price</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        {productsList}
                    </Tbody>
                </Table>
            </Flex>
            <CreateProductModal />
        </Flex >
    )
}

export default BrowseProduct;