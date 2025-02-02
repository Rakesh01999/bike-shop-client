import { useState } from "react";
import { Bike, TQueryParam } from "../types";
import { useGetAllCarsQuery } from "../redux/features/bikes/bikesManagement";

import {
  Button,
  Input,
  Table,
  Pagination,
  type TableColumnsType,
  type TableProps,
} from "antd";
import { useNavigate } from "react-router-dom";
import "./pagination.css";

export type TTableData = Pick<
  Bike,
  "price" | "model" | "brand" | "category" | "quantity"
> & { key: string };

const Allproduct = () => {
  const [params] = useState<TQueryParam[] | undefined>(undefined);
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
    ({ _id, price, model, brand, category, quantity }) => ({
      key: _id,
      price,
      model,
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
    },
    {
      title: "Brand",
      key: "brand",
      dataIndex: "brand",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
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
        <Button onClick={() => navigate(`/car-detail/${record.key}`)}>
          View
        </Button>
      ),
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    paginationConfig,
    _filters,
    _sorter,
    extra
  ) => {
    const { current, pageSize } = paginationConfig;

    if (extra.action === "paginate") {
      setPagination({ current: current!, pageSize: pageSize! });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="px-5">
      <Input
        placeholder="Search by brand, model, category"
        value={searchTerm}
        onChange={handleSearch}
        style={{
          marginBottom: 16,
          width: "100%",
          maxWidth: 300,
          marginTop: 20,
          padding: 5,
          borderColor: "green",
          borderRadius: "16px",
        }}
      />
      <div className="overflow-x-auto">
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          pagination={false}
          onChange={onChange}
          scroll={{ x: 800 }}
        />
      </div>

      <div className="pagination-container mt-2 mb-2 flex justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={CarData?.meta?.total}
          showSizeChanger={true}
          showQuickJumper={true}
          responsive={false}
          pageSizeOptions={["2", "4", "6", "8", "10"]}
          onChange={(page, pageSize) =>
            setPagination({ current: page, pageSize })
          }
        />
      </div>
    </div>
  );
};

export default Allproduct;
