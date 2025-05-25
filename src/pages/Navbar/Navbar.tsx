import { useState } from "react";
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetAllCarsQuery } from "../../redux/features/bikes/bikesManagement";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  interface User {
    name?: string; // Optional because it's not guaranteed to be present
    email?: string; // Optional because it's not guaranteed to be present
  }
  const user = useAppSelector(useCurrentUser) as User;
  const { data: bikesData } = useGetAllCarsQuery([]);

  // Extract unique categories, brands, and models
  const categories = [
    ...new Set(
      (bikesData?.data?.map((bike) => bike.category) || []).filter(Boolean)
    ),
  ] as string[];
  const brands = [
    ...new Set(
      (bikesData?.data?.map((bike) => bike.brand) || []).filter(Boolean)
    ),
  ] as string[];
  const models = [
    ...new Set(
      (bikesData?.data?.map((bike) => bike.modelNumber) || []).filter(Boolean)
    ),
  ] as string[];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setProfileDropdownOpen(false);
  };

  const handleProfileNavigation = () => {
    navigate("/profile");
    setProfileDropdownOpen(false);
  };

  // Enhanced Color Palette
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

  const handleFilteredNavigation = (type: string, value: string) => {
    navigate(`/allproduct?${type}=${value}`);
    setMegaMenuOpen(false);
    setMenuOpen(false);
  };

  // Vehicles Mega Menu Component
  const VehiclesMegaMenu = () => (
    <div
      className="absolute top-full left-0 w-full bg-white shadow-xl transform transition-all duration-300 z-50"
      style={{
        visibility: megaMenuOpen ? "visible" : "hidden",
        opacity: megaMenuOpen ? 1 : 0,
        transform: `translateY(${megaMenuOpen ? "0" : "-10px"})`,
      }}
    >
      <div className="container mx-auto max-w-6xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Categories Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-700 border-b border-teal-200 pb-2">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleFilteredNavigation("category", category)}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all duration-200 text-sm"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Brands Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-700 border-b border-teal-200 pb-2">
              Brands
            </h3>
            <div className="space-y-2">
              {brands.map((brand, index) => (
                <button
                  key={index}
                  onClick={() => handleFilteredNavigation("brand", brand)}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all duration-200 text-sm"
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Models Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-teal-700 border-b border-teal-200 pb-2">
              Models
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {models.map((model, index) => (
                <button
                  key={index}
                  onClick={() => handleFilteredNavigation("modelNumber", model)}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-teal-50 text-gray-700 hover:text-teal-700 transition-all duration-200 text-sm"
                >
                  {model}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Profile Dropdown Component
  const ProfileDropdown = () => (
    <div
      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl transform transition-all duration-300 z-50"
      style={{
        visibility: profileDropdownOpen ? "visible" : "hidden",
        opacity: profileDropdownOpen ? 1 : 0,
        transform: `translateY(${profileDropdownOpen ? "0" : "-10px"})`,
      }}
    >
      <div className="py-2">
        {/* User Info */}
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-medium text-gray-900 truncate">
            {user?.name || user?.email || "User"}
          </p>
          {user?.email && (
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          )}
        </div>

        {/* Profile Option */}
        <button
          onClick={handleProfileNavigation}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-all duration-200"
        >
          <User size={16} className="mr-3" />
          Profile
        </button>

        {/* Logout Option */}
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-200"
        >
          <LogOut size={16} className="mr-3" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300"
      style={{
        backgroundColor: colors.primary,
        backdropFilter: "blur(15px)",
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
      }}
    >
      <div className="container mx-auto flex justify-between items-center p-4 max-w-6xl">
        {/* Logo Section */}
        <div
          className="flex items-center space-x-4 group cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="https://i.postimg.cc/Kzzym4yH/bike.png"
            alt="Bike"
            className="w-16 h-16 rounded-full border-2 border-white/20 transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110"
          />
          <span className="text-2xl font-bold tracking-wider transition-all duration-300 group-hover:text-teal-200">
            <img
              src="https://i.postimg.cc/KzLCGTHQ/bike-shop-logo.png"
              alt="Bike"
              className="md:w-32 w-24"
            />
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-6 items-center">
            <NavLink href="/" label="Home" />

            {/* Vehicles Mega Menu Trigger */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-white hover:text-teal-200 transition-colors duration-300"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              >
                <span>Vehicles</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${
                    megaMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

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

          {/* Profile Dropdown for Desktop */}
          {user && (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                onBlur={() =>
                  setTimeout(() => setProfileDropdownOpen(false), 150)
                }
                className="flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 hover:bg-white/20 hover:shadow-2xl group relative overflow-hidden"
                style={{
                  color: colors.text.primary,
                  border: `2px solid ${colors.text.primary}`,
                }}
              >
                <User size={18} />
                <span className="relative z-10">
                  {user?.name?.split(" ")[0] || "Profile"}
                </span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${
                    profileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              <ProfileDropdown />
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
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

      {/* Desktop Vehicles Mega Menu */}
      <div
        onMouseEnter={() => setMegaMenuOpen(true)}
        onMouseLeave={() => setMegaMenuOpen(false)}
      >
        <VehiclesMegaMenu />
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 w-full transition-all duration-500 ease-in-out transform"
          style={{
            backgroundColor: colors.primary,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          }}
        >
          <div className="container mx-auto p-6 space-y-4">
            <MobileNavLink
              href="/"
              label="Home"
              onClick={() => setMenuOpen(false)}
            />
            <MobileNavLink
              href="/allproduct"
              label="All Products"
              onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Vehicles Section */}
            {/* <div className="border-t border-white/20 pt-4">
              <h4 className="text-white font-semibold mb-3">Vehicles</h4>
              <div className="pl-4 space-y-2">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-2">Categories</p>
                  <div className="pl-2 space-y-1">
                    {categories.slice(0, 3).map((category, index) => (
                      <button
                        key={index}
                        onClick={() => handleFilteredNavigation("category", category)}
                        className="block text-white/70 text-sm hover:text-white transition-colors duration-200"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-white/80 text-sm font-medium mb-2">Brands</p>
                  <div className="pl-2 space-y-1">
                    {brands.slice(0, 3).map((brand, index) => (
                      <button
                        key={index}
                        onClick={() => handleFilteredNavigation("brand", brand)}
                        className="block text-white/70 text-sm hover:text-white transition-colors duration-200"
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}

            <MobileNavLink
              href="/dashboard"
              label="Dashboard"
              onClick={() => setMenuOpen(false)}
            />
            <MobileNavLink
              href="/about"
              label="About"
              onClick={() => setMenuOpen(false)}
            />
            <MobileNavLink
              href="/blog"
              label="Blog"
              onClick={() => setMenuOpen(false)}
            />
            <MobileNavLink
              href="/contact"
              label="Contact"
              onClick={() => setMenuOpen(false)}
            />

            {!user && (
              <>
                <MobileNavLink
                  href="/login"
                  label="Login"
                  onClick={() => setMenuOpen(false)}
                />
                <MobileNavLink
                  href="/register"
                  label="Register"
                  onClick={() => setMenuOpen(false)}
                />
              </>
            )}

            {/* Mobile Profile Section */}
            {user && (
              <div className="border-t border-white/20 pt-4 space-y-3">
                <div className="text-white/90">
                  <p className="font-medium">{user?.name || "User"}</p>
                  {user?.email && (
                    <p className="text-sm text-white/70">{user.email}</p>
                  )}
                </div>
                <MobileNavLink
                  href="/profile"
                  label="Profile"
                  onClick={() => setMenuOpen(false)}
                />
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-3 text-base font-medium tracking-wider transition-all duration-300 hover:bg-white/10 rounded-lg px-4 relative group"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  Logout
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="text-base font-medium tracking-wider transition-all duration-300 transform hover:scale-105 hover:text-teal-200 relative group"
    style={{ color: "white" }}
  >
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
  </a>
);

// Mobile Navigation Link Component
const MobileNavLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className="block py-3 text-base font-medium tracking-wider transition-all duration-300 hover:bg-white/10 rounded-lg px-4 relative group"
    style={{ color: "rgba(255,255,255,0.9)" }}
  >
    {label}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
  </a>
);

export default Navbar;
