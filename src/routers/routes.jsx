import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { HomePage, DashboardPage, HistoryPage, TransactionsPage, Profile } from "../pages";
import { Login } from "../pages/Login";
import { RouteProtector } from "../components/RouteProtector";

export function MyRoutes() {
    const { user } = UserAuth();
    const RequireAuth = ({children})=>{
        return user?children: <Navigate to={"/login"} />
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RequireAuth><HomePage/></RequireAuth>}>
                    <Route index element={<DashboardPage/>}/>
                    <Route path="history" element={<HistoryPage/>} />
                    <Route path="reports" element={<TransactionsPage/>} />
                </Route>
                <Route path="/perfil" element={<Profile/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}