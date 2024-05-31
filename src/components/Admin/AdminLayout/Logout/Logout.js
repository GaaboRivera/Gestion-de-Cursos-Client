import React from "react";
import { Button } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks";

export function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <Button
      variant="contained"
      onClick={onLogout}
      startIcon={<PowerSettingsNewIcon />}
    >
      Cerrar sesión
    </Button>
  );
}
