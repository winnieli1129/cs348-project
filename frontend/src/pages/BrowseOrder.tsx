import React, {useState, useEffect} from "react"
import { DeleteIcon, SearchIcon } from '@chakra-ui/icons';

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

const Order = ({store_name, customer_email, price, id}: {store_name: any, customer_email: any, price: any, id: any}) => {
    const { isOpen, onToggle } = useDisclosure()
    const handleDelete = () => {
        axios.post(`http://localhost:8080/delete-order`, {
            order_id: id,
        }, {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        })
      .then(res => {
        alert("The order is deleted!")
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
                <Td>{store_name}</Td>
                <Td>{customer_email}</Td>
                <Td isNumeric>${price}</Td>
                <Td>
                    <Flex mr="-10">
                        <ButtonGroup variant='ghost' spacing='1'>
                            <IconButton onClick={handleDelete} aria-label='Delete' icon={<DeleteIcon />} _hover={{
                                color: "black"
                            }} />
                        </ButtonGroup>
                    </Flex>
                </Td>
            </Tr>
        </>
    )

}

const BrowseOrder = () => {
    if (!localStorage.getItem('jwt_token')) {
        window.location.href = `/employee/login`;
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [orders, setOrders] = useState<any[]>([]);
    const [stores, setStores] = useState<any[]>([]);
    const [selectStore, setSelectStore] = useState("");

    useEffect(() => {
        selectStore === "" ?
            axios.get(`http://localhost:8080/get-orders`,
            {
                headers: {
                    'Authorization': localStorage.getItem('jwt_token') || ""
                }
            }
            )
            .then(res => {
                setOrders(res.data)
            })
        :
            axios.get(`http://localhost:8080/get-store-orders?store_id=${selectStore}`,
            {
                headers: {
                    'Authorization': localStorage.getItem('jwt_token') || ""
                }
            })
            .then(res => {
                setOrders(res.data)
            })
    }, [selectStore])

    useEffect(() => {
        axios.get(`http://localhost:8080/get-stores`)
        .then(res => {
            setStores(res.data)
        })
    }, [])

    const storeOptions = stores.map(store => <option value={store.id}>{store.name}</option>)

    const orderList = orders.map(order => <Order id={order.id} store_name={order.store.name} customer_email={order.customer.email} price={order.total_price}/>)

    return (
        <Flex direction="column" w="100%" h="100%">
            <EmployeeMenuSection/>
            <Flex justifyContent="space-between" align="center" padding={30}>
                <Flex><Text fontSize='4xl' color='#EE852F' >Order</Text></Flex>
                <Flex mr="20">
                    <InputGroup>
                        <Input variant='flushed' placeholder='Search' w="150px" />
                        <InputRightElement children={<SearchIcon color="gray.300" />} />
                    </InputGroup>
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
                    <TableCaption>Order</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Store Name</Th>
                            <Th>Customer Email</Th>
                            <Th isNumeric>Total Price</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody >
                       {orderList}
                    </Tbody>
                </Table>
            </Flex>
        </Flex >
    )
}

export default BrowseOrder;