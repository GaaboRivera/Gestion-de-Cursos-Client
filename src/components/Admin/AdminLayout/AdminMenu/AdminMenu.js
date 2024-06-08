import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import ComputerIcon from "@mui/icons-material/Computer";
import EmailIcon from "@mui/icons-material/Email";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuList,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./AdminMenu.scss";
import { useAuth } from "../../../../hooks";

export function AdminMenu() {
  const [selectedIndex, setSelectedIndex] = useState(4);
  const {
    user: { role },
  } = useAuth();
  const isAdmin = role === "admin";

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <MenuList className="admin-menu">
      {isAdmin && (
        <div>
          <Link to={"/admin/users"}>
            <ListItemButton
              selected={selectedIndex === 0}
              onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText>Usuario</ListItemText>
            </ListItemButton>
          </Link>
          <Link to={"/admin/menu"}>
            <ListItemButton
              selected={selectedIndex === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <MenuIcon />
              </ListItemIcon>
              <ListItemText>Menu</ListItemText>
            </ListItemButton>
          </Link>
          <Link to={"/admin/courses"}>
            <ListItemButton
              selected={selectedIndex === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <ComputerIcon />
              </ListItemIcon>
              <ListItemText>Cursos</ListItemText>
            </ListItemButton>
          </Link>
          <Link to={"/admin/newsletter"}>
            <ListItemButton
              selected={selectedIndex === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <EmailIcon />
              </ListItemIcon>
              <ListItemText>Newsletter</ListItemText>
            </ListItemButton>
          </Link>
        </div>
      )}
      <Link to={"/admin/blog"}>
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <SmsOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Blog</ListItemText>
        </ListItemButton>
      </Link>
    </MenuList>
  );
}
