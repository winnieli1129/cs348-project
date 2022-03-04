import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import Login from './pages/Login'

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box w="100vw" h="100vh">
      <Login/>
    </Box>
  </ChakraProvider>
)
