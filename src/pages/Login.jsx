import { useContext, useState } from "react";
import PocketBaseContext from "./PocketBaseContext";
import { Link, useNavigate } from "react-router-dom";
import imgfinanzas from "../assets/finanzas.svg";
import logogoogle from "../assets/logoogle.png";
import styled from "styled-components";
import {
  TiSocialFacebook,
  TiSocialYoutube,
  TiSocialInstagram,
  TiSocialGithub,
} from "react-icons/ti";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const pb = useContext(PocketBaseContext);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        try {
            const authData = await pb
            .collection('users')
            .authWithOAuth2({ provider: 'google' });
            const meta = authData.meta;
            const formData = new FormData();
            const response = await fetch(meta.avatarUrl);
            if (response.ok) {
                const file = await response.blob();
                formData.append('avatar', file);
            }
            formData.append('name', meta.name);
            formData.append('picture', meta.avatarUrl);
            await pb.collection('users').update(authData.record.id, formData);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
        
        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
        console.log(pb.authStore.model.id);
    };
    
    return (  
        <Container>
            <section className="imgseccion">
                <h1>Es hora de transformar tus finanzas.</h1>
                <div className="fondocontent">
                <img src={imgfinanzas} />
                </div>
                <h4>
                El camino está por delante de ti. Ya ha dado su primer paso hacia la transformación financiera y lo guiaremos en ese viaje.🤑
                </h4>
            </section>
            <section className="panelsesion">
                <h2>Iniciar sesión</h2>

                <button className="btniniciar" onClick={handleSubmit}>
                <img src={logogoogle} />
                <span> Iniciar con Google</span>
                </button>
                <div className="social">
                <a href="https://www.facebook.com/profile.php?id=100082869805687" target="_blank" rel="noopener noreferrer"><TiSocialFacebook className="icons" /></a>
                <a href="https://www.youtube.com/@Codigo369" target="_blank" rel="noopener noreferrer"><TiSocialYoutube className="icons" /></a>
                <a href="https://www.youtube.com/shorts/HL78Ug5idXc" target="_blank" rel="noopener noreferrer"><TiSocialInstagram className="icons" /></a>
                <a href="https://github.com/Franklin369" target="_blank" rel="noopener noreferrer"><TiSocialGithub className="icons"/></a>
                </div>
            </section>
        </Container>
    );
};
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 30px;
  background: radial-gradient(#161e53, #083DE3);
  flex-direction: column-reverse;
  width: 100vw;
 
  .imgseccion {
    background-color: white;

    border-radius: 15px;
    padding: 20px;

    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    gap: 35px;
    margin-top: 20px;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.12);
    h1 {
      font-size: 35px;
      font-weight: 650;
    }
    h4 {
      color: #aaaaaa;
    }
    .fondocontent {
      display: flex;
      justify-content: center;
      img {
        width: 100%;
        -webkit-animation: flotar 3s ease-in-out infinite;
        animation: flotar 3s ease-in-out infinite;
      }
    }
  }

  .panelsesion {
    display: flex;
    flex-direction: column;
    gap: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    h2 {
      color: white;
      text-align: center;
      font-weight: 600;
      font-size: 52px;
    }
    .btniniciar {
      display: flex;
      align-items: center;
      gap: 12px;
      border-style: none;

      img {
        width: 30px;
      }
      background-color: white;

      padding: 15px 30px;
      border-radius: 50px;
      font-weight: 700;
      font-size: 22px;

      transition: all 0.25s ease;
      box-shadow: 0px 10px 20px 2px rgba(0, 0, 0, 0.12);

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 20px 40px 0px rgb(0 0 0 / 10%);
        cursor: pointer;
      }
      span {
        opacity: 0.8;
      }
    }
    .social {
      gap: 20px;
      display: flex;
      justify-content: center;
      align-content: space-between;
      color: white;
      font-size: 30px;
      position: relative;
      bottom: 0;

      .icons:hover {
        transform: translateY(10px);
        transition: all 0.5s;
      }
    }
  }
  @media (min-width: 64em) {
    flex-direction: row;
    .imgseccion {
      margin-top: 0;
      width: 50%;
    }
    .panelsesion {
      width: 50%;
    }
  }
  @media (max-width: 48em) {
    .imgseccion {
      .fondocontent {
        img {
          /* width: 80%; */
        }
      }
    }
  }
  @keyframes flotar {
    0% {
      transform: translate(0, 0);
    }
    50% {
      transform: translate(0, 20px);
    }
    100% {
      transform: translate(0, 0px);
    }
  }
`;

 
export default Login;