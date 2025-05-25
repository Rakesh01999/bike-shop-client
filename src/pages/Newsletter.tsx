import { FaEnvelopeOpenText } from "react-icons/fa";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Gmail
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      toast.error("Please enter a valid Gmail address");
      return;
    }

    // Success toast
    toast.success("Subscribed successfully! 🎉");
    setEmail(""); // Reset field
  };

  return (
    <section className="bg-teal-600 text-white py-16 px-4 md:px-8 relative">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <FaEnvelopeOpenText className="text-white text-4xl" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold">Subscribe to Our Newsletter</h2>
        <p className="text-white/90 max-w-xl mx-auto text-sm md:text-base">
          Stay updated with the latest bikes, offers & tips from BikeShop.
        </p>

        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Gmail address"
            className="w-full sm:w-[300px] px-4 py-3 rounded-full text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-teal-600 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
