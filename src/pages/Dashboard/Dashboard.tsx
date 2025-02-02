import MainLayout from "../../components/layout/MainLayout";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbars from "../navbar/Navbars";

type UserType = {
    email: string;
    role: "admin" | "faculty" | "student" | "user";
    exp: number;
    iat: number;
  };

const Dashboard = () => {

     const user = useAppSelector(useCurrentUser) as UserType | null;
    
      const role = user?.role;

    const navigate = useNavigate();
    useEffect(() => {
        if(role === 'admin'){
            navigate('/dashboard/get_car');
        }
        else{
            navigate('/dashboard/change_password');
        }
    }, [navigate,role]);
    return (
        <Navbars>
            <MainLayout/>
        </Navbars>
    );
};

export default Dashboard;