import Layout from "../components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { userStore } from "../stores";
import useRedirect from "../hooks/useRedirect";

const ProductFactory = (props) => {
  const { product, user } = props;

  const [quantity, setQuantity] = useState(0);

  useRedirect(user, false);

  const createOrUpdateProductPackage = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      process.env.REACT_APP_PORT +
      "create_or_update_package",
      {
        user_id: user.user.id,
        product_type: product.id,
        count: parseInt(quantity),
      }
    );

    if (response.status === 201) {
      setQuantity(0);
    }
  };

  return (
    <form
      style={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={createOrUpdateProductPackage}
    >
      <h3 style={{ display: "inline-block", fontWeight: "light" }}>
        {product.name}
      </h3>
      <TextField
        variant="standard"
        type="number"
        label="Unidades producidas"
        sx={{
          marginBottom: "5px",
        }}
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <Button size="small" variant="contained" type="submit">
        Agregar
      </Button>
    </form>
  );
};

export default function Packages() {
  const [products, setProducts] = useState([]);
  const user = userStore((state) => state.user);
  const getProducts = async () => {
    const response = await axios.get(
      process.env.REACT_APP_PORT + "get_products"
    );

    setProducts(response.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Layout title="Registro de produccion">
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={4}>
            <ProductFactory key={product._id} product={product} user={user} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
