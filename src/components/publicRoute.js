import { Route, Navigate } from "react-router-dom";
import { userStore } from "../stores";

const PublicRoute = ({ element, ...rest }) => {

    const user = userStore((state) => state.user);

    return user === null ? (
      <Route {...rest} element={element} />
    ) : (
      <Navigate to="/" replace />
    );
  };

export default PublicRoute;
