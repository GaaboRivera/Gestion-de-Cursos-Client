import { useState } from "react";
import { Icon } from "../../../assets";
import { Tab, TabPane } from "semantic-ui-react";
import "./Auth.scss";
import { RegisterForm, LoginForm } from "../../../components/Admin/Auth";

export const Auth = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const openLogin = () => setActiveIndex(0);
  const panes = [
    {
      menuItem: "Entrar",
      render: () => (
        <TabPane>
          <LoginForm />
        </TabPane>
      ),
    },
    {
      menuItem: "Nuevo usuario",
      render: () => (
        <TabPane>
          <RegisterForm openLogin={openLogin} />
        </TabPane>
      ),
    },
  ];
  return (
    <div className="auth">
      <Icon.LogoWhite className="logo" />
      <Tab
        panes={panes}
        className="auth__forms"
        activeIndex={activeIndex}
        onTabChange={(_, data) => {
          setActiveIndex(data.activeIndex);
        }}
      />
    </div>
  );
};
