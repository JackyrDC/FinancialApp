import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    const { user, googleSignIn } = UserAuth();

    const IniciarSesion = async()=>{
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        if(user!=null){
            navigate("/")
        }
    },[user])
    return (
    <>
        <button onClick={IniciarSesion}> Iniciar con Google </button>
    </>
    )
}