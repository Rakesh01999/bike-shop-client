import BikeBlogs from "./BikeBlogs";
import CustomCard from "./Card";
import Swipper from "./Swipper";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        background: `linear-gradient(135deg, #ECFDF5 0%, #14B8A6 100%)`,
      }}
    >
      {/* Hero Swiper Section */}
      <div className="w-full">
        <Swipper />
      </div>

      {/* Featured Products / Custom Cards */}
      <div className="mt-10 w-full max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-teal-900 text-center">
          Explore Our Best Bikes
        </h2>
        <p className="text-gray-600 text-center text-sm sm:text-base mt-2">
          Hand-picked collections just for you.
        </p>
        <div className="mt-6">
          <CustomCard />
        </div>
      </div>

      {/* Bike Blogs */}
      <div className="w-full max-w-6xl px-4 mt-16">
        <div className="mt-6">
          <BikeBlogs />
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="w-full max-w-6xl px-4 mt-16">
        <div className="mt-6">
          <Testimonials />
        </div>
      </div>
    </div>
  );
};

export default Home;
