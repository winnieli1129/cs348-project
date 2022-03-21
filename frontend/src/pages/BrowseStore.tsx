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
import EmployeeMenuSection from "../Menu";

const Store = ({id, name, address, phone_number}: {id:any, name:any, address: any, phone_number:any}) => {
   
    const { isOpen, onToggle } = useDisclosure()
    
    const [editedName, setEditedName] = useState("")
    const [editedAddress, setEditedAddress] = useState("")
    const [editedPhoneNumber, setEditedPhoneNumber] = useState("")

    const handleDelete = () => {
        axios.post(`http://localhost:8080/delete-store`, {
            store_id: id,
        }, {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        })
      .then(res => {
        alert("The store is deleted!")
        window.location.reload();
      })
      .catch(err => {
          alert(err)
      })
    }

    const handleUpdate = () => {
        axios.post(`http://localhost:8080/update-store`, {
            store_id: id,
            name: editedName === "" ? name : editedName,
            address: editedAddress === "" ? address : editedAddress,
            phone_number: editedPhoneNumber  === "" ? phone_number : editedPhoneNumber

        }, {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        })
      .then(res => {
        alert("The store is updated!")
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
                <Td>{name}</Td>
                <Td>{address}</Td>
                <Td>{phone_number}</Td>
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
                        <Flex direction='column' w='100%' ml='20'>
                            <Flex justifyContent='space-around'>
                                <Flex direction='column' >
                                    <Text fontSize='sm' mt='10' mb='3'>Serial Number</Text>
                                    <Input
                                        variant='flushed'
                                        placeholder={name}
                                        w='150px'
                                        value={editedName}
                                        onChange={e => setEditedName(e.target.value)}
                                    />
                                </Flex>
                                <Flex direction='column' ml='30px'>
                                    <Text fontSize='sm' mt='10' mb='3'>Name</Text>
                                    <Input
                                        variant='flushed'
                                        placeholder={address}
                                        w='150px'
                                        value={editedAddress}
                                        onChange={e => setEditedAddress(e.target.value)}
                                    />
                                </Flex>
                                <Flex direction='column' ml='30px'>
                                    <Text fontSize='sm' mt='10' mb='3'>Price</Text>
                                    <Input
                                        variant='flushed'
                                        placeholder={phone_number}
                                        w='150px'
                                        value={editedPhoneNumber}
                                        onChange={e => setEditedPhoneNumber(e.target.value)}
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

const BrowseStore = () => {
    if (!localStorage.getItem('jwt_token')) {
        window.location.href = `/employee/login`;
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [stores, setStores] = useState<any[]>([]);

    const CreateStoreModal = () => {

        const [name, setName] = useState("")
        const [address, setAddress] = useState("")
        const [phoneNumber, setPhoneNumber] = useState("")


        const handleSubmit = () => {
            axios.post(`http://localhost:8080/create-store`, {
                name: name,
                address: address,
                phone_number: phoneNumber
            }, {
                headers: {
                    'Authorization': localStorage.getItem('jwt_token') || ""
                }
            })
          .then(res => {
            onClose()
            alert("The store is added!")
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
                <ModalHeader>Add Store</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                    <FormLabel>Store Name</FormLabel>
                    <Input placeholder='Store Name' value={name} onChange={
                        e => {
                            setName(e.target.value)
                        }
                    }/>
                    </FormControl>

                    <FormControl mt={4}>
                    <FormLabel>Address</FormLabel>
                    <Input placeholder='Address' value={address} onChange={
                        e => {
                            setAddress(e.target.value)
                        }
                    }/>
                    </FormControl>

                    <FormControl mt={4}>
                    <FormLabel>Phone Number</FormLabel>
                    <Input placeholder='Phone Number' value={phoneNumber} onChange={
                        e => {
                            setPhoneNumber(e.target.value)
                        }
                    }/>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button disabled={!(!!name && !!address && !!phoneNumber)} colorScheme='blue' mr={3} onClick={handleSubmit}>
                    Submit
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }
    
    useEffect(() => {
        axios.get(`http://localhost:8080/get-stores`,
        {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        }
        )
        .then(res => {
            setStores(res.data)
        })
    }, [])

    const storesList = stores.map(store => <Store name={store.name} address={store.address} phone_number={store.phone_number} id={store.id}/>)
    return (
        <Flex direction="column" w="100%" h="100%">
            <EmployeeMenuSection/>
            <Flex justifyContent="space-between" align="center" padding={30}>
                <Flex><Text fontSize='4xl' color='#EE852F' >Store</Text></Flex>
                <Flex mr="20">
                    <InputGroup>
                        <Input variant='flushed' placeholder='Search' w="150px" />
                        <InputRightElement children={<SearchIcon color="gray.300" />} />
                    </InputGroup>
                    <Button w="250px" onClick={onOpen}>Add Store</Button>
                </Flex>
            </Flex>
            <Flex borderWidth="1px" borderRadius="10px" mx="20" overflowY="scroll">
                <Table variant="simple"  >
                    <TableCaption>Store</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Address</Th>
                            <Th>Phone Number</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                        {storesList}
                    </Tbody>
                </Table>
            </Flex>
            <CreateStoreModal />
        </Flex >
    )
}

export default BrowseStore;