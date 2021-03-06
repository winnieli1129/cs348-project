import React, {useEffect} from "react"
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
import axios from 'axios';
import BrowseStore from "./pages/BrowseStore";
import BrowseOrder from "./pages/BrowseOrder";
import EmployeeProfile from "./pages/EmployeeProfile";

export const App = () => {
  useEffect(() => {
    if (localStorage.getItem('jwt_token')) {
      axios.get(`http://localhost:8080/check-token`,
        {
            headers: {
                'Authorization': localStorage.getItem('jwt_token') || ""
            }
        }
      )
      .catch(err => {
        localStorage.clear();
        window.location.href = `/employee/login`;
      })
    }
  }, [])

  return (
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
        <Route path="/order" element={<BrowseOrder />} />
        <Route path="/employee/profile" element={<EmployeeProfile/>} />
      </Routes>
    </Box>
  </ChakraProvider>
  )
}