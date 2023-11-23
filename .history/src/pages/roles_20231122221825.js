import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useRedirect from "../hooks/useRedirect";
import { userStore } from "../stores";

const RoleItem = (props) => {
  const { role } = props;
  const [remuneration, setRemuneration] = useState(role.compensationPerProduct);

  const updateRole = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        process.env.REACT_APP_PORT + "modify_role",
        {
          rolId: role.id,
          name: role.name,
          compensationPerProduct: remuneration,
        }
      );

      if (response.status === 200) {
        alert("Rol actualizado correctamente");
      }
    } catch (err) {
      alert("Hubo un error al actualizar el rol");
    }
  };

  return (
    <form
      style={{
        display: "flex",
        alignItems: "flex-end",
        marginBottom: "40px",
        justifyContent: "space-between",
        width: "500px",
      }}
      onSubmit={updateRole}
    >
      <span>{role.name}:</span>
      <TextField
        variant="standard"
        label="Remuneracion"
        value={remuneration}
        onChange={(e) => {
          setRemuneration(e.target.value);
        }}
        style={{ marginRight: "20px" }}
      />

      <Button variant="contained" size="small" type="submit">
        Actualizar
      </Button>
    </form>
  );
};
export default function Roles() {
  const user = userStore((state) => state.user);
  useRedirect(user, false);

  const [roles, setRoles] = useState([]);
  const getData = async () => {
    const response = await axios.get("http://localhost:5001/api/get_roles");
    setRoles(response.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout title="Roles">
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          marginTop: "50px",
        }}
      >
        {roles.map((role) => {
          return role.id === 4 ? null : <RoleItem role={role} />;
        })}
      </div>
    </Layout>
  );
}
