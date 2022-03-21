import * as React from "react"
import {
  ChakraProvider,
  Box,
  theme,
} from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom";
import Login from './pages/Login'
import BrowseInventory from "./pages/BrowseInventory"
import EmployeeLogin from './pages/EmployeeLogin'
import CustomerProfile from './pages/CustomerProfile'
import Checkout from "./pages/Checkout"
import CustomerSignup from "./pages/CustomerSignup";
import EmployeeSignup from "./pages/EmployeeSignup";
import BrowseProduct from "./pages/BrosweProduct";
import BrowseStore from "./pages/BrowseStore";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box w="100vw" h="100vh">
      <Routes>
        <Route path="/" element={<Checkout />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<CustomerSignup/>} />
        <Route path="/inventory" element={<BrowseInventory />} />
        <Route path="/product" element={<BrowseProduct />} />
        <Route path="/employee/login" element={<EmployeeLogin />} />
        <Route path="/employee/signup" element={<EmployeeSignup />} />
        <Route path="/profile" element={<CustomerProfile />} />
        <Route path="/store" element={<BrowseStore />} />
      </Routes>
    </Box>
  </ChakraProvider>
)
