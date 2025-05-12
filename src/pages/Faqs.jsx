import React from "react";
import "../styles/faqs.css";

const Faqs = () => {
  const faqs = [
    {
      pregunta: "¿Por qué habéis decidido hacer esta web sobre Rick y Morty?",
      respuesta:
        "Somos grandes fans de la serie y queríamos crear un espacio interactivo donde los usuarios pudieran explorar personajes, ubicaciones y más del universo de Rick y Morty. Bueno, eso, y que es la API que nos ha tocado usar...",
    },
    {
      pregunta: "¿Qué me puedo encontrar en esta web?",
      respuesta:
        "En esta web puedes explorar información detallada sobre los personajes, ubicaciones y episodios de Rick y Morty. Además, puedes navegar por las ubicaciones y personajes de forma interactiva. Si te gusta, vótanos igual de bien que con el minijuego!",
    },
    {
      pregunta: "¿De dónde obtenéis los datos de la serie?",
      respuesta:
        "Los datos provienen de la API oficial de Rick and Morty, que nos permite acceder a toda la información sobre personajes, ubicaciones y episodios. Si crees que hay algún error, culpa de la API...",
    },
    {
      pregunta: "¿Es esta una web oficial de Rick y Morty?",
      respuesta:
        "No, esta web no es para nada oficial. Es un proyecto creado por estudiantes con el fin del entretenimiento y de complacer a todos los fans de la serie que haya en clase.",
    },
    {
      pregunta: "¿Puedo contribuir al desarrollo de esta web?",
      respuesta:
        "¡Por supuesto! Si tienes ideas o sugerencias, no dudes en ponerte en contacto con nosotros. Equipo 10: codebreakers. We need you!",
    },
    {
        pregunta: "¿Rick ha aprobado esta web?",
        respuesta: "No lo sé, Rick, parece falso... Bueno, ha dicho algo sobre «no perder el tiempo con tonterías», pero creemos que significa que le encanta nuestra web.",
    },
    {
        pregunta: "¿Puedo encontrar a mi Morty perdido aquí?",
        respuesta: "Si tu Morty está en la API, seguro que lo encuentras. Si no, prueba en la Ciudadela de los Ricks.",
    },
    {
        pregunta: "¿Esta web tiene portales interdimensionales?",
        respuesta: "Todavía no, pero estamos trabajando en ello, danos tiempo. ¡Necesitamos más cristales verdes!",
    },
    {
        pregunta: "¿Qué pasa si no entiendo un chiste de Rick y Morty?",
        respuesta: "Significa que necesitas un IQ más alto... o igual simplemente verte la serie.",
    },
    {
        pregunta: "¿Por qué hay tanto humor en esta web?",
        respuesta: "Lo sentimos, es parte de la experiencia y de la serie. Si no te gusta, puedes ir a ver a Karlos Arguiñano.",
    },
  ];

  return (
    <div className="layout-principal">
      <section
        id="faqs"
        className="parte-faqs"
        aria-labelledby="titulo-faqs"
      >
        <h1 id="titulo-faqs">Preguntas Frecuentes</h1>
        <br aria-hidden={true} />
        <div className="faqs-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h2 className="faq-question">{faq.pregunta}</h2>
              <p className="faq-answer">{faq.respuesta}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Faqs;