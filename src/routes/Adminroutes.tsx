import All_order from "../pages/Dashboard/Admin/manage_order/All_order";
import Calculate_revenue from "../pages/Dashboard/Admin/manage_order/Calculate_revenue";
import CreateCar from "../pages/Dashboard/Admin/manage_product/CreateCar";
import DeleteCar from "../pages/Dashboard/Admin/manage_product/DeleteCar";
import GetAllCar from "../pages/Dashboard/Admin/manage_product/GetAllCar";
import UpdateCar from "../pages/Dashboard/Admin/manage_product/UpdateCar";
import Acctivate_account from "../pages/Dashboard/Admin/manage_user/Acctivate_account";

export const adminChildren = [
  {
    name: "Manage_user",
    path: "manage_user",
    element: <Acctivate_account />,
  },
  {
    name: "Manage Product",
    children: [
      {
        name: "Create Car",
        path: "crate_car",
        element: <CreateCar />,
      },
      {
        name: "See all car",
        path: "get_car",
        element: <GetAllCar />,
      },
      {
        name: "Update Car",
        path: "update_car",
        element: <UpdateCar />,
      },
      {
        name: "Delete Car",
        path: "delete_car",
        element: <DeleteCar />,
      },
    ],
  },
  {
    name: "Manage Order",
    children: [
      {
        name: "See all order",
        path: "all_order",
        element: <All_order />,
      },
      {
        name: "Total Revenue",
        path: "total_revenue",
        element: <Calculate_revenue />,
      },
    ],
  },
];
