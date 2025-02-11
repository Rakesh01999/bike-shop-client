import { useState } from "react";
import { Typography, Spin, Button, Rate } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useGetSingleCarsQuery } from "../redux/features/bikes/bikesManagement";
import { ShoppingCart, Heart, Share2, ChevronRight } from "lucide-react";
import type { Bike } from "../types";

const { Title, Text } = Typography;

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: CarData, isFetching } = useGetSingleCarsQuery(id);
  const [isWishlist, setIsWishlist] = useState(false);

  if (isFetching) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Spin size="large" />
      </div>
    );
  }

  if (!CarData || !CarData.data) {
    return <div className="text-center">No data available</div>;
  }

  const car = Array.isArray(CarData.data)
    ? CarData.data[0]
    : (CarData.data as Bike);

  if (!car) {
    return <div className="text-center">No bike found</div>;
  }

  const handleBuyNow = () => {
    navigate(`/checkout/${car?._id}`);
  };

  // Teal Color Palette
  const tealColors = {
    primary: "#0F766E", // Deep Teal
    secondary: "#14B8A6", // Bright Teal
    background: "#ECFDF5", // Light Teal
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-12 px-4"
      style={{
        background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-gray-600">
          <span>Home</span>
          <ChevronRight size={16} />
          <span>All Products</span>
          <ChevronRight size={16} />
          <span className="text-blue-600">{car?.brand}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <img
                alt={car?.brand}
                src={car?.image}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <Title level={1} className="text-3xl font-bold m-0">
                {car?.brand} {car?.modelNumber}
              </Title>

              <div className="flex items-center gap-4">
                <Rate disabled defaultValue={4.5} className="text-yellow-400" />
                <span className="text-gray-500">(150 Reviews)</span>
              </div>

              <div className="flex items-baseline gap-4">
                <Text className="text-4xl font-bold text-blue-600">
                  ${car?.price}
                </Text>
                <Text className="text-lg text-gray-500 line-through">
                  ${(car?.price * 1.2).toFixed(2)}
                </Text>
                <Text className="text-green-500 font-semibold">20% OFF</Text>
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="space-y-4">
              <div>
                <Text strong className="text-lg block mb-2">
                  Category
                </Text>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-gray-700">
                  {car?.category}
                </span>
              </div>

              <div>
                <Text strong className="text-lg block mb-2">
                  Description
                </Text>
                <Text className="text-gray-600 leading-relaxed">
                  {car?.description}
                </Text>
              </div>

              <div>
                <Text strong className="text-lg block mb-2">
                  Stock Status
                </Text>
                <span
                  className={`px-4 py-2 rounded-full ${
                    car?.quantity
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {car?.quantity ? `${car.quantity} Available` : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="flex gap-4">
              <Button
                type="primary"
                size="large"
                onClick={handleBuyNow}
                className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 border-none flex items-center justify-center gap-2"
                icon={<ShoppingCart className="w-5 h-5" />}
                disabled={!car?.quantity}
              >
                Buy Now
              </Button>

              <Button
                size="large"
                onClick={() => setIsWishlist(!isWishlist)}
                className={`h-12 w-12 flex items-center justify-center ${
                  isWishlist ? "text-red-500" : "text-gray-500"
                }`}
                icon={
                  <Heart
                    className="w-5 h-5"
                    fill={isWishlist ? "currentColor" : "none"}
                  />
                }
              />

              <Button
                size="large"
                className="h-12 w-12 flex items-center justify-center text-gray-500"
                icon={<Share2 className="w-5 h-5" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
