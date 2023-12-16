// StudentProfile.tsx
import React from "react";
import { FaUserGraduate, FaFileAlt } from "react-icons/fa";


const StudentProfile: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto bg-zinc-950 p-8 rounded shadow-md">

        <h1 className="text-3xl font-bold mb-4 text-center">¡Hola, soy el Estudiante!</h1>

        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Sobre Mí</h2>
          <p className="text-gray-600">
            ¡Hola! Soy un estudiante apasionado por el aprendizaje y la exploración de nuevas ideas. Estoy aquí para aprender y contribuir al éxito del curso.
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
