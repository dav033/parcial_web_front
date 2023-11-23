import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirect = (user, publicRoute) => {
  const navigate = useNavigate();

  function redirect() {
    if (user === null) {
      return publicRoute ? null : navigate("/login");
    } else {
      return publicRoute ? navigate("/") : null;
    }
  }

  useEffect(() => {
    redirect();
  }, [user]);
};

export default useRedirect;
