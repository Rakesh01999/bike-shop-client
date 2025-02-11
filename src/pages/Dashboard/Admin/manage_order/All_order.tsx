import { Table } from "antd";
import { useGetAllOrdersQuery } from "../../../../redux/features/bikes/bikesManagement";

const All_order = () => {
  const { data: orderData, isFetching, isError, error } = useGetAllOrdersQuery(undefined);
  console.log(orderData);
  if (isError) {
    console.error('Error fetching orders:', error);
    return <div>Error loading orders. Please try again later.</div>;
  }

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Product ID",
      dataIndex: "product",
      key: "product",
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
      title: "Transaction ID",
      dataIndex: ["transaction", "id"],
      key: "transactionId",
    },
    {
      title: "Transaction Status",
      // dataIndex: ["transaction", "transactionStatus"],
      dataIndex: ["transaction", "bank_status"],
      key: "transactionStatus",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div style={{ overflowX: "auto" }}>
      <Table
        columns={columns}
        dataSource={orderData?.data || []}
        loading={isFetching}
        rowKey="_id"
        scroll={{ x: true }}
        pagination={{
          total: orderData?.meta?.total,
          pageSize: orderData?.meta?.limit,
          current: orderData?.meta?.page,
          // total: orderData?.meta?.total,
        }}
      />
    </div>
  );
};

export default All_order;