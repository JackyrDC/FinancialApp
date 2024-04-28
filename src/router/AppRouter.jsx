import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { HomePage, ReportsPage, TransactionsPage, DashboardPage, AuthPage, Logout, Profile, HistoryPage,  } from '../pages';

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/nav" element={<Navbar/>} >
          <Route index element={<Profile/>} />
          <Route path="login" element={<AuthPage/>} />
          <Route path="register" element={<Logout/>} />
        </Route>
        <Route path="/" element={<HomePage/>}>
          <Route index element={<DashboardPage/>} />
          <Route path="history" element={<HistoryPage/>} />
          <Route path="reports" element={<ReportsPage/>} />
        </Route>
    </Routes>
  )
}
