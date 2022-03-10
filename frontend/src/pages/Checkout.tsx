import React, {useEffect, useState} from "react"
import { MdSearch } from "react-icons/md";
import { LockIcon } from '@chakra-ui/icons';

import {
   Flex,
   Text,
   Input,
   InputGroup,
   InputLeftElement,
   Image,
   Icon,
   Button
  } from "@chakra-ui/react"


const Item = () => {
  return (
    <Flex direction="column" bg="white" h="300px" w="300px">
      <Text>
        Apple
      </Text>
      <Image w="100px" h="100px" src='https://bit.ly/dan-abramov'/>
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
          <Flex mt="10">
            <Item/>
          </Flex>
        </Flex>
      </Flex>
      <Flex h="100%" w="35%">

      </Flex>
    </Flex>
  )
}

export default Checkout;