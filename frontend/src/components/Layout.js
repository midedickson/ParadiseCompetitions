import React from "react";
import Navbar from "./Navbar";
import { Container } from "react-bootstrap";
import Footer from "./Footer";
import { Provider } from "react-redux";
import store from '../Redux/store'

const Layout = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Container>
          {children}
        </Container>
        <Footer />
      </Provider>
    </>
  )
}

export default Layout;