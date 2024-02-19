import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, selectCurrentUser } from "../../state/auth/authSlice";
import { useLoginMutation } from "../../state/auth/authApiSlice";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { MessageComponant } from "../../utils/helperFunction";
export default function Login() {
  const errRef = useRef();
  const navigate = useNavigate();
  const [email, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  let userSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email is not valid in valid format")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const onSubmitHandler = async (data) => {
    try {
      const userData = await login({ ...post }).unwrap();
      dispatch(setCredentials({ userData, email: post.email }));
      setUser("");
      setPwd("");
      navigate("/welcome");
    } catch (error: any) {
      let errorMessage = "";
      if (error.response) {
        errorMessage = error.response.data.message;
      } else if (error.request) {
        errorMessage = error.request.data.message;
      } else if (error.data) {
        errorMessage = error.data.message;
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.data);
      }
      setErrMsg(errorMessage);
    }
  };

  const [post, setPost] = useState({
    email: "",
    password: "",
  });

  const handleInput = (event: any) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  return (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {errMsg ? <MessageComponant message={errMsg} /> : ""}
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div className="text-left">
                <label
                  htmlFor="email"
                  className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email")}
                    type="text"
                    autoComplete="email"
                    placeholder="Please enter your email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInput}
                  />
                  {errors.email?.message ? (
                    <MessageComponant message={errors.email?.message} />
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div>
                <div className="text-left">
                  <label
                    htmlFor="password"
                    className="after:content-['*']  after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2 relative w-full">
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <input
                      className="hidden js-password-toggle"
                      id="toggle"
                      type="checkbox"
                    />
                    <label className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label">
                      <span className="flex justify-around items-center">
                        <Icon
                          className="absolute mr-0"
                          icon={icon}
                          size={18}
                          onClick={handleToggle}
                        />
                      </span>
                    </label>
                  </div>
                  <input
                    id="password"
                    {...register("password")}
                    type={type}
                    autoComplete="current-password"
                    placeholder="Please enter your password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInput}
                  />
                </div>
                {errors.password?.message ? (
                  <MessageComponant message={errors.password?.message} />
                ) : (
                  ""
                )}
              </div>

              <div>
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  {isLoading ? (
                    <>
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="mr-2 animate-spin"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
                      </svg>
                      Signing In
                    </>
                  ) : (
                    " Sign in"
                  )}
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/signup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </Link>
            </p>
            <p className="text-center">
              <Link
                to="/"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Back to home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
