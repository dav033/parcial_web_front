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
import CreateProduct from "../components/createProduct";
import useRedirect from "../hooks/useRedirect";
import { userStore } from "../stores";

export default function Products() {
  const user = userStore((state) => state.user);
  useRedirect(user, false);
  const [products, setProducts] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

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
    <Layout title="Productos">
      <CreateProduct
        openModal={open}
        handleClose={handleClose}
        getProducts={getProducts}
      />
      <Button variant="contained" onClick={() => setOpen(true)}>
        Crear Producto
      </Button>
      <TableContainer sx={{ maxHeight: "430px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Precio</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.value}$</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
