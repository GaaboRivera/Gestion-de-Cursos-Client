import { useState } from "react";
import { Box, Grid, Tabs, Tab, Button } from "@mui/material";
import "./Users.scss";
import { getCssVariable } from "../../../utils/getColorSass";
import { BasicModal } from "../../../components/Shared/BasicModal/BasicModal";
import { UserForm } from "../../../components/Admin/Users/UserForm/UserForm";

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
      <Grid item>
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
                sx={{
                  borderBottom: `1px solid ${getCssVariable("--borderGrey")}`,
                  "&.Mui-selected": {
                    borderRight:
                      value === 0
                        ? `1px solid ${getCssVariable("--borderGrey")}`
                        : "",
                    borderLeft:
                      value === 1
                        ? `1px solid ${getCssVariable("--borderGrey")}`
                        : "",
                    borderBottom: "none",
                  },
                }}
              />
            );
          })}
        </Tabs>
        <CustomTabPanel value={value} index={0} className="panel">
          Usuarios activos
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} className="panel">
          Usuarios inactivos
        </CustomTabPanel>
      </Grid>
      <BasicModal
        open={showModal}
        handleClose={onOpenCloseModal}
        title={"Crear nuevo usuario"}
      >
        <UserForm />
      </BasicModal>
    </Grid>
  );
};
