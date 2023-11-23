import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { userStore } from "../stores";
import Grid from "@mui/material/Grid";
import useRedirect from "../hooks/useRedirect";

function PackageTicket(props) {
  const { users, products, packageProps } = props;

  const getProductName = (productID) => {
    const product = products.find((item) => item.id === productID);
    return product.name;
  };

  const getUserName = (userID) => {
    const user = users.find((item) => item.id === userID);
    return user.name;
  };

  if (!users || !products) {
    return <div>Loading...</div>;
  } else {
    return (
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContentc: "center",
          alignItems: "center",
          width: "200px",
          height: "200px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        className="ticket"
      >
        <CardContent>
          <Typography>
            Producto: {getProductName(packageProps.product)}
          </Typography>
          <Typography>Empleado: {getUserName(packageProps.user_id)}</Typography>
          <Typography>Cantidad: {packageProps.products_count}</Typography>
          <Typography>
            Completado : {packageProps.is_complete ? "Si" : "No"}
          </Typography>
          <Typography>Fecha: {packageProps.date}</Typography>
          <Typography>
            Remuneracion: {packageProps.total_package_value}$
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default function UserPackages() {
  const user = userStore((state) => state.user);
  useRedirect(user, false);
  const [packages, setPackages] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const getData = async () => {
    const response = await axios.get(process.env.REACT_APP_PORT + "get_packages");
    const response2 = await axios.get(process.env.REACT_APP_PORT + "api/get_users");
    const response3 = await axios.get(process.env.REACT_APP_PORT  + "get_products");
    setPackages(response.data.packages);
    setUsers(response2.data.users);
    setProducts(response3.data.products);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout title="Paquetes">
      <Grid
        container
        spacing={2}
        style={{
          overflow: "auto",
          maxHeight: "430px",
          width: "100%",
          marginTop:"40px",
          marginLeft:"15px"
        }}
      >
        {packages.map((item) => (
          <Grid item xs={4} key={item.id}>
            <PackageTicket
              packageProps={item}
              users={users}
              products={products}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
