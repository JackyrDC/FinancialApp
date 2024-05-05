import React, { useContext, useEffect, useState } from "react";
import PocketBaseContext from "../pages/PocketBaseContext"

function Modal({ onClose }) {
  const pb = useContext(PocketBaseContext);
  useEffect(() => {
    pb.autoCancellation(false);
    DataCategories('income_categories');
  }, [pb]);

  const [amount, setAmount] = useState(0);
  const [tipo, setTipo] = useState('Ingreso');
  const [listCategories, setListCategories] = useState([]);
  const [selectCategoria, setSelectCategoria] = useState('Otros');
  const [descripcion, setDescripcion] = useState('');

  const DataCategories = async (type) => {
    try {
      const response = await pb.collection(type).getFullList();
      if (response) {
        const data = {};
        response.forEach(item => {
          data[item.name] = item.id;
        });
        setListCategories(data);
        console.log(data);
      } else {
        console.log('No se encontraron datos');
      }
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const handleTipoChange = async (e) => {
    const type = e.target.value;
    setTipo(type);
    await DataCategories(type);
  };

  async function handleGuardar() {
    const formData = new FormData(); 
    formData.append('user', pb.authStore.model.id);
    formData.append('ammount', amount);
    formData.append('category', listCategories[selectCategoria]);
    formData.append('description', descripcion);
    if (tipo === 'Ingreso') { 
      const record = await pb.collection('incomes').create(formData);
    } else {
      const record = await pb.collection('expenses').create(formData);
    };
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
        <h2 className="text-2xl mb-4 font-bold">Registrar Transacción</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={tipo}
              onChange={handleTipoChange}
            >
              <option value="income_categories">Ingreso</option>
              <option value="expense_categories">Egreso</option>
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
              value={selectCategoria}
              onChange={(e) => setSelectCategoria(e.target.value)}
            >
              {Object.keys(listCategories).map((key) => (
                <option key={listCategories[key]} value={key}>
                  {key}
                </option>
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
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleGuardar}>
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;