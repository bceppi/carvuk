import "./App.scss";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { sbHost, sbPublicToken } from "./helpers";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [carServices, setCarServices] = useState([]);
  const [name, setName] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [value, setValue] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [address, setAddress] = useState("");

  const supabase = createClient(sbHost, sbPublicToken);
  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient(sbHost, sbPublicToken);
      const { data, error } = await supabase.from("car_services").select();
      setCarServices(data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "bookingTime":
        setBookingTime(e.target.value);
        break;
      case "value":
        setValue(e.target.value);
        break;
      case "licensePlate":
        setLicensePlate(e.target.value);
        break;
      case "address":
        setAddress(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleDelete = async (serviceId) => {
    const { error } = await supabase
      .from("car_services")
      .delete()
      .eq("id", serviceId);

    if (!error) window.location.reload();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await supabase
      .from("car_services")
      .insert({
        name: name,
        booking_time: bookingTime,
        value: value,
        license_plate: licensePlate,
        address: address,
      })
      .select();
    setIsLoading(false);
    if (!error) {
      setCarServices([...carServices, ...data]);
    }
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
                      name="name"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Fecha</label>
                  <div className="control">
                    <input
                      className="input"
                      type="datetime-local"
                      name="bookingTime"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Valor</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      placeholder="5000"
                      name="value"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Patente</label>
                  <div className="control">
                    <input
                      className="input"
                      type="input"
                      placeholder="JJ SL 23"
                      name="licensePlate"
                      onChange={handleChange}
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
                      name="address"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <button
                    className={`button is-primary ${
                      isLoading ? "is-loading" : ""
                    } `}
                  >
                    Guardar
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
                                <i className="fa-solid fa-trash"></i>
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
