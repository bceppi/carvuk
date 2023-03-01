import "./App.scss";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { sbHost, sbPublicToken } from "./helpers";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [carServices, setCarServices] = useState([]);
  const supabase = createClient(sbHost, sbPublicToken);
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient(sbHost, sbPublicToken);
      const { data, error } = await supabase.from("car_services").select();
      setCarServices(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (serviceId) => {
    const { error } = await supabase
      .from("car_services")
      .delete()
      .eq("id", serviceId);

    console.log(error);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from("car_services")
      .insert({
        name: "Denmark",
        booking_time: "2023-03-01T13:49",
        value: "5000",
        license_plate: "",
        address: "",
      })
      .select();
    setIsLoading(false);
    setCarServices([...carServices, ...data]);
  };
  return (
    <section className="section">
      <div className="container">
        <section className="mb-6">
          <h1 className="title">Agregar servicio automotriz</h1>
          <p className="subtitle">Solicita servicios automotrices con Carvuk</p>
          <div className="columns">
            <div className="column is-6">
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="label">Nombre del servicio</label>
                  <div className="control">
                    <input
                      className="input"
                      type="input"
                      placeholder="Lavado de auto"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Fecha</label>
                  <div className="control">
                    <input
                      className="input"
                      type="datetime-local"
                      onChange={(e) => console.log(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Valor</label>
                  <div className="control">
                    <input className="input" type="number" placeholder="5000" />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Patente</label>
                  <div className="control">
                    <input
                      className="input"
                      type="input"
                      placeholder="JJ SL 23"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Dirección</label>
                  <div className="control">
                    <input
                      className="input"
                      type="input"
                      placeholder="Av. Américo Vespucio 50, Las Condes."
                    />
                  </div>
                </div>
                <div className="field">
                  <button
                    className={`button is-primary ${
                      isLoading ? "is-loading" : ""
                    } `}
                  >
                    Consultar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        <section>
          <h1 className="title">Servicios Carvuk</h1>
          <div className="columns">
            <div className="column is-6">
              {carServices.length ? (
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
                                <i class="fa-solid fa-trash"></i>
                              </span>
                            </button>
                          </p>
                        </div>
                      </nav>
                    </div>
                  ))}
                </>
              ) : (
                <p className="subtitle">
                  Acá podrás visualizar los servicios creados.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default App;
