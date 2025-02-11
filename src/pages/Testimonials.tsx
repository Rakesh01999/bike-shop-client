import { Card, Row, Col } from "antd";

const testimonials = [
  {
    id: 1,
    quote: "Absolutely love my new bike! Smooth ride and top-notch quality.",
    name: "Daniel R.",
    location: "New York",
  },
  {
    id: 2,
    quote: "Best bike shop in town! Great selection and amazing customer support.",
    name: "Sarah K.",
    location: "California",
  },
  {
    id: 3,
    quote: "The entire buying process was effortless. Highly recommend this store!",
    name: "Chris M.",
    location: "Texas",
  },
  {
    id: 4,
    quote: "Top-tier bikes at unbeatable prices! Will be back for my next upgrade.",
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
  return (
    <div className="py-12 px-6 text-center">
      {/* Title & Description */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">What Our Riders Say</h2>
        <p className="text-lg text-gray-600 mt-2">
          Hear from our happy customers who found their perfect ride with us.
        </p>
      </div>

      {/* Testimonials Grid */}
      <Row
        gutter={[16, 16]}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center"
      >
        {testimonials.map((testimonial) => (
          <Col key={testimonial.id}>
            <Card
              className="shadow-lg rounded-xl border border-gray-200 p-6 transition-all hover:shadow-xl"
              style={{
                background: "white",
                borderLeft: "6px solid #0F766E", // Teal left border
              }}
            >
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              <p className="font-semibold text-gray-900 mt-4">
                - {testimonial.name},{" "}
                <span className="text-teal-500">{testimonial.location}</span>
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Testimonials;
