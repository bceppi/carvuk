import { handleSignup } from "../helpers";
import Auth from "./Auth";

export const Signup = () => {
  return <Auth title="Registrarse" handleAuthSubmit={handleSignup} />;
};
