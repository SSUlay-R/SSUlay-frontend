import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import BuddyForm from "./components/BuddyForm";
import CompletePage from "./pages/CompletePage";
import BuddySearch from "./components/BuddySearch";
import BuddyMatchResult from "./components/BuddyMatchResult";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    console.log(currentUser);
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  console.log(currentUser);
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/buddyform"
            element={
              <ProtectedRoute>
                <BuddyForm />
              </ProtectedRoute>
            }
          />
          <Route path="/buddyform/complete" element={<CompletePage />} />
          <Route path="/buddy/prefer" element={<BuddySearch />} />
          <Route path="/buddy/matched" element={<BuddyMatchResult />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
