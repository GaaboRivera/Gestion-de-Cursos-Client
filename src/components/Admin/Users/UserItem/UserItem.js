import React, { useState } from "react";
import { image } from "../../../../assets";
import { Avatar, Button, Paper } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneIcon from "@mui/icons-material/Done";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ENV } from "../../../../utils";
import "./UserItem.scss";
import { BasicModal } from "../../../Shared";
import { UserForm } from "../UserForm";

export function UserItem(props) {
  const { user } = props;
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  // const onReload = () => setReload((prevState) => !prevState);
  const onOpenCloseModal = () => setShowModal(!showModal);

  const openUpdateUser = () => {
    setTitleModal(`Actualizar ${user.email}`);
    onOpenCloseModal();
  };
  return (
    <>
      <Paper elevation={3} className="user-item">
        <div className="user-item__info">
          <Avatar
            alt="Remy Sharp"
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
          />

          <div>
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="user-item__actions">
          <Button variant="contained" onClick={openUpdateUser}>
            <EditOutlinedIcon />
          </Button>
          <Button
            variant="contained"
            color={user.active ? "warning" : "success"}
            onClick={() => console.log("tes")}
          >
            {user.active ? <DoDisturbOutlinedIcon /> : <DoneIcon />}
          </Button>
          <Button variant="contained" color="error">
            <DeleteForeverIcon />
          </Button>
        </div>
      </Paper>
      <BasicModal
        open={showModal}
        handleClose={onOpenCloseModal}
        title={titleModal}
      >
        <UserForm
          close={onOpenCloseModal}
          onReload={() => console.log("reload")}
          user={user}
        />
      </BasicModal>
    </>
  );
}
