import { BrowserRouter, Route, Routes } from "react-router-dom";
import CustomError from "./components/CustomError/CustomError";
import Loader from "./components/Loader/Loader";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="login" element={<Login />} />
        <Route exact path="/loader" element={<Loader />} /> 
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
