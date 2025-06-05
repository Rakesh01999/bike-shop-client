import { Card as AntCard, Button, Spin } from "antd";
import {
  TagOutlined,
  CarOutlined,
  DollarOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { useGetAllCarsQuery } from "../redux/features/bikes/bikesManagement";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const CustomCard = () => {
  const { data: cars, isFetching } = useGetAllCarsQuery(undefined);
  // const displayedCars = cars?.data?.slice(0, 6);
  const displayedCars = cars?.data?.slice(0, 8);

  const [totalCars, setTotalCars] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (cars?.data) {
      setTotalCars(cars.data.length);
    }
  }, [cars]);

  const handleViewAll = () => {
    navigate("/allproduct");
  };

  // Teal Theme Colors
  const tealColors = {
    primary: "#0F766E", // Deep Teal
    secondary: "#14B8A6", // Bright Teal
    background: "#ECFDF5", // Light Teal
  };
  const navigateToProduct = useCallback(
    (productId: string) => {
      navigate(`/products/${productId}`);
    },
    [navigate]
  );

  return (
    <div
      // className="min-h-screen flex flex-col items-center px-5 py-10"
      className="min-h-screen flex flex-col items-center px-5 "
      // style={{
      //   background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      // }}
    >
      {/* Title Section */}
      {/* <div className="text-center mb-6">
        <h2
          className="text-3xl font-bold text-teal-900"
        >
          Available Bikes
        </h2>
        <p className="text-gray-600 text-sm">
          Browse through our collection of high-quality bikes.
        </p>
      </div> */}

      {/* Loader while fetching */}
      {isFetching ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-8xl mx-auto">
          {displayedCars?.map((product) => (
            <AntCard
              key={product._id}
              hoverable
              className="rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
              onClick={() => navigateToProduct(product._id)}
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                border: `2px solid ${tealColors.secondary}`,
              }}
              cover={
                <img
                  alt={product.model}
                  src={product.image}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              }
            >
              <div className="space-y-2 text-sm">
                <p>
                  <CarOutlined className="text-teal-600" />{" "}
                  <strong>Brand:</strong> {product.brand}
                </p>
                <p>
                  <TagOutlined className="text-teal-600" />{" "}
                  <strong>Category:</strong> {product.category}
                </p>
                <p>
                  <DollarOutlined className="text-teal-600" />{" "}
                  <strong>Price:</strong>{" "}
                  <span className="text-teal-700 font-semibold">
                    ${product.price.toLocaleString()}
                  </span>
                </p>
                <p>
                  <AppstoreAddOutlined className="text-teal-600" />{" "}
                  <strong>Model:</strong> {product.modelNumber}
                </p>
              </div>
            </AntCard>
          ))}
        </div>
      )}

      {/* View All Button */}
      {totalCars > 8 && (
        <div className="text-center mt-6">
          <Button
            className="w-52 h-10 bg-teal-600 hover:bg-teal-700 text-white md:text-xl font-bold px-6 py-2 rounded-lg shadow-md transition-all"
            onClick={handleViewAll}
          >
            View All Bikes
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomCard;
