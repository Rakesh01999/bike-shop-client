import { Form, Input } from "antd";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
};

const PHInput = ({ type, name, label, disabled, placeholder }: TInputProps) => {
  const { control } = useFormContext();

  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            {type === "password" ? (
              <Input.Password
                {...field}
                id={name}
                size="large"
                disabled={disabled}
                placeholder={placeholder}
                style={{ borderColor: "teal" }}
              />
            ) : (
              <Input
                {...field}
                type={type}
                id={name}
                size="large"
                disabled={disabled}
                placeholder={placeholder}
                style={{ borderColor: "teal" }}
              />
            )}
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHInput;
