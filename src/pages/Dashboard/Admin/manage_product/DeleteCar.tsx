import { useState } from "react";
import { Button, Table, Modal, Form } from "antd";
import { toast } from "sonner";
import { TTableData } from "../../../Allproduct";
import { useDeleteCarMutation, useGetAllCarsQuery } from "../../../../redux/features/bikes/bikesManagement";

const DeleteCar = () => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [carToDelete, setCarToDelete] = useState<TTableData | null>(null);
  const [form] = Form.useForm();
  const [updateCar] = useDeleteCarMutation();

    const { data: CarData, isFetching } = useGetAllCarsQuery([]);
  
    const tableData = CarData?.data?.map(({ _id, price, model, brand, category, quantity }) => ({
      key: _id,
      price,
      model,
      brand,
      category,
      quantity
    }));
  

  const handleDeleteClick = (record: TTableData) => {
    setCarToDelete(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteSubmit = async (values: { carId: string }) => {
    if (values.carId) {
      try {
        toast.success("Car deleted successfully!");
        setIsDeleteModalVisible(false);
        setCarToDelete(null);
         await updateCar({
            order_id:values.carId
         })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const columns = [
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (record: TTableData) => (
        <Button
          onClick={() => handleDeleteClick(record)}
          style={{ marginLeft: 0 }}
          danger
        >
          Delete
        </Button>
      ),
    },
  ];
  
 

  return (
    <div className="px-5">
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        scroll={{ x: 800 }}
        rowKey="key"
      />
      <Modal
        title="Confirm Deletion"
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onOk={() => form.submit()}
        okText="Yes, Delete"
        cancelText="No, Cancel"
      >
        <Form form={form} layout="vertical" onFinish={handleDeleteSubmit}>
          <Form.Item name="carId" initialValue={carToDelete?.key} hidden>
            <input type="hidden" />
          </Form.Item>
          <p>Are you sure you want to delete this car?</p>
        </Form>
      </Modal>
    </div>
  );
};

export default DeleteCar;
