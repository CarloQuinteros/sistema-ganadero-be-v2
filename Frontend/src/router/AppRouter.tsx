import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoutes from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout";
import Animals from "@/pages/Animals";
import { RoutePath } from "./routeConfig";
import NotFound from "@/pages/NotFoundPage";
import Error from "@/pages/ErrorPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta Publica */}

        <Route path={RoutePath.LOGIN} element={<Login />} />
        <Route path={RoutePath.NOT_FOUND} element={<NotFound />} />
        <Route path={RoutePath.ERROR} element={<Error />} />
        <Route
          path="*"
          element={<Navigate to={RoutePath.NOT_FOUND} replace />}
        />
        {/* Ruta Protegida*/}
        {/* Redirección raíz */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Navigate to="/dashboard" />
            </ProtectedRoutes>
          }
        />
        <Route
          element={
            <ProtectedRoutes>
              <MainLayout />
            </ProtectedRoutes>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/animals" element={<Animals />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
