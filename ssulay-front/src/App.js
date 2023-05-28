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
import BuddyProgramPage from "./pages/BuddyProgramPage";
import AdminPage from "./pages/AdminPage";
import DummyDataPage from "./pages/DummyDataPage";
import GaleShapelyAlgorithm from "./components/GaleShapelyAlgorithm";

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
          <Route
            path="/buddyform/complete"
            element={
              <ProtectedRoute>
                <CompletePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buddy/prefer"
            element={
              <ProtectedRoute>
                <BuddySearch />
              </ProtectedRoute>
            }
          />
          <Route path="/buddy/matched" element={<BuddyMatchResult />} />
          <Route path="/buddyprogram" element={<BuddyProgramPage />} />
          <Route path="/dummy" element={<DummyDataPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/gsa" element={<GaleShapelyAlgorithm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
