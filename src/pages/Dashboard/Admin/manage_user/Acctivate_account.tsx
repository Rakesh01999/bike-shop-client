/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Button, Tag, Card, Spin } from "antd";
import { useState } from "react";
import {
  useAlluserQuery,
  useBlockedUserMutation,
} from "../../../../redux/features/bikes/bikesManagement";
import { toast } from "sonner";

// Define interface for user data
interface TUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  isBlocked: boolean;
}

const Acctivate_account = () => {
  const { data: Alluser, isFetching } = useAlluserQuery(undefined);
  const [blockedUser] = useBlockedUserMutation();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleBlockUser = async (userId: string) => {
    try {
      await blockedUser({ userId });
      toast.success("User successfully blocked", {
        duration: 3000,
        position: "top-center",
        style: { fontSize: "16px", backgroundColor: "#0F766E", color: "#fff" }, // Deep Teal
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (error) {
      toast.error("Failed to block user", {
        duration: 3000,
        position: "top-center",
        style: { fontSize: "16px", backgroundColor: "#F44336", color: "#fff" }, // Red for error
      });
    }
  };

  // Handle pagination change
  const handleTableChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Teal Theme Colors
  const tealColors = {
    primary: "#0F766E", // Deep Teal
    secondary: "#14B8A6", // Bright Teal
    background: "#ECFDF5", // Light Teal
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: string) => (
        <span className="font-medium text-gray-800">{name}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email: string) => <span className="text-gray-600">{email}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag
          color={role === "admin" ? "red" : "blue"}
          className="font-semibold"
        >
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: TUser) => (
        <Tag
          color={
            record.isBlocked ? "red" : status === "active" ? "green" : "orange"
          }
          className="font-semibold"
        >
          {record.isBlocked ? "BLOCKED" : status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record: TUser) => (
        <Button
          type="primary"
          danger
          disabled={record.isBlocked || record.role === "admin"}
          onClick={() => handleBlockUser(record._id)}
          className="transition-all duration-300 px-4 py-1 rounded-md shadow-md"
        >
          {record.isBlocked
            ? "Blocked"
            : record.role === "admin"
            ? "Admin"
            : "Block"}
        </Button>
      ),
    },
  ];

  // Pagination configuration
  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: Alluser?.data?.length || 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total} users`,
    pageSizeOptions: ['5', '10', '20', '50', '100'],
    onChange: handleTableChange,
    onShowSizeChange: handleTableChange,
    style: {
      marginTop: '16px',
      textAlign: 'center' as const,
    },
    itemRender: (page: number, type: string, originalElement: React.ReactNode) => {
      if (type === 'prev') {
        return <Button size="small">Previous</Button>;
      }
      if (type === 'next') {
        return <Button size="small">Next</Button>;
      }
      return originalElement;
    },
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-5 py-10"
      // style={{
      //   background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      // }}
    >
      {/* Title Section */}
      <Card
        className="w-full max-w-4xl text-center shadow-lg mb-6"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${tealColors.secondary}`,
        }}
      >
        <h2
          className="text-2xl font-semibold"
          style={{ color: tealColors.primary }}
        >
          Manage User Accounts
        </h2>
        <p className="text-gray-600 text-sm">
          View, block, and manage user accounts with ease.
        </p>
      </Card>

      {/* User Table */}
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
            columns={columns}
            loading={isFetching}
            dataSource={Alluser?.data || []}
            rowKey="_id"
            scroll={{ x: "max-content" }}
            className="rounded-lg overflow-hidden"
            pagination={paginationConfig}
            components={{
              header: {
                cell: (props: any) => (
                  <th
                    {...props}
                    style={{
                      ...props.style,
                      backgroundColor: tealColors.secondary, // Bright Teal header
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

export default Acctivate_account;