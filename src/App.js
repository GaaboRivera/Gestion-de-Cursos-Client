import { BrowserRouter } from "react-router-dom";
import { AdminRouter, WebRouter } from "./router";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <WebRouter />
        <AdminRouter />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
