import React, { useState } from "react";

const Auth = ({ title, handleAuthSubmit, buttonLabel, name }) => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "email") setEmail(e.target.value);
    else if (e.target.name === "password") setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      await handleAuthSubmit(email, password, setError);
      setIsLoading(false);
    } else {
      setError("Debes ingresar email y contraseña.");
    }
  };

  return (
    <>
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <h1 className="title">{title}</h1>
            <div className="form-container is-white">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Email</label>
                  <input
                    className="input"
                    name="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    autoComplete="work-email"
                  />
                </div>
                <div className="field">
                  <label className="label">Contraseña</label>
                  <input
                    className="input"
                    name="password"
                    label="Contraseña"
                    type="password"
                    value={password}
                    onChange={handleChange}
                    autoComplete="new-password"
                  />
                </div>
                {error && <p className="help is-danger">{error}</p>}
                <div className="field">
                  <button
                    className={`button is-primary mb-2 ${
                      isLoading ? "is-loading" : ""
                    } `}
                    type="submit"
                  >
                    {buttonLabel}
                  </button>
                  {name === "login" && (
                    <p className="help">
                      <a href="#">Olvidé mi contraseña</a>
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
