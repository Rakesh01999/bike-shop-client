import { Table, Button, Tag } from "antd";
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

  const handleBlockUser = async (userId: string) => {
    try {
      await blockedUser({ userId });
      toast.success("User successfully blocked", {
        duration: 3000,
        position: "top-center",
        style: { fontSize: "16px", backgroundColor: "#4CAF50", color: "#fff" },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to block user", {
        duration: 3000,
        position: "top-center",
        style: { fontSize: "16px", backgroundColor: "#F44336", color: "#fff" },
      });
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "red" : "blue"}>
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

  return (
    <div>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={Alluser?.data || []}
        rowKey="_id"
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default Acctivate_account;
