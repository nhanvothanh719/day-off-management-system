import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import 'semantic-ui-css/semantic.min.css';

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
