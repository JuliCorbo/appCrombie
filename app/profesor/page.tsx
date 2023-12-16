// TeacherProfile.tsx
import React from "react";
import { FaUserGraduate, FaFileAlt } from "react-icons/fa";


const TeacherProfile: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto bg-zinc-950 p-8 rounded shadow-md">

        <h1 className="text-3xl font-bold mb-4 text-center">¡Hola, soy el Profesor!</h1>

        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2">Sobre Mí</h2>
          <p className="text-gray-600">
            ¡Bienvenidos a mi espacio! Soy el profesor de la Escuelita en el departamento de Crombie. Estoy aquí para ayudarte y guiar en tu aprendizaje.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Trabajos Prácticos Corregidos</h2>
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

export default TeacherProfile;
