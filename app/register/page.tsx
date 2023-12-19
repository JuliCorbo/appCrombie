"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

const schema = yup.object({
  userType: yup.string().required("User type is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password length should be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least one letter, one number, and one special character"
    ),
  cpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  teacherCode: yup.string().test({
    name: "teacherCode",
    message: "Teacher code is required for teachers",
    test: function (value) {
      const userType = this.resolve(yup.ref("userType"));
      return userType === "teacher" ? !!value : true;
    },
  }),
});

type FormData = {
  userType: "student" | "teacher";
  username: string;
  email: string;
  password: string;
  cpassword: string;
  teacherCode?: string;
};

const RegisterForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as any, // Utilizamos 'as any' para evitar errores de tipo
    defaultValues: {
      userType: "student",
      username: "",
      email: "",
      password: "",
      cpassword: "",
      teacherCode: "",
    },
  });

  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        setSuccess("done");
        setError("");
        router.push("/dashboard");
      } else {
        setLoading(false);
        const errorData = await response.json();
        if (
          errorData.message ===
          "Invalid username, this username has already been used"
        ) {
          setSuccess("");
          setError("Username already in use");
        } else if (
          errorData.message ===
          "Invalid email, this email has already been used"
        ) {
          setSuccess("");
          setError("Email already in use");
        } else {
          setSuccess("");
          setError(
            "Registration failed for other reasons, please try again or try later"
          );
        }
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de registro", error);
    }
  };

  return (
    <main className="h-[100vh]">
      <div className="h-full w-full relative flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-xs:min-w-0 bg-gradient-to-r from-pink-200 via-pink-100 to-white p-[32px] bg-opacity-70 rounded-[20px] shadow-md border border-gray-200"
        >
          <div className="min-w-[300px]">
            <h1 className="text-3xl font-bold text-center mb-2 text-black">
              Sign Up
            </h1>
            <p className="text-center text-sm mb-6 text-gray-700">
              Sign Up Instructions
            </p>

            <div className="mb-4">
              <p className="text-gray-700 font-bold mb-1 text-center">User Type</p>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setValue("userType", "student")}
                  className={`mr-2 p-3 rounded-md transition-all duration-300 ${
                    watch("userType") === "student"
                      ? "bg-pink-500 text-white transform scale-105"
                      : "bg-gray-100 text-black hover:bg-pink-500 hover:text-white"
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setValue("userType", "teacher")}
                  className={`p-3 rounded-md transition-all duration-300 ${
                    watch("userType") === "teacher"
                      ? "bg-pink-500 text-white transform scale-105"
                      : "bg-gray-100 text-black hover:bg-pink-500 hover:text-white"
                  }`}
                >
                  Teacher
                </button>
              </div>
              <p className="text-red-600 text-sm mt-2">
                {errors.userType?.message}
              </p>
            </div>

            {watch("userType") === "teacher" && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">
                  <p className="text-gray-700 font-bold mb-1">Teacher Code</p>
                  <Controller
                    name="teacherCode"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="text"
                        {...field}
                        className="mt-2 block mb-4 p-3 rounded-md bg-gray-100 text-gray-800 w-full"
                      />
                    )}
                  />
                  <p className="text-red-600 text-sm mt-2">
                    {errors.teacherCode?.message}
                  </p>
                </label>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                <p className="text-gray-700 font-bold mb-1">Username</p>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="mt-2 block mb-4 p-3 rounded-md bg-gray-100 text-gray-800 w-full"
                    />
                  )}
                />
                <p className="text-red-600 text-sm mt-2">
                  {errors.username?.message}
                </p>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                <p className="text-gray-700 font-bold mb-1">Email</p>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      {...field}
                      className="mt-2 block mb-4 p-3 rounded-md bg-gray-100 text-gray-800 w-full"
                    />
                  )}
                />
                <p className="text-red-600 text-sm mt-2">
                  {errors.email?.message}
                </p>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                <p className="text-gray-700 font-bold mb-1">Password</p>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="password"
                      {...field}
                      className="mt-2 block mb-4 p-3 rounded-md bg-gray-100 text-gray-800 w-full"
                    />
                  )}
                />
                <p className="text-red-600 text-sm mt-2">
                  {errors.password?.message}
                </p>
              </label>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                <p className="text-gray-700 font-bold mb-1">Confirm Password</p>
                <Controller
                  name="cpassword"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="password"
                      {...field}
                      className="mt-2 block mb-4 p-3 rounded-md bg-gray-100 text-gray-800 w-full"
                    />
                  )}
                />
                <p className="text-red-600 text-sm mt-2">
                  {errors.cpassword?.message}
                </p>
              </label>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="mt-4 px-8 py-3 text-base bg-pink-500 hover:bg-pink-600 text-white rounded-full block w-full focus:outline-none focus:ring focus:border-blue-300"
              >
                {loading ? (
                  <p className="text-center">Loading</p>
                ) : (
                  <p className="text-center">Register</p>
                )}
              </button>
            </div>

            {error.length > 0 ? (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            ) : success === "done" ? (
              <p className="text-green-600 text-sm mt-3 text-center">
                Please Wait
              </p>
            ) : (
              <p></p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default RegisterForm;
