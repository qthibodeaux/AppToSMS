import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './features/auth/Login/Login';
import Layout from './components/Layout'
import Register from './features/auth/Register/Register';
import Home from './components/items/Home';
import RequireAuth from './features/auth/RequireAuth'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
          <Route element={<RequireAuth />}>
            <Route path='/' element={<Layout />}>
              <Route path='home' element={<Home />} />
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
