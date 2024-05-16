import { Routes, Route } from "react-router-dom";
import { Auth } from "../pages/admin";
import { AdminLayout } from "../layouts/AdminLayout/AdminLayout";

export const AdminRouter = () => {
  const loadLayout = (Layout, Page) => {
    return (
      <Layout>
        <Page />
      </Layout>
    );
  };

  return (
    <Routes>
      <Route path="/admin/*" element={loadLayout(AdminLayout, Auth)} />
    </Routes>
  );
};
