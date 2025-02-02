import { Button, Row, Col } from "antd";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import { toast } from "sonner";
import type { FieldValues } from "react-hook-form";
import carValidationSchema from "../../../../schemas/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useCreateCarMutation } from "../../../../redux/features/bikes/bikesManagement";

const CreateCar = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [updateCar] = useCreateCarMutation();

  const defaultValues = {
    brand: "Ram",
    model: "1500",
    year: "2023",
    price: "42000",
    category: "Truck",
    description:
      "A powerful truck designed for performance, towing, and durability.",
    quantity: "1",
    inStock: true,
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log("No file selected");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "image-upload");
    data.append("cloud_name", "df1plpdvy");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/df1plpdvy/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error("Failed to upload image");
      }

      const uploadImageUrl = await res.json();

      setImageUrl(uploadImageUrl.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = async(data: FieldValues) => {
    const year = parseInt(data.year, 10);
    const price = parseFloat(data.price);
    const quantity = parseInt(data.quantity, 10);

    if (isNaN(year) || isNaN(price) || isNaN(quantity)) {
      console.error("Year, Price, or Quantity is invalid");
      return;
    }

    const carData = {
      ...data,
      image: imageUrl as string,
      inStock: true,
      year,
      price,
      quantity,
    };

    try {
     const res = await updateCar({
        carData
      }).unwrap();
     
      if(res?.data){
        toast.success("Car Created successfully!");
      }
      else{
        toast.error("something is wrong")
      }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "",
        padding: "2px",
      }}
    >
      <PHForm
        onSubmit={onSubmit}
        resolver={zodResolver(carValidationSchema)}
        defaultValues={defaultValues}
      >
        <Row gutter={[16, 16]}>
          <Col className="mt-20 lg:mt-0 md:mt-0" xs={24} lg={12}>
            <PHInput
              type="text"
              name="brand"
              label="Brand"
              placeholder="Enter brand"
            />
          </Col>
          <Col xs={24} lg={12}>
            <PHInput
              type="text"
              name="model"
              label="Model"
              placeholder="Enter model"
            />
          </Col>
          <Col xs={24} lg={12}>
            <PHInput
              type="number"
              name="year"
              label="Year"
              placeholder="Enter year"
            />
          </Col>
          <Col xs={24} lg={12}>
            <PHInput
              type="number"
              name="price"
              label="Price"
              placeholder="Enter price"
            />
          </Col>
          <Col xs={24}>
            <PHSelect
              name="category"
              label="Category"
              options={[
                { value: "Sedan", label: "Sedan" },
                { value: "SUV", label: "SUV" },
                { value: "Truck", label: "Truck" },
                { value: "Coupe", label: "Coupe" },
                { value: "Convertible", label: "Convertible" },
              ]}
            />
          </Col>
          <Col xs={24}>
            
            <input
              className="text-blue-400 cursor-pointer mt-2"
              type="file"
              onChange={handleFileUpload}
              accept="image/*"
            />
          </Col>
          <Col xs={24}>
            <PHInput
              type="text"
              name="description"
              label="Description"
              placeholder="Enter description"
            />
          </Col>
          <Col xs={24} lg={12}>
            <PHInput
              type="number"
              name="quantity"
              label="Quantity"
              placeholder="Enter quantity"
            />
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </div>
      </PHForm>
    </div>
  );
};

export default CreateCar;
