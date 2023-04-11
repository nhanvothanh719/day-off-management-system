import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { Suspense } from "react";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route
            exact
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route
            path="dashboard/*"
            element={
              <Suspense fallback={<>Loading...</>}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
