import React, { useState, useEffect } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
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
    <>
      <Layout/> 
    </>
  );
}

export default App;
