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
                src="https://i.postimg.cc/6pxW43YZ/pexels-photo-6462662.jpg"
                alt=""
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
                src="https://i.postimg.cc/Fspfv09R/pexels-photo-2127733.jpg"
                alt=""
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <img
                className="lg:w-full w-full lg:h-[550px]"
                src="https://i.postimg.cc/05mWVy9Z/pexels-photo-2896135.jpg"
                alt=""
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Swipper;
