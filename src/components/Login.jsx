import { handleLogin } from "../helpers";
import Auth from "./Auth";

export const Login = () => {
  return (
    <Auth
      name="login"
      title="Iniciar sesión"
      handleAuthSubmit={handleLogin}
      buttonLabel="Iniciar sesión"
    />
  );
};
