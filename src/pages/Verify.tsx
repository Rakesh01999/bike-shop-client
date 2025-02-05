import { useSearchParams } from "react-router-dom";
import { useVerifyOrderQuery } from "../redux/features/bikes/bikesManagement";
import { useNavigate } from "react-router-dom";

interface OrderData {
  id: number;
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discsount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  value1: string | null;
  value2: string | null;
  value3: string | null;
  value4: string | null;
  transaction_status: string | null;
  method: string;
  date_time: string;
}

const Verify = () => {
  const [SearchParams] = useSearchParams();
  const { isLoading, data } = useVerifyOrderQuery(SearchParams.get("order_id"), {
    refetchOnMountOrArgChange: true,
  });
  
  const orderData: OrderData = data?.data?.[0];
  const navigate = useNavigate();
  console.log(data);
  console.log(orderData);
  
  if (isLoading) return <div className="min-h-screen text-center bg-cyan-400">Loading...</div>;

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">Order Verification</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Order ID:</span>
            <span>{orderData?.order_id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Customer Name:</span>
            <span>{orderData?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Amount:</span>
            <span>{orderData?.amount} {orderData?.currency}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Paid Amount:</span>
            <span>{orderData?.received_amount} {orderData?.currency}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Payment Method:</span>
            <span>{orderData?.method}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Payment Status:</span>
            <span className={`${orderData?.is_verify === 1 ? 'text-green-500' : 'text-red-500'}`}>
              {orderData?.is_verify === 1 ? "Verified" : "Not Verified"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Transaction Status:</span>
            <span>{orderData?.sp_message}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-700">Invoice No:</span>
            <span>{orderData?.invoice_no}</span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleHomeRedirect}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
