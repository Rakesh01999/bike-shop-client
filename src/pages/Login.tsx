import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { NavLink, useNavigate } from "react-router-dom";
import { setUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import LoginSchema from "../schemas/LoginValidation";
import { AiOutlineHome } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Signing in");

    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res?.data?.accessToken);

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Signed in successfully", { id: toastId, duration: 2000 });
      navigate("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty
    } catch (err) {
      console.log(err);
      toast.error("Login failed", { id: toastId, duration: 5000 });
    }
  };

  // Teal Color Palette
  const tealColors = {
    primary: "#0F766E",
    secondary: "#14B8A6",
    background: "#ECFDF5",
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        background: `linear-gradient(135deg, ${tealColors.background} 0%, ${tealColors.secondary} 100%)`,
      }}
    >
      <div className="w-full max-w-md rounded-lg bg-gray-100 p-8 shadow-md xl:-mt-32 lg:-mt-20">
        <h2 className="text-center text-2xl font-bold text-teal-700">
          Welcome Back to 
          <span className=""> Bike Shop</span>
        </h2>

        <h1 className="text-center text-2xl font-bold text-teal-700">
          Sign In
        </h1>

        <PHForm onSubmit={onSubmit} resolver={zodResolver(LoginSchema)}>
          <PHInput
            type="text"
            name="email"
            label="Email"
            placeholder="Enter your email"
          />
          <PHInput
            type="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
          />

          {/* <label className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ms-2 text-sm text-gray-600">Remember me</span>
          </label> */}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white mt-5 shadow-sm hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </div>
          <DemoLoginButtons onSubmit={onSubmit} />
          <div>
            <NavLink to="/">
              <button
                type="submit"
                className="flex w-full justify-center items-center rounded-md border border-transparent bg-teal-600 px-4 py-2 text-sm font-medium text-white mt-5 shadow-sm hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 gap-3"
              >
                <span>Go to Home</span>
                <AiOutlineHome className="text-white text-lg" />
              </button>
            </NavLink>
          </div>
        </PHForm>

        <div className="mt-8 flex justify-center text-center">
          <p className="text-sm font-bold text-gray-600">
            Are you not registered?{" "}
            <span className="font-semibold text-teal-600">
              <NavLink to="/register">Sign Up</NavLink>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

// Demo login buttons INSIDE form context
const DemoLoginButtons = ({
  onSubmit,
}: {
  onSubmit: (data: FieldValues) => void;
}) => {
  const { setValue } = useFormContext();

  const handleDemoLogin = async (role: "admin" | "user") => {
    const creds =
      role === "admin"
        ? { email: "admin@gmail.com", password: "admin123" }
        : { email: "user@gmail.com", password: "user123" };

    setValue("email", creds.email);
    setValue("password", creds.password);
    await onSubmit(creds);
  };

  return (
    <div className="mt-4 flex flex-row gap-2">
      <button
        type="button"
        onClick={() => handleDemoLogin("admin")}
        className="w-full rounded-md bg-teal-500 px-4 py-2 text-white text-sm font-medium hover:bg-teal-600"
      >
        Demo Admin Login
      </button>
      <button
        type="button"
        onClick={() => handleDemoLogin("user")}
        className="w-full rounded-md bg-teal-500 px-4 py-2 text-white text-sm font-medium hover:bg-teal-600"
      >
        Demo User Login
      </button>
    </div>
  );
};

export default Login;
