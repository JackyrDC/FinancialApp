import React, { useContext, useEffect, useState } from "react";
import PocketBaseContext from "../pages/PocketBaseContext"

function Modal({ onClose }) {

  const pb = useContext(PocketBaseContext);

  const [amount, setAmount] = useState(0);
  const [tipo, setTipo] = useState('Ingreso');
  const [category, setCategory] = useState("");
  const [categoria, setCategoria] = useState('Otros');
  const [descripcion, setDescripcion] = useState('');

  // Fecha no se ocupan, solo visual.
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000; // Obtener el offset en milisegundos
  const localDate = new Date(now - offset).toISOString().slice(0, 16);
  const [fecha] = useState(localDate); // Fecha actual con hora y minutos en la zona horaria local
  const [readOnlyFecha] = useState(true); // Fecha no editable

  const categories = [
    'Educación',
    'Transporte',
    'Alimentación',
    'Ocio',
    'Salud',
    'Entretenimiento',
    'Otros'
  ];

  const categoriesExpense = {
    "Educación": '0bdec586jdcc6yl',
    "Transporte": 'gqvw3zmv64soxtt',
    "Alimentación": 'bngyqv8smschzy4',
    "Ocio": 'wex4348d6pz5u0r',
    "Salud": 'bflxztysr4avre0',
    "Entretenimiento": 'ur26x4pwvo05umk',
    "Otros": '0cq5rlqpfig8a0h'
  };

  const categoriesIncome = {
    'Educación': "1ani0dsrl1luykr",
    'Transporte': "7fgh35l8uo5povj",
    'Alimentación': "61vsyycebk6oq85",
    'Ocio': "vrg1xjtq5orxf3b",
    'Salud': "a65anubhipvwwm6",
    'Entretenimiento': "7arlc4lnojwok2q",
    'Otros': "ctpr6zv888lq9ke"
  };

  async function handleGuardar() {
    let identificador = ''
    const formData = new FormData(); 
    formData.append('user', pb.authStore.model.id);
    formData.append('ammount', amount);
    if (tipo === 'Ingreso') {
      formData.append('category', categoriesIncome[categoria]);
      identificador = 'incomes';
    } else if (tipo === 'Egreso') {
      formData.append('category', categoriesExpense[categoria]);
      identificador = 'expenses';
    };

    formData.append('description', descripcion);
    onClose();
    
    const record = await pb.collection(identificador).create(formData);
    console.log(record);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative z-50">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl mb-4 font-bold">Registrar Transacción</h2>
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
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Categoría</label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categories.map(cat => (
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