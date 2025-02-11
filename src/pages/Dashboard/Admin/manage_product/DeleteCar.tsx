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
        toast.success("Car deleted successfully!");
        setIsDeleteModalVisible(false);
        setCarToDelete(null);
        await updateCar({
          order_id: values.carId,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Delete failed");
      }
    }
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

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-6">
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
          Delete Bike
        </h1>
        <p className="text-gray-600 text-sm">Delete Bike .</p>
      </Card>

      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        scroll={{ x: 800 }}
        rowKey="key"
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
                  // textAlign: "center",
                }}
              />
            ),
          },
        }}
      />
      <Modal
        title="Confirm Deletion"
        open={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={() => form.submit()}
        okText="Yes, Delete"
        cancelText="No, Cancel"
      >
        <Form form={form} layout="vertical" onFinish={handleDeleteSubmit}>
          <Form.Item name="carId" initialValue={carToDelete?.key} hidden>
            <input type="hidden" />
          </Form.Item>
          <p>Are you sure you want to delete this car?</p>
        </Form>
      </Modal>
    </div>
  );
};

export default DeleteCar;
