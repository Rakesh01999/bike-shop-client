import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";

// Swiper Styles
import "./swipper.css";

const Swipper: React.FC = () => {
const slides = [
  {
    image: "https://i.postimg.cc/G2220CQS/bn1.jpg",
    overlayText: "Drive in Style, Experience the Power",
    description: "Unleash the Road with Precision and Performance",
    extraText: "Discover our latest arrivals built for thrill and safety.",
    altText: "Bike Slide 1",
    cta: {
      label: "Contact Us",
      link: "/contact",
    },
  },
  {
    image: "https://i.postimg.cc/5Nv8KBjQ/bn2.jpg",
    overlayText: "Precision Meets Aesthetic Design",
    description: "Riding Redefined with Next-Level Engineering",
    extraText: "Crafted with care, tested for excellence. Ride smart, ride strong.",
    altText: "Bike Slide 2",
    cta: {
      label: "Read Blogs",
      link: "/blogs",
    },
  },
  {
    image: "https://i.postimg.cc/rph4RgZ3/bn3.jpg",
    overlayText: "Special Offer",
    description: "20% OFF",
    extraText: "Limited time deal on our best-selling models. Don’t miss out!",
    altText: "Bike Slide 3",
    cta: {
      label: "Buy Now",
      link: "/allproduct",
    },
  },
];

  return (
    <div className="w-full overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ type: "fraction", el: ".swiper-pagination" }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        className="mySwiper relative w-full h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Background Image */}
            <div className="absolute inset-0 z-10">
              <img
                src={slide.image}
                alt={slide.altText}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 z-20" />
            </div>

            {/* Text + CTA Overlay */}
            <div className="relative z-30 flex items-center justify-start h-full px-4 sm:px-8 md:px-16">
              {/* <div className="text-left text-white max-w-xl space-y-4"> */}
              <div className="text-left text-white w-1/3 space-y-4">
                {/* <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-4xl font-bold drop-shadow-xl"> */}
                <h2 className="sm:text-lg md:text-2xl lg:text-4xl font-bold drop-shadow-xl">
                  {slide.overlayText}
                </h2>
                {/* <p className="text-sm sm:text-base md:text-lg drop-shadow-lg"> */}
                <p className="text-xs sm:text-base md:text-lg drop-shadow-lg">
                  {slide.description}
                </p>
                <p className="text-xs sm:text-base md:text-lg drop-shadow-lg">
                  {slide.extraText}
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 mt-4">
                  <Link
                    to={slide.cta.link}
                    // className="bg-teal-500 hover:bg-teal-600 px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full text-white font-semibold transition duration-300"
                    className="bg-teal-500 hover:bg-teal-600 px-4 sm:px-6 py-2 text-xs sm:text-base rounded-full text-white font-semibold transition duration-300"
                  >
                    {slide.cta.label}
                  </Link>
                  <Link
                    to="/about"
                    className="bg-white hover:bg-gray-300 text-teal-600 px-4 sm:px-6 py-2 text-xs sm:text-base rounded-full font-semibold transition duration-300"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="swiper-navigation-wrapper absolute top-1/2 transform -translate-y-1/2 z-40 w-full px-4">
          <div className="swiper-button-prev text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all" />
          <div className="swiper-button-next text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all" />
        </div>

        {/* Pagination */}
        <div className="swiper-pagination text-white absolute bottom-5 left-1/2 transform -translate-x-1/2 z-40 text-sm" />
      </Swiper>
    </div>
  );
};

export default Swipper;
