import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import AgendamentoList from "../pages/Agendamento/AgendamentoList";
import ClienteList from "../pages/Cliente/ClienteList";
import GaleriaList from "../pages/Galeria/GaleriaList";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layouts/AdminLayout";
import Configuracoes from "../pages/Configuracoes/ConfiguracoesList.jsx";
import FuncionarioList from "../pages/Funcionario/FuncionarioList.jsx";


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
        <Route path="galeria" element={<GaleriaList />} />
        <Route path="configuracoes" element={<Configuracoes />} />
        <Route path="funcionarios" element={<FuncionarioList />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;