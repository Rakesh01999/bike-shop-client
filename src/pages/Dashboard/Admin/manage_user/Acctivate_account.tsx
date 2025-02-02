import { Table, Button } from "antd";
import { useAlluserQuery, useBlockedUserMutation } from "../../../../redux/features/bikes/bikesManagement";
import { toast } from "sonner";

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
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Action",
            key: "action",
            render: (record: { status: string; _id: string; }) => (
                <Button
                    type="primary"
                    danger={record.status === "blocked"}
                    disabled={record.status === "blocked"}
                    onClick={() => handleBlockUser(record._id)}
                >
                    {record.status === "in-progress" ? "Block" : "Already Blocked"}
                </Button>
            ),
        },
    ];

    return (
        <div>
            <Table columns={columns} loading={isFetching} dataSource={Alluser?.data || []} rowKey="_id" scroll={{ x: 800 }} />
        </div>
    );
};

export default Acctivate_account;
