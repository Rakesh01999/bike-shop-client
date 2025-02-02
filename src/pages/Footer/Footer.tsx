import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  const contactDetails = [
    { area: "Dhaka Area", number: "012 12 xxx xxx" },
    { area: "Chittagong Area", number: "013 25 xxx xxx" },
    { area: "Sylhet Area", number: "014 16 xxx xxx" },
    { area: "Khulna Area", number: "015 13 xxx xxx" },
    { area: "Barishal Area", number: "016 12 xxx xxx" },
    { area: "Bogura Area", number: "017 11 xxx xxx" },
    { area: "Cumilla Area", number: "018 75 xxx xxx" },
    { area: "Cox’s Bazar Area", number: "019 43 xxx xxx" },
    { area: "Dinajpur Area", number: "020 62 xxx xxx" },
    { area: "Faridpur Area", number: "021 36 xxx xxx" },
    { area: "Noakhali Area", number: "022 19 xxx xxx" },
    { area: "Pabna Area", number: "023 73 xxx xxx" },
    { area: "Rajshahi Area", number: "024 20 xxx xxx" },
    { area: "Rangpur Area", number: "025 62 xxx xxx" },
  ];

  return (
    <footer className="bottom-0 mt-auto w-full bg-[#1C2434] p-8 lg:mt-3">
      <div className="container mx-auto flex flex-col md:flex-row md:space-x-8">
        <div className="flex items-center justify-center md:w-1/4">
          <h1 className="text-3xl font-bold text-gray-200">CarStore</h1>
        </div>
        <div className="flex-1 text-center md:w-2/4">
          <h2 className="mb-6 text-xl font-bold text-white">Our Contacts</h2>
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-1 lg:grid-cols-3">
            {contactDetails.map((contact, index) => (
              <div
                key={index}
                className="text-lg font-bold text-white lg:text-lg"
              >
                {contact.area}: {contact.number}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-300 pt-6 text-center text-sm text-white">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:space-y-0">
          <p>&copy; 2025 CarStore. All rights reserved.</p>
          <div className="flex space-x-4 text-3xl">
            <a href="#" className="text-gray-300 hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
