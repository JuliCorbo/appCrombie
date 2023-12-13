"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

const schema = yup.object({
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

  const [error, setError] = React.useState("");
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
        // Realizar acciones después de un inicio de sesión exitoso
        // Por ejemplo, redirigir a una página de dashboard
        const userData = await response.json();

        // Redirigir a la página de dashboard
        router.push("/dashboard");
      } else {
        setLoading(false);
        const errorData = await response.json();
        setError("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de inicio de sesión", error);
    }
  };

  return (
    <main className="h-[100vh]">
      <div className="h-full w-full relative flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-xs:min-w-0 bg-white p-[32px] bg-opacity-70 rounded-[20px]"
        >
          <div className="min-w-[257px]">
            <h1 className="text-3xl font-bold text-center w-auto">Login</h1>
            <div className="mb-4">
              <p className="text-gray-700 font-bold">Email</p>
              <label className="block text-gray-700 text-sm mb-2">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      {...field}
                      className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] w-full"
                    />
                  )}
                />
                <p className="text-red-600 text-sm mt-2">
                  {errors.email?.message}
                </p>
              </label>
            </div>
            <div className="mb-6">
              <p className="text-gray-700 font-bold">Password </p>
              <label className="block text-gray-700 text-sm mb-2">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="password"
                      {...field}
                      className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] w-full"
                    />
                  )}
                />
                <p className="text-red-600 text-sm mt-2">
                  {errors.password?.message}
                </p>
              </label>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="mt-[17px] px-7 py-3 text-base bg-black text-white rounded-[40px] block w-full"
                disabled={loading}
              >
                {loading ? <p>Loading</p> : <p>Login</p>}
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
