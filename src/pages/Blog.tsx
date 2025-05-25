import React, { useState } from "react";

type BlogPost = {
  id: string;
  title: string;
  summary: string;
  fullText: string;
  category: string;
  imageUrl: string;
  date: string;
};

const blogs: BlogPost[] = [
  {
    id: "1",
    title: "How to Maintain Your Bike for Optimal Performance",
    summary: "Essential maintenance tips to keep your bike in peak condition.",
    fullText:
      "Regular bike maintenance includes checking tire pressure, lubricating the chain, tightening bolts, and ensuring the brakes and gears are functioning well. Proper care improves safety and extends the lifespan of your bike.",
    category: "Maintenance",
    imageUrl: "https://i.postimg.cc/m2FVBVBK/b1.webp",
    date: "May 22, 2025",
  },
  {
    id: "2",
    title: "Top 5 Bikes for Daily Commute in Bangladesh",
    summary: "Our top picks for affordable and efficient commuter bikes.",
    fullText:
      "In Dhaka and other urban areas, fuel efficiency, durability, and ease of handling are essential. Our recommended bikes include Bajaj Discover, TVS Metro, Hero Splendor, Honda Dream, and Yamaha Saluto.",
    category: "Reviews",
    imageUrl: "https://i.postimg.cc/TYmSCTLy/b2.webp",
    date: "May 18, 2025",
  },
  {
    id: "3",
    title: "Smart Investment in Servicing",
    summary: "Servicing isn’t a cost—it’s a smart investment.",
    fullText:
      "Scheduled servicing ensures optimal engine health, reduces breakdowns, and improves mileage. It also helps detect issues early and keeps your bike road-legal with updated checks.",
    category: "Servicing",
    imageUrl: "https://i.postimg.cc/FHLMSf4W/b3-1.jpg",
    date: "May 10, 2025",
  },
  {
    id: "4",
    title: "Must-Have Bike Accessories in 2025",
    summary: "Gadgets and gear to make riding more comfortable and safer.",
    fullText:
      "From mobile holders to smart helmets, tire inflators, and anti-theft alarms, accessories today are smarter and more useful than ever. Find out which ones are essential for your daily ride.",
    category: "Accessories",
    imageUrl: "https://i.postimg.cc/pddsbvTJ/b4.jpg",
    date: "May 5, 2025",
  },
  {
    id: "5",
    title: "How to Choose a Bike Based on Your Lifestyle",
    summary: "Not all bikes fit all riders—match it to your needs.",
    fullText:
      "If you're a commuter, go for mileage and comfort. For long trips, consider touring bikes. Off-road lovers should look for dual-sport or dirt bikes. The right bike ensures comfort and joy in every ride.",
    category: "Buying Guide",
    imageUrl: "https://i.postimg.cc/3RdCyGMW/b5.jpg",
    date: "April 30, 2025",
  },
  {
    id: "6",
    title: "Eco-Friendly Bikes: A Sustainable Future",
    summary: "Why electric bikes are gaining traction in Bangladesh.",
    fullText:
      "With fuel prices rising and climate concerns growing, electric bikes like the Walton Takyon or Akij Durdanto are practical and eco-conscious alternatives. Learn about their pros and the growing EV market here.",
    category: "Green Tech",
    imageUrl: "https://i.postimg.cc/yNJkcydq/b6.jpg",
    date: "April 20, 2025",
  },
];

const Blog: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  // Teal Theme
  const tealColors = {
    primary: "#0F766E", // Deep Teal
    secondary: "#14B8A6", // Bright Teal
    background: "#ECFDF5", // Light Teal
  };

  return (
    <div
      className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8"
      style={{
        background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-teal-700 mb-2">
            Our Blog
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Insights, tips, and reviews from our bike experts
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition cursor-pointer"
              onClick={() => setSelectedPost(blog)}
            >
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-48 sm:h-52 md:h-56 object-cover rounded-t-lg"
              />
              <div className="p-4 sm:p-6">
                <p className="text-sm text-teal-600">{blog.category}</p>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mt-1 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm mb-3">{blog.summary}</p>
                <div className="text-sm text-gray-500">{blog.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedPost && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="bg-white w-full max-w-2xl md:max-w-3xl rounded-lg overflow-y-auto max-h-[90vh] shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-48 sm:h-64 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-teal-700 mb-2">
                  {selectedPost.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {selectedPost.date}
                </p>
                <p className="text-gray-700 text-sm sm:text-base mb-6 whitespace-pre-wrap">
                  {selectedPost.fullText}
                </p>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
