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
    NumberInputField,
    NumberInput,
    ModalCloseButton,
} from "@chakra-ui/react"
import EmployeeMenuSection from "../Menu";

import axios from 'axios';

import Kermit from './kermit.jpeg'

const Inventory = ({name, quantity, store, price, serial, id}: {name: any, quantity: any, store: any, price: any, serial: any, id: any}) => {
    const { isOpen, onToggle } = useDisclosure()
    const [editedQuantity, setEditedQuantity] = useState(-1)

    const handleUpdate = () => {
        axios.post(`http://localhost:8080/update-inventory`, {
            inventory_id : id,
            quantity : editedQuantity

        }, {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        })
      .then(res => {
        alert("The inventory is updated!")
        window.location.reload();
      })
      .catch(err => {
          alert(err.response.data)
      })
    }

    const handleDelete = () => {
        axios.post(`http://localhost:8080/delete-inventory`, {
            inventory_id: id,
        }, {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        })
      .then(res => {
        alert("The inventory is deleted!")
        window.location.reload();
      })
      .catch(err => {
          alert(err.response.data)
      })
    }

    return (
        <>
            <Tr _hover={{
                background: "#EE852F",
                opacity: '90%',
                color: "white",
            }}>
                <Td>{serial}</Td>
                <Td>{name}</Td>
                <Td>{store}</Td>
                <Td isNumeric>${price}</Td>
                <Td isNumeric>{quantity}</Td>
                <Td>
                    <Flex mr="-10">
                        <ButtonGroup variant='ghost' spacing='1'>
                            <IconButton onClick={onToggle} aria-label='Edit' icon={<EditIcon />} _hover={{
                                color: "black"
                            }} />
                            <IconButton onClick={handleDelete} aria-label='Delete' icon={<DeleteIcon />} _hover={{
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
                                <Flex direction='column' ml='30px'>
                                    <Text fontSize='sm' mt='10' mb='3'>In Stock</Text>
                                    <Input
                                        type="number"
                                        variant='flushed'
                                        placeholder={quantity}
                                        w='150px'
                                        value={editedQuantity === -1 ? quantity : editedQuantity}
                                        onChange={ e => {
                                            setEditedQuantity(parseFloat(e.target.value))
                                        }}
                                    />
                                </Flex>
                            </Flex>
                            <ButtonGroup variant='outline' spacing='6' mt='10' justifyContent='flex-end'>
                                <Button color='#EE852F' onClick={onToggle}>Cancel</Button>
                                <Button bg='#EE852F' color='white' onClick={handleUpdate}>Save</Button>
                            </ButtonGroup>
                        </Flex>
                    </Flex>
                </Td>
            </Tr>
        </>
    )

}

const BrowseInventory = () => {
    if (!localStorage.getItem('jwt_token')) {
        window.location.href = `/employee/login`;
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [products, setProducts] = useState<any[]>([]);
    const [inventories, setInventories] = useState<any[]>([]);
    const [stores, setStores] = useState<any[]>([]);
    const [selectStore, setSelectStore] = useState("");

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

    useEffect(() => {
        selectStore === "" ?
            axios.get(`http://localhost:8080/get-inventories`,
            {
                headers: {
                    'Authorization': localStorage.getItem('jwt_token') || ""
                }
            }
            )
            .then(res => {
                setInventories(res.data)
            })
        :
            axios.get(`http://localhost:8080/get-inventories?store_id=${selectStore}`,
            {
                headers: {
                    'Authorization': localStorage.getItem('jwt_token') || ""
                }
            })
            .then(res => {
                setInventories(res.data)
            })
    }, [selectStore])

    useEffect(() => {
        axios.get(`http://localhost:8080/get-stores`)
        .then(res => {
            setStores(res.data)
        })
    }, [])

    const productOptions = products.map(product => <option value={product.id}>{product.product_name}</option>)
    const storeOptions = stores.map(store => <option value={store.id}>{store.name}</option>)

    const CreateInventoryModal = () => {

        const [productId, setProductId] = useState("")
        const [storeId, setStoreId] = useState("")
        const [quantity, setQuantity] = useState(0)

        const handleSubmit = () => {
            axios.post(`http://localhost:8080/create-inventory`, {
                product_id: productId,
                store_id: storeId,
                quantity: quantity
            }, {
                headers: {
                    'Authorization': localStorage.getItem('jwt_token') || ""
                }
            })
          .then(res => {
            onClose()
            alert("The inventory is added!")
            window.location.reload();
          })
          .catch(err => {
              alert(err.response.data)
          })
        }

        return (
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Add Inventory</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel>Product Name</FormLabel>
                        <Select
                            onChange={e => {
                                setProductId(e.target.value)
                            }} 
                            value={productId} 
                            variant='flushed' 
                            placeholder='Select Your Product'
                        >
                            {productOptions}
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                    <FormLabel>Store</FormLabel>
                        <Select
                            onChange={e => {
                                setStoreId(e.target.value)
                            }} 
                            value={storeId} 
                            variant='flushed' 
                            placeholder='Select Your Store'
                        >
                            {storeOptions}
                        </Select>
                    </FormControl>

                    <FormControl mt={4}>
                    <FormLabel>Quantity</FormLabel>
                    <NumberInput placeholder='Quantity' value={quantity} defaultValue={0}>
                    <NumberInputField 
                        onChange={
                            e => {
                                setQuantity(parseFloat(e.target.value))
                            }
                        }
                    />
                    </NumberInput>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button disabled={!(!!quantity && !!storeId && !!productId)} colorScheme='blue' mr={3} onClick={handleSubmit}>
                    Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }

    const inventoryList = inventories.map(inventory => <Inventory id={inventory.id} serial={inventory.product.serial_number} name={inventory.product.product_name} quantity={inventory.quantity} price={inventory.product.price} store={inventory.store.name}/>)

    return (
        <Flex direction="column" w="100%" h="100%">
            <EmployeeMenuSection/>
            <Flex justifyContent="space-between" align="center" padding={30}>
                <Flex><Text fontSize='4xl' color='#EE852F' >Inventory</Text></Flex>
                <Flex mr="20">
                    <InputGroup>
                        <Input variant='flushed' placeholder='Search' w="150px" />
                        <InputRightElement children={<SearchIcon color="gray.300" />} />
                    </InputGroup>
                    <Button w="250px" onClick={onOpen}>Add Inventory</Button>
                </Flex>
            </Flex>
            <Flex w='300px' ml='20' mb='5'>
                <Select placeholder='Select Store' value={selectStore} onChange={e => {
                    setSelectStore(e.target.value)
                }}>
                   {storeOptions}
                </Select>
            </Flex>
            <Flex borderWidth="1px" borderRadius="10px" mx="20" overflowY="scroll">
                <Table variant="simple"  >
                    <TableCaption>Inventory</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Serial Number</Th>
                            <Th>Product</Th>
                            <Th>Store</Th>
                            <Th isNumeric>Price</Th>
                            <Th isNumeric>In Stock</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                       {inventoryList}
                    </Tbody>
                </Table>
            </Flex>
            <CreateInventoryModal />
        </Flex >
    )
}

export default BrowseInventory;