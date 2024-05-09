import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import ProfilePage from "./pages/ProfilePage";
import UserFormPage from "./pages/UserFormPage";
import HomePage from "./pages/HomePage";
import TestPage from "./pages/TestPage";

import ProtectedRoute from "./ProtectedRoute";
import CargaDocsPage from "./pages/CargaDocsPage";
import { UserProvider } from "./context/UsersContext";
import Navbar from "./components/Navbar";

import { useAuth } from "./context/AuthContext";

function App() {
  const { user, isAuthenticated, loading } = useAuth();
  //console.log({ user, isAuthenticated });

  if (loading) return <div>Loading...</div>;
  
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute isAllowed={isAuthenticated} />}>
            <Route element={<ProtectedRoute isAllowed={user?.Admin === 1} />}>
              <Route path="/users" element={<UserPage />} />
              <Route path="/add-user" element={<UserFormPage />} />
              <Route path="/user/:id" element={<UserFormPage />} />
            </Route>

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/cargaDocs" element={<CargaDocsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
