import { useState } from "react"; 
import { Menu, X } from "lucide-react"; 
import { useAppDispatch, useAppSelector } from "../../redux/hooks"; 
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice"; 
import { useNavigate } from "react-router-dom"; 

const Navbar = () => { 
  const dispatch = useAppDispatch(); 
  const navigate = useNavigate(); 

  const handleLogout = () => { 
    dispatch(logout()); 
    navigate("/login"); 
  }; 

  const [menuOpen, setMenuOpen] = useState<boolean>(false); 
  const user = useAppSelector(useCurrentUser); 

  // Teal Color Palette
  const colors = {
    primary: "#0F766E",
    secondary: "#14B8A6",
    background: "#ECFDF5",
    text: {
      primary: "#FFFFFF",
      secondary: "#D1FAE5"
    }
  };

  return ( 
    <nav 
      className="fixed top-0 left-0 w-full z-50 shadow-lg transition-all duration-300"
      style={{ 
        backgroundColor: colors.primary,
        backdropFilter: 'blur(10px)',
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
      }}
    >
      <div className="container mx-auto flex justify-between items-center p-4 max-w-6xl">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img 
            src="https://i.postimg.cc/C5SrMXNd/car.png" 
            alt="Cars" 
            className="w-16 h-16 rounded-full border-2 border-white/20 transform transition-transform duration-300 hover:scale-110"
          />
          <span 
            className="text-xl font-bold tracking-wider"
            style={{ color: colors.text.primary }}
          >
            AutoVerse
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-6">
            <NavLink href="/" label="Home" />
            <NavLink href="/allproduct" label="All Products" />
            <NavLink href="/dashboard" label="Dashboard" />
            <NavLink href="/about" label="About" />

            {!user && (
              <>
                <NavLink href="/login" label="Login" />
                <NavLink href="/register" label="Register" />
              </>
            )}
          </div>

          {user && (
            <button 
              onClick={handleLogout}
              className="px-6 py-2 rounded-full font-medium transition-all duration-300 hover:bg-white/20"
              style={{ 
                color: colors.text.primary,
                border: `2px solid ${colors.text.primary}`
              }}
            >
              Logout
            </button>
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

      {/* Mobile Menu */}
      {menuOpen && (
        <div 
          className="md:hidden absolute top-full left-0 w-full transition-all duration-300 ease-in-out"
          style={{ 
            backgroundColor: colors.primary,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`
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
                className="w-full px-6 py-3 rounded-lg font-medium text-center transition-all duration-300 hover:bg-white/20"
                style={{ 
                  color: colors.text.primary,
                  border: `2px solid ${colors.text.primary}`
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  ); 
};

// Desktop Navigation Link Component
const NavLink = ({ href, label }: { href: string, label: string }) => (
  <a 
    href={href} 
    className="text-sm font-medium tracking-wider transition-all duration-300 transform hover:scale-105 hover:text-white/80"
    style={{ 
      color: 'rgba(255,255,255,0.9)',
    }}
  >
    {label}
  </a>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ href, label }: { href: string, label: string }) => (
  <a 
    href={href} 
    className="block py-3 text-base font-medium tracking-wider transition-all duration-300 hover:bg-white/10 rounded-lg px-4"
    style={{ 
      color: 'rgba(255,255,255,0.9)',
    }}
  >
    {label}
  </a>
);

export default Navbar;
