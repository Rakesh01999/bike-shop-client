import { FaTags } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import { MdLocalOffer } from "react-icons/md";
import { Link } from "react-router-dom";

const Offers = () => {
  const offers = [
    {
      icon: <MdLocalOffer size={40} className="text-teal-600" />,
      title: "Summer Sale",
      description:
        "Get up to 20% off on selected bikes and accessories this season.",
      cta: "Shop Now",
      link: "/allproduct",
    },
    {
      icon: <FaTags size={40} className="text-teal-600" />,
      title: "New Arrivals",
      description: "Check out the latest models with cutting-edge technology.",
      cta: "Explore",
      link: "/allproduct?filter=new",
    },
    {
      icon: <GiMoneyStack size={40} className="text-teal-600" />,
      title: "Finance Available",
      description: "Easy payments available for premium bikes.",
      cta: "Contact Us",
      link: "/contact",
    },
  ];

  return (
    <section
      // className="bg-gray-50 py-12 px-4 md:px-8"
      className="bg-cover py-12 px-4 md:px-8"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/kg7qQcNz/taaft-com-image-generator-by-taaft-1748203501.png')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        {/* <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">{offer.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {offer.title}
              </h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <Link
                to={offer.link}
                className="bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-full font-medium transition"
              >
                {offer.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
