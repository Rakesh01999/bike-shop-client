const About = () => {
  const tealColors = {
    primary: "#0F766E", // Deep Teal
    secondary: "#14B8A6", // Bright Teal
    background: "#ECFDF5", // Light Teal
  };

  return (
    <div
      className="bg-gray-50 min-h-screen flex flex-col"
      // style={{
      //   background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      // }}
    >
      {/* Hero Section */}
      <section className=" text-teal-700 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 tracking-wide">
            About <span className="">BikeShop</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Your trusted partner for premium-quality bikes and exceptional
            customer service.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold text-center text-teal-800 mb-8">
          Our Mission
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 text-gray-700 space-y-5">
            <p className="text-lg leading-relaxed">
              At <span className="text-teal-600 font-bold">BikeShop</span>, we
              are passionate about providing the highest quality bikes at
              affordable prices. Whether you're a seasoned rider or a first-time
              buyer, we ensure a seamless experience from selection to purchase.
            </p>
            <p className="text-lg">
              Our commitment is to deliver excellent service, ensuring you get
              the best ride for your needs.
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://i.postimg.cc/yxXJVFxy/MY-24-KTM-SUPERSPORT-RC-390.jpg"
              alt="Bike Shop"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-teal-800 mb-8">
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-5">
            {[
              {
                title: "Bike Sales",
                desc: "A wide range of premium and budget-friendly bikes.",
              },
              {
                title: "Bike Maintenance",
                desc: "Expert repair and maintenance services to keep you rolling.",
              },
              {
                title: "Financing Options",
                desc: "Flexible payment plans tailored to your needs.",
              },
              {
                title: "Genuine Accessories & Parts",
                desc: "Wide range of authentic bike accessories and spare parts for all models .",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition"
                style={{
                  // background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
                  background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 170%)`,
                }}
              >
                <h3 className="text-xl font-semibold text-teal-600 mb-4">
                  {service.title}
                </h3>
                {/* <p className="text-gray-700">{service.desc}</p> */}
                <p className="">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-3xl font-semibold text-center text-teal-800 mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="text-lg text-gray-700 space-y-4">
            <p>We stand out because of:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>🚲 Wide range of bikes for all riders</li>
              <li>💰 Competitive and transparent pricing</li>
              <li>🛠️ Certified experts for bike maintenance</li>
              <li>📦 Hassle-free financing & payment options</li>
              <li>🎯 Unmatched customer satisfaction guarantee</li>
            </ul>
          </div>
          <div className="text-lg text-gray-700">
            <p>
              We value our customers and are committed to making every ride an
              adventure. Join our family and experience the{" "}
              {/* <span className="text-teal-600 font-bold"> */}
              <span className="text-teal-900 font-bold">
                BikeShop Difference
              </span>
              .
            </p>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-teal-700 mb-8">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
            {[
              {
                name: "Tanvir Alam",
                feedback:
                  "Amazing service and top-notch bikes. My go-to shop from now on!",
              },
              {
                name: "Nusrat Jahan",
                feedback:
                  "Friendly staff and excellent pricing. Highly recommend BikeShop!",
              },
              {
                name: "Rifat Mahmud",
                feedback:
                  "Had my bike serviced here — fast, reliable, and honest pricing.",
              },
            ].map((testi, idx) => (
              <div key={idx} className="bg-teal-50 p-6 rounded-lg shadow-md">
                <p className="italic text-gray-700">"{testi.feedback}"</p>
                <p className="mt-4 font-semibold text-teal-700">
                  — {testi.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch */}
      <section className="bg-teal-500 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Let's Connect</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Need help choosing a bike or have any questions? Contact us today
            and our team will assist you.
          </p>
          <a
            href="/contact"
            className="bg-teal-200 text-teal-800 font-semibold py-3 px-6 rounded-lg shadow-md 
            hover:bg-teal-400 transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
