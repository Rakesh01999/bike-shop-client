import { Layout, Menu } from "antd";
import { sidebarItemsGenerator } from "../../utils/sidebarItemsGenerator";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { adminChildren } from "../../routes/Adminroutes";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";
import { userChildren } from "../../routes/UserRoutes";

type UserType = {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "faculty" | "student" | "user" | "customer";
  status: string;
  exp: number;
  iat: number;
};

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  USER:"user"
  // USER:"user"
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
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "black",
          height: "1rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>.</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
