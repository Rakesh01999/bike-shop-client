import { Table } from "antd";
import { useGetOwnOrdersQuery } from "../../../redux/features/bikes/bikesManagement";

const ViewOrder = () => {
  // const { data: CarData, isFetching } = useGetOwnCarsQuery(undefined);
  // const { data: orderData, isFetching } = useGetAllOrdersQuery(undefined);
  const { data: CarData, isFetching } = useGetOwnOrdersQuery(undefined);
  // console.log(CarData);

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
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Bank Status",
      dataIndex: ["transaction", "bank_status"],
      key: "bank_status",
    },
    {
      title: "Transaction Date",
      dataIndex: ["transaction", "date_time"],
      key: "date_time",
    },
    {
      title: "Payment Method",
      dataIndex: ["transaction", "method"],
      key: "method",
    },
    {
      title: "SP Code",
      dataIndex: ["transaction", "sp_code"],
      key: "sp_code",
    },
    {
      title: "SP Message",
      dataIndex: ["transaction", "sp_message"],
      key: "sp_message",
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        columns={columns}
        dataSource={CarData?.data || []}
        loading={isFetching}
        rowKey="_id"
        scroll={{ x: true }}
      />
    </div>
  );
};

export default ViewOrder;
