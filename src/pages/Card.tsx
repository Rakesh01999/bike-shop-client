import {
  // Card as AntCard,
  Button,
  Spin,
  Tag,
} from "antd";
import {
  // TagOutlined,
  CarOutlined,
  DollarOutlined,
  // AppstoreAddOutlined,
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
      className="flex flex-col items-center px-5 "
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-8xl mx-auto">
          {/* Adjusted grid columns and max-width for better responsiveness */}
          {displayedCars?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2" // Applied modern card styling
              onClick={() => navigateToProduct(product._id)}
              style={{
                border: `1px solid ${tealColors.secondary}`, // Added border with teal color
              }}
            >
              <div className="relative">
                <img
                  alt={product.modelNumber}
                  src={product.image}
                  className="w-full h-48 object-cover rounded-t-xl" // Rounded top corners
                />
                <div className="absolute top-4 left-4">
                  <Tag className="bg-teal-200 text-teal-800 border-teal-600 font-semibold text-xs px-3 py-1 rounded-full">
                    {/* Styled category tag */}
                    {product.category}
                  </Tag>
                </div>
              </div>

              <div className="p-5 space-y-3">
                {/* Added padding and spacing */}
                <h3 className="text-lg font-bold text-teal-700 line-clamp-1">
                  {/* Styled title */}
                  {product.modelNumber}
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  {/* Details section */}
                  <p className="flex items-center">
                    <CarOutlined className="text-teal-600 mr-2" />
                    <strong>Brand:</strong>{" "}
                    <span className="ml-1">{product.brand}</span>
                  </p>
                  <p className="flex items-center">
                    <DollarOutlined className="text-teal-600 mr-2" />
                    <strong>Price:</strong>{" "}
                    <span className="text-teal-700 font-semibold ml-1">
                      ${product.price?.toLocaleString()}
                    </span>
                  </p>
                  {/* Removed duplicate model line */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      {totalCars > 8 && (
        <div className="text-center mt-6">
          <Button
            // className="w-52 h-10 bg-teal-600 hover:bg-teal-700 text-white md:text-xl font-bold px-6 py-2 rounded-lg shadow-md transition-all"
            // className="w-56 h-12 bg-teal-600 hover:bg-teal-700 text-white text-lg font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
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
