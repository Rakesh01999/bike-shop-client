import React from "react";
import { useAppSelector } from "../redux/hooks";
import { useCurrentUser } from "../redux/features/auth/authSlice";
import { useSingleuserQuery } from "../redux/features/bikes/bikesManagement";
import { NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

// User Interface
interface User {
  userId?: string;
  name?: string;
  email?: string;
  role?: string;
  createdAt?: string;
}

const tealColors = {
  primary: "#0F766E", // Deep Teal
  secondary: "#14B8A6", // Bright Teal
  background: "#ECFDF5", // Light Teal
};

// Profile Page Component
const Profile = () => {
  const user = useAppSelector(useCurrentUser) as User;
  const userId = user?.userId;
  const { data: userData, isLoading, isError } = useSingleuserQuery(userId);

  const profile = userData?.data;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `linear-gradient(135deg, ${tealColors.background}, ${tealColors.secondary})`,
      }}
    >
      <div className="bg-green-50 w-full max-w-3xl rounded-2xl shadow-2xl p-8 space-y-6">
        {isLoading ? (
          <p className="text-center text-teal-700 font-semibold">
            Loading profile...
          </p>
        ) : isError ? (
          <p className="text-center text-red-600 font-semibold">
            Failed to load profile.
          </p>
        ) : (
          <>
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              {/* <img
                src={
                  profile?.avatar ||
                  "https://i.postimg.cc/KzLCGTHQ/bike-shop-logo.png"
                }
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-teal-500"
              /> */}
              <div
                className="mx-auto mb-4 sm:mb-6 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${tealColors.primary} 0%, ${tealColors.secondary} 100%)`,
                }}
              >
                <UserOutlined className="text-3xl sm:text-4xl text-white" />
              </div>
              
              {/* Basic Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold text-teal-700">
                  {profile?.name}
                </h1>
                <p className="text-gray-600">{profile?.email}</p>
                <p className="text-sm mt-1 px-3 py-1 inline-block bg-teal-100 text-teal-800 rounded-full">
                  Role: {profile?.role}
                </p>
              </div>
            </div>

            {/* Profile Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mt-4 text-sm text-gray-800">
              <div>
                <span className="text-gray-500 block mb-1">Status</span>
                <span
                  className={`font-semibold ${
                    profile?.status === "active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {profile?.status}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Blocked</span>
                <span
                  className={`font-semibold ${
                    profile?.isBlocked ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {profile?.isBlocked ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">
                  Password Change Required
                </span>
                <span className="font-semibold">
                  {profile?.needsPasswordChange ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Joined On</span>
                <span className="font-semibold">
                  {profile?.createdAt?.split("T")[0] || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">Last Updated</span>
                <span className="font-semibold">
                  {profile?.updatedAt?.split("T")[0] || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block mb-1">User ID</span>
                <span className="font-mono text-xs break-all">
                  {profile?._id}
                </span>
              </div>
            </div>
            {/* <NavLink to="/login"> Sign in</NavLink> */}

            {/* Action Button */}
            <div className="text-center mt-6">
              <NavLink to="/dashboard/update-profile">
                <button className="px-6 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition-all duration-300">
                  Edit Profile
                </button>
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
