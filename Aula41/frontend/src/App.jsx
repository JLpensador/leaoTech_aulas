import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Cliente from './pages/Cliente'
import Funcionario from './pages/Funcionario'
import RotaProtegida from './components/RotaProtegida'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cliente' element={
          <RotaProtegida tipoPermitido="cliente">
            <Cliente />
          </RotaProtegida>
        } />
        <Route path='/funcionario' element={
          <RotaProtegida tipoPermitido="funcionario">
            <Funcionario />
          </RotaProtegida>
        } />
      </Routes>
    </>
  )
}

export default App
