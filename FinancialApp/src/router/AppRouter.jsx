import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { LoginPage, RegisterPage, HomePage, ReportsPage, TransactionsPage, DashboardPage  } from '../pages';

export const AppRouter = () => {
  return (
    <Routes>
         <Route path="/auth" element={<Navbar/>} >
            <Route index element={<LoginPage/>} />
            <Route path="login" element={<LoginPage/>} />
            <Route path="register" element={<RegisterPage/>} />
        </Route>
        <Route path="/" element={<HomePage/>}>
            <Route index element={<DashboardPage/>} />
            <Route path="history" element={<TransactionsPage/>} />
            <Route path="reports" element={<ReportsPage/>} />
        </Route>
    </Routes>
  )
}
