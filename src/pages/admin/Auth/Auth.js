import { useState } from "react";
import { Icon } from "../../../assets";
import "./Auth.scss";
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";
import { Box, Tabs, Tab } from "@mui/material";
import "../../../scss/colors.scss";
import { getCssVariable } from "../../../utils/getColorSass";

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

export const Auth = () => {
  const [value, setValue] = useState(0);
  const openLogin = () => setValue(0);
  const panes = [
    {
      menuItem: "Entrar",
    },
    {
      menuItem: "Nuevo usuario",
    },
  ];
  return (
    <div className="auth">
      <Icon.LogoWhite className="logo" />
      <Tabs
        value={value}
        onChange={(_, data) => {
          setValue(data);
        }}
        className="auth__forms"
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
        <LoginForm />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1} className="panel">
        <RegisterForm openLogin={openLogin} />
      </CustomTabPanel>
    </div>
  );
};
