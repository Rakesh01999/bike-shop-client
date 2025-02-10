import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import './swipper.css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-fade';

const Swipper: React.FC = () => {
  // Slide content data
  const slides = [
    {
      image: "https://i.postimg.cc/x1fhdMmX/mt-15-2-06613f885e681c.jpg",
      overlayText: "Drive in Style, Experience the Power. Unleash the Road with Precision and Performance",
      altText: "Bike Slide 1"
    },
    {
      image: "https://i.postimg.cc/W4j3z9nM/Yamaha-MT15-szpwxk.jpg",
      overlayText: "Precision Engineering Meets Aesthetic Design",
      altText: "Bike Slide 2"
    },
    {
      image: "https://i.postimg.cc/ZqgMjQMN/2-f0496b287fd341eca1631de4db55d82c-grande.jpg",
      overlayText: "Unleash Your Riding Potential with Cutting-Edge Technology",
      altText: "Bike Slide 3"
    }
  ];

  return (
    <div className="w-full overflow-hidden">
      <Swiper
        // Responsive breakpoints
        breakpoints={{
          // When window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // When window width is >= 640px
          640: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          // When window width is >= 1024px
          1024: {
            slidesPerView: 1,
            spaceBetween: 30
          }
        }}
        
        // Modules
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        
        // Navigation
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }}
        
        // Pagination
        pagination={{
          type: "fraction",
          el: ".swiper-pagination"
        }}
        
        // Autoplay
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        
        // Effect
        effect="fade"
        fadeEffect={{ crossFade: true }}
        
        // Other options
        loop={true}
        className="mySwiper relative w-full h-[300px] md:h-[450px] lg:h-[600px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            {/* Image */}
            <div className="absolute inset-0 z-10">
              <img
                src={slide.image}
                alt={slide.altText}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-black/40 z-20"></div>
            </div>

            {/* Overlay Content */}
            <div className="relative z-30 flex items-center justify-center h-full">
              <div className="text-center text-white max-w-2xl px-4 md:px-8">
                <p className="text-sm md:text-lg lg:text-2xl font-medium leading-relaxed drop-shadow-lg">
                  {slide.overlayText}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <div className="swiper-navigation-wrapper absolute top-1/2 transform -translate-y-1/2 z-40 w-full px-4">
          <div className="swiper-button-prev text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all"></div>
          <div className="swiper-button-next text-white bg-black/50 hover:bg-black/70 p-2 rounded-full transition-all"></div>
        </div>

        {/* Pagination */}
        <div className="swiper-pagination text-white absolute bottom-4 left-1/2 transform -translate-x-1/2 z-40"></div>
      </Swiper>
    </div>
  );
};

export default Swipper;
