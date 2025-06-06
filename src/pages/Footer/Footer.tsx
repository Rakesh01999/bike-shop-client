import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  FaFacebookF,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPaperPlane,
  FaWhatsapp,
  FaTelegram,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const quickLinks = [
    { title: "Home", href: "/" },
    { title: "Vehicles", href: "/allproduct" },
    { title: "About Us", href: "/about" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" },
  ];

  const serviceAreas = [
    "Dhaka",
    "Chittagong",
    "Sylhet",
    "Khulna",
    "Rajshahi",
    "Barishal",
  ];

  const socialMedia = [
    {
      Icon: FaFacebookF,
      color: "bg-teal-600",
      hoverColor: "hover:bg-blue-600",
      href: "https://www.facebook.com/rakeshbiswas.biswas.9843/",
    },
    // {
    //   Icon: FaTwitter,
    //   color: "bg-sky-500",
    //   hoverColor: "hover:bg-sky-600",
    // },
    // {
    //   Icon: FaInstagram,
    //   color: "bg-pink-500",
    //   hoverColor: "hover:bg-pink-600",
    // },
    // {
    //   Icon: FaLinkedinIn,
    //   color: "bg-blue-700",
    //   hoverColor: "hover:bg-blue-800",
    // },
    {
      Icon: FaWhatsapp,
      color: "bg-teal-600",
      hoverColor: "hover:bg-green-600",
      href: "http://wa.me/+8801999647103",
    },
    {
      Icon: FaTelegram,
      color: "bg-teal-600",
      hoverColor: "hover:bg-blue-700",
      href: "https://t.me/Rakesh01999",
    },
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Gmail
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      toast.error("Please enter a valid Gmail address");
      return;
    }

    // Success toast
    toast.success("Subscribed successfully! 🎉");
  };

  return (
    <footer className="bg-zinc-900 text-white py-16 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Introduction */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-4xl text-teal-500" />
            <h2 className="text-3xl font-bold tracking-wider">Bike Shop</h2>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Khalishpur, Khulna, BD
          </p>
          <p className="text-gray-300 leading-relaxed">
            Revolutionizing automotive experiences with cutting-edge technology
            and unparalleled customer service. Your journey, our passion.
          </p>

          {/* Newsletter */}
          <form
            onSubmit={handleEmailSubmit}
            className="flex border-2 border-zinc-700 rounded-full overflow-hidden"
          >
            <input
              type="email"
              placeholder="Subscribe to our newsletter"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full bg-transparent px-4 py-3 
                focus:outline-none text-white
                placeholder-gray-500
              "
            />
            <button
              type="submit"
              className="
                bg-teal-500 p-3 
                hover:bg-teal-600 
                transition-colors duration-300
              "
            >
              <FaPaperPlane className="text-white" />
            </button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-6 text-teal-500">
              Quick Links
            </h3>
            {quickLinks.slice(0, 3).map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="
                  block py-2 text-gray-400 
                  hover:text-white hover:translate-x-2 
                  transition-all duration-300
                "
              >
                {link.title}
              </a>
            ))}
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-teal-500">
              Service Areas
            </h3>
            {serviceAreas.map((area, index) => (
              <div
                key={index}
                className="
                  py-2 text-gray-400 
                  hover:text-white 
                  transition-colors duration-300
                "
              >
                {area}
              </div>
            ))}
          </div>
        </div>

        {/* Social Media & Contacts */}
        {/* <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-6 text-emerald-500">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              {socialMedia.map(({ Icon, color, hoverColor }, index) => (
                <a
                  key={index}
                  href={"#"}
                  className={`
                    p-3 rounded-full ${color} ${hoverColor}
                    transform hover:-translate-y-2 
                    transition-all duration-300
                  `}
                >
                  <Icon className="text-white" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-emerald-500">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-emerald-500" />
                <span className="text-gray-400">support@bikeshop.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-emerald-500" />
                <span className="text-gray-300">123 Auto Lane, Tech City</span>
              </div>
            </div>
          </div>
        </div> */}
        {/* Social Media & Contacts */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-6 text-teal-500">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              {socialMedia.map(({ Icon, color, hoverColor, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
            p-3 rounded-full ${color} ${hoverColor}
            transform hover:-translate-y-2 
            transition-all duration-300
          `}
                >
                  <Icon className="text-white" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 text-teal-500">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-teal-500" />
                <span className="text-gray-400">support@bikeshop.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-teal-500" />
                <span className="text-gray-300">Khalishpur, Khulna, BD</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="mt-16 pt-6 border-t border-zinc-700 text-center">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} BikeShop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
