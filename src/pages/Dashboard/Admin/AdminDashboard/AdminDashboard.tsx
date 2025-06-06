import { Typography } from "antd";
import {
  useAlluserQuery,
  useGetAllCarsQuery,
  useGetAllOrdersQuery,
  useOrderRevenueQuery,
} from "../../../../redux/features/bikes/bikesManagement";
import { useState, useMemo } from "react";
import { TQueryParam } from "../../../../types";
import { Bike } from "../../../../types/bikes"; // Import your existing Bike type
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  ShoppingCart,
  Package,
  DollarSign,
  TrendingUp,
  Activity,
  LucideIcon,
} from "lucide-react";

const { Title, Paragraph } = Typography;

// Type definitions
interface TMeta {
  total: number;
  page: number;
  limit: number;
}

interface CarDataResponse {
  data: Bike[] | undefined;
  meta: TMeta | undefined;
}

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  color: string;
  bgColor: string;
  isLoading?: boolean;
}

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface BrandData {
  brand: string;
  products: number;
  avgPrice: number;
  totalValue: number;
}

const AdminDashboard = () => {
  const [params] = useState<TQueryParam[] | undefined>(undefined);
  const [pagination] = useState({ current: 1, pageSize: 20 });

  const { data: Alluser } = useAlluserQuery(undefined);
  const { data: CarData, isFetching } = useGetAllCarsQuery([
    ...(params || []),
    { name: "page", value: pagination.current.toString() },
    { name: "limit", value: pagination.pageSize.toString() },
  ]);
  const { data: orderData } = useGetAllOrdersQuery(undefined);
  const { data: RevenueData } = useOrderRevenueQuery(undefined);

  // Helper function to get bikes array from response
  const getBikesArray = (carData: CarDataResponse | undefined): Bike[] => {
    if (!carData?.data) return [];

    // Handle case where data is directly an array
    if (Array.isArray(carData.data)) {
      return carData.data;
    }

    return [];
  };

  // Extract dynamic data
  const totalUsers = Alluser?.data?.length || 0;
  const bikes = getBikesArray(CarData);
  const totalProducts = bikes.length;
  const totalOrders = orderData?.data?.length || 0;
  const totalRevenue = RevenueData?.data?.totalRevenue || 0;

  // Dynamic chart data from your bike products
  const categoryChartData = useMemo((): ChartData[] => {
    if (bikes.length === 0) return [];

    const categoryCount: { [key: string]: number } = {};

    bikes.forEach((bike: Bike) => {
      const category = bike.category || "Unknown";
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    const colors = [
      "#8884d8",
      "#82ca9d",
      "#ffc658",
      "#ff7c7c",
      "#8dd1e1",
      "#ffb347",
      "#98fb98",
    ];

    return Object.entries(categoryCount).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  }, [bikes]);

  // Brand distribution for bar chart
  const brandChartData = useMemo((): BrandData[] => {
    if (bikes.length === 0) return [];

    const brandStats: { [key: string]: { count: number; totalPrice: number } } =
      {};

    bikes.forEach((bike: Bike) => {
      const brand = bike.brand || "Unknown";
      if (!brandStats[brand]) {
        brandStats[brand] = { count: 0, totalPrice: 0 };
      }
      brandStats[brand].count += 1;
      brandStats[brand].totalPrice += bike.price || 0;
    });

    return Object.entries(brandStats).map(([brand, stats]) => ({
      brand,
      products: stats.count,
      avgPrice: Math.round(stats.totalPrice / stats.count),
      totalValue: stats.totalPrice,
    }));
  }, [bikes]);

  // Stock status data
  const stockStatusData = useMemo((): ChartData[] => {
    if (bikes.length === 0) return [];

    let inStock = 0;
    let lowStock = 0;
    let outOfStock = 0;

    bikes.forEach((bike: Bike) => {
      const quantity = bike.quantity || 0;
      if (quantity === 0) {
        outOfStock++;
      } else if (quantity < 5) {
        lowStock++;
      } else {
        inStock++;
      }
    });

    return [
      { name: "In Stock", value: inStock, color: "#10b981" },
      { name: "Low Stock", value: lowStock, color: "#f59e0b" },
      { name: "Out of Stock", value: outOfStock, color: "#ef4444" },
    ].filter((item) => item.value > 0);
  }, [bikes]);

  const StatCard = ({
    icon: Icon,
    title,
    value,
    color,
    bgColor,
    isLoading = false,
  }: StatCardProps) => (
    <div
      className={`${bgColor} rounded-xl p-4 sm:p-6 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">
            {title}
          </p>
          <p
            className={`${color} text-xl sm:text-2xl lg:text-3xl font-bold mt-1 sm:mt-2`}
          >
            {isLoading ? "..." : value}
          </p>
        </div>
        <div
          className={`${color
            .replace("text-", "bg-")
            .replace(
              "-600",
              "-100"
            )} p-2 sm:p-3 rounded-full flex-shrink-0 ml-2`}
        >
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  if (isFetching) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-teal-100 to-teal-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 sm:h-24 sm:w-24 lg:h-32 lg:w-32 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <Title
            level={3}
            className="text-gray-600 text-lg sm:text-xl lg:text-2xl"
          >
            Loading Dashboard...
          </Title>
        </div>
      </div>
    );
  }

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 lg:p-6">
    <div className="min-h-screen p-3 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <Title
            level={1}
            className="text-gray-800 font-bold mb-2 sm:mb-4 md:text-2xl sm:text-xl lg:text-4xl"
          >
            <span className="text-teal-700 md:text-3xl text-2xl lg:text-4xl">Admin Dashboard</span>
          </Title>
          <Paragraph className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {/* Real-time insights from your Bike Shop. All data is dynamically
            loaded from your database. */}
          </Paragraph>
        </div>

        {/* Dynamic Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <StatCard
            icon={Users}
            title="Total Users"
            value={totalUsers}
            color="text-blue-600"
            bgColor="bg-white"
          />
          <StatCard
            icon={ShoppingCart}
            title="Total Orders"
            value={totalOrders}
            color="text-green-600"
            bgColor="bg-white"
          />
          <StatCard
            icon={Package}
            title="Total Products"
            value={totalProducts}
            color="text-purple-600"
            bgColor="bg-white"
          />
          <StatCard
            icon={DollarSign}
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            color="text-emerald-600"
            bgColor="bg-white"
          />
        </div>

        {/* Dynamic Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {/* Brand Distribution Bar Chart */}
          {brandChartData.length > 0 && (
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mr-2 sm:mr-3 flex-shrink-0" />
                <Title
                  level={3}
                  className="text-gray-800 m-0 text-lg sm:text-xl lg:text-2xl"
                >
                  📈 Brand Distribution
                </Title>
              </div>
              <div className="w-full overflow-hidden">
                <ResponsiveContainer width="100%" height={250} minHeight={200}>
                  <BarChart
                    data={brandChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="brand"
                      stroke="#666"
                      fontSize={10}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      interval={0}
                    />
                    <YAxis stroke="#666" fontSize={10} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        fontSize: "12px",
                      }}
                      formatter={(value, name) => {
                        if (name === "products")
                          return [`${value} Products`, "Product Count"];
                        if (name === "avgPrice")
                          return [`$${value}`, "Average Price"];
                        return [value, name];
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "12px" }} />
                    <Bar
                      dataKey="products"
                      fill="#3b82f6"
                      name="Products"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Category Distribution Pie Chart */}
          {categoryChartData.length > 0 && (
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6">
                <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mr-2 sm:mr-3 flex-shrink-0" />
                <Title
                  level={3}
                  className="text-gray-800 m-0 text-lg sm:text-xl lg:text-2xl"
                >
                  🏍️ Product Categories
                </Title>
              </div>
              <div className="w-full overflow-hidden">
                <ResponsiveContainer width="100%" height={250} minHeight={200}>
                  <PieChart>
                    <Pie
                      data={categoryChartData}
                      cx="50%"
                      cy="45%"
                      outerRadius={80}
                      innerRadius={30}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        fontSize: "12px",
                      }}
                      formatter={(value) => [`${value} Products`, "Count"]}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      wrapperStyle={{ fontSize: "11px" }}
                      formatter={(value) => (
                        <span style={{ color: "#666" }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Stock Status Chart */}
        {stockStatusData.length > 0 && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
              <div className="flex items-center mb-4 sm:mb-6">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600 mr-2 sm:mr-3 flex-shrink-0" />
                <Title
                  level={3}
                  className="text-gray-800 m-0 text-lg sm:text-xl lg:text-2xl"
                >
                  📦 Stock Status
                </Title>
              </div>
              <div className="w-full overflow-hidden">
                <ResponsiveContainer width="100%" height={250} minHeight={200}>
                  <PieChart>
                    <Pie
                      data={stockStatusData}
                      cx="50%"
                      cy="45%"
                      outerRadius={80}
                      innerRadius={40}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {stockStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        fontSize: "12px",
                      }}
                      formatter={(value) => [`${value} Products`, "Count"]}
                    />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      wrapperStyle={{ fontSize: "11px" }}
                      formatter={(value) => (
                        <span style={{ color: "#666" }}>{value}</span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Brand Price Analysis */}
            {brandChartData.length > 0 && (
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg">
                <div className="flex items-center mb-4 sm:mb-6">
                  <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mr-2 sm:mr-3 flex-shrink-0" />
                  <Title
                    level={3}
                    className="text-gray-800 m-0 text-lg sm:text-xl lg:text-2xl"
                  >
                    💰 Brand Price Analysis
                  </Title>
                </div>
                <div className="w-full overflow-hidden">
                  <ResponsiveContainer
                    width="100%"
                    height={250}
                    minHeight={200}
                  >
                    <BarChart
                      data={brandChartData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="brand"
                        stroke="#666"
                        fontSize={10}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval={0}
                      />
                      <YAxis stroke="#666" fontSize={10} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          fontSize: "12px",
                        }}
                        formatter={(value) => [
                          `$${value?.toLocaleString()}`,
                          "Average Price",
                        ]}
                      />
                      <Bar
                        dataKey="avgPrice"
                        fill="#10b981"
                        name="Average Price"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Data Summary */}
        {/* <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-4 sm:p-6 text-white mb-6 sm:mb-8"> */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl p-4 sm:p-6 text-white mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <Title
                level={3}
                className="text-white m-0 mb-2 text-lg sm:text-xl lg:text-2xl"
              >
                🎯 Live Data Summary
              </Title>
              <Paragraph className="text-white text-sm sm:text-base mb-0">
                All statistics and charts are generated from your live database.
                {totalProducts > 0 &&
                  ` Currently tracking ${totalProducts} products across ${categoryChartData.length} categories.`}
              </Paragraph>
            </div>
            <div className="flex gap-3 sm:gap-4">
              {totalProducts > 0 && (
                <div className="bg-white bg-opacity-20 rounded-lg p-3 sm:p-4 text-center flex-1 sm:flex-none">
                  <p className="text-xs sm:text-sm text-white">Brands</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                    {brandChartData.length}
                  </p>
                </div>
              )}
              {totalUsers > 0 && (
                <div className="bg-white bg-opacity-20 rounded-lg p-3 sm:p-4 text-center flex-1 sm:flex-none">
                  <p className="text-xs sm:text-sm text-white">Active Users</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                    {totalUsers}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* No Data Message */}
        {totalProducts === 0 && totalUsers === 0 && totalOrders === 0 && (
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-lg text-center">
            <Title
              level={3}
              className="text-gray-600 mb-4 text-lg sm:text-xl lg:text-2xl"
            >
              📊 No Data Available
            </Title>
            <Paragraph className="text-gray-500 text-sm sm:text-base">
              Your dashboard will display dynamic charts and statistics once you
              have:
            </Paragraph>
            <ul className="text-gray-500 text-sm sm:text-base text-left max-w-md mx-auto mt-4 space-y-1">
              <li>• Products in your inventory</li>
              <li>• Registered users</li>
              <li>• Customer orders</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
