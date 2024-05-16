import { BrowserRouter } from "react-router-dom";
import { AdminRouter, WebRouter } from "./router";

function App() {
  return (
    <BrowserRouter>
      <WebRouter />
      <AdminRouter />
    </BrowserRouter>
  );
}

export default App;
