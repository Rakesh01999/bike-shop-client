import { useState } from "react";
import { useGetAllCarsQuery } from "../../../../redux/features/bikes/bikesManagement";
import type { TQueryParam } from "../../../../types";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Table,
  type TableColumnsType,
  type TableProps,
} from "antd";
import type { TTableData } from "../../../Allproduct";

const GetAllCar = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState<string>("");

  const navigate = useNavigate();

  const { data: CarData, isFetching } = useGetAllCarsQuery([
    ...(params || []),
    { name: "page", value: pagination.current.toString() },
    { name: "limit", value: pagination.pageSize.toString() },
    { name: "searchTerm", value: searchTerm },
  ]);
  const tableData = CarData?.data?.map(
    // ({ _id, price, model, modelNumber, brand, category, quantity }) => ({
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

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Model",
      key: "model",
      dataIndex: "model",
      filters: [
        { text: "1500", value: "1500" },
        { text: "Rogue", value: "Rogue" },
        { text: "A6", value: "A6" },
        { text: "SL-Class", value: "SL-Class" },
        { text: "M4", value: "M4" },
        { text: "Silverado", value: "Silverado" },
        { text: "Explorer", value: "Explorer" },
        { text: "Civic", value: "Civic" },
      ],
    },
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
      filters: [
        { text: "Ram", value: "Ram" },
        { text: "Nissan", value: "Nissan" },
        { text: "Audi", value: "Audi" },
        { text: "Mercedes-Benz", value: "Mercedes-Benz" },
        { text: "BMW", value: "BMW" },
        { text: "Chevrolet", value: "Chevrolet" },
        { text: "Ford", value: "Ford" },
        { text: "Honda", value: "Honda" },
      ],
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
      filters: [
        { text: "42000", value: 42000 },
        { text: "42000", value: 42000 },
        { text: "42000", value: 42000 },
        { text: "35000", value: 35000 },
        { text: "50000", value: 50000 },
        { text: "90000", value: 90000 },
        { text: "75000", value: 75000 },
        { text: "40000", value: 40000 },
        { text: "35000", value: 35000 },
        { text: "22000", value: 22000 },
      ],
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      filters: [
        { text: "Truck", value: "Truck" },
        { text: "Truck", value: "Truck" },
        { text: "Truck", value: "Truck" },
        { text: "SUV", value: "SUV" },
        { text: "Sedan", value: "Sedan" },
        { text: "Convertible", value: "Convertible" },
        { text: "Coupe", value: "Coupe" },
        { text: "Truck", value: "Truck" },
        { text: "SUV", value: "SUV" },
        { text: "Sedan", value: "Sedan" },
      ],
    },
    {
      title: "Quantity",
      key: "quantity",
      dataIndex: "quantity",
    },
    {
      title: "Action",
      key: "x",
      render: (record: TTableData) => (
        // <Button onClick={() => navigate(`/car-detail/${record.key}`)}>
        <Button onClick={() => navigate(`/products/${record.key}`)}>
          View
        </Button>
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
      setPagination({ current: current!, pageSize: pageSize! });
    }

    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.model?.forEach((item) =>
        queryParams.push({ name: "model", value: item })
      );

      filters.brand?.forEach((item) =>
        queryParams.push({ name: "brand", value: item })
      );
      filters.price?.forEach((item) =>
        queryParams.push({ name: "price", value: item })
      );
      filters.category?.forEach((item) =>
        queryParams.push({ name: "category", value: item })
      );

      setParams(queryParams);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="px-5">
      <Input
        placeholder="  Search by brand model category"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          marginBottom: 16,
          width: 300,
          marginTop: 20,
          padding: 5,
          borderColor: "green",
          borderRadius: "16px",
        }}
      />

      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: CarData?.meta?.total,
          showSizeChanger: true,
          pageSizeOptions: ["2", "4", "6", "8", "10"],
        }}
        onChange={onChange}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default GetAllCar;
