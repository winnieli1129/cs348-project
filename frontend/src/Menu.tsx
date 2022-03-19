import * as React from "react"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button
} from "@chakra-ui/react"

const EmployeeMenuSection = () => {

    return (
        <Menu>
            <MenuButton as={Button} w="150px" my="2" mx="2">
                Pages
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() =>  window.location.href = `/inventory`}>Inventory</MenuItem>
                <MenuItem onClick={() =>  window.location.href = `/product`}>Products</MenuItem>
                <MenuItem onClick={() =>  window.location.href = `/`}>Checkout</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default EmployeeMenuSection;