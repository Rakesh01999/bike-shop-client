// src/components/Loading.tsx
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Loading = ({ message = "Loading..." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Spin
        indicator={
          <LoadingOutlined
            style={{ fontSize: 40, color: "#0F766E" }}
            spin
          />
        }
      />
      <p className="text-teal-700 text-lg font-semibold animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loading;
