import { Card, Statistic, Spin, Typography } from "antd";
import { useOrderRevenueQuery } from "../../../../redux/features/bikes/bikesManagement";

const { Title, Paragraph } = Typography;

const CalculateRevenue = () => {
  const { data: CarData, isFetching } = useOrderRevenueQuery(undefined);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 p-6 text-center">
      <div className="max-w-lg w-full text-white">
        <Title level={2} className="text-white font-bold drop-shadow-lg">
          🚴‍♂️ Bike Shop Revenue Dashboard 💰
        </Title>
        <Paragraph className="text-lg text-gray-200">
          Welcome to our Bike Shop! Here you can track the **total revenue** 
          generated from sales. Stay updated with the latest figures and make 
          informed business decisions.
        </Paragraph>
      </div>

      <Card
        className="mt-6 w-80 shadow-lg rounded-2xl border-none bg-white transform transition hover:scale-105"
        style={{
          background: "linear-gradient(135deg, #ffffff, #f3f4f6)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        {isFetching ? (
          <div className="flex justify-center items-center h-24">
            <Spin size="large" />
          </div>
        ) : (
          <Statistic
            title="Total Revenue"
            value={CarData?.data?.totalRevenue || 0}
            prefix="$"
            precision={2}
            valueStyle={{
              color: "#16a34a",
              fontSize: "32px",
              fontWeight: "bold",
              textShadow: "0px 0px 8px rgba(22, 163, 74, 0.6)",
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default CalculateRevenue;
