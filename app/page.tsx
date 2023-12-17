"use client"
import { Chip } from '@nextui-org/chip';
import { CrombieLogo } from '@/components/shared/logo';
import Slider from 'react-slick';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Student {
  id: string;
  name: string;
  profileImage: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  teamMembers: {
    name: string;
    profileImage: string;
  }[];
  githubLink: string;
}

export default function Homepage(): JSX.Element {
  // Datos de ejemplo para estudiantes y proyectos
  const students: Student[] = [
    { id: '1', name: 'FedericoProgramando', profileImage: 'https://avatars.githubusercontent.com/u/128873414?v=4' },
    { id: '2', name: 'JuliCorbo', profileImage: 'https://ca.slack-edge.com/T05E1DXNQ9K-U05FE7WMEHK-c5df1f6dbe2e-512' },
    { id: '3', name: 'Leandro Viscolungo', profileImage: 'https://avatars.githubusercontent.com/u/116530255?s=96&v=4' },
    { id: '4', name: 'Agustina', profileImage: 'https://avatars.githubusercontent.com/u/112912320?s=96&v=4' },
    { id: '5', name: 'Alejo Paulón', profileImage: 'https://avatars.githubusercontent.com/u/103588764?s=96&v=4' },
    { id: '6', name: 'candegitcoder', profileImage: 'https://ca.slack-edge.com/T05E1DXNQ9K-U05F2A7U2K1-a5be0c54867a-512' },
    { id: '7', name: 'Valentin Sigaudo', profileImage: 'https://avatars.githubusercontent.com/u/109991981?s=96&v=4' },
    { id: '8', name: 'Giovistica', profileImage: 'https://ca.slack-edge.com/T05E1DXNQ9K-U05FEHT63GD-e186a41c261c-512' },
    { id: '9', name: 'Melany Kunzi', profileImage: 'https://avatars.githubusercontent.com/u/72222647?v=4' },
    { id: '10', name: 'Nicolás Balaudo', profileImage: 'https://avatars.githubusercontent.com/u/100486438?s=96&v=4' },
    { id: '11', name: 'Nicolás Gabrieloni', profileImage: 'https://avatars.githubusercontent.com/u/107143296?s=96&v=4' },
    { id: '12', name: 'Nicolas Müller', profileImage: 'https://avatars.githubusercontent.com/u/93680135?s=96&v=4' },
    { id: '13', name: 'OrnellaGrigolato', profileImage: 'https://avatars.githubusercontent.com/u/62859666?s=96&v=4' },
    { id: '15', name: 'Pablo Rumualdo', profileImage: 'https://avatars.githubusercontent.com/u/89166782?s=96&v=4' },
    { id: '16', name: 'SchroederSimon', profileImage: 'https://avatars.githubusercontent.com/u/94482697?s=96&v=4' },
    { id: '17', name: 'Agustin Trossero', profileImage: 'https://avatars.githubusercontent.com/u/97963783?s=96&v=4' },
    { id: '18', name: 'Waldemar Galizzi', profileImage: 'https://avatars.githubusercontent.com/u/86132080?s=96&v=4' },
    { id: '18', name: 'Marcos Muga', profileImage: 'https://ca.slack-edge.com/T05E1DXNQ9K-U05FLJ81FHS-65c56450df17-512' },
    // Agrega más estudiantes según sea necesario
  ];

  const projects: Project[] = [
    { id: '1', title: 'Pedido Crombie', description: 'Una plataforma innovadora para realizar pedidos en línea de productos exclusivos. Simplificamos la experiencia del usuario, ofreciendo opciones personalizadas y un proceso de pago seguro.',
      teamMembers: [
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/72222647?v=4' },
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/128873414?v=4' },
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/109991981?s=96&v=4' },
      ],
      githubLink: 'https://github.com/Catul0/pedidos-crombie-tp',
    },

    { id: '2', title: 'Gestor de finanzas', description: 'Una aplicación completa para gestionar tus finanzas personales. Con funciones de seguimiento de gastos, generación de informes y sugerencias de ahorro, te ayudamos a alcanzar tus metas financieras.',
      teamMembers: [
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/116530255?s=96&v=4' },
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/62859666?s=96&v=4' },
        { name: ' ', profileImage: 'https://avatars.githubusercontent.com/u/97963783?s=96&v=4' },
      ],
      githubLink: 'https://github.com/OrnellaGrigolato/Finance-Manager',
    },

    { id: '3', title: 'Pedido Crombie', description: 'Una solución completa para comercio electrónico que permite a los usuarios crear tiendas en línea, gestionar inventarios y procesar transacciones seguras. ¡Impulsa tu negocio con nuestra plataforma!',
      teamMembers: [
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/100486438?s=96&v=4' },
        { name: '', profileImage: 'https://ca.slack-edge.com/T05E1DXNQ9K-U05FLJ81FHS-65c56450df17-512' },
        { name: '', profileImage: 'https://ca.slack-edge.com/T05E1DXNQ9K-U05F2A7U2K1-a5be0c54867a-512' },
      ],
      githubLink: 'https://github.com/Catul0/pedidos-crombie-tp',
    },

    { id: '4', title: 'Gestor de finanzas', description: 'Una billetera digital avanzada para gestionar tus criptomonedas y realizar transacciones de manera segura. Mantén el control total de tus activos digitales con nuestra interfaz fácil de usar.',
      teamMembers: [
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/112912320?s=96&v=4' },
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/89166782?s=96&v=4' },
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/94482697?s=96&v=4' },
      ],
      githubLink: 'https://github.com/RumualdoPablo/crombiewallet2.0',
    },

    { id: '5', title: 'Pedido Crombie', description: 'Una aplicación móvil para realizar pedidos de productos Crombie de manera rápida y sencilla. Explora nuestro catálogo y recibe tus productos favoritos directamente en tu puerta.',
      teamMembers: [
        { name: '', profileImage: 'https://ca.slack-edge.com/T05E1DXNQ9K-U05FEHT63GD-e186a41c261c-512' },
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/93680135?s=96&v=4' },
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/86132080?s=96&v=4' },
      ],
      githubLink: 'https://github.com/Giovistica/pedidos-crombie',
    },

    { id: '6', title: 'Pagina de Comida', description: 'Explora las delicias culinarias con nuestra aplicación de pedidos de comida en línea. Desde restaurantes locales hasta tus platillos favoritos, ¡te lo llevamos directamente a tu puerta!',
      teamMembers: [
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/103588764?s=96&v=4' },
        { name: '', profileImage: 'https://avatars.githubusercontent.com/u/107143296?s=96&v=4' },
        { name: '', profileImage: 'https://ca.slack-edge.com/T05E1DXNQ9K-U05FE7WMEHK-c5df1f6dbe2e-512' },
      ],
      githubLink: 'https://github.com/Catul0/pedidos-crombie-tp',
    },
    // Agrega más proyectos según sea necesario
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <section className='w-full bg-black flex flex-col justify-end items-center p-10 lg:pt-20'>
        <div className='mb-auto text-center'>
          <Chip variant='flat' className='inline-flex' color='danger'>
            Escuelita version 3.0 🚀
          </Chip>
          <div className='flex items-center lg:space-x-4 flex-col lg:flex-row'>
            <CrombieLogo width={200} height='100%' className='mt-10 block lg:hidden' />
            <h1 className='mt-4 text-6xl font-bold text-white'>
              Bootcamp de programación
            </h1>
          </div>
          <p className='mt-4 text-md text-gray-300'>
            Tu Portal hacia un universo de codificación y creatividad
          </p>
        </div>
        <div className='w-3/4 h-[800px] border border-divider rounded-3xl mt-20 overflow-hidden'>
          <iframe
            width='100%'
            height='100%'
            src='https://www.youtube.com/embed/oV4InyT-fEU?si=Qd7goEH5ZEJnPX-n'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className='w-full bg-black flex flex-col items-center px-10'>
        <h2 className='mt-4 text-4xl font-bold text-white'>Proyectos y Estudiantes</h2>

        <div className='w-full mt-8'>
          <Slider {...sliderSettings}>
            {students.map((student) => (
              <div key={student.id} className='p-4'>
                <div className='bg-zinc-950 p-4 rounded-md shadow-md'>
                  <img
                    src={student.profileImage}
                    alt={`${student.name} profile`}
                    className='w-20 h-20 rounded-full mx-auto mb-4'
                  />
                  <p className='text-center font-semibold'>{student.name}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <h2 className='mt-4 text-4xl font-bold text-white'>Proyecto Final en Grupo</h2>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 text-center'>
          {projects.map((project) => (
            <div key={project.id} className='bg-zinc-950 p-4 rounded-md shadow-md transition-transform transform hover:scale-105'>
              <h3 className='text-xl font-bold mb-2'>{project.title}</h3>
              <p>{project.description}</p>
              <div className='flex justify-center mt-4 space-x-4'>
                {project.teamMembers.map((member, index) => (
                  <div key={index} className='text-center'>
                    <img
                      src={member.profileImage}
                      alt={`${member.name} profile`}
                      className='w-16 h-16 rounded-full object-cover mx-auto mb-2'
                    />
                    <p>{member.name}</p>
                  </div>
                ))}
              </div>
              <div className='mt-4 text-center'>
                <a href={project.githubLink} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>
                  Ver en GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className='w-full bg-black flex flex-col items-center px-10'>
          <h2 className='mt-4 text-4xl font-bold text-white'>Contáctanos</h2>
          <div className='flex mt-8 space-x-6'>
            {/* Icono de LinkedIn */}
            <a href='URL_DE_TU_LINKEDIN' target='_blank' rel='noopener noreferrer'>
              <FaLinkedin className='text-4xl text-blue-500 hover:text-blue-700 cursor-pointer' />
            </a>
            {/* Icono de GitHub */}
            <a href='https://github.com/escuelitacrombie' target='_blank' rel='noopener noreferrer'>
              <FaGithub className='text-4xl text-gray-500 hover:text-gray-700 cursor-pointer' />
            </a>
            {/* Icono de Correo Electrónico */}
            <a href='mailto:TU_CORREO@DOMINIO.COM'>
              <FaEnvelope className='text-4xl text-red-500 hover:text-red-700 cursor-pointer' />
            </a>
          </div>
        </section>
    </>
  );
}

