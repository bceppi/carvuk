import "./App.scss";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { sbHost, sbPublicToken } from "./helpers";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const supabase = createClient(sbHost, sbPublicToken);
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
    console.log(data);
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
      </div>
    </section>
  );
}

export default App;
