import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { adminChildren } from "../../routes/Adminroutes";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
import { userChildren } from "../../routes/UserRoutes";
import { CSSProperties } from "react";

type UserType = {
  _id: string;
  name: string;
  email: string;
  // role: "admin" | "faculty" | "student" | "user" | "customer";
  role: "admin" | "user" | "customer";
  status: string;
  exp: number;
  iat: number;
};

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER: "customer",
};

// Teal Theme Colors (matching Navbar)
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

// Custom styles for the sidebar
const siderStyles: CSSProperties = {
  background: `linear-gradient(180deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
  height: "100vh",
  position: "sticky",
  top: 0,
  left: 0,
  boxShadow: "4px 0 10px rgba(0, 0, 0, 0.1)",
};

// Custom styles for the menu
const menuStyles: CSSProperties = {
  background: "transparent",
  borderRight: "none",
  padding: "1rem 0.5rem",
};

const Sidebar = () => {
  const user = useAppSelector(useCurrentUser) as UserType | null;
  const role = user?.role;
  let sidebarItems: ItemType<MenuItemType>[] = [];

  switch (role) {
    case userRole.ADMIN:
      sidebarItems = (sidebarItemsGenerator(adminChildren) ||
        []) as ItemType<MenuItemType>[];
      break;
    case userRole.USER:
      sidebarItems = (sidebarItemsGenerator(userChildren) ||
        []) as ItemType<MenuItemType>[];
      break;
    default:
      sidebarItems = [];
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={siderStyles}
      theme="dark"
      width={250}
    >
      {/* Logo/Header Section */}
      <div
        style={{
          padding: "1.5rem 1rem",
          marginBottom: "1rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <h2
          style={{
            color: colors.text.primary,
            margin: 0,
            fontSize: "1.25rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {/* AutoVerse */}
        </h2>
      </div>

      {/* Menu Section */}
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={sidebarItems}
        style={menuStyles}
        className="custom-sidebar-menu"
      />

      {/* Add custom CSS for menu items */}
      <style>
        {`
          .custom-sidebar-menu.ant-menu-dark {
            background: transparent;
          }

          .custom-sidebar-menu.ant-menu-dark .ant-menu-item {
            margin: 4px 0;
            border-radius: 8px;
            color: ${colors.text.secondary};
          }

          .custom-sidebar-menu.ant-menu-dark .ant-menu-item:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            color: ${colors.text.primary};
          }

          .custom-sidebar-menu.ant-menu-dark .ant-menu-item-selected {
            background: rgba(255, 255, 255, 0.15) !important;
            color: ${colors.text.primary};
          }

          .custom-sidebar-menu.ant-menu-dark .ant-menu-submenu-title {
            border-radius: 8px;
            color: ${colors.text.secondary};
          }

          .custom-sidebar-menu.ant-menu-dark .ant-menu-submenu-title:hover {
            background: rgba(255, 255, 255, 0.1) !important;
            color: ${colors.text.primary};
          }

          .custom-sidebar-menu .ant-menu-item-active,
          .custom-sidebar-menu .ant-menu-submenu-active > .ant-menu-submenu-title {
            background: rgba(255, 255, 255, 0.05) !important;
          }

          .custom-sidebar-menu.ant-menu-dark .ant-menu-inline.ant-menu-sub {
            background: transparent;
          }

          /* Transition effects */
          .custom-sidebar-menu .ant-menu-item,
          .custom-sidebar-menu .ant-menu-submenu-title {
            transition: all 0.3s ease;
          }

          /* Custom scrollbar */
          .custom-sidebar-menu::-webkit-scrollbar {
            width: 6px;
          }

          .custom-sidebar-menu::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 3px;
          }

          .custom-sidebar-menu::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>
    </Sider>
  );
};

export default Sidebar;
