import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Navbar />
        <div style={{ flex: 1 }}>
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App