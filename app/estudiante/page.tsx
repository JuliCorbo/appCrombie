// StudentProfile.tsx
"use client";
import React from "react";
import { FaUserGraduate, FaFileAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

function setLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

const StudentProfile: React.FC = () => {
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

        // Redirige a la página del perfil del estudiante
        router.push("/estudiante");
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
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto bg-zinc-950 p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">
          ¡Hola, soy el Estudiante!
        </h1>

        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Sobre Mí</h2>
          <p className="text-gray-600">
            ¡Hola! Soy un estudiante apasionado por el aprendizaje y la
            exploración de nuevas ideas. Estoy aquí para aprender y contribuir
            al éxito del curso.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Trabajos Prácticos</h2>
          <ul className="list-disc pl-6">
            <li>
              <FaFileAlt className="mr-2 text-gray-600" />
              <a
                href="enlace_al_trabajo_practico_1.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trabajo Práctico 1 - Título
              </a>
            </li>
            <li>
              <FaFileAlt className="mr-2 text-gray-600" />
              <a
                href="enlace_al_trabajo_practico_2.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Trabajo Práctico 2 - Título
              </a>
            </li>
            {/* Agrega más trabajos prácticos según sea necesario */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
