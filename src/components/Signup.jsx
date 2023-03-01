import { handleSignup } from "../helpers";
import Auth from "./Auth";

export const Login = () => {
  return <Auth title="Registrarse" handleAuthSubmit={handleSignup} />;
};
