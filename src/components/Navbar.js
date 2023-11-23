import AppBar from "@mui/material/AppBar";
import "../styles/navbar.scss";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores";
import useRedirect from "../hooks/useRedirect";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const adminLinks = [
  {
    name: "Usuarios",
    path: "/users",
  },
  { name: "Productos", path: "/products" },
  { name: "Paquetes", path: "/paquetes-usuarios" },
  { name: "Roles", path: "/roles" },
];

const regularLinks = [
  {
    name: "paquetes",
    path: "/paquetes",
  },
];
export default function Navbar() {
  const navigate = useNavigate();
  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);
  useRedirect(user, false);

  if (user) {
    const links = user.user?.roleID === 4 ? adminLinks : regularLinks;
    return (
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {links.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.name}
              </Button>
            ))}

            <Button
              sx={{ color: "#fff" }}
              onHover = {{color: "#000 !important"}}
              onClick={() => {
                setUser(null);
              }}
              endIcon={<ExitToAppIcon/>}
            >
              Salir
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
}
