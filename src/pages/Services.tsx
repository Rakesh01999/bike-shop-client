import { FaTools, FaMotorcycle } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { GiLifeJacket } from "react-icons/gi";

const services = [
  {
    title: "Bike Sales",
    icon: <FaMotorcycle size={32} className="text-teal-600" />,
    description: "Explore a wide range of premium bikes for every rider—sports, cruisers, electric & more.",
  },
  {
    title: "Electric Bikes",
    icon: <MdElectricBolt size={32} className="text-teal-600" />,
    description: "Go green with our top-tier electric bikes. Efficient, stylish, and future-ready.",
  },
  {
    title: "Repair & Maintenance",
    icon: <FaTools size={32} className="text-teal-600" />,
    description: "Professional servicing & quick repairs with certified mechanics you can trust.",
  },
  {
    title: "Accessories & Gear",
    // icon: <GiBikerJacket size={32} className="text-teal-600" />,
    icon: <GiLifeJacket size={32} className="text-teal-600" />,
    description: "Find top-quality helmets, jackets, gloves, and riding gear to match your style.",
  },
];

const Services = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Our Services
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Discover what we offer to make your ride better—from buying your dream bike to maintaining it for the long haul.
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-teal-50 rounded-xl shadow-md hover:shadow-lg transition duration-300 p-6 text-left"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
