import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbars = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const user = useAppSelector(useCurrentUser);

  return (
    <>
      <nav className="bg-gray-800 text-white w-full">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div>
            <img
              src="https://i.postimg.cc/C5SrMXNd/car.png"
              alt="Cars"
              className="w-16 h-16 ml-5"
            />
          </div>
          <div className="hidden md:flex gap-4">
            <a href="/" className="hover:text-gray-300">
              Home
            </a>
            <a href="/allproduct" className="hover:text-gray-300">
              All product
            </a>
            <a href="/dashboard" className="hover:text-gray-300">
              Dashboard
            </a>

            {!user && (
              <>
                <a href="/login" className="hover:text-gray-300">
                  Login
                </a>
                <a href="/register" className="hover:text-gray-300">
                  Register
                </a>
              </>
            )}

            <a href="/about" className="hover:text-gray-300">
              About
            </a>
          </div>
          <div className="hidden md:block">
            {user && (
              <button
                onClick={handleLogout}
                className="btn cursor-pointer border border-white text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-gray-700 text-white p-4 grid grid-col-1 space-y-2">
            <a href="/" className="block py-2 hover:text-gray-300">
              Home
            </a>
            <a href="/allproduct" className="hover:text-gray-300">
              All product
            </a>
            <a href="/dashboard" className=" hover:text-gray-300">
              Dashboard
            </a>
            {!user && (
              <>
                {" "}
                <a href="/login" className="hover:text-gray-300">
                  Login
                </a>
                <a href="/register" className="hover:text-gray-300">
                  Register
                </a>{" "}
              </>
            )}
            <a href="/about" className="block py-2 hover:text-gray-300">
              About
            </a>
            {user && (
              <button
                onClick={handleLogout}
                className="btn cursor-pointer w-full mt-4 border border-white text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </nav>
      <div className="w-full min-h-screen">{children}</div>
    </>
  );
};

export default Navbars;
