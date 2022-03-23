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
    Select

} from "@chakra-ui/react"

import axios from 'axios';
import jwt_decode from "jwt-decode";
import { createDeflate } from "zlib";
import { product } from "ramda";
import EmployeeMenuSection from "../Menu";

const EmployeeProfile = () => {


    const { isOpen, onToggle } = useDisclosure()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone_number, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [storeId, setStoreId] = useState(0)
    const [createdAt, setCreated] = useState<Date>(new Date())
    const [orders, setOrders] = useState<any[]>([]);
    const [stores, setStores] = useState<any[]>([]);

    const options = stores.map(store => <option id={store.id} value={store.id}>{store.name}</option>)
    const token = localStorage.getItem('jwt_token');

    if (!token) {
        window.location.href = `/login`;
    }
    const decoded: any = jwt_decode(token || "");

    useEffect(() => {

        axios.get(`http://localhost:8080/get-employee?employee_id=${decoded.id}`,
            {
                headers: {
                    'Authorization': localStorage.getItem('jwt_token') || ""
                }
            })
            .then(res => {
                console.log(res.data)
                const userInfo = res.data
                setName(userInfo.name)
                setEmail(userInfo.email)
                setPhone(userInfo.phone_number)
                setStoreId(userInfo.store_id)
                setCreated(new Date(userInfo.createdAt))

            })
            .catch(err => {
                alert(err.response.data)
            })
        axios.get(`http://localhost:8080/get-stores`)
            .then(res => {
                setStores(res.data)
                
            })
    }, [])

    const orderList = orders.map(order => {
        return (
            <Flex w='100%' justifyContent='flex-start' onClick={() => {
                let productStr = ""
                order.products.map((product: any) => {
                    productStr += product.product_name + " " + product.order_product.quantity + "\n"
                })
                alert(productStr)
            }}>
                <Text mr='60'>{new Date(order.createdAt).toLocaleDateString()}</Text>
                <Text mr='60'>{order.store.name}</Text>
                <Text>${order.total_price}</Text>
            </Flex>
        )
    })

    const handleDelete = () => {

        axios.post(`http://localhost:8080/delete-employee`, {
            employee_id: (decoded as any).id,
        }, {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        })
            .then(res => {
                alert("The profile is deleted!")
                localStorage.clear()
                window.location.reload();
            })
            .catch(err => {
                alert(err.response.data)
            })
    }

    const handleUpdate = () => {
        axios.post(`http://localhost:8080/update-employee`, {
            employee_id: (decoded as any).id,
            store_id: storeId,
            name: name === "" ? name : name,
            email: email === "" ? email : email,
            password: password === "" ? null : password,

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
                alert(err.response.data)
            })
    }

    return (
        <Flex w="100%" h="100%">
            <EmployeeMenuSection />
            <Flex w="25%" direction="column" bg="white" alignItems='center' mt='32'>
                <Image w="150px" h="150px" src='https://bit.ly/dan-abramov' />
                <Text fontSize='xl'>
                    {name}
                </Text>
                <Text fontSize='xs' color='#8D8D8D' >
                    Member Since {createdAt.toLocaleDateString()}
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
                            <Text fontSize='sm' mt='10' mb='4'>Name</Text>
                            <Input
                                size='sm'
                                w='300px'
                                variant='flushed'
                                borderColor='#BCD8C1'
                                defaultValue={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <Text fontSize='sm' mt='10' mb='4'>Email</Text>
                            <Input
                                size='sm'
                                w='300px'
                                variant='flushed'
                                borderColor='#BCD8C1'
                                defaultValue={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                    


                        </Flex>
                        <Flex direction='column' mx='100px'>
                            <Text fontSize='sm' mt='10' mb='3'>Stores</Text>
                            <Select
                                onChange={e => {
                                    setStoreId(parseFloat(e.target.value))
                                }}
                                value={storeId}
                                variant='flushed'
                                placeholder='Select Your Store'
                            >
                                {options}
                            </Select>
                            <Text fontSize='sm' mt='10' mb='3'>Password</Text>
                            <Input
                                size='sm'
                                w='300px'
                                variant='flushed'
                                borderColor='#BCD8C1'
                                defaultValue={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <ButtonGroup size='sm' mt='10' variant='outline' spacing='6' alignSelf='flex-end'>
                                <Button color='#EE852F' onClick={() => {
                                    localStorage.clear()
                                    window.location.href = `/employee/login`;
                                }}>Logout</Button>
                                <Button bg='#EE852F' color='white' onClick={handleUpdate} >Save</Button>
                            </ButtonGroup>
                        </Flex>
                    </Flex>

                </Flex>
            </Flex>
        </Flex>

    )
}

export default EmployeeProfile;