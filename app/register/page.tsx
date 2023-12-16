"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

// Define el esquema de validación con Yup
const schema = yup.object({
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password length should be at least 8 characters"),
  cpassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

// Define el tipo de datos para el formulario
type FormData = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

// Componente del formulario de registro
const RegisterForm: React.FC = () => {
  // Configura el formulario con react-hook-form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  // Estados para manejar mensajes de error y éxito
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = useState(false);

  // Accede al enrutador de Next.js para la redirección después del registro exitoso
  const router = useRouter();

  // Función que se ejecuta al enviar el formulario
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

        // Redirige a la página de dashboard después del registro exitoso
        router.push("/dashboard");
      } else {
        setLoading(false);
        const errorData = await response.json();
        // Maneja diferentes tipos de errores de registro
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
    <main className="h-[100vh] bg-black">
      <div className="h-full w-full relative flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-xs:min-w-0 bg-white p-[32px] bg-opacity-70 rounded-[20px] shadow-lg transform hover:scale-105 transition-transform"
        >
          <div className="min-w-[257px]">
            <h1 className="text-3xl font-bold text-center w-auto mb-6 text-black">
              Sign Up
            </h1>
            <p className="text-center mt-2 mb-6 text-sm w-auto text-black">
             Do not waste your time
            </p>
            <div className="mb-4">
              <label className="block text-black text-sm font-bold mb-2">
                Username
              </label>
              <div className="relative">
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="text"
                      {...field}
                      className="mt-2 block mb-4 p-2 rounded-[30px] bg-[#f5f5f5] text-black w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                  )}
                />
              </div>
              <p className="text-red-600 text-sm mt-2">
                {errors.username?.message}
              </p>
            </div>
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
            <div className="mb-4">
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
            <div className="mb-6">
              <label className="block text-black text-sm font-bold mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Controller
                  name="cpassword"
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
                {errors.cpassword?.message}
              </p>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="mt-[17px] px-7 py-3 text-base bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-[40px] block w-full hover:opacity-90 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300"
              >
                {loading ? <p>Loading</p> : <p>Register</p>}
              </button>
            </div>
            {error.length > 0 ? (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            ) : success === "done" ? (
              <p className="text-green-600 text-sm mt-3 text-center">
                PleaseWait
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
