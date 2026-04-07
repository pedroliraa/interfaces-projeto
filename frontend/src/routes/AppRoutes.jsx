import { Routes, Route } from 'react-router-dom'
import AgendamentoList from '../pages/Agendamento/AgendamentoList'
import GaleriaList from '../pages/Galeria/GaleriaList'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/agendamentos" element={<AgendamentoList />} />
      <Route path="/admin/galeria" element={<GaleriaList />} />
    </Routes>
  )
}

export default AppRoutes