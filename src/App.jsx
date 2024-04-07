import { useState } from 'react';
import CURP from './pages/Home';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<CURP />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
