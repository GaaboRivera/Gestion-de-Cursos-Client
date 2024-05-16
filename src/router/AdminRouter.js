import { Routes, Route } from "react-router-dom";
import { Auth } from "../pages/admin";

export const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<Auth />} />
    </Routes>
  );
};
