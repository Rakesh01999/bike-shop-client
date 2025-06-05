import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "./swipper.css";
// import "swiper/css/pagination";
import { useRef } from "react";

const testimonials = [
  {
    id: 1,
    quote: "Absolutely love my new bike! Smooth ride and top-notch quality.",
    name: "Daniel R.",
    location: "New York",
  },
  {
    id: 2,
    quote:
      "Best bike shop in town! Great selection and amazing customer support.",
    name: "Sarah K.",
    location: "California",
  },
  {
    id: 3,
    quote:
      "The entire buying process was effortless. Highly recommend this store!",
    name: "Chris M.",
    location: "Texas",
  },
  {
    id: 4,
    quote:
      "Top-tier bikes at unbeatable prices! Will be back for my next upgrade.",
    name: "Emma T.",
    location: "Florida",
  },
  {
    id: 5,
    quote: "The staff guided me to the perfect bike. Couldn’t be happier!",
    name: "Liam B.",
    location: "Washington",
  },
  {
    id: 6,
    quote: "Fast delivery, quality bike, and exceptional service. 5 stars!",
    name: "Sophia J.",
    location: "Illinois",
  },
  {
    id: 7,
    quote: "Great experience! My bike rides like a dream. Worth every penny!",
    name: "Michael P.",
    location: "Nevada",
  },
  {
    id: 8,
    quote: "Ordered online and got my bike delivered in 2 days! Impressed!",
    name: "Lucas D.",
    location: "Arizona",
  },
];

const Testimonials = () => {
  const paginationRef = useRef(null);

  return (
    <div className="px-6 bg-white text-center">
      {/* Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-teal-700">
          What Our Riders Say
        </h2>
        <p className="text-lg text-gray-600 mt-2">
          Hear from our happy customers who found their perfect ride with us.
        </p>
      </div>

      {/* Swiper with External Pagination */}
      <div className="max-w-6xl mx-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={24}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true, el: paginationRef.current }}
          onSwiper={(swiper) => {
            // Re-assign pagination after ref loads
            if (
              swiper.params.pagination &&
              typeof swiper.params.pagination !== "boolean"
            ) {
              swiper.params.pagination.el = paginationRef.current;
              swiper.pagination.init();
              swiper.pagination.update();
            }
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="shadow-lg rounded-xl border p-6 bg-white h-full flex flex-col justify-between transition hover:shadow-xl border-l-4 border-teal-600">
                <p className="text-gray-700 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="font-semibold text-gray-900">
                  - {testimonial.name},{" "}
                  <span className="text-teal-500">{testimonial.location}</span>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination Dots */}
        <div
          ref={paginationRef}
          //  className="mt-6 flex justify-center gap-2"
          // className="mt-6 flex justify-center gap-2 [&_span]:block [&_span]:w-3 [&_span]:h-3 [&_span]:rounded-full
          className="mt-6 flex justify-center gap-2 [&_span]:block md:[&_span]:w- lg:[&_span]:w-3 md:[&_span]:h-2 lg:[&_span]:h-3 [&_span]:rounded-full 
             [&_span]:bg-gray-500 [&_span]:transition-all 
             [&_span.swiper-pagination-bullet-active]:bg-teal-500"
        />
      </div>
    </div>
  );
};

export default Testimonials;
