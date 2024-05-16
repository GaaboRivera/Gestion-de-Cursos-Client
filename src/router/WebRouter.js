import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/web";

export const WebRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
