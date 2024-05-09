import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {ciudadesOptions, sitiosOptions,} from "../api/options";
import { fileUploadRequest } from "../api/usuarios";
import { getEmpleadoRequest } from "../api/empleado";
import { createProcesingRequest, getAreasRequest, getGruposRequest, getTiposDocRequest } from "../api/procesing";
import Card from "../components/Card";
import { Input } from "../components/ui/Input";

import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function CargaDocsPage() {
  const { user, isAuthenticated } = useAuth();
  const {
    register: registerBuscar,
    handleSubmit: handleSubmitBuscar,
    setValue: setValueBuscar,
    formState: { errors: errorsBuscar },
    watch: watchBuscar,
  } = useForm();
  const {
    register: registerEnviar,
    handleSubmit: handleSubmitEnviar,
    setValue: setValueEnviar,
    formState: { errors: errorsEnviar },
    watch: watchEnviar,
  } = useForm();
  const [filteredGrupos, setFilteredGrupos] = useState([]);
  const [filteredTipos, setFilteredTipos] = useState([]);
  const selectedArea = watchEnviar("area");
  const selectedGrupo = watchEnviar("grupo");
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [pdfFile, setPDFFile] = useState(null);
  const [visualizadorPdf, setVisualizadorPdf] = useState(null);
  const fileType = ["application/pdf"];
  const [empleado, setEmpleado] = useState(null);
  const usuario = user.username;
  const [numeroExpediente, setNumeroExpediente] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar el loader
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mostrar el mensaje de éxito
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mostrar el mensaje de error

  const [areasOptions, setAreasOptions] = useState([]);
  const [gruposOptions, setGruposOptions] = useState([]);
  const [tipoDocumentoOptions, setTipoDocumentoOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const areasResponse = await getAreasRequest();
        setAreasOptions(areasResponse.data);

        const gruposResponse = await getGruposRequest();
        setGruposOptions(gruposResponse.data);
        console.log(gruposOptions);

        const tiposDocResponse = await getTiposDocRequest();
        setTipoDocumentoOptions(tiposDocResponse.data);
        console.log(tipoDocumentoOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    const filteredGrupos = gruposOptions.filter(
      (grupo) => grupo.idArea === String(selectedArea)
    );
    setFilteredGrupos(filteredGrupos);
    setValueEnviar("grupo", "");
    setValueEnviar("tipoDocumento", "");
  }, [selectedArea, gruposOptions, setValueEnviar]);

  useEffect(() => {
    const filteredTipos = tipoDocumentoOptions.filter(
      (tipo) => tipo.idGrupo === String(selectedGrupo)
    );
    setFilteredTipos(filteredTipos);
    //console.log(filteredTipos);
    setValueEnviar("tipoDocumento", "");
  }, [selectedGrupo,tipoDocumentoOptions, setValueEnviar]);

  const onSubmitBuscar = handleSubmitBuscar(async (data) => {
    try {
      const res = await getEmpleadoRequest(data.nroExpediente);
      //console.log(res.data.EMPLEADOS[0].APELLIDOS);
      setNumeroExpediente(data.nroExpediente);
      //console.log(res.data.EMPLEADOS[0]);
      setEmpleado(res.data.EMPLEADOS[0]);
      //console.log(empleado.APELLIDOS);
    } catch (error) {
      console.log(error);
    }
  });

  const onSubmitEnviar = handleSubmitEnviar(async (data) => {
    try {
      const idProcesamiento = uuidv4();
      if (archivoSeleccionado) {
        setLoading(true);
        const formData = new FormData();
        formData.append("numeroExpediente", numeroExpediente);
        formData.append("idProcesamiento", idProcesamiento);
        formData.append("idSitio", data.sitio);
        formData.append("idCiudad", data.ciudad);
        formData.append("idArea", data.area);
        formData.append("idGrupo", data.grupo);
        formData.append("idTipoDoc", data.tipoDocumento);
        const fechaProcesamiento = new Date(data.fecha);
        formData.append("fechaProcesamiento", fechaProcesamiento.toISOString());
        formData.append("archivo", archivoSeleccionado);
        formData.append("username", usuario);

        const response = await fileUploadRequest(formData);
        if (response.status === 200) {
          const respuestaEnvio = await createProcesingRequest({
            numeroExpediente,
            idProcesamiento,
            idSitio: data.sitio,
            idCiudad: data.ciudad,
            idArea: data.area,
            idGrupo: data.grupo,
            idTipoDoc: data.tipoDocumento,
            fechaProcesamiento: fechaProcesamiento.toISOString(),
            nombreArchivo: `${idProcesamiento}-_-${numeroExpediente}.pdf`,
            username: usuario,
            cedula: empleado.CEDULA,
            apellidos: empleado.APELLIDOS,
            nombres: empleado.NOMBRES,
            cargo: empleado.CARGO,
            division: empleado.DIVISION,
            seleccion: empleado.SELECCION,
            ciudad: empleado.CIUDAD,
            tipoContrato: empleado.TIPO_CONTRATO,
            estadoEmpleado: empleado.ESTADO,
          });
          setSuccessMessage("¡Proceso completado con éxito!");
        } else {
          setErrorMessage(
            "Error al cargar el archivo. Por favor, intenta de nuevo."
          );
        }
      } else {
        console.error("No se ha seleccionado ningún archivo");
        setErrorMessage("No se ha seleccionado ningún archivo");
      }
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
      setErrorMessage(
        "Error al enviar los datos. Por favor, intenta de nuevo."
      );
    } finally {
      setLoading(false); // Ocultar el loader cuando se complete el proceso
    }
  });

  useEffect(() => {
    //console.log('Valor actualizado de pdfFile:', pdfFile);
    if (pdfFile !== null) {
      setVisualizadorPdf(pdfFile);
    } else {
      setVisualizadorPdf(null);
    }
  }, [pdfFile]);

  const handleFileChange = (event) => {
    setArchivoSeleccionado(event.target.files[0]);
    let selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = (event) => {
          //console.log('Contenido del archivo:', event.target.result); // Verificar contenido del archivo
          setPDFFile(event.target.result);
        };
      } else {
        setPDFFile(null);
      }
    } else {
      console.log("Selecciona archivo");
    }
  };

  const newplugin = defaultLayoutPlugin();

  return (
    <div className="flex flex-col items-center justify-start mt-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Formulario de Captura de Documentos RRHH
      </h1>
      <div className="w-full max-w-7xl grid grid-cols-4 gap-2 justify-between">
        <form className="col-auto" onSubmit={onSubmitBuscar}>
          <div className="mb-4">
            <label htmlFor="nroExpediente" className="block mb-2">
              Nro expediente
            </label>
            <Input
              {...registerBuscar("nroExpediente", { required: true })}
              type="number"
              id="nroExpediente"
            />
            {errorsBuscar.nroExpediente && (
              <p className="text-red-500">
                El número de expediente es requerido
              </p>
            )}
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Buscar
          </button>
          {empleado ? (
            <Card empleado={empleado} />
          ) : (
            <p className="text-gray-700 text-base">
              No existe información del empleado
            </p>
          )}
        </form>
        <form className="col-span-1 " onSubmit={onSubmitEnviar}>
          <div className="mb-4">
            <label htmlFor="sitio" className="block mb-2">
              Sitio
            </label>
            <select
              {...registerEnviar("sitio", { required: true })}
              id="sitio"
              className="w-full bg-gray-200 rounded-md px-4 py-2"
            >
              {sitiosOptions.map((opcion) => (
                <option key={opcion.id} value={opcion.id}>
                  {opcion.nombre}
                </option>
              ))}
            </select>
            {errorsEnviar.sitio && (
              <p className="text-red-500">El sitio es requerido</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="ciudad" className="block mb-2">
              Ciudad
            </label>
            <select
              {...registerEnviar("ciudad", { required: true })}
              id="ciudad"
              className="w-full bg-gray-200 rounded-md px-4 py-2"
            >
              {ciudadesOptions.map((ciudad) => (
                <option key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </option>
              ))}
            </select>
            {errorsEnviar.ciudad && (
              <p className="text-red-500">La ciudad es requerida</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="area" className="block mb-2">
              Area
            </label>
            <select
              {...registerEnviar("area", { required: true })}
              id="area"
              className="w-full bg-gray-200 rounded-md px-4 py-2"
            >
              {areasOptions.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.nombreArea}
                </option>
              ))}
            </select>
            {errorsEnviar.area && (
              <p className="text-red-500">El área es requerida</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="grupo" className="block mb-2">
              Grupo
            </label>
            <select
              {...registerEnviar("grupo", { required: true })}
              id="grupo"
              className="w-full bg-gray-200 rounded-md px-4 py-2"
            >
              {filteredGrupos.map((grupo) => (
                <option key={grupo.id} value={grupo.id}>
                  {grupo.nombreGrupo}
                </option>
              ))}
            </select>
            {errorsEnviar.grupo && (
              <p className="text-red-500">El grupo es requerido</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="tipoDocumento" className="block mb-2">
              Tipo Documento
            </label>
            <select
              {...registerEnviar("tipoDocumento", { required: true })}
              id="tipoDocumento"
              className="w-full bg-gray-200 rounded-md px-4 py-2"
            >
              {filteredTipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombreTipoDoc}
                </option>
              ))}
            </select>
            {errorsEnviar.tipoDocumento && (
              <p className="text-red-500">El tipo de documento es requerido</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="fecha" className="block mb-2">
              Fecha
            </label>
            <input
              {...registerEnviar("fecha", { required: true })}
              type="date"
              id="fecha"
              className="w-fit bg-gray-200 rounded-md px-4 py-2"
            />
            {errorsEnviar.fecha && (
              <p className="text-red-500">La fecha es requerido</p>
            )}
          </div>
        </form>
        <div className="col-span-1">
          <form onSubmit={onSubmitEnviar}>
            <div>
              <label htmlFor="archivo" className="block mb-2">
                Cargar Archivo
              </label>
              <input
                type="file"
                id="archivo"
                {...registerEnviar("archivo", { required: true })}
                className="w-full bg-gray-200 rounded-md px-4 py-2"
                onChange={handleFileChange}
              />
              {errorsEnviar.archivo && (
                <p className="text-red-500">
                  Por favor cargue el archivo requerido
                </p>
              )}
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 mt-5 rounded-md"
            >
              Enviar
            </button>

            {/* Loader */}
            {loading && <div className="loader">Cargando...</div>}

            {/* Mensaje de éxito */}
            {successMessage && (
              <p className="success-message bg-green-500 text-white px-4 py-2 rounded-md mt-4">
                {successMessage}
              </p>
            )}
            {/* Mensaje de error */}
            {errorMessage && (
              <p className="error-message bg-red-500 text-white px-4 py-2 rounded-md mt-4">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
        <div className="w-full h-full overflow-y-auto flex justify-center col-span-1">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
            {visualizadorPdf && (
              <>
                <Viewer fileUrl={visualizadorPdf} plugins={[newplugin]} />
              </>
            )}
            {!visualizadorPdf && <>Sin archivo para visualizar</>}
          </Worker>
        </div>
      </div>
    </div>
  );
}

export default CargaDocsPage;
