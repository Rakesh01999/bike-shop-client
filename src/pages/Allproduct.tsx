/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Bike, TQueryParam } from "../types";
import { useGetAllCarsQuery } from "../redux/features/bikes/bikesManagement";
import {
  Button,
  Input,
  Table,
  Pagination,
  type TableColumnsType,
  type TableProps,
  Card,
  Spin,
} from "antd";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import "./pagination.css";

export type TTableData = Pick<
  Bike,
  "price" | "model" | "brand" | "category" | "quantity"
> & { key: string };

const AllProduct = () => {
  const [params] = useState<TQueryParam[] | undefined>(undefined);
  // const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TTableData[]>([]);

  const navigate = useNavigate();

  const { data: CarData, isFetching } = useGetAllCarsQuery([
    ...(params || []),
    { name: "page", value: pagination.current.toString() },
    { name: "limit", value: pagination.pageSize.toString() },
  ]);

  const tableData: TTableData[] | undefined = CarData?.data?.map(
    ({ _id, price, modelNumber, brand, category, quantity }) => ({
      key: _id,
      price, // `price` as number
      model: modelNumber ?? "N/A",
      brand,
      category,
      quantity,
    })
  );

  // **Real-time Filtering on Search**
  useEffect(() => {
    if (searchTerm) {
      const filtered = tableData?.filter(
        (item) =>
          item.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered || []);
    } else {
      setFilteredData(tableData || []);
    }
  }, [searchTerm, CarData]);

  const columns: TableColumnsType<TTableData> = [
    { title: "Model", key: "model", dataIndex: "model" },
    { title: "Brand", key: "brand", dataIndex: "brand" },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      render: (price) => <span className="font-semibold text-green-600">${price.toLocaleString()}</span>, // ✅ Format only in UI
    },
    { title: "Category", key: "category", dataIndex: "category" },
    {
      title: "Stock",
      key: "quantity",
      dataIndex: "quantity",
      render: (qty) => (
        <span className={qty > 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
          {qty > 0 ? qty : "Out of Stock"}
        </span>
      ),
    },
    {
      title: "Action",
      key: "x",
      render: (record: TTableData) => (
        <Button
          onClick={() => navigate(`/products/${record.key}`)}
          className="transition-all duration-300 bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-3 rounded-md shadow-md"
        >
          View
        </Button>
      ),
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (paginationConfig) => {
    const { current, pageSize } = paginationConfig;
    setPagination({ current: current!, pageSize: pageSize! });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 🌿 Teal Theme
  const tealColors = {
    primary: "#0F766E", // Deep Teal
    secondary: "#14B8A6", // Bright Teal
    background: "#ECFDF5", // Light Teal
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center px-5 py-6"
      style={{
        background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      }}
    >
      {/* Title Card */}
      <Card
        className="w-full max-w-3xl text-center shadow-lg mb-6"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${tealColors.secondary}`,
        }}
      >
        <h1
          className="text-2xl font-semibold text-gray-800"
          style={{ color: tealColors.primary }}
        >
          Explore Our Bike Collection
        </h1>
        <p className="text-gray-600 text-sm">Find the perfect bike for your journey.</p>
      </Card>

      {/* Search Input */}
      <div className="w-full max-w-md mb-4">
        <Input
          placeholder="Search by brand, model, category"
          value={searchTerm}
          onChange={handleSearch}
          prefix={<SearchOutlined className="text-teal-500" />}
          className="w-full px-4 py-2 border-2 border-teal-500 focus:border-teal-700 rounded-xl transition-all"
        />
      </div>

      {/* Products Table */}
      <Card
        className="w-full max-w-6xl shadow-md"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${tealColors.secondary}`,
        }}
      >
        {isFetching ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            loading={isFetching}
            columns={columns.map((column) => ({
              ...column,
              align: "center", // Center-align all data
            }))}
            dataSource={filteredData} // Use filtered data
            pagination={false}
            onChange={onChange}
            scroll={{ x: "max-content" }}
            className="rounded-lg overflow-hidden"
            components={{
              header: {
                cell: (props: any) => (
                  <th
                    {...props}
                    style={{
                      ...props.style,
                      backgroundColor: tealColors.secondary, // Bright Teal header
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  />
                ),
              },
            }}
          />
        )}
      </Card>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={CarData?.meta?.total}
          showSizeChanger
          showQuickJumper
          responsive
          pageSizeOptions={["5", "10", "15", "20"]}
          onChange={(page, pageSize) => setPagination({ current: page, pageSize })}
          className="bg-white border border-teal-500 rounded-lg shadow-md px-3 py-1"
        />
      </div>
    </div>
  );
};

export default AllProduct;
