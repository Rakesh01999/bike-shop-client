/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Table, Card, Spin, Tag, Input, Select } from "antd";
import { SearchOutlined, FilterOutlined } from "@ant-design/icons";
import { useGetAllOrdersQuery } from "../../../../redux/features/bikes/bikesManagement";

const { Option } = Select;

const All_order = () => {
  const {
    data: orderData,
    isFetching,
    isError,
    // error
  } = useGetAllOrdersQuery(undefined);

  // State for filtering
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Teal Theme
  const tealColors = {
    primary: "#0F766E",
    secondary: "#14B8A6",
    background: "#ECFDF5",
  };

  if (isError) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{
          background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
        }}
      >
        <Card
          className="w-full max-w-md text-center"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${tealColors.secondary}`,
          }}
        >
          <h2 className="text-red-600 text-xl">Error Loading Orders</h2>
          <p className="text-gray-600">Please try again later.</p>
        </Card>
      </div>
    );
  }

  // Filtered and processed data
  const processedData = (orderData?.data || []).filter((order: any) => {
    // Search filtering
    const searchMatch =
      !searchTerm ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase());

    // Status filtering
    const statusMatch =
      !statusFilter ||
      order.transaction?.bank_status?.toLowerCase() ===
        statusFilter.toLowerCase();

    return searchMatch && statusMatch;
  });

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => (
        <span className="font-medium text-gray-700">{email}</span>
      ),
    },
    {
      title: "Product ID",
      dataIndex: "product",
      key: "product",
      render: (product: string) => (
        <span className="text-blue-600 font-semibold">{product}</span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity: number) => <Tag color="blue">{quantity}</Tag>,
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price: number) => (
        <span className="text-green-600 font-bold">
          ${price.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Transaction Status",
      dataIndex: ["transaction", "bank_status"],
      key: "transactionStatus",
      render: (status: string) => {
        const colorMap: { [key: string]: string } = {
          success: "green",
          pending: "yellow",
          failed: "red",
        };
        return (
          <Tag color={colorMap[status?.toLowerCase()] || "default"}>
            {status?.toUpperCase() || "N/A"}
          </Tag>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <span className="text-gray-600">{new Date(date).toLocaleString()}</span>
      ),
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center px-5 py-6"
      style={{
        background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      }}
    >
      {/* Title Card */}
      <Card
        className="w-full max-w-3xl text-center shadow-lg mb-6"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${tealColors.secondary}`,
        }}
      >
        <h1
          className="text-2xl font-semibold text-gray-800"
          style={{ color: tealColors.primary }}
        >
          Order Management
        </h1>
        <p className="text-gray-600 text-sm">View and track all bike orders</p>
      </Card>

      {/* Filtering Section */}
      <Card
        className="w-full max-w-6xl mb-4 shadow-md"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${tealColors.secondary}`,
        }}
      >
        <div className="flex justify-between items-center space-x-4">
          {/* Search Input */}
          <Input
            placeholder="Search by email or product id"
            prefix={<SearchOutlined className="text-teal-500" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />

          {/* Status Filter */}
          <Select
            placeholder="Transaction Status"
            allowClear
            style={{ width: 200 }}
            onChange={(value) => setStatusFilter(value)}
            suffixIcon={<FilterOutlined className="text-teal-500" />}
          >
            <Option value="success">Success</Option>
            <Option value="pending">Pending</Option>
            <Option value="failed">Failed</Option>
          </Select>
        </div>
      </Card>

      {/* Orders Table */}
      <Card
        className="w-full max-w-6xl shadow-md"
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
            columns={columns.map((column) => ({
              ...column,
              align: "center",
            }))}
            dataSource={processedData}
            loading={isFetching}
            rowKey="_id"
            scroll={{ x: "max-content" }}
            pagination={{
              total: orderData?.meta?.total,
              pageSize: orderData?.meta?.limit,
              current: orderData?.meta?.page,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ["10", "20", "50", "100"],
            }}
            className="rounded-lg overflow-hidden"
            components={{
              header: {
                cell: (props: any) => (
                  <th
                    {...props}
                    style={{
                      ...props.style,
                      backgroundColor: tealColors.secondary,
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
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

export default All_order;
