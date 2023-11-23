import "../styles/login.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import axios from "axios";
import { useState } from "react";
import { userStore } from "../stores";
import useRedirect from "../hooks/useRedirect";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);

  useRedirect(user, true);

  const login = async (e) => {
    try {
      e.preventDefault();

      const response = await axios.post(
        process.env.REACT_APP_PORT + "login",

        {
          name: name,
          password: password,
        }
      );

      setUser(response.data);
    } catch (err) {
      alert("Credenciales incorrestas");
    }
  };

  return (
    <div className="login">
      <h1>Ingresar</h1>
      <Container>
        <form onSubmit={login}>
          <TextField
            label="Usuario"
            variant="outlined"
            className="formInput"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            className="formInput"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" type="submit">
            Ingresar
          </Button>
        </form>
      </Container>
    </div>
  );
}
