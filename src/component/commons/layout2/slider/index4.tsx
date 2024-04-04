import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ISimpleSliderProps {
  index: number;
}

export default function SimpleSlider(): JSX.Element {
  const CustomSlide = (props: ISimpleSliderProps): JSX.Element => {
    const { index } = props;
    return (
      <div
        style={{ width: "100%", height: "100px", backgroundColor: "yellow" }}
      >
        <div>{index}</div>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <CustomSlide index={1} />
        <CustomSlide index={2} />
        <CustomSlide index={3} />
        <CustomSlide index={4} />
        <CustomSlide index={5} />
        <CustomSlide index={6} />
      </Slider>
    </div>
  );
}
