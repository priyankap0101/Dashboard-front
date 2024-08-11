import React from "react";
import Slider from "react-slick";

const DashboardCarousel = ({ darkMode }) => {
  const carouselData = [
    {
      title: "Insight 1",
      description: "This is a brief description of the first insight.",
    },
    {
      title: "Insight 2",
      description: "This is a brief description of the second insight.",
    },
    {
      title: "Insight 3",
      description: "This is a brief description of the third insight.",
    },
    {
      title: "Insight 4",
      description: "This is a brief description of the fourth insight.",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-8">
      <Slider {...settings}>
        {carouselData.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
          >
            <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
            <p className="text-lg">{item.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DashboardCarousel;
