import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { HomePage, ReportsPage, TransactionsPage, DashboardPage, AuthPage, Logout, Profile  } from '../pages';
import Login from '../pages/Login';

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/nav" element={<Navbar/>} >
          <Route index element={<Profile/>} />
          <Route path="login" element={<AuthPage/>} />
          <Route path="register" element={<Logout/>} />
        </Route>
        <Route path="/" element={<Login/>}>
          <Route index element={<DashboardPage/>} />
          <Route path="history" element={<TransactionsPage/>} />
          <Route path="reports" element={<ReportsPage/>} />
        </Route>
    </Routes>
  )
}
