/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Input, Table, Button, Tag, Tooltip, Slider, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetAllCarsQuery } from "../../../../redux/features/bikes/bikesManagement";
import type { TQueryParam } from "../../../../types";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
import type { TableColumnsType } from "antd";
import type { TTableData } from "../../../Allproduct";

const GetAllCar: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
  const [params, _setParams] = useState<TQueryParam[] | undefined>(undefined);
  
  // Pagination state - now functional
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TTableData[]>([]);

  // Price Range State (Default: 0 - 400,000)
  const [priceRange, setPriceRange] = useState<number[]>([0, 400000]);

  const navigate = useNavigate();

  const { data: CarData, isFetching } = useGetAllCarsQuery([
    ...(params || []),
    { name: "page", value: currentPage.toString() },
    { name: "limit", value: pageSize.toString() },
  ]);
  console.log("car data :", CarData);

  const tableData = CarData?.data?.map(
    ({ _id, price, modelNumber, brand, category, quantity, image }) => ({
      key: _id,
      price,
      model: modelNumber ?? "N/A",
      brand,
      category,
      quantity,
      image: image ?? "", // Add the missing image property with fallback
    })
  );

  // Real-time Filtering (Search + Price Range)
  useEffect(() => {
    if (tableData) {
      const filtered = tableData.filter((item) => {
        const isMatch =
          item.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase());

        // Apply price range filtering
        const isInPriceRange =
          item.price >= priceRange[0] && item.price <= priceRange[1];

        return isMatch && isInPriceRange;
      });

      setFilteredData(filtered);
      // Reset to first page when filters change
      if (currentPage > 1 && filtered.length <= (currentPage - 1) * pageSize) {
        setCurrentPage(1);
      }
    }
  }, [searchTerm, priceRange, CarData, currentPage, pageSize]);

  // Handle pagination changes
  const handleTableChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  // Handle search change (reset to first page)
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Handle price range change (reset to first page)
  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
    setCurrentPage(1);
  };

  const getColorForCategory = (category: string) => {
    const categoryColors: { [key: string]: string } = {
      Mountain: "green",
      Road: "blue",
      Hybrid: "purple",
      Electric: "cyan",
      Truck: "orange",
      SUV: "geekblue",
      Sedan: "magenta",
    };
    return categoryColors[category] || "default";
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
      render: (model) => (
        <Tooltip title={model}>
          <span className="font-semibold">{model}</span>
        </Tooltip>
      ),
      filters: Array.from(
        new Set((tableData || []).map((item) => item.model))
      ).map((model) => ({ text: model, value: model })),
      onFilter: (value, record) => record.model === value,
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      filters: Array.from(new Set(tableData?.map((item) => item.brand))).map(
        (brand) => ({ text: brand, value: brand })
      ),
      onFilter: (value, record) => record.brand === value,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => (
        <span className="text-green-600 font-bold">
          ${price.toLocaleString()}
        </span>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => (
        <Tag color={getColorForCategory(category)}>{category}</Tag>
      ),
      filters: [
        { text: "Mountain", value: "Mountain" },
        { text: "Road", value: "Road" },
        { text: "Hybrid", value: "Hybrid" },
        { text: "Electric", value: "Electric" },
      ],
    },
    {
      title: "Stock",
      dataIndex: "quantity",
      key: "quantity",
      filters: [
        { text: "In Stock", value: "inStock" },
        { text: "Out of Stock", value: "outStock" },
      ],
      onFilter: (value, record) =>
        value === "inStock" ? record.quantity > 0 : record.quantity === 0,
      render: (quantity) => (
        <Tag color={quantity > 0 ? "success" : "error"} className="font-medium">
          {quantity > 0 ? quantity : "Out of Stock"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
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

  // Pagination configuration
  const paginationConfig = {
    current: currentPage,
    pageSize: pageSize,
    total: filteredData.length, // Use filtered data length
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) =>
      `${range[0]}-${range[1]} of ${total} bikes`,
    pageSizeOptions: ['5', '10', '20', '50'],
    onChange: handleTableChange,
    onShowSizeChange: handleTableChange,
    style: {
      marginTop: '16px',
      textAlign: 'center' as const,
    },
    itemRender: (page: number, type: string, originalElement: React.ReactNode) => {
      if (type === 'prev') {
        return <span className="px-3 py-1 text-sm bg-teal-50 text-teal-600 rounded hover:bg-teal-100 cursor-pointer">Previous</span>;
      }
      if (type === 'next') {
        return <span className="px-3 py-1 text-sm bg-teal-50 text-teal-600 rounded hover:bg-teal-100 cursor-pointer">Next</span>;
      }
      return originalElement;
    },
  };

  const tealColors = {
    primary: "#0F766E", // Deep Teal
    secondary: "#14B8A6", // Bright Teal
    background: "#ECFDF5", // Light Teal
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="shadow-md rounded-lg p-6">
        <div className="flex flex-col items-center">
          <div className="flex justify-between items-center mb-6">
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
                Bike Inventory
              </h1>
              {/* Display filtered results count */}
              <div className="mt-2">
                <Tag color="blue" className="text-sm">
                  {filteredData.length} {filteredData.length === 1 ? 'bike' : 'bikes'} found
                  {(searchTerm || priceRange[0] > 0 || priceRange[1] < 400000) && ' (filtered)'}
                </Tag>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Search Input */}
        <div className="mb-6 flex flex-wrap gap-4 justify-between">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by brand, model, or category"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full md:w-80"
            size="large"
            allowClear
          />

          {/* Price Range Filter */}
          <div className="flex flex-col bg-white rounded-xl p-4 shadow-sm">
            <span className="text-lg font-semibold text-gray-600 mb-2">
              Price Range: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
            </span>
            <Slider
              range
              min={0}
              max={400000}
              step={500}
              value={priceRange}
              onChange={handlePriceRangeChange}
              className="w-full md:w-80"
              tooltip={{ formatter: (value) => `$${value?.toLocaleString()}` }}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>$0</span>
              <span>$400,000</span>
            </div>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          loading={isFetching}
          pagination={paginationConfig}
          scroll={{ x: 800 }}
          className="shadow-sm"
          rowClassName={(record) => (record.quantity === 0 ? "bg-red-50" : "")}
          components={{
            header: {
              cell: (props: any) => (
                <th
                  {...props}
                  style={{
                    ...props.style,
                    backgroundColor: tealColors.secondary,
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                />
              ),
            },
          }}
        />
      </div>
    </div>
  );
};

export default GetAllCar;