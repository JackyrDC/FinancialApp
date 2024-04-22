import { useAuth0 } from "@auth0/auth0-react";
import { AppRouter } from "./router/AppRouter";
import { Navbar } from './components/Navbar';
import { AuthPage, Logout, Profile  } from './pages'

function App() {
  return (
    <AppRouter />
  );
}

export default App;