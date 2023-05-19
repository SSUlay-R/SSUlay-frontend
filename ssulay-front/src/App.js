import React, { useState, useEffect } from "react";
import {  BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import "./App.css";
import Layout from "./components/layout/Layout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BuddyForm from "./components/BuddyForm";
import axios from "axios";
import CompletePage from "./pages/CompletePage";

function App() {
  const [connection, setConnection] = useState("");

  const connectionTest = () => {
    axios
      .get("http://localhost:4000/")
      .then((response) => {
        setConnection(response.data);
      })
      .catch((error) => {
        setConnection(error.message);
      });
  };

  useEffect(() => {
    connectionTest();
  }, []);

  return (
    <Router>
      <Layout>
          <Routes>
            <Route path="/" element= {<RegisterPage/>}/> 
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/buddyform" element={<BuddyForm/>}/>
            <Route path="/buddyform/complete" element={<CompletePage/>}/>
          </Routes>
      </Layout>
    </Router>


  );
}

export default App;
