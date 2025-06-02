import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import accentureLogo from './assets/patrocinadores/accenture.png';
import lenovoLogo from './assets/patrocinadores/lenovo.svg';
import raspberryLogo from './assets/patrocinadores/raspberry.png';
import tecLogo from './assets/patrocinadores/tec.png';
import udemLogo from './assets/patrocinadores/udem.png';

/***********************
 *  NEW APP LAYOUT – inspired by  *
 *  https://codeclub.org          *
 ***********************************/

interface StatCard {
  title: string;
  subtitle: string;
  bg: string; // bg-color class
  Icon?: () => JSX.Element;
}

// API helpers
async function fetchWorkshops() {
  const res = await fetch('http://localhost:3000/workshops');
  return res.json();
}
async function fetchDates() {
  const res = await fetch('http://localhost:3000/dates');
  return res.json();
}
async function createWorkshop(workshop) {
  const res = await fetch('http://localhost:3000/workshops', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(workshop)
  });
  return res.json();
}
async function createDate(date) {
  const res = await fetch('http://localhost:3000/dates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date })
  });
  return res.json();
}

export default function App() {
  /*-------------------------------------------------------
   * STATE & HELPERS (se mantienen igual que tu versión anterior)
   * ----------------------------------------------------------------*/

  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    nombreParticipante: "",
    apellidosParticipante: "",
    correoParticipante: "",
    fechaNacimientoDia: "",
    fechaNacimientoMes: "",
    fechaNacimientoAnio: "",
    edadRegistro: "",
    genero: "",
    municipio: "",
    nombreTutor: "",
    parentescoTutor: "",
    correoTutor: "",
    telefonoTutor: "",
    nombreEscuela: "",
    tipoEscuela: "",
    gradoEscolar: "",
    experienciaPreviaProgramacion: "",
    participadoAntesCiberistas: "",
    comoSeEntero: "",
    otroComoSeEntero: "",
    suenoProfesional: "",
    sede: "Tecnológico de Monterrey, Campus Monterrey",
    taller: "",
    modalidad: "Presencial",
    horario: "",
    aceptaTerminos: false,
    avisoPrivacidad: false,
    codigoEtica: false,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((p) => ({ ...p, [name]: checked }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
    if (name === "comoSeEntero" && value !== "Otro") {
      setFormData((p) => ({ ...p, otroComoSeEntero: "" }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    alert("Inscripción enviada con éxito (simulación).");
  };

  /* calcular edad (igual que antes) --- */
  useEffect(() => {
    const { fechaNacimientoDia, fechaNacimientoMes, fechaNacimientoAnio } =
      formData;
    if (fechaNacimientoDia && fechaNacimientoMes && fechaNacimientoAnio) {
      const day = parseInt(fechaNacimientoDia, 10);
      const month = parseInt(fechaNacimientoMes, 10) - 1;
      const year = parseInt(fechaNacimientoAnio, 10);
      if (
        !isNaN(day) &&
        !isNaN(month) &&
        !isNaN(year) &&
        year > 1900 &&
        year <= new Date().getFullYear() &&
        month >= 0 &&
        month < 12 &&
        day > 0 &&
        day <= 31
      ) {
        const birthDate = new Date(year, month, day);
        if (
          birthDate.getFullYear() === year &&
          birthDate.getMonth() === month &&
          birthDate.getDate() === day
        ) {
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          setFormData((p) => ({ ...p, edadRegistro: age.toString() }));
        }
      }
    }
  }, [formData.fechaNacimientoDia, formData.fechaNacimientoMes, formData.fechaNacimientoAnio]);

  // Validación de campos requeridos por paso
  function isStepValid(step: number) {
    if (step === 1) {
      if (!formData.nombreParticipante.trim()) return false;
      if (!formData.apellidosParticipante.trim()) return false;
      if (!formData.correoParticipante.trim()) return false;
      if (!formData.fechaNacimientoDia.trim() || !formData.fechaNacimientoMes.trim() || !formData.fechaNacimientoAnio.trim()) return false;
      if (!formData.genero.trim()) return false;
      if (!formData.municipio.trim()) return false;
      // Si es menor de edad, validar tutor
      if (parseInt(formData.edadRegistro, 10) < 18 || !formData.edadRegistro) {
        if (!formData.nombreTutor.trim()) return false;
        if (!formData.parentescoTutor.trim()) return false;
        if (!formData.correoTutor.trim()) return false;
        if (!formData.telefonoTutor.trim()) return false;
      }
      return true;
    }
    if (step === 2) {
      if (!formData.nombreEscuela.trim()) return false;
      if (!formData.tipoEscuela.trim()) return false;
      if (!formData.gradoEscolar.trim()) return false;
      if (!formData.experienciaPreviaProgramacion.trim()) return false;
      if (!formData.participadoAntesCiberistas.trim()) return false;
      if (!formData.comoSeEntero.trim()) return false;
      if (formData.comoSeEntero === 'Otro' && !formData.otroComoSeEntero.trim()) return false;
      return true;
    }
    // Paso 3: puedes agregar validaciones si hay campos requeridos
    return true;
  }

  // Nueva función para manejar el click en Siguiente con alerta
  const [showStepError, setShowStepError] = useState(false);
  function handleNextStep() {
    if (!isStepValid(step)) {
      setShowStepError(true);
      return;
    }
    setShowStepError(false);
    setStep((s) => Math.min(3, s + 1));
  }

  // Estados para datos de backend
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [dates, setDates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setApiError('');
      try {
        const ws = await fetchWorkshops();
        const ds = await fetchDates();
        setWorkshops(ws.data || ws);
        setDates(ds.data || ds);
      } catch (e) {
        setApiError('Error al cargar datos del servidor');
      }
      setLoading(false);
    }
    loadData();
  }, []);

  /*-------------------------------------------------------
   * ESTÁTICAS PARA UI (Stats y Call-outs)                       
   * ----------------------------------------------------------------*/
  const stats: StatCard[] = [
    {
      title: "+2,500",
      subtitle: "Jóvenes involucrados en Ciberistas",
      bg: "bg-[#3F3D92]",
    },
    {
      title: "12",
      subtitle: "Sedes activas (incl. virtual)",
      bg: "bg-[#FAD8D0]",
    },
    {
      title: "95%",
      subtitle: "Incremento en habilidades y confianza",
      bg: "bg-[#17A8E0]", // ht
    },
  ];

  const actions = [
    {
      title: "Únete a un club",
      text: "Aprende a programar, desarrolla tus habilidades y diviértete.",
      color: "text-[#35A4FF] border-[#35A4FF]",
      icon: "fa-search",
      href: "#talleres-news",
    },
    {
      title: "Organiza un club",
      text: "Inspira a los jóvenes de tu comunidad. No necesitas experiencia previa.",
      color: "text-primary border-primary",
      icon: "fa-code",
      href: "#sedes",
    },
    {
      title: "Sé voluntario",
      text: "Apoya a la próxima generación de creadores digitales.",
      color: "text-pink-500 border-pink-500",
      icon: "fa-heart",
      href: "#contacto",
    },
  ];

  /*-------------------------------------------------------
   *   CLASES DE UTILIDAD (Tailwind)                              
   * ----------------------------------------------------------------*/
  const btnBase =
    "inline-block font-bold py-2 px-6 rounded-full shadow transition-colors duration-300";
  const btnPrimary = `${btnBase} bg-secondary text-accent hover:bg-yellow-300`;
  const btnSecondary = `${btnBase} bg-neutral-white text-primary hover:bg-gray-100`;

  /*-------------------------------------------------------
   *   RENDER                                                     
   * ----------------------------------------------------------------*/
  return (
    <div className="font-poppins">
      {/* -------------------------------------------------------- HEADER */}
      <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src="/logo192.png" // Assuming logo192.png is in the public folder
              alt="Logo"
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-bold text-accent">CIBERISTAS</h1>
          </div>

          <nav className="hidden md:flex space-x-8 font-semibold text-accent">
            <a href="#talleres-news" className="hover:text-primary">
              Talleres
            </a>
            <a href="#sedes" className="hover:text-primary">
              Sedes
            </a>
            <a href="#testimonios" className="hover:text-primary">
              Testimonios
            </a>
            <a href="#contacto" className="hover:text-primary">
              Contacto
            </a>
            <a href="#inscripcion" className={btnPrimary}>
              Inscribirse
            </a>
          </nav>

          {/* Mobile */}
          <button
            className="md:hidden text-accent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-2xl`} />
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden bg-white shadow-md py-4 space-y-2 text-center font-semibold text-accent">
            {[
              { label: "Talleres", href: "#talleres-news" },
              { label: "Sedes", href: "#sedes" },
              { label: "Testimonios", href: "#testimonios" },
              { label: "Contacto", href: "#contacto" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#inscripcion"
              className={`${btnPrimary} w-11/12 mx-auto`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Inscribirse
            </a>
          </nav>
        )}
      </header>

      {/* -------------------------------------------------------- HERO */}
      <section className="container mx-auto px-4 md:px-8 mt-12 grid md:grid-cols-2 gap-8 items-center">
        {/* LEFT CARD */}
        <div className="bg-primary text-neutral-white rounded-[40px] p-10 flex flex-col space-y-8">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Somos Ciberistas
          </h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-md">
            Aprende a programar, da forma al futuro. Únete a una comunidad global
            de jóvenes creadores digitales.
          </p>
          <div className="space-x-4">
            <a href="#talleres-news" className={btnSecondary}>
              Encuentra un Taller
            </a>
            <a href="#inscripcion" className={btnPrimary}>
              Inscríbete Ahora
            </a>
          </div>
        </div>
        {/* RIGHT IMAGE */}
        <img
          src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800"
          alt="Niños programando"
          className="rounded-[40px] shadow-lg object-cover h-full w-full"
        />
      </section>

      {/* -------------------------------------------------------- STATS */}
      <section className="container mx-auto px-4 md:px-8 mt-16 grid md:grid-cols-3 gap-6">
        {stats.map((s) => (
          <div
            key={s.title}
            className={`${s.bg} text-white rounded-[20px] p-8 flex items-center justify-between`}
          >
            <div>
              <h3 className="text-3xl font-extrabold mb-2">{s.title}</h3>
              <p className="opacity-90 leading-snug text-sm md:text-base max-w-[150px]">
                {s.subtitle}
              </p>
            </div>
            {/* Simple icon placeholder */}
            <i className="fas fa-code text-4xl opacity-30" />
          </div>
        ))}
      </section>

      {/* -------------------------------------------------------- ACTIONS (Join un olunteer) */}
      <section className="container mx-auto px-4 md:px-8 mt-24 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-accent">
          Únete a la comunidad Ciberistas
        </h2>
        <p className="max-w-2xl mx-auto text-gray-600 mb-12 leading-relaxed">
          Ciberistas es gratis y está abierto a todos los jóvenes en edad escolar.
          Descubre cómo unirte, organizar o apoyar un club en tu comunidad.
        </p>
        <div className="grid md:grid-cols-3 gap-10">
          {actions.map((a) => (
            <div key={a.title} className="space-y-4">
              {/* curly-braces icon style */}
              <div
                className={`mx-auto w-24 h-24 flex items-center justify-center text-5xl ${a.color} rounded-[30%] border-4`}
              >
                <i className={`fas ${a.icon}`} />
              </div>
              <h3 className="text-xl font-bold text-accent">{a.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm max-w-xs mx-auto">
                {a.text}
              </p>
              <a href={a.href} className={`${btnSecondary} border ${a.color} !px-8`}>
                Saber más
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------- RESTO DE SECCIONES  */}
      {/* Usa los datos de backend en vez de datos hardcodeados */}
      <section id="talleres-news" className="bg-neutral py-16 px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-accent">Talleres Destacados</h2>
          {loading ? (
            <div className="text-center text-gray-500">Cargando talleres...</div>
          ) : apiError ? (
            <div className="text-center text-red-500">{apiError}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workshops.map(taller => (
                <div key={taller.id || taller.name} className="bg-neutral-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <h3 className="text-2xl font-bold text-accent mb-3">{taller.name || taller.nombre}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed flex-grow">{taller.description || taller.descripcion}</p>
                  <span className="inline-block bg-primary text-neutral-white text-sm font-semibold px-3 py-1 rounded-full mt-auto self-start">{taller.ages ? `Edad: ${taller.ages}` : taller.fecha ? `Fecha: ${taller.fecha}` : ''}</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <a href="#inscripcion" className={btnPrimary}>
              ¡Regístrate en un Taller!
            </a>
          </div>
        </div>
      </section>

      <section id="sedes" className="bg-neutral-white py-16 px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-accent">Sedes Participantes</h2>
          <p className="max-w-2xl mx-auto text-gray-600 mb-12 leading-relaxed">
            Ciberistas está en múltiples sedes, incluyendo campus universitarios y centros comunitarios. También virtual.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {['Tec de Monterrey (Monterrey)', 'UDEM', 'UANL', 'ITCM', 'UNAM', 'UdeG', 'Biblioteca Central NL', 'Campus Virtual'].map(sede => (
              <div key={sede} className="bg-neutral rounded-lg p-4 shadow hover:shadow-md transition-shadow duration-300">
                <p className="text-accent font-semibold">{sede}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral py-16 px-8">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-10 text-accent">Nuestros Patrocinadores</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center">
            {[
              { src: accentureLogo, alt: 'Accenture' },
              { src: lenovoLogo, alt: 'Lenovo' },
              { src: raspberryLogo, alt: 'Raspberry Pi' },
              { src: tecLogo, alt: 'Tecnológico de Monterrey' },
              { src: udemLogo, alt: 'UDEM' },
            ].map(sponsor => (
              <img 
                key={sponsor.alt}
                src={sponsor.src}
                alt={sponsor.alt}
                className="mx-auto h-12 filter grayscale hover:grayscale-0 transition-all duration-300 object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      <section id="testimonios" className="bg-neutral-white py-16 px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-accent">Testimonios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ /* Array of testimonial data */
              { quote: 'Este programa me inspiró a estudiar ingeniería. Aprendí mucho y conocí amigos con mis mismos intereses.', author: 'Andrea, 15 años' },
              { quote: 'Los talleres de Ciberistas son divertidos y prácticos. Ahora puedo crear mis propias apps sencillas.', author: 'Carlos, 12 años' },
              { quote: 'Como padre, ver a mi hija entusiasmada con la tecnología gracias a Ciberistas no tiene precio.', author: 'María, madre de participante' },
            ].map(testimonial => (
              <div key={testimonial.author} className="bg-neutral-white rounded-xl shadow-md p-6 text-accent italic hover:shadow-lg transition-shadow duration-300">
                {/* Consider adding an avatar/icon */}
                <p className="mb-4 leading-relaxed">"{testimonial.quote}"</p>
                <p className="mt-4 font-bold text-right not-italic text-primary">– {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inscripcion" className="bg-neutral py-16 px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-10 text-accent">Formulario de Inscripción</h2>
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-neutral-white p-8 rounded-xl shadow-xl">
            <ol className="flex items-center justify-between mb-10">
              {['Participante', 'Escuela', 'Talleres'].map((stepName, index) => {
                const stepIndex = index + 1;
                let statusClass = 'text-gray-300';
                let circleClass = 'bg-gray-300';
                if (step > stepIndex) { statusClass = 'text-primary'; circleClass = 'bg-primary'; }
                else if (step === stepIndex) { statusClass = 'text-secondary font-bold'; circleClass = 'bg-secondary'; }
                return (
                  <li key={stepIndex} className={`flex-1 text-center ${statusClass} transition-colors duration-300`}>
                    <div className={`w-8 h-8 mx-auto rounded-full ${circleClass} text-neutral-white flex items-center justify-center mb-2 transition-colors duration-300`}>{stepIndex}</div>
                    <span className="block text-sm font-medium">{stepName}</span>
                  </li>
                );
              })}
            </ol>

            {step === 1 && (
              <div className="mb-8 p-6 bg-transparent shadow-none p-0"> {/* Adjusted for nesting */}
                <h3 className="text-2xl font-bold text-accent mb-6 border-b border-gray-300 pb-3">Datos del Participante y Tutor</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="nombreParticipante" className="block text-sm font-medium text-accent mb-1">Nombre del Participante <span className="text-red-500">*</span></label>
                    <input type="text" id="nombreParticipante" name="nombreParticipante" value={formData.nombreParticipante} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required />
                  </div>
                  <div>
                    <label htmlFor="apellidosParticipante" className="block text-sm font-medium text-accent mb-1">Apellidos del Participante <span className="text-red-500">*</span></label>
                    <input type="text" id="apellidosParticipante" name="apellidosParticipante" value={formData.apellidosParticipante} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required />
                  </div>
                  <div>
                    <label htmlFor="correoParticipante" className="block text-sm font-medium text-accent mb-1">Correo Electrónico del Participante <span className="text-red-500">*</span></label>
                    <input type="email" id="correoParticipante" name="correoParticipante" value={formData.correoParticipante} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required />
                  </div>
                  <fieldset className="space-y-2">
                    <legend className="block text-sm font-medium text-accent mb-1">Fecha de Nacimiento <span className="text-red-500">*</span></legend>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="fechaNacimientoDia" className="block text-xs font-medium text-gray-600">Día</label>
                        <input type="number" id="fechaNacimientoDia" name="fechaNacimientoDia" value={formData.fechaNacimientoDia} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" placeholder="DD" min="1" max="31" required />
                      </div>
                      <div>
                        <label htmlFor="fechaNacimientoMes" className="block text-xs font-medium text-gray-600">Mes</label>
                        <input type="number" id="fechaNacimientoMes" name="fechaNacimientoMes" value={formData.fechaNacimientoMes} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" placeholder="MM" min="1" max="12" required />
                      </div>
                      <div>
                        <label htmlFor="fechaNacimientoAnio" className="block text-xs font-medium text-gray-600">Año</label>
                        <input type="number" id="fechaNacimientoAnio" name="fechaNacimientoAnio" value={formData.fechaNacimientoAnio} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" placeholder="AAAA" min="1920" max={new Date().getFullYear()} required />
                      </div>
                    </div>
                  </fieldset>
                  <div>
                    <label htmlFor="edadRegistro" className="block text-sm font-medium text-accent mb-1">Edad (al momento del registro)</label>
                    <input type="text" id="edadRegistro" name="edadRegistro" value={formData.edadRegistro} className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300 cursor-not-allowed" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-accent mb-1">Género <span className="text-red-500">*</span></label>
                    <div className="mt-2 space-y-2 md:space-y-0 md:space-x-4 md:flex">
                      {['Masculino', 'Femenino', 'Otro', 'Prefiero no decir'].map(option => (
                        <label key={option} className="inline-flex items-center text-sm text-gray-600 cursor-pointer">
                          <input type="radio" name="genero" value={option} checked={formData.genero === option} onChange={handleChange} className="focus:ring-primary h-4 w-4 text-primary border-gray-300 transition-all duration-300" required />
                          <span className="ml-2">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="municipio" className="block text-sm font-medium text-accent mb-1">Municipio de Residencia <span className="text-red-500">*</span></label>
                    <input type="text" id="municipio" name="municipio" value={formData.municipio} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required />
                  </div>

                  {(parseInt(formData.edadRegistro, 10) < 18 || !formData.edadRegistro) && (
                    <fieldset className="mt-6 pt-6 border-t border-gray-300">
                        <legend className="block text-sm font-medium text-accent mb-1 text-base">Datos del Padre, Madre o Tutor <span className="text-red-500">*</span></legend>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="nombreTutor" className="block text-sm font-medium text-accent mb-1">Nombre Completo del Tutor <span className="text-red-500">*</span></label>
                                <input type="text" id="nombreTutor" name="nombreTutor" value={formData.nombreTutor} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required={parseInt(formData.edadRegistro, 10) < 18} />
                            </div>
                            <div>
                                <label htmlFor="parentescoTutor" className="block text-sm font-medium text-accent mb-1">Parentesco <span className="text-red-500">*</span></label>
                                <input type="text" id="parentescoTutor" name="parentescoTutor" value={formData.parentescoTutor} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required={parseInt(formData.edadRegistro, 10) < 18} />
                            </div>
                            <div>
                                <label htmlFor="correoTutor" className="block text-sm font-medium text-accent mb-1">Correo Electrónico del Tutor <span className="text-red-500">*</span></label>
                                <input type="email" id="correoTutor" name="correoTutor" value={formData.correoTutor} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required={parseInt(formData.edadRegistro, 10) < 18} />
                            </div>
                            <div>
                                <label htmlFor="telefonoTutor" className="block text-sm font-medium text-accent mb-1">Teléfono de Contacto del Tutor <span className="text-red-500">*</span></label>
                                <input type="tel" id="telefonoTutor" name="telefonoTutor" value={formData.telefonoTutor} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required={parseInt(formData.edadRegistro, 10) < 18} />
                            </div>
                        </div>
                    </fieldset>
                  )}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="mb-8 p-6 bg-transparent shadow-none p-0"> 
                <h3 className="text-2xl font-bold text-accent mb-6 border-b border-gray-300 pb-3">Escuela y Experiencia</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="nombreEscuela" className="block text-sm font-medium text-accent mb-1">Nombre de la Escuela <span className="text-red-500">*</span></label>
                    <input type="text" id="nombreEscuela" name="nombreEscuela" value={formData.nombreEscuela} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required />
                  </div>
                  <div>
                    <label htmlFor="tipoEscuela" className="block text-sm font-medium text-accent mb-1">Tipo de Escuela <span className="text-red-500">*</span></label>
                    <select id="tipoEscuela" name="tipoEscuela" value={formData.tipoEscuela} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required>
                      <option value="">Seleccione...</option>
                      <option value="Pública">Pública</option>
                      <option value="Privada">Privada</option>
                      <option value="Otra">Otra</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="gradoEscolar" className="block text-sm font-medium text-accent mb-1">Último Grado Escolar Concluido <span className="text-red-500">*</span></label>
                    <input type="text" id="gradoEscolar" name="gradoEscolar" value={formData.gradoEscolar} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" placeholder="Ej: 6to Primaria, 2do Secundaria" required />
                  </div>
                  <div>
                    <label htmlFor="experienciaPreviaProgramacion" className="block text-sm font-medium text-accent mb-1">¿Tienes experiencia previa en programación? <span className="text-red-500">*</span></label>
                    <select id="experienciaPreviaProgramacion" name="experienciaPreviaProgramacion" value={formData.experienciaPreviaProgramacion} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required>
                      <option value="">Seleccione...</option>
                      <option value="Nada">Nada, ¡pero con muchas ganas de aprender!</option>
                      <option value="Básica">Básica (conozco algunos conceptos)</option>
                      <option value="Intermedia">Intermedia (he hecho algunos proyectos)</option>
                      <option value="Avanzada">Avanzada (programo regularmente)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-accent mb-1">¿Has participado antes en Ciberistas? <span className="text-red-500">*</span></label>
                    <div className="mt-2 space-x-4 flex">
                        {['Sí', 'No'].map(option => (
                            <label key={option} className="inline-flex items-center text-sm text-gray-600 cursor-pointer">
                                <input type="radio" name="participadoAntesCiberistas" value={option} checked={formData.participadoAntesCiberistas === option} onChange={handleChange} className="focus:ring-primary h-4 w-4 text-primary border-gray-300 transition-all duration-300" required/>
                                <span className="ml-2">{option}</span>
                            </label>
                        ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="comoSeEntero" className="block text-sm font-medium text-accent mb-1">¿Cómo te enteraste de Ciberistas? <span className="text-red-500">*</span></label>
                    <select id="comoSeEntero" name="comoSeEntero" value={formData.comoSeEntero} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required>
                      <option value="">Seleccione...</option>
                      <option value="Redes Sociales">Redes Sociales (Facebook, Instagram, etc.)</option>
                      <option value="Amigos o Familiares">Amigos o Familiares</option>
                      <option value="Escuela o Maestros">Escuela o Maestros</option>
                      <option value="Publicidad en Internet">Publicidad en Internet</option>
                      <option value="Evento o Feria">Evento o Feria</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>
                  {formData.comoSeEntero === 'Otro' && (
                    <div>
                      <label htmlFor="otroComoSeEntero" className="block text-sm font-medium text-accent mb-1">Por favor, especifica <span className="text-red-500">*</span></label>
                      <input type="text" id="otroComoSeEntero" name="otroComoSeEntero" value={formData.otroComoSeEntero} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300" required />
                    </div>
                  )}
                  <div>
                    <label htmlFor="suenoProfesional" className="block text-sm font-medium text-accent mb-1">¿Cuál es tu sueño profesional o qué te gustaría ser de grande?</label>
                    <textarea id="suenoProfesional" name="suenoProfesional" value={formData.suenoProfesional} onChange={handleChange} rows={3} className="mt-1 block w-full px-3 py-2 bg-neutral-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm transition-all duration-300 leading-relaxed" placeholder="Ej: Ingeniero/a en software, astronauta, artista digital..."></textarea>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="mb-8 p-6 bg-transparent shadow-none p-0"> 
                <h3 className="text-2xl font-bold text-accent mb-6 border-b border-gray-300 pb-3">Talleres y Consentimiento</h3>
                <div className="space-y-6">
                  <div>
                    {/* Content for this div */}
                  </div>
                </div>
              </div>
            )}
            {/* Step navigation buttons */}
            {showStepError && (
              <div className="text-red-600 text-sm mb-4">Por favor, llena todos los campos obligatorios antes de continuar.</div>
            )}
            <div className="flex justify-between mt-10">
              {step > 1 ? (
                <button
                  type="button"
                  className={`${btnSecondary} border border-gray-300`}
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                >
                  Anterior
                </button>
              ) : <div />}
              {step < 3 ? (
                <button
                  type="button"
                  className={`${btnPrimary}`}
                  onClick={handleNextStep}
                >
                  Siguiente
                </button>
              ) : (
                <button type="submit" className={`${btnPrimary}`}>Enviar inscripción</button>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* -------------------------------------------------------- FOOTER (simplificado) */}
      <footer className="bg-primary text-neutral-white py-8 mt-24">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2023 Ciberistas. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#talleres-news" className="hover:underline">Talleres</a>
            <a href="#sedes" className="hover:underline">Sedes</a>
            <a href="#testimonios" className="hover:underline">Testimonios</a>
            <a href="#contacto" className="hover:underline">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}