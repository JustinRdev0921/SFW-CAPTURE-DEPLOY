import React from 'react';

const Card = ({ empleado }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="px-4 py-4">
        <div className="font-bold text-xl mb-2">{empleado.NOMBRES} {empleado.APELLIDOS}</div>
        <p className="text-gray-700 text-base">Cédula: {empleado.CEDULA}</p>
        <p className="text-gray-700 text-base">Ciudad: {empleado.CIUDAD}</p>
        <p className="text-gray-700 text-base">Cargo: {empleado.CARGO}</p>
        <p className="text-gray-700 text-base">División: {empleado.DIVISION}</p>
        <p className="text-gray-700 text-base">Selección: {empleado.SELECCION}</p>
        <p className="text-gray-700 text-base">Estado: {empleado.ESTADO}</p>
        <p className="text-gray-700 text-base">Tipo Contrato: {empleado.TIPO_CONTRATO}</p>
      </div>
    </div>
  );
};

export default Card;
