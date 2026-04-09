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
        path="/admin"
        element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }
      >
        <Route path="agendamentos" element={<AgendamentoList />} />
        <Route path="clientes" element={<ClienteList />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;