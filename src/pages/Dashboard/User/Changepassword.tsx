/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, Input, Button, Form, Typography } from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";

const passwordSchema = z.object({
  oldPassword: z.string().min(6, "Old password must be at least 6 characters"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const [login] = useChangePasswordMutation();

  const onSubmit = async (data: PasswordFormValues) => {
    const toastId = toast.loading("Updating Password");

    try {
      const res = await login(data).unwrap();

      console.log(res);
      toast.success("Password changed successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (err: any) {
      toast.error(err?.data?.message, { id: toastId, duration: 5000 });
    }
  };

  // Teal Color Palette
  const tealColors = {
    primary: "#0F766E", // Deep Teal
    secondary: "#14B8A6", // Bright Teal
    background: "#CCFBF1", // Light Teal
    text: {
      primary: "#134E4A", // Dark Teal
      secondary: "#115E59", // Slightly Lighter Dark Teal
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
            <KeyOutlined className="text-3xl sm:text-4xl text-white" />
          </div>
          <Typography.Title
            level={3}
            className="text-center mb-2 text-2xl sm:text-3xl"
            style={{
              color: tealColors.text.primary,
              letterSpacing: "-0.5px",
            }}
          >
            Change Password
          </Typography.Title>
          <Typography.Text
            className="text-center block text-sm sm:text-base"
            style={{ color: tealColors.text.secondary }}
          >
            Secure your account with a new password
          </Typography.Text>
        </div>

        <Form
          layout="vertical"
          onFinish={handleSubmit(onSubmit)}
          className="px-4 sm:px-6"
        >
          <Form.Item
            label={
              <span
                className="font-medium text-sm sm:text-base"
                style={{ color: tealColors.text.primary }}
              >
                Old Password
              </span>
            }
            validateStatus={errors.oldPassword ? "error" : ""}
            help={errors.oldPassword?.message}
          >
            <Controller
              name="oldPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined className="text-gray-400" />}
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                  className="!py-2 !rounded-xl text-sm sm:text-base"
                  style={{
                    boxShadow: `0 4px 6px rgba(${tealColors.primary}, 0.1)`,
                  }}
                />
              )}
            />
          </Form.Item>

          <Form.Item
            label={
              <span
                className="font-medium text-sm sm:text-base"
                style={{ color: tealColors.text.primary }}
              >
                New Password
              </span>
            }
            validateStatus={errors.newPassword ? "error" : ""}
            help={errors.newPassword?.message}
          >
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <Input.Password
                  {...field}
                  prefix={<LockOutlined className="text-gray-400" />}
                  iconRender={(visible) =>
                    visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
                  }
                  className="!py-2 !rounded-xl text-sm sm:text-base"
                  style={{
                    boxShadow: `0 4px 6px rgba(${tealColors.primary}, 0.1)`,
                  }}
                />
              )}
            />
          </Form.Item>

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
            Update Password
          </Button>
        </Form>

        <div className="text-center mt-4 sm:mt-6 px-4 sm:px-6">
          <Typography.Text
            className="text-xs sm:text-sm"
            style={{ color: tealColors.text.secondary }}
          >
            {/* Password must be at least 6 characters long */}
          </Typography.Text>
        </div>
      </Card>
    </div>
  );
};

export default ChangePassword;
