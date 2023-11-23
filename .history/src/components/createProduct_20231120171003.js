import "../styles/createUser.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export default function CreateProduct(props) {
  const { openModal, handleClose , getProducts} = props;
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const clear = () => {
    setName(null);
    setPrice(null);
    setDescription(null);
    getProducts();
  };

  const createProduct = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:5001/api/create_product",
      {
        name: name,
        value: price,
        description: description,
      }
    );

    if (response.status === 201) {
      setMessage("Producto creado exitosamente");
      setStatus("success");
      setOpen(true);
      clear();
      setTimeout(() => {
        setOpen(false);
      }, 3000);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box className="createUser" sx={style}>
        <h1>Crear producto</h1>
        <form onSubmit={createProduct}>
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
            label="precio"
            variant="outlined"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="formInput"
            fullWidth
            type="number"
          />

          <TextField
            label="Descripcion"
            variant="outlined"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            className="formInput"
            fullWidth
            multiline
            rows={3}
          />

          <Button
            variant="contained"
            type="submit"
            sx={{ marginBottom: "10px" }}
          >
            Crear
          </Button>

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
