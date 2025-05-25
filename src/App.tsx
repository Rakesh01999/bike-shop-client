import { Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";

function App() {
  return (
    // <div>
    <div>
      <div className="mb-24">
        <Navbar />
      </div>
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}

export default App;
