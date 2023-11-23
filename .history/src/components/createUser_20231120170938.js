import "../styles/createUser.scss";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function CreateUser(props) {
  const { openModal, handleClose, getUsers } = props;
  const [role, setRole] = useState(4);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const createUser = async (e) => {
    e.preventDefault();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (regex.test(email) === false) {
      setMessage("El email no es válido");
      setStatus("error");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      return;
    }

    if (!name) {
      setMessage("El nombre es obligatorio");
      setStatus("error");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      return;
    }

    if (!email) {
      setMessage("El email es obligatorio");
      setStatus("error");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      return;
    }

    if (!password) {
      setMessage("La contraseña es obligatoria");
      setStatus("error");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      return;
    }

    if (!confirmPassword) {
      setMessage("La confirmación de contraseña es obligatoria");
      setStatus("error");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      setStatus("error");
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 3000);
      return;
    }

    const response = await axios.post("http://localhost:5001/api/create_user", {
      name: name,
      email: email,
      password: password,
      role: role,
    });

    if (response.status === 201) {
      setMessage("Usuario creado exitosamente");
      setStatus("success");
      setOpen(true);
      clear();
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  };

  const clear = () => {
    setName(null);
    setPassword(null);
    setEmail(null);
    setConfirmPassword(null);
    getUsers();
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box className="createUser" sx ={style}>

        <h1>Crear usuario</h1>
        <form onSubmit={createUser}>
          <div className="inputGroup">
            <TextField
              label="nombre"
              variant="outlined"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="formInput"
              fullWidth
            />
            <TextField
              label="email"
              variant="outlined"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="formInput"
              fullWidth
            />
          </div>
          <div className="inputGroup">
            <TextField
              label="contraseña"
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="formInput"
              fullWidth
            />
            <TextField
              label="confirmar contraseña"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="formInput"
              fullWidth
            />
          </div>

          <div className="inputGroup">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Rol</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                className="formInput"
                fullWidth
                label="Rol"
              >
                <MenuItem value={4}>Admin</MenuItem>
                <MenuItem value={3}>Ensamblador</MenuItem>
                <MenuItem value={2}>Guarnecedor</MenuItem>
                <MenuItem value={1}>Cortador</MenuItem>
              </Select>
            </FormControl>

            <div className="buttonContainer">
              <Button variant="contained" type="submit">
                Crear
              </Button>
            </div>
          </div>

          <Collapse in={open}>
            <Alert
              severity={status}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {message}
            </Alert>
          </Collapse>
        </form>
      </Box>
    </Modal>
  );
}
