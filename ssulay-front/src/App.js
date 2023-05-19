import React, { useState, useEffect } from "react";
import {  BrowserRouter as Router ,Routes, Route } from 'react-router-dom';
import "./App.css";
import Layout from "./components/layout/Layout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import axios from "axios";

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
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element= {<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </Router>
    </Layout>

  );
}

export default App;
