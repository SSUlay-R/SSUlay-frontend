import React from 'react';
import Navigater from './NavBar';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.css';


export default function Layout(props) {
  return (
    <>
      <Header/>
      <Navigater/>
      <Main>{props.children}</Main>
      <Footer/>
    </>
  )
};