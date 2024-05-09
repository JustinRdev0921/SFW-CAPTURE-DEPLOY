// options.js
import { getAreasRequest, getGruposRequest, getTiposDocRequest } from "../api/procesing";

export const listNames = {
  ciudad: "Ciudad",
  departamento: "Departamento",
  area: "Área",
  admin: "¿Es Administrador?",
  grupo: "Grupo Documental",
  tipo: "Tipo Documental"
};

export const adminOptions = [{ id: 1, nombre: "Sí" }, { id: 0, nombre: "No" }];


export const activoOptions = [{ id: 1, nombre: "Activo" }, { id: 0, nombre: "Inactivo" }];


export const ciudadesOptions = [
  { id: "CUE", nombre: "CUENCA" },
  { id: "GYE", nombre: "GUAYAQUIL" },
  { id: "MCH", nombre: "MACHALA" },
  { id: "UIO", nombre: "QUITO" },

];


export const departamentoOptionsS = [
  { id: "RH", nombre: "RECURSOS HUMANOS" },
];

export const areasOptionsS = [
  { id: "SEL", nombre: "Selección" },
  { id: "SER-PER", nombre: "Servicios al personal" },
  { id: "NOM", nombre: "Nómina" },
  { id: "TRAB-SOC", nombre: "Trabajo Social" },
];
/*
  export const gruposOptions = [
    { id: 1, nombre: "Concursos Internos", idArea: 1},
    { id: "CONT-PER", nombre: "Contratación de Personal", idArea: "SEL"},
    { id: 3, nombre: "Entrenamiento al Personal", idArea: "SEL"},
    { id: 4, nombre: "Evaluación de desempeño", idArea: 1},
    { id: 5, nombre: "Pre-Selección", idArea: 1},
    { id: 6, nombre: "Selección de Personal", idArea: 1},
    { id: 7, nombre: "Afiliación de Comisariatos", idArea: 2},
    { id: 8, nombre: "Control de asistencia", idArea: 3},
    { id: 9, nombre: "Seguros Privados", idArea: 4},
  ];
  
  export const tipoDocumentoOptions = [
    { id: "ACU-CONF", nombre: "Acuerdo de Confidencialidad", idGrupo: "CONT-PER"},
    { id: 2, nombre: "Aviso de Entrada IESS", idGrupo: "CONT-PER" },
    { id: 3, nombre: "Certificado entrega de contratos", idGrupo: "CONT-PER" },
    { id: 4, nombre: "Contrato de Trabajo", idGrupo: "CONT-PER" },
    { id: 5, nombre: "Cuestionario Induccion", idGrupo: "CONT-PER" },
    { id: 6, nombre: "Ingreso Contrato SUT", idGrupo: "CONT-PER" },
    { id: 7, nombre: "Autorizacion de descuentos sobre salario de Comisa", idGrupo: 2 },
    { id: 8, nombre: "Registro de asistencia", idGrupo: 4 },
    { id: 9, nombre: "Autorizacion de descuento en rol de pagos", idGrupo: 5 },
  ];*/

export const sitiosOptions = [
  { id: "RH-GER", nombre: "RRHH GERENCIA" },
  { id: "RH-ADM", nombre: "RRHH ADMINISTRACION" },
  { id: "RH-PLA", nombre: "RRHH PLANTA" },
  { id: "RH-ENT", nombre: "RRHH ENTRENAMIENTO" },
];

/*
export let areasOptions = [];
export let gruposOptions = [];
export let tipoDocumentoOptions = [];*/
/*
export const loadOptionsData = async () => {
  try {
    areasOptions = await getAreasRequest();
    gruposOptions = await getGruposRequest();
    tipoDocumentoOptions = await getTiposDocRequest();
  } catch (error) {
    console.error('Error loading options data:', error);
  }
};

// Llamamos a la función para cargar los datos al importar este archivo
loadOptionsData();*/
