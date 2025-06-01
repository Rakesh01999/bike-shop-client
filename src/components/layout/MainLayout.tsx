import { Layout } from "antd";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

const MainLayout = () => {
  // Teal Color Palette
  // const tealColors = {
  //   primary: "#0F766E", // Deep Teal
  //   secondary: "#14B8A6", // Bright Teal
  //   background: "#ECFDF5", // Light Teal
  // };

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout
        className=""
        // style={{
        //   background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
        // }}
      >
        <Content style={{ margin: "" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
