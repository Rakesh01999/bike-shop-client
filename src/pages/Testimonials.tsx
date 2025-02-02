
import { Card, Row, Col } from "antd";

const testimonials = [
  {
    id: 1,
    quote: "Amazing service! I found my dream car at an unbeatable price.",
    name: "Emily R.",
    location: "New York",
  },
  {
    id: 2,
    quote: "The buying process was seamless, and the team was super helpful!",
    name: "John D.",
    location: "California",
  },
  {
    id: 3,
    quote: "I love my new car! It’s exactly what I was looking for. Highly recommend.",
    name: "Sophia L.",
    location: "Texas",
  },
  {
    id: 4,
    quote: "Great selection of cars and excellent customer support.",
    name: "Michael B.",
    location: "Florida",
  },
  {
    id: 5,
    quote: "The staff went above and beyond to help me find car.",
    name: "Olivia H.",
    location: "Illinois",
  },
  {
    id: 6,
    quote: "Affordable pricing and top-notch quality.",
    name: "James P.",
    location: "Nevada",
  },
  {
    id: 7,
    quote: "I’ll definitely recommend this place to my friends and family.",
    name: "Charlotte W.",
    location: "Washington",
  },
  {
    id: 8,
    quote: "Quick delivery and fantastic customer service!",
    name: "Liam T.",
    location: "Arizona",
  },
];

const Testimonials = () => {
  return (
    <div style={{ padding: "16px", textAlign: "center" }}>
      {/* Title and Description */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "bold" }}>What Our Happy Customers Say</h2>
        <p style={{ fontSize: "16px", color: "#555" }}>
          Hear from our satisfied customers who found their perfect cars and exceptional service with us.
        </p>
      </div>

      {/* Testimonials Grid */}
      <Row
        gutter={[16, 16]}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "16px",
          justifyContent: "center",
        }}
      >
        {testimonials.map((testimonial) => (
          <Col key={testimonial.id}>
            <Card
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "left",
                padding: "16px",
              }}
            >
              <p style={{ color: "#555" }}>"{testimonial.quote}"</p>
              <p style={{ fontWeight: "bold", marginTop: "12px" }}>
                - {testimonial.name}, <span style={{ color: "#4CAF50" }}>{testimonial.location}</span>
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Testimonials;
