import { Card, Statistic, Spin, Typography } from "antd";
import { useOrderRevenueQuery } from "../../../../redux/features/bikes/bikesManagement";

const { Title, Paragraph } = Typography;

const Calculate_revenue = () => {
  const { data: CarData, isFetching } = useOrderRevenueQuery(undefined);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        textAlign: "center",
        marginBottom: "100px",
      }}
    >
      <Title level={2}>Car Shop Revenue Dashboard</Title>
      <Paragraph style={{ maxWidth: "500px" }}>
        Welcome to our Car Shop! Here you can track the total revenue generated
        from sales. Stay updated with the latest figures and make informed
        business decisions.
      </Paragraph>
      <Card
        style={{
          width: 300,
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          marginTop: "10px",
        }}
      >
        {isFetching ? (
          <Spin size="large" />
        ) : (
          <Statistic
            title="Total Revenue"
            value={CarData?.data?.totalRevenue || 0}
            prefix="$"
            precision={5}
            valueStyle={{ color: "#3f8600", fontSize: "24px" }}
          />
        )}
      </Card>
    </div>
  );
};

export default Calculate_revenue;
