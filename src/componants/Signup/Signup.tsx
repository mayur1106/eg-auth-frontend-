import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../../state/auth/authSlice";
import { useSignupMutation } from "../../state/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { MessageComponant } from "../../utils/helperFunction";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();
  const [post, setPost] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  let userSchema = yup.object().shape({
    firstName: yup.string().required("First name is Required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Email is not valid in valid format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const handleInput = (event: any) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };
  const onSubmitHandler = async (data) => {
    try {
      setPost(data);
      const userData = await signup({ ...post }).unwrap();
      dispatch(setCredentials({ userData, email: post.email }));
      navigate("/");
    } catch (err) {}
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
              Sign up for an account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div className="sm:col-span-3 text-left xl-6">
                <label
                  htmlFor="fname"
                  className="after:content-['*']  after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="fname"
                    placeholder="Please enter your first name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("firstName")}
                    onChange={handleInput}
                  />
                  {errors.firstName?.message ? (
                    <MessageComponant message={errors.firstName?.message} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="text-left">
                <label
                  htmlFor="lname"
                  className="after:content-['*']  after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-1">
                  <input
                    id="lastName"
                    {...register("lastName")}
                    type="text"
                    autoComplete="lastName"
                    placeholder="Please enter your last name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInput}
                  />
                  {errors.lastName?.message ? (
                    <MessageComponant message={errors.lastName?.message} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="text-left">
                <label
                  htmlFor="email"
                  className="after:content-['*']  after:ml-0.5 after:text-red-500 block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    {...register("email")}
                    type="email"
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
                <div className="mt-1">
                  <input
                    id="password"
                    {...register("password")}
                    type="password"
                    autoComplete="current-password"
                    placeholder="Please enter your password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={handleInput}
                    value={post.password}
                  />
                  {errors.password?.message ? (
                    <MessageComponant message={errors.password?.message} />
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
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
                      Signing Up
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </div>
            </form>
            <p className="mt-10 text-center text-sm text-gray-500 m-5">
              Already Have an Account?
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 pl-2"
              >
                Login
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
};

export default SignUp;
