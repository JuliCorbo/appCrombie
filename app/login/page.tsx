"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

type FormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const userData = await response.json();
        setError("");
        setLoading(false);
        
        // Redirige a la página del perfil del estudiante o profesor según corresponda
        if (userData.isProfessor) {
          router.push("/profesor");
        } else {
          router.push("/estudiante");
        }
      } else {
        setLoading(false);
        const errorData = await response.json();
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error sending login request", error);
      setError("Server error. Please try again.");
      setLoading(false);
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
            <h1 className="text-3xl font-bold text-center mb-6 text-black">Login</h1>
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
                      className="block w-full p-3 rounded-md bg-gray-100 text-gray-800"
                    />
                  )}
                />
                <p className="text-red-600 text-sm mt-2">{errors.email?.message}</p>
              </label>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm mb-2">
                <p className="text-gray-700 font-bold mb-1">Password</p>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="password"
                      {...field}
                      className="block w-full p-3 rounded-md bg-gray-100 text-gray-800"
                    />
                  )}
                />
                <p className="text-red-600 text-sm mt-2">{errors.password?.message}</p>
              </label>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="mt-4 px-8 py-3 text-base bg-pink-500 hover:bg-pink-600 text-white rounded-full block w-full focus:outline-none focus:ring focus:border-blue-300"
                disabled={loading}
              >
                {loading ? <p className="text-center">Loading</p> : <p className="text-center">Login</p>}
              </button>
            </div>
            {error.length > 0 && (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default LoginForm;
