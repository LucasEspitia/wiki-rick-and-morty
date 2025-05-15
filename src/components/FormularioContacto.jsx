import { useState } from "react";

export default function Contacto() {
  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(document.getElementById("form-user"));
    const obj = Object.fromEntries(formData.entries());
    const dataUser = JSON.stringify(obj);
    console.log(dataUser);
  };

  return (
    <div className="form-contacto">
      <form
        id="form-user"
        className="form-contacto"
        action="#"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label htmlFor="in-nombre" className="label-form">
          Tu nombre:{" "}
        </label>
        <input
          type="text"
          id="in-nombre"
          name="nombre"
          className="input-form"
        />

        <label htmlFor="in-email" className="label-form">
          Tu correo electrónico:{" "}
        </label>
        <input type="text" id="in-email" name="email" className="input-form" />

        <label htmlFor="in-razon" className="label-form">
          Sugerencia:{" "}
        </label>
        <textarea
          name="razon"
          id="in-razon"
          rows={6}
          cols={50}
          className="input-form"
        ></textarea>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
