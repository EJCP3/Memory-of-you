import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const TaskCarrusel = ({ task }) => {
  const settings = {
    autoplay: true, // Habilita el deslizamiento automático
    autoplaySpeed: 2000, // Tiempo entre deslizamientos (en milisegundos)
    dots: true, // Muestra los puntos de navegación
    infinite: true,
    speed: 500, // Velocidad de la transición (en milisegundos)
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Oculta las flechas
  };

  return (
    <div className="w-[300px] sm:w-[330px] lg:w-[450px]">
      <Slider {...settings}>
        {task.imágenes.map((task, i) => (
          <img key={i} className="w-[300px] h-[500px] rounded-sm" src={task} />
        ))}
      </Slider>
    </div>
  );
};
