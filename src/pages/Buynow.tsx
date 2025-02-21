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
  const { data: CarData, isFetching } = useGetSingleCarsQuery(id);
  const [addOrder] = useOrderCarMutation();
  const [quantity, setQuantity] = useState(1);
  const [form] = Form.useForm();

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

  const car = Array.isArray(CarData.data) ? CarData.data[0] : CarData.data;

  if (!car) {
    return <div className="text-center text-red-500">No car found</div>;
  }

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
      totalPrice: car.price * quantity,
    };

    try {
      const response = await addOrder(orderDetails).unwrap();
      
      if (!response?.data) {
        toast.error("Order creation failed");
        return;
      }

      // Direct redirect to Shurjopay URL
      const paymentUrl = response.data;
      // if (typeof paymentUrl === "string" && paymentUrl.startsWith("http")) {
      if (typeof paymentUrl === "string" && paymentUrl.startsWith("https")) {
        window.location.href = paymentUrl;
      } else {
        toast.error("Invalid payment URL received");
      }
    } catch (err) {
      toast.error("Order was not successful");
      console.error("Order error:", err);
    }
  };
  // Teal Color Palette
  const tealColors = {
    primary: "#0F766E", // Deep Teal
    secondary: "#14B8A6", // Bright Teal
    background: "#ECFDF5", // Light Teal
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen p-4"
      style={{
        background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      }}
    >
      <Card className="w-full max-w-2xl shadow-xl rounded-lg p-6">
        <Title level={2} className="text-center text-blue-600">
          Order Details
        </Title>

        <div className="mb-4 text-center">
          <Text strong className="block text-xl">
            {car.brand} {car.modelNumber}
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
              className="bg-teal-500 hover:bg-teal-700 text-white px-6 py-2 md:py-5 rounded-lg font-bold md:text-xl"
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
