import CustomCard from "./Card";
import Swipper from "./Swipper";
import Testimonials from "./Testimonials";


const Home = () => {
  return (
    <div className="">
    <Swipper/>

    <div className="mt-10">
      <CustomCard/>
    </div>
    <div>
      <Testimonials/>
    </div>
  </div>
  );
};

export default Home;
