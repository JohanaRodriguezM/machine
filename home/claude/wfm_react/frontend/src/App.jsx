import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import ProyeccionPage from './pages/ProyeccionPage'
import './index.css'

export default function App() {
  const [activePage, setActivePage] = useState('proyeccion')

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
      <Header />
      <div style={{ display:'flex', flex:1 }}>
        <Sidebar active={activePage} onChange={setActivePage} />
        <main style={{ flex:1, padding:'32px', overflowY:'auto', background:'var(--bg)' }}>
          {activePage === 'proyeccion' && <ProyeccionPage />}
        </main>
      </div>
    </div>
  )
}
