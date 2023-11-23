import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Redirect,
} from "react-router-dom";

import "./App.css";
import axios from "axios";
import Login from "./pages/login";
import PublicRoute from "./components/publicRoute";
import Home from "./components/home";
import { userStore } from "./stores";
import CreateUser from "./components/createUser";
import Navbar from "./components/Navbar";
import Users from "./pages/users";
import Products from "./pages/products";
import Packages from "./pages/packages";
import UserPackages from "./pages/userPackages";
import Roles from "./pages/roles";

function App() {
  const user = userStore((state) => state.setUser);
  return (
    <Router>
      <Navbar />
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/createUser" element={<CreateUser />} />
          <Route exact path="/users" element={<Users />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/paquetes" element={<Packages />} />
          <Route exact path="/paquetes-usuarios" element={<UserPackages />} />
          <Route path="/roles" element={<Roles/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
