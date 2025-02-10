import ChangePassword from "../pages/Dashboard/User/Changepassword";
import ViewOrder from "../pages/Dashboard/User/ViewOrder";

export const userChildren = [
  {
    name: "Update Profile",
    path: "update-profile",
    // element: <ChangePassword />,
  },
  {
    name: "Change Password",
    path: "change_password",
    element: <ChangePassword />,
  },
  {
    name: "View Order",
    path: "view_order",
    element: <ViewOrder />,
  },
];
