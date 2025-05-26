import { Card, Typography } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const tealColors = {
  primary: "#0F766E",
  secondary: "#14B8A6",
  background: "#CCFBF1",
  text: {
    primary: "#134E4A",
    secondary: "#115E59",
  },
};

const cardItems = [
  {
    title: "My Orders",
    icon: <ShoppingCartOutlined className="text-3xl text-white" />,
    description: "View your orders",
    path: "/dashboard/view_order",
  },
  {
    title: "Profile",
    icon: <UserOutlined className="text-3xl text-white" />,
    description: "Update your personal info",
    path: "/profile",
  },
  {
    title: "Settings",
    icon: <SettingOutlined className="text-3xl text-white" />,
    description: "Manage your preferences",
    path: "/dashboard/update-profile",
  },
  {
    title: "Activity",
    icon: <HistoryOutlined className="text-3xl text-white" />,
    description: "Find All Latest Pproduct",
    path: "/allproduct",
  },
];

const UserDashboard = () => {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // Replace with actual logic to fetch user info
    const user = { name: "Mr. User" };
    setUserName(user.name);
  }, []);

  return (
    <div
      className="min-h-screen w-full p-4 sm:p-6 md:p-10"
    //   style={{
    //     background: `linear-gradient(135deg, ${tealColors.background}, #ffffff)`,
    //   }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8 text-center">
          <Typography.Title
            level={2}
            className="text-3xl sm:text-4xl"
            style={{
              color: tealColors.text.primary,
              letterSpacing: "-0.5px",
            }}
          >
            Welcome, {userName} 👋
          </Typography.Title>
          <Typography.Text
            className="text-base sm:text-lg"
            style={{ color: tealColors.text.secondary }}
          >
            Here's a quick look at your dashboard.
          </Typography.Text>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {cardItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <Card
                hoverable
                className="transition-transform transform hover:scale-105 rounded-2xl shadow-md backdrop-blur-md"
                style={{
                  background: "rgba(255, 255, 255, 0.85)",
                  border: `1px solid ${tealColors.secondary}`,
                }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div
                    className="w-16 h-16 flex items-center justify-center rounded-full shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${tealColors.primary}, ${tealColors.secondary})`,
                    }}
                  >
                    {item.icon}
                  </div>
                  <Typography.Title
                    level={4}
                    style={{
                      marginBottom: 0,
                      color: tealColors.text.primary,
                      fontSize: "1.25rem",
                    }}
                  >
                    {item.title}
                  </Typography.Title>
                  <Typography.Text
                    style={{
                      fontSize: "0.9rem",
                      color: tealColors.text.secondary,
                    }}
                  >
                    {item.description}
                  </Typography.Text>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
