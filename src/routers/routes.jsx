import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Profile } from "../pages/Profile";
import { Login } from "../pages/Login";

export function MyRoutes() {
    const { user } = UserAuth();
    const RequireAuth = ({children})=>{
        return user?children: <Navigate to={"/login"} />
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<RequireAuth>
                    <Profile />
                </RequireAuth>}/>
                <Route path="/login" element={<Login />}/>
            </Routes>
        </BrowserRouter>
    )
}