import MainLayout from "../../components/layout/MainLayout";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbars from "../Navbar/Navbars";

type UserType = {
  email: string;
  // role: "admin" | "faculty" | "student" | "user" | "customer";
  role: "admin" | "user" | "customer";
  exp: number;
  iat: number;
};

const Dashboard = () => {
  const user = useAppSelector(useCurrentUser) as UserType | null;

  const role = user?.role;

  const navigate = useNavigate();
  useEffect(() => {
    if (role === "admin") {
      // navigate("/dashboard/get_bike");
      navigate("/dashboard/adminDashboard");
    } else {
      // navigate("/dashboard/update-profile");
      navigate("/dashboard/userDashboard");
    }
  }, [navigate, role]);
  return (
    <Navbars>
      <MainLayout />
    </Navbars>
  );
};

export default Dashboard;
