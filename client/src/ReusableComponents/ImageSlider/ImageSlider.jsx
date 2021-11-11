import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";

const ImageSlider = ({ sliderData, classes }) => {
  const settings = {
    dots: true,
    arrows: true,
    // autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    appendDots: (dots) => {
      return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
    },
  };

  return (
    <Slider className={classes} {...settings}>
      {sliderData?.map((sliderImg, index) => (
        <div key={index}>
          <img
            src={
              sliderImg.image || `https://ge-gold.herokuapp.com/${sliderImg}`
            }
            alt="project-ge"
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
