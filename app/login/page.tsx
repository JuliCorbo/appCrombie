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
        // Realizar acciones después de un inicio de sesión exitoso
        // Por ejemplo, redirigir a una página de dashboard
        const userData = await response.json();

        // Restablecer el estado
        setError("");
        setLoading(false);

        // Redirigir a la página de dashboard
        router.push("/dashboard");
      } else {
        setLoading(false);
        const errorData = await response.json();
        setError("Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud de inicio de sesión", error);
      setError("Error en el servidor. Por favor, inténtalo de nuevo.");
      setLoading(false);
    }
  };

  return (
    <main className="h-[100vh] bg-black">
      <div className="h-full w-full relative flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-xs:min-w-0 bg-white p-[32px] bg-opacity-80 rounded-[20px] shadow-lg transform hover:scale-105 transition-transform"
        >
          <div className="min-w-[257px]">
            <h1 className="text-3xl font-bold text-center w-auto mb-6 text-black">
              Login
            </h1>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2">
                Email
              </label>
              <div className="relative">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="email"
                      {...field}
                      className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] text-black w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                  )}
                />
              </div>
              <p className="text-red-600 text-sm mt-2">
                {errors.email?.message}
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-black text-sm font-bold mb-2">
                Password
              </label>
              <div className="relative">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="password"
                      {...field}
                      className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] text-black w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                  )}
                />
              </div>
              <p className="text-red-600 text-sm mt-2">
                {errors.password?.message}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="mt-[17px] px-7 py-3 text-base bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-[40px] block w-full hover:opacity-90 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
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
