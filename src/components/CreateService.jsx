import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { sbHost, sbPublicToken } from "../helpers";

export const CreateService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const supabase = createClient(sbHost, sbPublicToken);
  const [name, setName] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [value, setValue] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [address, setAddress] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValidInput()) {
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
        window.location.href = "/";
      } else {
        setErrorMsg(error.message);
        console.log(error);
      }
    } else {
      setErrorMsg("Todos los campos son obligatorios");
    }
  };

  const isValidInput = () => {
    return name && bookingTime && value && licensePlate && address;
  };

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
                  <label className="label">Nombre del servicio*</label>
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
                  <label className="label">Fecha*</label>
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
                  <label className="label">Valor*</label>
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
                  <label className="label">Patente*</label>
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
                  <label className="label">Direcci??n*</label>
                  <div className="control">
                    <input
                      className="input"
                      type="input"
                      placeholder="Av. Am??rico Vespucio 50, Las Condes."
                      name="address"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  {errorMsg && <p className="help is-danger">{errorMsg}</p>}
                  <button
                    type="submit"
                    className={`button is-primary ${
                      isLoading ? "is-loading" : ""
                    } `}
                  >
                    Guardar
                  </button>
                  <Link to="/">
                    <button className="button ml-4">Volver</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
