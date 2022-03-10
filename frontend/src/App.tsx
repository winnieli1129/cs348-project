import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import Login from './pages/Login'
import BrowseInventory from "./pages/BrowseInventory"
import EmployeeLogin from './pages/EmployeeLogin'
import Checkout from "./pages/Checkout"
export const App = () => (
  <ChakraProvider theme={theme}>
    <Box w="100vw" h="100vh">
      <Checkout/>
    </Box>
  </ChakraProvider>
)
