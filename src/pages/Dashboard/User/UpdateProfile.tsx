/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, Input, Button, Form, Typography } from "antd";
import { UserOutlined, HomeOutlined, PhoneOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "../../../redux/features/auth/authApi";

// Validation Schema
const profileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone_number: z
    .string(),
    // .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number")
    // .regex(/^\+?[1-9]\d{1,14}$/, "Enter a valid phone number"), // Supports international formats
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const UpdateProfile = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const [updateProfile] = useUpdateProfileMutation();

  const onSubmit = async (data: ProfileFormValues) => {
    const toastId = toast.loading("Updating Profile...");

    try {
      const res = await updateProfile(data).unwrap();

      console.log(res);
      toast.success("Profile updated successfully!", {
        id: toastId,
        duration: 2000,
      });
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update profile", {
        id: toastId,
        duration: 5000,
      });
    }
  };

  // Teal Theme
  const tealColors = {
    primary: "#0F766E",
    secondary: "#14B8A6",
    background: "#CCFBF1",
    text: {
      primary: "#134E4A",
      secondary: "#115E59",
    },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      // style={{
      //   background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      // }}
    >
      <Card
        className="w-full max-w-md shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl"
        style={{
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${tealColors.secondary}`,
        }}
      >
        <div className="text-center mb-6 sm:mb-8">
          <div
            className="mx-auto mb-4 sm:mb-6 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${tealColors.primary} 0%, ${tealColors.secondary} 100%)`,
            }}
          >
            <UserOutlined className="text-3xl sm:text-4xl text-white" />
          </div>
          <Typography.Title
            level={3}
            className="text-center mb-2 text-2xl sm:text-3xl"
            style={{
              color: tealColors.text.primary,
              letterSpacing: "-0.5px",
            }}
          >
            Update Profile
          </Typography.Title>
          <Typography.Text
            className="text-center block text-sm sm:text-base"
            style={{ color: tealColors.text.secondary }}
          >
            Keep your profile up-to-date
          </Typography.Text>
        </div>

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className="px-4 sm:px-6"
        >
          {/* Name Field */}
          <Form.Item
            label={
              <span
                className="font-medium text-sm sm:text-base"
                style={{ color: tealColors.text.primary }}
              >
                Full Name
              </span>
            }
            validateStatus={errors.name ? "error" : ""}
            help={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<UserOutlined className="text-gray-400" />}
                  className="!py-2 !rounded-xl text-sm sm:text-base"
                  style={{
                    boxShadow: `0 4px 6px rgba(${tealColors.primary}, 0.1)`,
                  }}
                />
              )}
            />
          </Form.Item>

          {/* Phone Number Field */}
          <Form.Item
            label={
              <span
                className="font-medium text-sm sm:text-base"
                style={{ color: tealColors.text.primary }}
              >
                Phone Number
              </span>
            }
            validateStatus={errors.phone_number ? "error" : ""}
            help={errors.phone_number?.message}
          >
            <Controller
              name="phone_number"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<PhoneOutlined className="text-gray-400" />}
                  className="!py-2 !rounded-xl text-sm sm:text-base"
                  style={{
                    boxShadow: `0 4px 6px rgba(${tealColors.primary}, 0.1)`,
                  }}
                />
              )}
            />
          </Form.Item>

          {/* Address Field */}
          <Form.Item
            label={
              <span
                className="font-medium text-sm sm:text-base"
                style={{ color: tealColors.text.primary }}
              >
                Address
              </span>
            }
            validateStatus={errors.address ? "error" : ""}
            help={errors.address?.message}
          >
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  prefix={<HomeOutlined className="text-gray-400" />}
                  className="!py-2 !rounded-xl text-sm sm:text-base"
                  style={{
                    boxShadow: `0 4px 6px rgba(${tealColors.primary}, 0.1)`,
                  }}
                />
              )}
            />
          </Form.Item>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            block
            className="!rounded-xl !py-3 mt-4 sm:mt-6 transform transition-all hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${tealColors.primary} 0%, ${tealColors.secondary} 100%)`,
              border: "none",
              boxShadow: `0 6px 12px rgba(${tealColors.primary}, 0.25)`,
              fontSize: "0.875rem",
            }}
          >
            Update Profile
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateProfile;
