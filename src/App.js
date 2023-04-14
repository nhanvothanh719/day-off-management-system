import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Loader from "./components/Loader/Loader";
import InputForm from "./components/Form/Form";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route exact path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard/*" element={<Dashboard />} />
        <Route exact path="/loader" element={<Loader />} />
        <Route exact path="/form" element={<InputForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
