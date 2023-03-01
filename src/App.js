import "./App.scss";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { isLogged, sbHost, sbPublicToken } from "./helpers";
import { Link } from "react-router-dom";

function App() {
  const [carServices, setCarServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const supabase = createClient(sbHost, sbPublicToken);
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const supabase = createClient(sbHost, sbPublicToken);
      const { data, error } = await supabase.from("car_services").select();
      if (!error) {
        setCarServices(data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (serviceId) => {
    const { error } = await supabase
      .from("car_services")
      .delete()
      .eq("id", serviceId);

    if (!error) window.location.reload();
  };

  return (
    <section className="section">
      <div className="container">
        <section>
          <h1 className="title">Servicios Carvuk</h1>
          <div className="columns">
            <div className="column is-6">
              {!isLogged() && (
                <div>
                  <p className="subtitle">
                    Para ver los servicios de Carvuk, debes hacer login.
                  </p>
                  <Link to="/login">
                    <button className="button is-primary">Login</button>
                  </Link>
                </div>
              )}
              {isLogged() && (
                <>
                  {isLoading && (
                    <div>
                      <button className="button is-loading is-borderless"></button>
                    </div>
                  )}
                  {!isLoading && carServices.length && (
                    <>
                      {carServices.map((service, i) => (
                        <div className="box" key={i}>
                          <nav className="level">
                            <div className="level-left">
                              <div className="level-item">
                                <p className="subtitle is-5">{service.name}</p>
                              </div>
                            </div>

                            <div className="level-right">
                              <p className="level-item">
                                <button
                                  className="button"
                                  onClick={() => handleDelete(service.id)}
                                >
                                  <span className="icon">
                                    <i className="fa-solid fa-trash"></i>
                                  </span>
                                </button>
                              </p>
                            </div>
                          </nav>
                        </div>
                      ))}
                    </>
                  )}
                  {!isLoading && !carServices.length && (
                    <p className="subtitle">
                      Acá podrás visualizar los servicios creados.
                    </p>
                  )}
                  <div>
                    <Link to="/services/new">
                      <button className="button is-primary">Añadir</button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default App;
