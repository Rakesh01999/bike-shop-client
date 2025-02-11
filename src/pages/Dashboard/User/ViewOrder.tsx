/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Card, Spin, Typography } from "antd";
import { useGetOwnOrdersQuery } from "../../../redux/features/bikes/bikesManagement";

const { Title } = Typography;

const ViewOrder = () => {
  const { data: CarData, isFetching } = useGetOwnOrdersQuery(undefined);

  console.log("Order Data:", CarData);
  console.log("Loading:", isFetching);

  // Teal Color Palette
  const tealColors = {
    primary: "#0F766E", // Deep Teal
    secondary: "#14B8A6", // Bright Teal
    background: "#ECFDF5", // Light Teal
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone_number", key: "phone_number" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: any) => (
        <span className="text-green-600 font-semibold">${price}</span>
      ),
    },
    {
      title: "Bank Status",
      dataIndex: ["transaction", "bank_status"],
      key: "bank_status",
      render: (status: any) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "Success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status || "N/A"}
        </span>
      ),
    },
    {
      title: "Transaction Date",
      dataIndex: ["transaction", "date_time"],
      key: "date_time",
      render: (status: any) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "Success"
            // ? "bg-green-100 text-green-700"
            // : "bg-red-100 text-red-700"
          }`}
        >
          {status || "N/A"}
        </span>
      ),
    },
    {
      title: "Payment Method",
      dataIndex: ["transaction", "method"],
      key: "method",
      render: (status: any) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "Success"
              // ? "bg-green-100 text-green-700"
              // : "bg-red-100 text-red-700"
          }`}
        >
          {status || "N/A"}
        </span>
      ),
    },
    { title: "SP Code", dataIndex: ["transaction", "sp_code"], key: "sp_code",
      render: (status:any) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "Success"
              // ? "bg-green-100 text-green-700"
              // : "bg-red-100 text-red-700"
          }`}
        >
          {status || "N/A"}
        </span>
      ),
     },
    {
      title: "SP Message",
      dataIndex: ["transaction", "sp_message"],
      key: "sp_message",
      render: (status:any) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "Success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status || "N/A"}
        </span>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen p-6 flex flex-col items-center"
      // style={{
      //   background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      // }}
    >
      {/* Title Card */}
      <Card
        className="w-full max-w-4xl text-center shadow-lg mb-6"
        // style={{ background: "rgba(255, 255, 255, 0.95)", borderRadius: "12px" }}
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${tealColors.secondary}`,
        }}
      >
        <Title
          level={3}
          style={{
            color: tealColors.primary,
            fontSize: "1.8rem",
            marginBottom: "0",
          }}
        >
          Your Order History
        </Title>
        <p className="text-gray-600 text-sm">
          Track all your past purchases here.
        </p>
      </Card>

      {/* Order Table */}
      <Card
        className="w-full max-w-6xl shadow-md overflow-hidden"
        // style={{ borderRadius: "12px", border: `1px solid ${tealColors.secondary}` }}
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${tealColors.secondary}`,
        }}
      >
        {isFetching ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={CarData?.data || []}
            rowKey="_id"
            scroll={{ x: "max-content" }}
            pagination={{ pageSize: 5, showSizeChanger: false }}
            className="rounded-lg overflow-hidden"
            components={{
              header: {
                cell: (props: any) => (
                  <th
                    {...props}
                    style={{
                      ...props.style,
                      backgroundColor: "#14B8A6", // Deep Teal color
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                ),
              },
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default ViewOrder;
