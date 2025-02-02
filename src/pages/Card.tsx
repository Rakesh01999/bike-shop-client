import { Card as AntCard, Row, Col, Button } from "antd";
import {
  TagOutlined,
  CarOutlined,
  DollarOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { useGetAllCarsQuery } from "../redux/features/bikes/bikesManagement";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const CustomCard = () => {
  const { data: cars, isFetching } = useGetAllCarsQuery(undefined);
  const displayedCars = cars?.data?.slice(0, 6);

  const [totalCars, setTotalCars] = useState<number>(0);

  useEffect(() => {
    if (cars?.data) {
      setTotalCars(cars.data.length);
    }
  }, [cars]);

  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/allproduct');
  };

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h2 style={{ margin: "0", fontSize: "24px", fontWeight: "bold" }}>
          Available Cars
        </h2>
        <p style={{ margin: "0", fontSize: "16px", color: "#555" }}>
          Browse through our collection of cars. Find your perfect match!
        </p>
      </div>
      <Row
        gutter={[16, 16]}
        justify="start"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
        }}
      >
        {displayedCars?.map((product) => (
          <Col key={product._id}>
            <AntCard
              style={{
                width: "100%",
                border: "2px solid #4CAF50",
                borderRadius: "8px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
              loading={isFetching}
              cover={
                <img
                  alt={product.model}
                  src={product.image}
                  style={{ width: "100%", height: "auto" }}
                />
              }
            >
              <div className="space-y-2">
                <p>
                  <CarOutlined /> <strong>Brand:</strong> {product.brand}
                </p>
                <p>
                  <TagOutlined /> <strong>Category:</strong> {product.category}
                </p>
                <p>
                  <DollarOutlined /> <strong>Price:</strong> ${product.price}
                </p>
                <p>
                  <AppstoreAddOutlined /> <strong>Model:</strong>{" "}
                  {product.model}
                </p>
              </div>
            </AntCard>
          </Col>
        ))}
      </Row>

      {totalCars > 6 && (
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Button type="primary" onClick={handleViewAll}>View All</Button>
        </div>
      )}

     {/* Extra section */}



    </div>
  );
};

export default CustomCard;
