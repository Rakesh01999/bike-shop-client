import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, Input, Button, Form, Typography } from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
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
  
    const toastId = toast.loading("Ongoging");

    try {
      const res = await login(data).unwrap();

      console.log(res);
      toast.success("Change password sucessfully", {
        id: toastId,
        duration: 2000,
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message, { id: toastId, duration: 5000 });
    }
  };

  return (
     <div className="flex items-center justify-center lg:mt-20 md:mt-10 bg-gray-100 p-4">
   <Card className="w-full max-w-md shadow-lg rounded-lg">
     <Typography.Title level={3} className="text-center mb-4">
       Change Password
     </Typography.Title>

     <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
       <Form.Item
         label="Old Password"
         validateStatus={errors.oldPassword ? "error" : ""}
         help={errors.oldPassword?.message}
       >
         <Controller
           name="oldPassword"
           control={control}
           render={({ field }) => (
             <Input.Password
               {...field}
               prefix={<LockOutlined />}
               iconRender={(visible) =>
                 visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
               }
             />
           )}
         />
       </Form.Item>

       <Form.Item
         label="New Password"
         validateStatus={errors.newPassword ? "error" : ""}
         help={errors.newPassword?.message}
       >
         <Controller
           name="newPassword"
           control={control}
           render={({ field }) => (
             <Input.Password
               {...field}
               prefix={<LockOutlined />}
               iconRender={(visible) =>
                 visible ? <EyeOutlined /> : <EyeInvisibleOutlined />
               }
             />
           )}
         />
       </Form.Item>

       <Button type="primary" htmlType="submit" block>
         Update Password
       </Button>
     </Form>
   </Card>
 </div>
  );
};

export default ChangePassword;
