import { handleLogin } from "../helpers";
import Auth from "./Auth";

export const Login = () => {
  return <Auth title="Iniciar sesión" handleAuthSubmit={handleLogin} />;
};
