import Slider from "react-slick";
import { baseUrl } from "./config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./simpleSlider.module.css";

export default function CustomPaging(): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        <div>
          <img
            src={baseUrl + "/mybaby01.jpg"}
            width={"300px"}
            height={"200px"}
          />
        </div>
        <div>
          <img
            src={baseUrl + "/mybaby02.jpg"}
            width={"300px"}
            height={"200px"}
          />
        </div>
        <div>
          <img
            src={baseUrl + "/mybaby03.jpg"}
            width={"300px"}
            height={"200px"}
          />
        </div>
        <div>
          <img
            src={baseUrl + "/mybaby04.jpg"}
            width={"300px"}
            height={"200px"}
          />
        </div>
      </Slider>
    </div>
  );
}
