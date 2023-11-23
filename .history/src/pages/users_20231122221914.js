import Layout from "../components/Layout";
import axios from "axios";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CreateUser from "../components/createUser";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useRedirect from "../hooks/useRedirect";
import { userStore } from "../stores";

export default function Users() {
  const user = userStore((state) => state.user);
  useRedirect(user, false);
  const [users, setUsers] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const transformRole = (roleID) => {
    if (roleID === 1) {
      return "Cortador";
    }

    if (roleID === 2) {
      return "Guarnecedor";
    }

    if (roleID === 3) {
      return "Ensamblador";
    }

    if (roleID === 4) {
      return "Administrador";
    }
  };
  const getUsers = async () => {
    const response = await axios.get("http://localhost:5001/api/get_users");

    setUsers(response.data.users);
  };

  const deleteUser = async (id) => {
    var result = window.confirm(
      "¿Estas seguro que quieres eliminar este usuario?"
    );
    if (result) {
      const response = await axios.post(
        process.env.REACT_APP_PORT + `/api/delete_user`,
        {
          id,
        }
      );
      if (response.status === 200) {
        getUsers();
        alert("Usuario eliminado correctamente");
      } else {
        alert("No se pudo eliminar el usuario");
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Layout title="Users">
      <CreateUser
        openModal={open}
        handleClose={handleClose}
        getUsers={getUsers}
      />
      <Button variant="contained" onClick={() => setOpen(true)}>
        Crear Usuario
      </Button>
      <TableContainer sx={{ maxHeight: "430px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{transformRole(user.roleID)}</TableCell>
                <TableCell>
                  <IconButton>
                    <DeleteIcon
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
