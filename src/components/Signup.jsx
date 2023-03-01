import { handleSignup } from "../helpers";
import Auth from "./Auth";

export const Signup = () => {
  return (
    <Auth
      name="signup"
      title="Registrarse"
      handleAuthSubmit={handleSignup}
      buttonLabel="Registrarse"
    />
  );
};
