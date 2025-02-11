/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useGetAllCarsQuery,
  useUpdateCarMutation,
} from "../../../../redux/features/bikes/bikesManagement";
import { Button, Table, Modal, Form, InputNumber, Card } from "antd";
import type { TTableData } from "../../../Allproduct";
import { toast } from "sonner";
const UpdateCar = () => {
  const [selectedCar, setSelectedCar] = useState<TTableData | null>(null);
  const [form] = Form.useForm();
  const [updateCar] = useUpdateCarMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleUpdateClick = (record: TTableData) => {
    setSelectedCar(record);
    form.setFieldsValue({
      price: record.price,
      quantity: record.quantity,
    });
    setIsModalVisible(true);
  };

  const handleUpdateSubmit = async (values: {
    price: number;
    quantity: number;
  }) => {
    if (selectedCar) {
      try {
        await updateCar({
          data: values,
          order_id: selectedCar.key,
        }).unwrap();
        toast.success("Bike updated successfully!");
        setIsModalVisible(false);
        setSelectedCar(null);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Update failed");
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
          className="transition-all duration-300 bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded-md shadow-md"
          onClick={() => handleUpdateClick(record)}
        >
          Update
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
          Update Bike
        </h1>
        <p className="text-gray-600 text-sm">Update Bike from here .</p>
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
                  textAlign: "center",
                }}
              />
            ),
          },
        }}
      />
      {/* <Modal
        title="Update Bike"
        // visible={isModalVisible}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateSubmit}>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber style={{ width: "100%" }} min={1} />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please input the quantity!" }]}
          >
            <InputNumber style={{ width: "100%" }} min={1} />
          </Form.Item>
        </Form>
      </Modal> */}
      <Modal
        title={
          <span className="text-lg font-semibold text-gray-700">
            Update Bike
          </span>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText="Save Changes"
        cancelText="Cancel"
        okButtonProps={{
          className: "bg-green-500 hover:bg-green-600 text-white font-semibold",
        }}
        cancelButtonProps={{ className: "hover:bg-gray-100" }}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdateSubmit}>
          <Form.Item
            label={<span className="font-medium text-gray-700">Price</span>}
            name="price"
            rules={[{ required: true, message: "Please input the price!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              className="border-green-500 focus:border-green-600"
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-medium text-gray-700">Quantity</span>}
            name="quantity"
            rules={[{ required: true, message: "Please input the quantity!" }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              className="border-green-500 focus:border-green-600"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UpdateCar;
