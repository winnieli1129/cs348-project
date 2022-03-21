import React, {useEffect, useState} from "react"
import { MdSearch, MdAdd, MdRemove, MdDelete } from "react-icons/md";

import {
   Flex,
   Text,
   Input,
   InputGroup,
   InputLeftElement,
   NumberInput,
   NumberInputField,
   Image,
   Icon,
   Button,
   IconButton,
   Divider
  } from "@chakra-ui/react"
import EmployeeMenuSection from "../Menu";
import axios from 'axios';
import * as R from 'ramda'
import jwt_decode from "jwt-decode";

type product = {
  serial_number: string,
  quantity: number,
  price: number,
  name: string
}

type order = {
  customer_email?: string,
  store_id: number,
  products: product[]
}

let personalInfo = {}
if (localStorage.getItem("jwt_token")) {
  personalInfo = jwt_decode(localStorage.getItem("jwt_token") || "");
}

const OrderItem = ({
  price, 
  name, 
  quantity, 
  serial, 
  handleRemoveFromCart, 
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleSetQuantity
}: {
  price:any, 
  name:any, 
  quantity:any, 
  serial:any, 
  handleRemoveFromCart:any, 
  handleIncreaseQuantity:any,
  handleDecreaseQuantity:any,
  handleSetQuantity:any
}
  ) => {

  return (
    <Flex justify="flex-start" align="center" gap="20px">
      <Image w="50px" h="50px" src='https://bit.ly/dan-abramov'/>
      <Text>
        {name}
      </Text>
      <IconButton onClick={handleDecreaseQuantity} aria-label='subtract' icon={<MdRemove color="white"/>} bg="#EE852F" borderRadius={20}/>
      <NumberInput size='md' defaultValue={1} min={1} value={quantity}>
        <NumberInputField 
        onChange={e => {
          handleSetQuantity(serial, price, name, parseFloat(e.target.value))
          }}
        />
      </NumberInput>
      <IconButton onClick={handleIncreaseQuantity} aria-label='add' icon={<MdAdd color="white"/>} bg="#EE852F" borderRadius={20}/>
      <Text>
        ${price * quantity}
      </Text>
      <IconButton onClick={handleRemoveFromCart} aria-label='remove' icon={<MdDelete color="#EE852F"/>} bg="white"/>
    </Flex>
  )
}
const Item = ({price, id, name, handleAddToCart}: {price:any, id:any, name:any, handleAddToCart:any}) => {
  return (
    <Flex 
      direction="column" 
      bg="white" 
      h="270px" 
      w="270px" 
      justify="flex-start" 
      align="center" 
      gap="5px" 
      p="1%"
      borderRadius="20px"
    >
      <Text fontSize="2xl">
        <b>
          {name}
        </b>
      </Text>
      <Image w="100px" h="100px" src='https://bit.ly/dan-abramov'/>
      <Text>
        ${price}
      </Text>
      <Button bg="#3B413C" color="white" onClick={handleAddToCart}>
        Add To Cart
      </Button>
    </Flex>
  )
}

const Checkout = () => {
  if (!localStorage.getItem('jwt_token')) {
    window.location.href = `/employee/login`;
  }
  const [products, setProducts] = useState<any[]>([]);
  const [curOrder, setCurOrder] = useState<order>({
    customer_email: "",
    store_id: 0,
    products: []
  });

  const handleAddToCart = (serial: string, price: number, name: string) => {
    const index = R.findIndex(R.propEq('serial_number', serial))(curOrder.products);
    if (index === -1) {
      setCurOrder({
        ...curOrder,
        products: R.append({
          serial_number: serial,
          quantity: 1,
          price: price,
          name: name,
        }, curOrder.products)
      })
    } else {
      setCurOrder({
        ...curOrder,
        products: R.update(index, {
          serial_number: serial,
          quantity: curOrder.products[index].quantity + 1,
          price: price,
          name: name,
        }, curOrder.products)
      })
    } 
  }

  const handleRemoveFromCart = (serial: string) => {
    const index = R.findIndex(R.propEq('serial_number', serial))(curOrder.products);
    setCurOrder({
      ...curOrder,
      products: R.remove(index, 1, curOrder.products)
    })
  }

  const handleIncreaseQuantity = (serial: string, price: number, name: string) => {
    const index = R.findIndex(R.propEq('serial_number', serial))(curOrder.products);
    setCurOrder({
      ...curOrder,
      products: R.update(index, {
        serial_number: serial,
        quantity: curOrder.products[index].quantity + 1,
        price: price,
        name: name,
      }, curOrder.products)
    })
  }

  const handleDecreaseQuantity = (serial: string, price: number, name: string) => {
    const index = R.findIndex(R.propEq('serial_number', serial))(curOrder.products);
    setCurOrder({
      ...curOrder,
      products: R.update(index, {
        serial_number: serial,
        quantity: curOrder.products[index].quantity - 1 < 1 ? 1 : curOrder.products[index].quantity - 1,
        price: price,
        name: name,
      }, curOrder.products)
    })
  }

  const handleSetQuantity = (serial: string, price: number, name: string, quantity: number) => {
    const index = R.findIndex(R.propEq('serial_number', serial))(curOrder.products);
    setCurOrder({
      ...curOrder,
      products: R.update(index, {
        serial_number: serial,
        quantity: quantity,
        price: price,
        name: name,
      }, curOrder.products)
    })
  }

  const handleSubmitOrder = () => {
    let formattedProducts:any[] = []

    curOrder.products.map(product => {
      formattedProducts.push(R.pick(['serial_number', 'quantity'], product))
    })


    curOrder.customer_email === "" ?
      axios.post(`http://localhost:8080/create-order`,
      {
        store_id: (personalInfo as any).store_id,
        products: formattedProducts
      },
      {
          headers: {
              'Authorization': localStorage.getItem('jwt_token') || ""
          }
      }
      )
      .then(res => {
          alert("Order has been submitted!");
          setCurOrder(
            {
              customer_email: "",
              store_id: 0,
              products: []
            }
          )
      })
      .catch(err => {
        alert(err)
      })
    :
    axios.post(`http://localhost:8080/create-order`,
    {
      customer_email: curOrder.customer_email,
      store_id: (personalInfo as any).store_id,
      products: formattedProducts
    },
    {
        headers: {
            'Authorization': localStorage.getItem('jwt_token') || ""
        }
    }
    )
    .then(res => {
      alert("Order has been submitted!");
      setCurOrder(
        {
          customer_email: "",
          store_id: 0,
          products: []
        }
      )
    })
    .catch(err => {
      alert(err)
    })
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

  const productsList = products.map(product => 
  <Item 
    handleAddToCart={() => {
      handleAddToCart(product.serial_number, product.price, product.product_name)
    }} 
    id={product.id} 
    name={product.product_name} 
    price={product.price}
  />)


  const orderItemList = curOrder.products.map(product => 
  <OrderItem
    handleRemoveFromCart={() => {handleRemoveFromCart(product.serial_number)}}
    handleIncreaseQuantity={() => {handleIncreaseQuantity(product.serial_number, product.price, product.name)}}
    handleDecreaseQuantity={() => {handleDecreaseQuantity(product.serial_number, product.price, product.name)}}
    handleSetQuantity={handleSetQuantity}
    serial={product.serial_number} 
    quantity={product.quantity} 
    name={product.name} 
    price={product.price}
  />)

  return(
    <Flex w="100%" h="100%">
      <Flex bg="rgba(238, 133, 47, 0.62)" h="100%" w="65%" borderRightRadius="50px" p="12">
        <Flex direction="column" w="100%">
          <Flex justify="space-between" align="center" w="100%">
          <EmployeeMenuSection/>
            <InputGroup>
                <Input
                    bg="white"
                    boxShadow="md"
                    size='lg'
                    placeholder='Search for an item'
                    w="400px"
                    borderRadius="10"
                />
                    <InputLeftElement children={<Icon w="6" h="6" as={MdSearch} />} />
            </InputGroup>
            <Input
                bg="white"
                boxShadow="md"
                size='lg'
                placeholder='Customer Email (Optional)'
                w="600px"
                borderRadius="10"
                mr="4"
                value={curOrder.customer_email}
                onChange={e => {
                  setCurOrder({
                    ...curOrder,
                    customer_email: e.target.value
                  })
                }}
            />
            <Button borderRadius="100" bg="#3B413C" textColor="white">
              J
            </Button>
          </Flex>
          {/* Item List */}
          <Flex mt="10" wrap="wrap" gap="25px" overflowY="scroll">
           {productsList}
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" h="100%" w="35%" p="12">
        <Text fontSize="4xl">
          <b>
            Your Order
          </b>
        </Text>
        <Flex direction="column" overflowY="scroll" mt="10" gap="15px" h="60vh">
          {orderItemList}
        </Flex>
      <Divider mt="8" color="black"/>
        <Flex justify="space-between" w="100%">
          <Text fontSize="4xl">
            <b>
            Total
            </b>
          </Text>
          <Text fontSize="4xl">
            <b>
            ${
              curOrder.products.reduce(function(prev, current) {
                return prev + current.price * current.quantity
              }, 0)
            }
            </b>
          </Text>
        </Flex>
        <Button onClick={handleSubmitOrder} mt="5" color="white" bg="#EE852F" borderRadius="20px">
          Checkout
        </Button>
      </Flex>
    </Flex>
  )
}

export default Checkout;