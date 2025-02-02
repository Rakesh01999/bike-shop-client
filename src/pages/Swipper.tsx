import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "./swipper.css";

const Swipper = () => {
  return (
    <div className="">
      <div className="">
        <Swiper
          pagination={{
            type: "fraction",
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="relative">
              <img
                className="lg:w-full lg:h-[550px]"
                // src="https://i.postimg.cc/6pxW43YZ/pexels-photo-6462662.jpg"
                src="https://i.postimg.cc/x1fhdMmX/mt-15-2-06613f885e681c.jpg"
                alt="Bike"
              />
              <div className="z-20 absolute lg:top-[100px] md:top-[200px] top-[80px] lg:right-[150px] md:right-[30px] text-white font-bold text-center">
                <p>
                  Drive in Style, Experience the Power.Unleash the Road with
                  Precision and Performance <br /> Where Luxury Meets
                  Performance Your Dream Car Awaits!{" "}
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img
                className="lg:w-full w-full lg:h-[550px]"
                // src="https://i.postimg.cc/fR8FSy7B/Screenshot-298.png"
                src="https://i.postimg.cc/W4j3z9nM/Yamaha-MT15-szpwxk.jpg"
                alt="Bike"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img
                className="lg:w-full w-full lg:h-[550px]"
                src="https://i.postimg.cc/ZqgMjQMN/2-f0496b287fd341eca1631de4db55d82c-grande.jpg"
                alt="Bike"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Swipper;
