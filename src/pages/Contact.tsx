import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatusMessage("✅ Message sent successfully!");
          // toast.success("Signed in successfully", { id: toastId, duration: 2000 });
          toast.success("Message Sent successfully");
          formRef.current?.reset();
        },
        (error) => {
          console.error(error.text);
          setStatusMessage("❌ Failed to send message. Please try again.");
          toast.error("Message Sent successfully");
        }
      );
  };
  
  // Teal Theme
  const tealColors = {
    primary: "#0F766E", // Deep Teal
    secondary: "#14B8A6", // Bright Teal
    background: "#ECFDF5", // Light Teal
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex flex-col"
      style={{
        background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      }}
    >
      {/* Hero */}
      <section className="bg-teal-700 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
          <p className="text-lg">We'd love to hear from you!</p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="container mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-teal-700 mb-6">
            Send Us a Message
          </h2>
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-700 transition"
            >
              Send Message
            </button>
            {statusMessage && (
              <p className="text-sm mt-2 text-center text-green-600">
                {statusMessage}
              </p>
            )}
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-teal-700 mb-4">
            Contact Info
          </h2>
          <ul className="text-gray-700 space-y-2">
            <li>
              📍 <strong>Address:</strong> Khalishpur , Khulna
            </li>
            <li>
              📞 <strong>Phone:</strong> +880 199-964-7103
            </li>
            <li>
              ✉️ <strong>Email:</strong> support@bikeshop.com
            </li>
            <li>
              🕒 <strong>Hours:</strong> Sat–Thu, 9AM–8PM
            </li>
          </ul>

          {/* Map */}
          <iframe
            title="Khulna Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3674.227727569245!2d89.53842737510144!3d22.837328726069213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff9071cb47152f%3A0xf04b212290718952!2sKhulna!5e0!3m2!1sen!2sbd!4v1716541012345!5m2!1sen!2sbd"
            width="100%"
            height="250"
            className="rounded-lg shadow-md"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;
