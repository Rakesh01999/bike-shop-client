/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Table, Modal, Form, Card } from "antd";
import { toast } from "sonner";
import { TTableData } from "../../../Allproduct";
import {
  useDeleteCarMutation,
  useGetAllCarsQuery,
} from "../../../../redux/features/bikes/bikesManagement";

const DeleteCar = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [carToDelete, setCarToDelete] = useState<TTableData | null>(null);
  const [form] = Form.useForm();
  const [updateCar] = useDeleteCarMutation();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: CarData, isFetching } = useGetAllCarsQuery([]);

  const tableData = CarData?.data?.map(
    ({ _id, price, modelNumber, brand, category, quantity }) => ({
      key: _id,
      price,
      model: modelNumber ?? "N/A",
      brand,
      category,
      quantity,
    })
  );

  const handleDeleteClick = (record: TTableData) => {
    setCarToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteSubmit = async (values: { carId: string }) => {
    if (values.carId) {
      try {
        await updateCar({
          order_id: values.carId,
        }).unwrap();
        toast.success("Car deleted successfully!");
        setIsDeleteModalVisible(false);
        setCarToDelete(null);
        
        // Check if current page becomes empty after deletion
        const totalItems = (tableData?.length || 0) - 1;
        const maxPage = Math.ceil(totalItems / pageSize);
        if (currentPage > maxPage && maxPage > 0) {
          setCurrentPage(maxPage);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  // Pagination change handlers
  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  const handlePageSizeChange = (_current: number, size: number) => {
    setCurrentPage(1); // Reset to first page when page size changes
    setPageSize(size);
  };

  const columns = [
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (record: TTableData) => (
        <Button
          onClick={() => handleDeleteClick(record)}
          style={{ marginLeft: 0 }}
          danger
          className="hover:bg-red-600 hover:border-red-600"
        >
          Delete
        </Button>
      ),
    },
  ];

  // Teal Theme
  const tealColors = {
    primary: "#0F766E", // Deep Teal
    secondary: "#14B8A6", // Bright Teal
    background: "#ECFDF5", // Light Teal
  };

  // Pagination configuration
  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: tableData?.length || 0,
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total} items`,
    pageSizeOptions: ['5', '10', '20', '50', '100'],
    onChange: handlePageChange,
    onShowSizeChange: handlePageSizeChange,
    style: {
      marginTop: '16px',
      textAlign: 'center' as const,
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-6">
      {/* Title Card */}
      <Card
        className="w-full max-w-3xl text-center bg-gray-100 mb-6"
        // className="w-full max-w-3xl text-center shadow-lg mb-6"
        // style={{
        //   background: "rgba(255, 255, 255, 0.9)",
        //   backdropFilter: "blur(10px)",
        //   border: `1px solid ${tealColors.secondary}`,
        // }}
      >
        <h1
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800"
          style={{ color: tealColors.primary }}
        >
          Delete Bike
        </h1>
        <p className="text-gray-600 text-sm">Delete Bike from here.</p>
      </Card>

      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        scroll={{ x: 800 }}
        rowKey="key"
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
      
      <Modal
        title={
          <span className="text-lg font-semibold text-red-600">
            Confirm Deletion
          </span>
        }
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={() => form.submit()}
        okText="Yes, Delete"
        cancelText="No, Cancel"
        okButtonProps={{
          className: "bg-red-500 hover:bg-red-600 text-white font-semibold",
          danger: true,
        }}
        cancelButtonProps={{ 
          className: "hover:bg-gray-100" 
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleDeleteSubmit}>
          <Form.Item name="carId" initialValue={carToDelete?.key} hidden>
            <input type="hidden" />
          </Form.Item>
          <div className="py-4">
            <p className="text-gray-700 mb-2">
              Are you sure you want to delete this bike?
            </p>
            {carToDelete && (
              <div className="bg-gray-50 p-3 rounded-md mt-3">
                <p className="text-sm">
                  <strong>Model:</strong> {carToDelete.model}
                </p>
                <p className="text-sm">
                  <strong>Brand:</strong> {carToDelete.brand}
                </p>
                <p className="text-sm">
                  <strong>Price:</strong> ${carToDelete.price?.toFixed(2)}
                </p>
              </div>
            )}
            <p className="text-red-600 text-sm mt-3 font-medium">
              This action cannot be undone.
            </p>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default DeleteCar;