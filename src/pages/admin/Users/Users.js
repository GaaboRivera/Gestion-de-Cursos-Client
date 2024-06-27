import { useState } from "react";
import { Box, Grid, Tabs, Tab, Button } from "@mui/material";
import { BasicModal } from "../../../components/Shared/BasicModal/BasicModal";
import { UserForm, ListUsers } from "../../../components/Admin/Users";
import "./Users.scss";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, width: "100%" }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const Users = () => {
  const [value, setValue] = useState(0);
  const [reload, setReload] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const panes = [
    {
      menuItem: "Usuarios activos",
    },
    {
      menuItem: "Usuarios inactivos",
    },
  ];
  const onOpenCloseModal = () => setShowModal(!showModal);
  const onReload = () => setReload((prevState) => !prevState);

  return (
    <Grid container className="users-page">
      <Grid item lg={12} textAlign={"right"}>
        <Button
          className="users-page__add"
          variant="contained"
          onClick={onOpenCloseModal}
        >
          Nuevo usuario
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={(_, data) => {
              setValue(data);
            }}
            className="users-page__forms"
            aria-label="basic tabs example"
          >
            {panes.map((tab, index) => {
              return (
                <Tab
                  key={tab.menuItem}
                  label={tab.menuItem}
                  {...a11yProps(index)}
                  className="tab-menu"
                />
              );
            })}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} className="panel">
          <ListUsers userActive={true} reload={reload} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} className="panel">
          <ListUsers userActive={false} reload={reload} />
        </CustomTabPanel>
      </Grid>
      <BasicModal
        open={showModal}
        handleClose={onOpenCloseModal}
        title={"Crear nuevo usuario"}
      >
        <UserForm close={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </Grid>
  );
};
