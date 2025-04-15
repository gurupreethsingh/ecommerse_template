import "./App.css";
import "./styles/global.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./components/auth_components/AuthManager";
import MainLayout from "./components/common_components/MainLayout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;