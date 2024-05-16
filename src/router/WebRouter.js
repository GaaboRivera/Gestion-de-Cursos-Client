import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/web";
import { ClientLayout } from "../layouts/ClientLayout/ClientLayout";

export const WebRouter = () => {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/" element={loadLayout(ClientLayout, Home)} />
    </Routes>
  );
};
