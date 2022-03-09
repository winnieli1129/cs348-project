import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import Login from './pages/Login'
import BrowseInventory from "./pages/BrowseInventory"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box w="100vw" h="100vh">
      <BrowseInventory/>
    </Box>
  </ChakraProvider>
)
