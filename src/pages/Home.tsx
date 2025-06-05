import BikeBlogs from "./BikeBlogs";
import CustomCard from "./Card";
import Category from "./Category";
import Newsletter from "./Newsletter";
import Offers from "./Offers";
import Services from "./Services";
import Swipper from "./Swipper";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center"
      // style={{
      //   background: `linear-gradient(135deg, #ECFDF5 0%, #14B8A6 100%)`,
      // }}
    >
      {/* Hero Swiper Section */}
      <div className="w-full">
        <Swipper />
      </div>

      {/* Featured Products / Custom Cards */}
      {/* <div className="mt-10 w-full max-w-8xl px-4 mx-auto"> */}
      <div className="mt-10 max-w-8xl mx-auto">
        <h2 className="text-3xl font-bold text-teal-700 text-center">
          Explore Our Best Bikes
        </h2>
        <p className="text-gray-600 text-center text-sm sm:text-base mt-2">
          Hand-picked collections just for you.
        </p>
        <div className="mt-6">
          <CustomCard />
        </div>
      </div>

      {/* Bike Category */}
      <div className="w-full max-w-6xl px-4 mt-10">
        <div className="">
          <Category />
        </div>
      </div>

      <div>
        {/* <h2 className="text-3xl md:text-4xl font-bold text-teal-900 animate-pulse mb-6 text-center mt-10"> */}
        <h2 className="text-3xl md:text-4xl font-bold text-teal-900 animate-pulse text-center mt-10">
          🔥 Special Offers
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-center">
          Don’t miss out on our exclusive deals and seasonal discounts. Grab
          your dream ride today!
        </p>
      </div>

      {/* Offers */}
      <div className="w-full max-w-6xl px-4 ">
        <div className="mt-6">
          <Offers />
        </div>
      </div>

      {/* Bike Blogs */}
      <div className="w-full max-w-6xl px-4">
        <div className="">
          <BikeBlogs />
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="w-full max-w-6xl px-4 mt-10">
        <div className="">
          <Testimonials />
        </div>
      </div>
      
      {/* Services */}
      <div className="w-full max-w-6xl px-4 mt-10">
        <div className="">
          <Services />
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="w-full max-w-6xl px-4 mt-10">
        <div className="mt-6">
          <Newsletter />
        </div>
      </div>

    </div>
  );
};

export default Home;
