import React, { useState } from "react";
import { image } from "../../../../assets";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DoneIcon from "@mui/icons-material/Done";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ENV } from "../../../../utils";
import "./UserItem.scss";
import { BasicModal } from "../../../Shared";
import { UserForm } from "../UserForm";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";

const userController = new User();

export function UserItem(props) {
  const { user, onReload } = props;
  const { accessToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const onOpenCloseModal = () => setShowModal(!showModal);
  const onOpenCloseConfirm = () => setShowConfirm(!showConfirm);

  const openUpdateUser = () => {
    setTitleModal(`Actualizar ${user.email}`);
    onOpenCloseModal();
  };

  const openDesactivateActivateConfirm = () => {
    setIsDelete(false);
    onOpenCloseConfirm();
  };

  const onActivateDesactivate = async () => {
    try {
      await userController.updateUser(accessToken, user._id, {
        active: !user.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteUser = async () => {
    try {
      await userController.deleteUser(accessToken, user._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const onOpenDeleteConfirm = () => {
    setIsDelete(true);
    onOpenCloseConfirm();
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
            onClick={() => openDesactivateActivateConfirm()}
          >
            {user.active ? <DoDisturbOutlinedIcon /> : <DoneIcon />}
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => onOpenDeleteConfirm()}
          >
            <DeleteForeverIcon />
          </Button>
        </div>
      </Paper>
      <BasicModal
        open={showModal}
        handleClose={onOpenCloseModal}
        title={titleModal}
      >
        <UserForm close={onOpenCloseModal} onReload={onReload} user={user} />
      </BasicModal>

      <Dialog
        open={showConfirm}
        onClose={onOpenCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {isDelete ? (
            <>
              Eliminar usuario{" "}
              <label style={{ fontWeight: "bold" }}>{user.email}</label>
            </>
          ) : user.active ? (
            <>
              Desactivar usuario{" "}
              <label style={{ fontWeight: "bold" }}>{user.email}</label>
            </>
          ) : (
            <>
              Activar usuario{" "}
              <label style={{ fontWeight: "bold" }}>{user.email}</label>
            </>
          )}
        </DialogTitle>
        <DialogActions>
          <Button onClick={onOpenCloseConfirm} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={isDelete ? onDeleteUser : onActivateDesactivate}
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
