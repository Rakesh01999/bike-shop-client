import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbars = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const user = useAppSelector(useCurrentUser);

  // **Teal Theme Colors**
  const colors = {
    primary: "#0F766E",
    secondary: "#14B8A6",
    accent: "#2DD4BF",
    background: "#ECFDF5",
    text: {
      primary: "#FFFFFF",
      secondary: "#D1FAE5",
      hover: "#A7F3D0",
    },
  };

  return (
    <>
      {/* **Navbar Section** */}
      <nav
        className="fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300"
        style={{
          backgroundColor: colors.primary,
          backdropFilter: "blur(15px)",
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        }}
      >
        <div className="container mx-auto flex justify-between items-center p-4 max-w-8xl">
          {/* 🚗 **Logo Section with Hover Animation** */}
          <div
            className="flex items-center space-x-4 group cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              // src="https://i.postimg.cc/C5SrMXNd/car.png"
              src="https://i.postimg.cc/Kzzym4yH/bike.png"
              alt="Bike"
              className="w-16 h-16 rounded-full border-2 border-white/20 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
            />
            <span
              className="text-2xl font-bold tracking-wider transition-all duration-300 group-hover:text-teal-200"
              style={{ color: colors.text.primary }}
            >
              {/* AutoVerse */}
              <img
                src="https://i.postimg.cc/KzLCGTHQ/bike-shop-logo.png"
                alt="Bike"
                className="md:w-32 w-24"
              />
            </span>
          </div>

          {/* **Desktop Navigation** */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              <NavLink href="/allproduct" label="All Product" />
              <NavLink href="/dashboard" label="Dashboard" />
              <NavLink href="/about" label="About" />
              <NavLink href="/blog" label="Blog" />
              <NavLink href="/contact" label="Contact" />

              {!user && (
                <>
                  <NavLink href="/login" label="Login" />
                  <NavLink href="/register" label="Register" />
                </>
              )}
            </div>

            {/* Logout Button */}
            {user && (
              <button
                onClick={handleLogout}
                className="px-6 py-2 rounded-full font-medium transition-all duration-300 
                hover:bg-white/20 hover:shadow-2xl border border-white text-white"
              >
                Logout
              </button>
            )}
          </div>

          {/* 📱 **Mobile Menu Toggle** */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              {menuOpen ? (
                <X
                  size={28}
                  className="text-white transition-transform duration-300 hover:rotate-90"
                />
              ) : (
                <Menu
                  size={28}
                  className="text-white transition-transform duration-300 hover:rotate-180"
                />
              )}
            </button>
          </div>
        </div>

        {/* 📱 **Mobile Menu with Slide Animation** */}
        {menuOpen && (
          <div
            className="md:hidden absolute top-full left-0 w-full transition-all duration-500 ease-in-out transform"
            style={{
              backgroundColor: colors.primary,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            }}
          >
            <div className="container mx-auto p-6 space-y-4">
              <MobileNavLink href="/" label="Home" />
              <MobileNavLink href="/allproduct" label="All Products" />
              <MobileNavLink href="/dashboard" label="Dashboard" />
              <MobileNavLink href="/about" label="About" />

              {!user && (
                <>
                  <MobileNavLink href="/login" label="Login" />
                  <MobileNavLink href="/register" label="Register" />
                </>
              )}

              {user && (
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-3 rounded-lg font-medium text-center 
                  transition-all duration-300 hover:bg-white/20 border border-white text-white"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* 📜 **Main Content Section** */}
      <div className="w-full min-h-screen pt-20">{children}</div>
    </>
  );
};

// **Desktop Navigation Link**
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="text-base font-medium tracking-wider transition-all duration-300 
    transform hover:scale-105 hover:text-teal-200 relative group text-white"
  >
    {label}
    <span
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-white 
      transition-all duration-300 group-hover:w-full"
    ></span>
  </a>
);

// **Mobile Navigation Link**
const MobileNavLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="block py-3 text-base font-medium tracking-wider 
    transition-all duration-300 hover:bg-white/10 rounded-lg px-4 
    relative group text-white/90"
  >
    {label}
    <span
      className="absolute bottom-0 left-0 w-0 h-0.5 bg-white 
      transition-all duration-300 group-hover:w-full"
    ></span>
  </a>
);

export default Navbars;
