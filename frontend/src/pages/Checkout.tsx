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

const OrderItem = () => {
  const [quantity, setQuantity] = useState(0)
  return (
    <Flex justify="flex-start" align="center" gap="20px">
      <Image w="50px" h="50px" src='https://bit.ly/dan-abramov'/>
      <Text>
        Apple
      </Text>
      <IconButton aria-label='subtract' icon={<MdRemove color="white"/>} bg="#EE852F" borderRadius={20}/>
      <NumberInput size='md' defaultValue={1} min={1}>
        <NumberInputField />
      </NumberInput>
      <IconButton aria-label='add' icon={<MdAdd color="white"/>} bg="#EE852F" borderRadius={20}/>
      <Text>
        $3.99
      </Text>
      <IconButton aria-label='remove' icon={<MdDelete color="#EE852F"/>} bg="white"/>
    </Flex>
  )
}
const Item = () => {
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
          Apple
        </b>
      </Text>
      <Image w="100px" h="100px" src='https://bit.ly/dan-abramov'/>
      <Text>
        $1.33
      </Text>
      <Button bg="#3B413C" color="white">
        Add To Cart
      </Button>
    </Flex>
  )
}
const Checkout = () => {
  return(
    <Flex w="100%" h="100%">
      <Flex bg="rgba(238, 133, 47, 0.62)" h="100%" w="65%" borderRightRadius="50px" p="12">
        <Flex direction="column" w="100%">
          <Flex justify="space-between" align="center" w="100%">
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
            <Button borderRadius="100" bg="#3B413C" textColor="white">
              J
            </Button>
          </Flex>
          {/* Item List */}
          <Flex mt="10" wrap="wrap" gap="25px" overflowY="scroll">
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
            <Item/>
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
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
          <OrderItem/>
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
            $27.93
            </b>
          </Text>
        </Flex>
        <Button mt="5" color="white" bg="#EE852F" borderRadius="20px">
          Checkout
        </Button>
      </Flex>
    </Flex>
  )
}

export default Checkout;