import React, { useState } from "react";
import { Tag, Modal, Button } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";

// Extend Blog Post Type to include full content
interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  excerpt: string;
  fullContent: string;
  imageUrl: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Choosing the Right Bike for Your Riding Style",
    author: "Sarah Johnson",
    date: "2024-02-15",
    category: "Bike Selection",
    excerpt:
      "Discover how to select the perfect bike that matches your cycling goals and terrain preferences.",
    fullContent: `
      Selecting the right bike is crucial for an enjoyable cycling experience. Here's a comprehensive guide to help you choose:

      1. Understand Your Riding Style
      - Casual riding: Comfort bikes or hybrid bikes
      - Road cycling: Road bikes with lightweight frames
      - Mountain biking: Mountain bikes with robust suspension
      - Urban commuting: City bikes or electric bikes

      2. Consider Key Factors
      - Frame size and geometry
      - Terrain you'll be riding on
      - Budget
      - Intended use (recreation, fitness, commuting)

      3. Test Ride Multiple Options
      Always test ride before making a final decision. Pay attention to:
      - Comfort
      - Handling
      - Fit
      - Overall feel

      Conclusion: The perfect bike is the one that feels like an extension of yourself.
    `,
    imageUrl: "https://i.postimg.cc/mDHqQ0Bw/1.jpg",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Essential Bike Maintenance Tips for Beginners",
    author: "Mike Thompson",
    date: "2024-02-10",
    category: "Maintenance",
    excerpt:
      "Learn basic bike maintenance techniques to keep your ride in top condition and extend its lifespan.",
    fullContent: `
        Keeping your bike in top shape is essential for a smooth ride. Here are some key maintenance tips:
  
        1. Regularly Check Tire Pressure
        - Use a gauge to maintain the recommended PSI.
        - Proper inflation improves performance and reduces wear.
  
        2. Clean and Lubricate Your Chain
        - Remove dirt and grime with a degreaser.
        - Apply a quality lubricant to prevent rust.
  
        3. Inspect Brakes and Gears
        - Ensure brake pads have enough life left.
        - Adjust gear shifts for smooth performance.
  
        4. Keep Your Bike Clean
        - Regular washing prevents dirt buildup.
        - Wipe down the frame and components.
  
        Conclusion: A well-maintained bike lasts longer and ensures a safer ride.
      `,
    imageUrl: "https://i.postimg.cc/CMbXdTvM/2.jpg",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Top 10 Cycling Routes in Your City",
    author: "Emma Rodriguez",
    date: "2024-02-05",
    category: "Cycling Routes",
    excerpt:
      "Explore the most scenic and exciting cycling routes that will challenge and inspire you.",
    fullContent: `
        Discover breathtaking cycling routes in your city! Here are the top picks:
  
        1. Riverside Trails
        - Enjoy scenic water views and smooth paths.
        - Great for beginners and leisure riders.
  
        2. Urban Bike Lanes
        - Safely navigate the city with designated lanes.
        - Ideal for commuters and fitness enthusiasts.
  
        3. Mountain Trails
        - Challenge yourself on rugged terrains.
        - Best suited for experienced riders.
  
        4. Coastal Paths
        - Ride along the beach with fresh ocean air.
        - Perfect for a relaxed cycling experience.
  
        Conclusion: No matter your preference, there's a perfect route for every cyclist.
      `,
    // imageUrl: "https://i.postimg.cc/qvv5mtpg/3.jpg",
    imageUrl: "https://i.postimg.cc/rmdpkFc9/9.jpg",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Electric Bikes: The Future of Urban Commuting",
    author: "David Chen",
    date: "2024-01-28",
    category: "E-Bikes",
    excerpt:
      "Understand how electric bikes are revolutionizing urban transportation and lifestyle.",
    fullContent: `
        E-bikes are transforming the way we commute. Here's why they are the future:
  
        1. Eco-Friendly Transportation
        - Reduce carbon footprint with zero emissions.
        - Save money on fuel and public transport.
  
        2. Convenience & Speed
        - Travel faster than conventional bicycles.
        - Avoid traffic congestion with ease.
  
        3. Health Benefits
        - Offers pedal-assist for reduced strain.
        - Encourages active commuting.
  
        4. Cost-Effective Commuting
        - Lower maintenance compared to cars.
        - Government incentives in some regions.
  
        Conclusion: E-bikes combine efficiency, fun, and sustainability.
      `,
    imageUrl: "https://i.postimg.cc/TPZNYCgW/4.jpg",
    readTime: "8 min read",
  },
  {
    id: 5,
    title: "Cycling Gear: What You Really Need",
    author: "Lisa Wong",
    date: "2024-01-20",
    category: "Gear",
    excerpt:
      "A comprehensive guide to essential cycling gear for safety, comfort, and performance.",
    fullContent: `
        Make the most of your cycling experience with the right gear:
  
        1. Helmet
        - Protects your head in case of accidents.
        - Choose one with proper ventilation.
  
        2. Cycling Shorts
        - Provides comfort with padded cushioning.
        - Reduces friction during long rides.
  
        3. Lights and Reflectors
        - Essential for night riding.
        - Increases visibility and safety.
  
        4. Hydration Pack
        - Stay hydrated during long rides.
        - Easy to carry and use while cycling.
  
        Conclusion: The right gear enhances safety and overall riding experience.
      `,
    imageUrl: "https://i.postimg.cc/kGyTsCZx/5.jpg",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "Mountain Biking: Techniques and Training",
    author: "Alex Martinez",
    date: "2024-01-15",
    category: "Training",
    excerpt:
      "Master mountain biking techniques and develop your skills for challenging terrains.",
    fullContent: `
        Take your mountain biking skills to the next level with these techniques:
  
        1. Mastering Balance
        - Shift body weight according to the terrain.
        - Keep your eyes focused on the trail ahead.
  
        2. Handling Steep Descents
        - Maintain control by using both brakes.
        - Keep your weight back for stability.
  
        3. Climbing Hills Efficiently
        - Shift gears for a smooth ascent.
        - Keep a steady cadence to conserve energy.
  
        4. Choosing the Right Bike
        - Consider suspension type and tire width.
        - Opt for a lightweight frame for better control.
  
        Conclusion: Proper training and technique make mountain biking an exhilarating experience.
      `,
    imageUrl: "https://i.postimg.cc/zfmTyM25/pexels-fox-58267-750841.jpg",
    readTime: "9 min read",
  },
];

const BlogComponent: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  const [searchTerm, _setSearchTerm] = useState("");
  const [categoryFilter] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  const [currentPage, _setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const postsPerPage = 6;

  // Filtering and Pagination Logic
  const filteredPosts = blogPosts.filter(
    (post) =>
      (searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === null || post.category === categoryFilter)
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Open Full Post Modal
  const handleReadMore = (post: BlogPost) => {
    setSelectedPost(post);
  };

  // Close Modal
  const handleCloseModal = () => {
    setSelectedPost(null);
  };
  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Title and Description Card */}
      <div className="w-full max-w-3xl text-center mb-8 bg-teal-200 shadow-md rounded-lg p-6 transform transition-all duration-300 hover:shadow-lg">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-teal-700">
          Bike Shop Blog
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          Expert insights, tips, and stories from the world of biking
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="relative">
              <img
                alt={post.title}
                src={post.imageUrl}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Tag color="processing">{post.category}</Tag>
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-xl font-bold mb-3 text-teal-700 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <UserOutlined className="text-teal-600" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CalendarOutlined className="text-teal-600" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <Tag color="default">{post.readTime}</Tag>
                <Button
                  type="link"
                  onClick={() => handleReadMore(post)}
                  className="text-teal-600 hover:text-teal-800"
                >
                  Read More
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Post Modal */}
      <Modal
        title={selectedPost?.title}
        open={!!selectedPost}
        onCancel={handleCloseModal}
        footer={null}
        width="90%"
        style={{ maxWidth: 800, top: 20 }}
        bodyStyle={{
          maxHeight: "70vh",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        {selectedPost && (
          <div className="space-y-6">
            <img
              src={selectedPost.imageUrl}
              alt={selectedPost.title}
              className="w-full max-h-[400px] object-cover rounded-lg"
            />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="space-x-4">
                <Tag color="processing">{selectedPost.category}</Tag>
                <span className="text-gray-600 flex items-center">
                  <UserOutlined className="mr-2 text-teal-600" />
                  {selectedPost.author}
                </span>
                <span className="text-gray-600 flex items-center">
                  <CalendarOutlined className="mr-2 text-teal-600" />
                  {new Date(selectedPost.date).toLocaleDateString()}
                </span>
              </div>
              <Tag color="default">{selectedPost.readTime}</Tag>
            </div>

            <div
              className="prose max-w-none text-base leading-relaxed text-gray-700"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {selectedPost.fullContent}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BlogComponent;
