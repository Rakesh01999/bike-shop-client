/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Row, Col, Upload } from "antd";
import { CloudUploadOutlined, PlusOutlined } from "@ant-design/icons";
import PHForm from "../../../../components/form/PHForm";
import PHInput from "../../../../components/form/PHInput";
import PHSelect from "../../../../components/form/PHSelect";
import { toast } from "sonner";
import type { FieldValues } from "react-hook-form";
import carValidationSchema from "../../../../schemas/ValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCarMutation } from "../../../../redux/features/bikes/bikesManagement";

const CreateCar = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [updateCar] = useCreateCarMutation();

  const defaultValues = {
    name: "",
    brand: "",
    model: "",
    year: "",
    price: "",
    category: "",
    description: "",
    quantity: "",
  };

  const handleFileUpload = async (info: any) => {
    const file = info.file;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "pxuxm8bg");
    formData.append("cloud_name", "dd3w1s9gq");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dd3w1s9gq/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const uploadResult = await response.json();
      setImageUrl(uploadResult.url);
      // message.success("Image uploaded successfully");
      toast.success("Image uploaded successfully");
    } catch (error) {
      // message.error("Upload failed");
      toast.error("Upload failed");
      console.error(error);
    }
  };

  const onSubmit = async (data: FieldValues) => {
    const price = parseFloat(data.price);
    const quantity = parseInt(data.quantity, 10);

    if (isNaN(price) || isNaN(quantity)) {
      toast.error("Invalid price or quantity");
      return;
    }

    if (!imageUrl) {
      toast.error("Please upload an image");
      return;
    }

    const bikeData = {
      name: data.name,
      model: data.model,
      brand: data.brand,
      price,
      category: data.category,
      description: data.description,
      quantity,
      image: imageUrl,
    };

    try {
      const res = await updateCar(bikeData).unwrap();

      if (res?.data) {
        toast.success("Bike created successfully!");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error creating bike:", error);
      toast.error("Creation failed");
    }
  };

  const uploadButton = (
    <div className="flex flex-col items-center justify-center">
      <PlusOutlined className="text-2xl text-gray-500" />
      <div className="mt-2 text-gray-500">Upload</div>
    </div>
  );

  return (
    // <div className="container mx-auto px-4 py-8">
    <div className=" mx-auto px-4 py-8">
      {/* <div className="bg-white shadow-lg rounded-xl overflow-hidden"> */}
      {/* <div className="shadow-lg rounded-xl overflow-hidden"> */}
      <div className="rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-teal-400 to-teal-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Create New Bike
          </h2>
        </div>

        <div className="p-6">
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(carValidationSchema)}
            defaultValues={defaultValues}
          >
            <Row gutter={[16, 16]}>
              {/* Left Column */}
              <Col xs={24} md={12} className="space-y-4">
                <PHInput
                  type="text"
                  name="name"
                  label="Bike Name"
                  placeholder="Enter bike name"
                  // className="w-full"
                />
                <PHInput
                  type="text"
                  name="brand"
                  label="Brand"
                  placeholder="Enter brand"
                  // className="w-full"
                />
                <PHInput
                  type="text"
                  name="model"
                  label="Model"
                  placeholder="Enter model"
                  // className="w-full"
                />
                <PHInput
                  type="number"
                  name="year"
                  label="Manufacturing Year"
                  placeholder="Enter year"
                  // className="w-full"
                />
              </Col>

              {/* Right Column */}
              <Col xs={24} md={12} className="space-y-4">
                <PHInput
                  type="number"
                  name="price"
                  label="Price"
                  placeholder="Enter price"
                  // className="w-full"
                />
                <PHSelect
                  name="category"
                  label="Bike Category"
                  // placeholder="Select category"
                  options={[
                    { value: "Mountain", label: "Mountain" },
                    { value: "Road", label: "Road" },
                    { value: "Hybrid", label: "Hybrid" },
                    { value: "Electric", label: "Electric" },
                  ]}
                />
                <PHInput
                  type="number"
                  name="quantity"
                  label="Quantity"
                  placeholder="Enter quantity"
                  // className="w-full"
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Bike Image
                  </label>
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    customRequest={handleFileUpload}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      uploadButton
                    )}
                  </Upload>
                </div>
              </Col>

              {/* Full Width Description */}
              <Col xs={24}>
                <PHInput
                  type="textarea"
                  name="description"
                  label="Bike Description"
                  placeholder="Enter detailed description"
                  // className="w-full"
                />
              </Col>
            </Row>

            {/* Submit Button */}
            <div className="mt-6">
              <Button
                type="primary"
                htmlType="submit"
                icon={<CloudUploadOutlined />}
                className="w-full bg-gradient-to-r from-teal-400 to-teal-700 hover:from-teal-600 hover:to-teal-700 transition-all duration-300 md:text-xl"
              >
                Create Bike
              </Button>
            </div>
          </PHForm>
        </div>
      </div>
    </div>
  );
};

export default CreateCar;
