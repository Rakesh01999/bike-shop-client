import React, { useEffect, useState } from "react";
import { Input, Table, Button, Tag, Tooltip, Dropdown, Menu } from "antd";
import {
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useGetAllCarsQuery } from "../../../../redux/features/bikes/bikesManagement";
import type { TQueryParam } from "../../../../types";
import { useNavigate } from "react-router-dom";
import type { TableColumnsType, TableProps } from "antd";
import type { TTableData } from "../../../Allproduct";

const GetAllCar: React.FC = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  // const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<TTableData[]>([]);

  const navigate = useNavigate();

  const { data: CarData, isFetching } = useGetAllCarsQuery([
    ...(params || []),
    { name: "page", value: pagination.current.toString() },
    { name: "limit", value: pagination.pageSize.toString() },
    // { name: "searchTerm", value: searchTerm },
  ]);
  console.log("car data :", CarData);

  const tableData = CarData?.data?.map(
    ({ _id, price, modelNumber, brand, category, quantity }) => ({
      key: _id,
      price,
      model: modelNumber ?? "N/A",
      modelNumber,
      brand,
      category,
      quantity,
    })
  );

  // Real-time Filtering for Search
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
      // filters: Array.from(new Set(tableData?.map((item) => item.brand))).map(
      filters: Array.from(
        new Set((tableData || []).map((item) => item.brand))
      ).map((brand) => ({ text: brand, value: brand })),
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
    // {
    //   title: 'Quantity',
    //   dataIndex: 'quantity',
    //   key: 'quantity',
    //   render: (quantity) => (
    //     <Tag
    //       color={quantity > 0 ? 'success' : 'error'}
    //       className="font-medium"
    //     >
    //       {quantity}
    //     </Tag>
    //   ),
    // },
    {
      title: "Stock",
      dataIndex: "quantity",
      key: "quantity",
      filters: [
        { text: "In Stock", value: "inStock" },
        { text: "Out of Stock", value: "outStock" },
      ],
      // onFilter: (value, record) =>
      //   value === "inStock" ? record.quantity > 0 : record.quantity === 0,
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
        <Dropdown
          overlay={
            // menu={
            <Menu>
              <Menu.Item
                key="view"
                icon={<EyeOutlined />}
                onClick={() => navigate(`/products/${record.key}`)}
              >
                View Details
              </Menu.Item>
              <Menu.Item
                key="edit"
                icon={<FilterOutlined />}
                // onClick={() => navigate(`/edit-product/${record.key}`)}
                onClick={() => navigate(`/update_bike`)}
              >
                Edit Product
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button type="text">
            <MoreOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    paginationConfig,
    filters,
    _sorter,
    extra
  ) => {
    const { current, pageSize } = paginationConfig;

    if (extra.action === "paginate") {
      setPagination({
        current: current!,
        pageSize: pageSize!,
      });
    }

    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      Object.keys(filters).forEach((key) => {
        filters[key]?.forEach((item) =>
          queryParams.push({ name: key, value: item })
        );
      });

      setParams(queryParams);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className=" shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Bike Inventory</h1>
          <Button
            type="primary"
            onClick={() => navigate("create_bike")}
            className="bg-green-500 hover:bg-green-600"
          >
            Add New Bike
          </Button>
        </div>

        {/*  Search Input */}
        <div className="mb-6 flex items-center">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search by brand, model, or category"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96"
            size="large"
          />
        </div>

        <Table
          columns={columns}
          // dataSource={tableData}
          dataSource={filteredData}
          loading={isFetching}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: CarData?.meta?.total,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10", "20", "50"],
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} bikes`,
          }}
          onChange={onChange}
          scroll={{ x: 800 }}
          className="shadow-sm"
          rowClassName={(record) => (record.quantity === 0 ? "bg-red-50" : "")}
        />
      </div>
    </div>
  );
};

export default GetAllCar;
