import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetSingleCarsQuery,
  useOrderCarMutation,
} from "../redux/features/bikes/bikesManagement";
import { Spin, Input, Button, Card, Typography, Form } from "antd";
import { toast } from "sonner";

const { Title, Text } = Typography;

const Buynow = () => {
  const { id } = useParams();
  const { data: CarData, isFetching } = useGetSingleCarsQuery(id); // ✅ Correct ID usage

  const [addOrder] = useOrderCarMutation();
  const [quantity, setQuantity] = useState(1);
  const [form] = Form.useForm();

  // ✅ Check if data exists and correctly format it
  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!CarData || !CarData.data) {
    return <div className="text-center text-red-500">No data available</div>;
  }

  const car = Array.isArray(CarData.data) ? CarData.data[0] : CarData.data; // ✅ Handle object & array cases

  if (!car) {
    return <div className="text-center text-red-500">No car found</div>;
  }

  // ✅ Fix the function signature and ensure 'values' has correct types
  const handleOrderSubmit = async (values: {
    email: string;
    name: string;
    phone: string;
    address: string;
  }) => {
    if (quantity > car.quantity) {
      toast.error("Ordered quantity exceeds available stock!");
      return;
    }

    const orderDetails = {
      email: values.email,
      name: values.name,
      phone_number: values.phone,
      address: values.address,
      car: car._id,
      quantity: quantity,
      totalPrice: car.price * quantity, // ✅ Calculate total price correctly
    };

    try {
      const res = await addOrder(orderDetails).unwrap(); // ✅ Use `.unwrap()` to handle API errors

      if (!res || !res.data) {
        toast.error("Order is not created successfully");
        return;
      }

      window.location.href = res.data[1]; // ✅ Ensure correct response handling
      toast.success("Order placed successfully!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Order was not successful");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-2xl shadow-xl rounded-lg p-6">
        <Title level={2} className="text-center text-blue-600">
          Order Details
        </Title>

        <div className="mb-4 text-center">
          <Text strong className="block text-xl">
            {car.brand} {car.modelNumber}{" "}
            {/* ✅ Ensure correct property name */}
          </Text>
          <Text strong className="block text-lg text-green-600">
            ${car.price} per unit
          </Text>
          <Text strong className="block text-md">
            Available Stock: {car.quantity}
          </Text>
        </div>

        <Form form={form} layout="vertical" onFinish={handleOrderSubmit}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Enter your shipping address"
            />
          </Form.Item>

          <Form.Item label="Quantity">
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </Form.Item>

          <Text strong className="block text-lg">
            Total Price:{" "}
            <span className="text-green-600">${car.price * quantity}</span>
          </Text>

          <div className="flex justify-center mt-4">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Order Now
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Buynow;
