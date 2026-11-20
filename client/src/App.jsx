import {LoginPage} from "./pages/LoginPage";
import {SignupPage} from "./pages/SignupPage";
import {DashboardPage} from "./pages/DashboardPage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
