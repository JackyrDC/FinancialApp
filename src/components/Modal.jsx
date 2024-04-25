import React, { useState } from 'react';

function Modal({ onClose }) {
  const [tipo, setTipo] = useState('Ingreso');
  const [monto, setMonto] = useState('');
  const [categoria, setCategoria] = useState('Alimentacion');
  const [descripcion, setDescripcion] = useState('');
  const [fecha] = useState(new Date().toISOString().slice(0, 16)); // Fecha actual con hora y minutos
  const [readOnlyFecha] = useState(true); // Fecha no editable

  const categorias = [
    'Alimentacion',
    'Transporte',
    'Entretenimiento',
    'Salud',
    'Educacion',
    'otros'
  ];

  const handleGuardar = () => {
    // Aquí puedes agregar la lógica para guardar la transacción
    console.log("Tipo:", tipo);
    console.log("Monto:", monto);
    console.log("Categoría:", categoria);
    console.log("Descripción:", descripcion);
    console.log("Fecha:", fecha);

    // Cierra el modal después de guardar la transacción
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative z-50">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl mb-4">Registrar Transacción</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              <option value="Ingreso">Ingreso</option>
              <option value="Egreso">Egreso</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Cantidad en Lempiras</label>
            <input
              type="number"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-4xl"
              value={monto}
              onChange={(e) => setMonto(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Fecha</label>
            <input
              type="datetime-local"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={fecha}
              readOnly={readOnlyFecha}
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleGuardar}
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;