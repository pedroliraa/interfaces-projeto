import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import AgendamentoList from "../pages/Agendamento/AgendamentoList";
import ClienteList from "../pages/Cliente/ClienteList";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/admin/agendamentos"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AgendamentoList />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/clientes"
        element={
          <PrivateRoute>
            <AdminLayout>
              <ClienteList />
            </AdminLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;