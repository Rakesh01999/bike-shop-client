import { useNavigate } from "react-router-dom";
import { useGetAllCarsQuery } from "../redux/features/bikes/bikesManagement";
import { FaRoad } from "react-icons/fa";
import { MdElectricBolt } from "react-icons/md";
import { PiMountainsFill } from "react-icons/pi";
import { GiLevelThreeAdvanced } from "react-icons/gi";

const getCategoryIcon = (category: string) => {
  const lower = category.toLowerCase();
  if (lower.includes("road")) return <FaRoad className="text-teal-700 w-6 h-6" />;
  if (lower.includes("electric")) return <MdElectricBolt className="text-teal-700 w-6 h-6" />;
  if (lower.includes("mountain")) return <PiMountainsFill className="text-teal-700 w-6 h-6" />;
  if (lower.includes("hybrid") || lower.includes("pro")) return <GiLevelThreeAdvanced className="text-teal-700 w-6 h-6" />;
  return <FaRoad className="text-teal-700 w-6 h-6" />; // fallback
};

const Category = () => {
  const navigate = useNavigate();
  const { data: bikesData, isLoading } = useGetAllCarsQuery([]);

  const categories = [
    ...new Set(
      (bikesData?.data?.map((bike) => bike.category) || []).filter(Boolean)
    ),
  ] as string[];

  const handleFilteredNavigation = (type: string, value: string) => {
    navigate(`/allproduct?${type}=${value}`);
  };

  return (
    <div className="py-12 px-4 md:px-8 bg-gradient-to-r from-[#ECFDF5] to-[#A7F3D0]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-700 mb-2">
          Shop by Category
        </h2>
        <p className="text-gray-600 mb-10">
          Explore bikes tailored for every ride and lifestyle.
        </p>

        {isLoading ? (
          <p className="text-teal-600">Loading categories...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleFilteredNavigation("category", category)}
                className="flex flex-col items-center justify-center bg-white shadow-lg hover:shadow-xl rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-teal-50"
              >
                <div className="bg-teal-100 p-4 rounded-full mb-3">
                  {getCategoryIcon(category)}
                </div>
                <span className="text-sm font-medium text-gray-800 capitalize">
                  {category}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
