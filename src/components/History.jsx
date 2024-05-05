import React, { useEffect, useState } from 'react';
import PocketBaseContext from '../pages/PocketBaseContext';
import { useContext } from 'react';
import { FiFilter } from 'react-icons/fi'; // Importa el icono de filtro

export const History = () => {
  const pb = useContext(PocketBaseContext);

  // Estados para almacenar datos y manejar filtros
  const [userExpenses, setUserExpenses] = useState([]); // Almacena los gastos del usuario
  const [filterCategory, setFilterCategory] = useState('all'); // Filtro por categoría
  const [filterTransactionType, setFilterTransactionType] = useState('all'); // Filtro por tipo de transacción (Ingreso o Egreso)
  const [search, setSearch] = useState(''); // Búsqueda por descripción de transacción
  const [searchDate, setSearchDate] = useState(''); // Búsqueda por fecha

  // Todas las categorías disponibles
  const allCategories = {
    '0bdec586jdcc6yl': "Educación",
    'gqvw3zmv64soxtt': "Transporte",
    'bngyqv8smschzy4': "Alimentación",
    'wex4348d6pz5u0r': "Ocio",
    'bflxztysr4avre0': "Salud",
    'ur26x4pwvo05umk': "Entretenimiento",
    '0cq5rlqpfig8a0h': "Otros",
    "1ani0dsrl1luykr": 'Educación',
    "7fgh35l8uo5povj": 'Transporte',
    "61vsyycebk6oq85": 'Alimentación',
    "vrg1xjtq5orxf3b": 'Ocio',
    "a65anubhipvwwm6": 'Salud',
    "7arlc4lnojwok2q": 'Entretenimiento',
    "ctpr6zv888lq9ke": 'Otros'
  };

  // Obtenemos un array de categorías únicas
  const uniqueCategories = Array.from(new Set(Object.values(allCategories)));

  // Generamos un nuevo objeto con las categorías únicas
  const uniqueCategoriesObject = uniqueCategories.reduce((acc, category, index) => {
    acc[index] = category;
    return acc;
  }, {});

  // useEffect para obtener los gastos e ingresos del usuario al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      const user = pb.authStore.model.id;
      const filter = `user="${user}"`;
      pb.autoCancellation(false);
      const expenses = await pb.collection("expenses").getFullList({
        filter: filter,
        sort: '-created',
      });
      const incomes = await pb.collection("incomes").getFullList({
        filter: filter,
        sort: '-created',
      });
      const allExpenses = expenses.map(expense => ({
        ...expense,
        tipo: 'Egreso',
        created: expense.created
      }));
      const allIncomes = incomes.map(income => ({
        ...income,
        tipo: 'Ingreso',
        created: income.created
      }));
      const allTransactions = [...allExpenses, ...allIncomes];
      setUserExpenses(allTransactions);
    };
    fetchData();
  }, [pb]);

  // Filtrar los gastos según los criterios establecidos
  const filteredExpenses = userExpenses.filter(expense => {
    if (filterCategory !== 'all' && !allCategories[expense.category]) {
      return false;
    }

    if (filterCategory !== 'all' && allCategories[expense.category] !== filterCategory) {
      return false;
    }

    if (filterTransactionType !== 'all' && expense.tipo !== filterTransactionType) {
      return false;
    }

    if (search && (!expense.description.toLowerCase().includes(search.toLowerCase()) && !expense.ammount.toString().includes(search) && !(allCategories[expense.category] && allCategories[expense.category].toLowerCase().includes(search.toLowerCase())))) {
      return false;
    }

    if (searchDate && new Date(expense.created).toISOString().slice(0, 10) !== searchDate) {
      return false;
    }

    return true;
  });

  // Renderizado del componente
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Historial</h1>
      <div className="flex justify-end items-center mb-4">
        {/* Filtro por categoría */}
        <FiFilter className="mr-2" />
        <label>
          Filtrar por categoría:
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">Todas</option>
            {Object.keys(uniqueCategoriesObject).map((key) => (
              <option key={key} value={uniqueCategoriesObject[key]}>{uniqueCategoriesObject[key]}</option>
            ))}
          </select>
        </label>
        {/* Filtro por tipo de transacción */}
        <label className="ml-4">
          Filtrar por tipo de transacción:
          <select value={filterTransactionType} onChange={(e) => setFilterTransactionType(e.target.value)}>
            <option value="all">Todos</option>
            <option value="Ingreso">Ingreso</option>
            <option value="Egreso">Egreso</option>
          </select>
        </label>
        {/* Búsqueda por descripción de transacción */}
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-4 px-2 py-1 border rounded"
        />
        {/* Búsqueda por fecha */}
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          className="ml-4 px-2 py-1 border rounded"
        />
      </div>
      {/* Tabla de resultados */}
      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Transacción</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Mapeo de los gastos filtrados */}
          {filteredExpenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.ammount}</td>
              {/* Determinación de la categoría según el tipo de transacción */}
              <td className="px-6 py-4 whitespace-nowrap">
                {expense.tipo === 'Egreso' 
                  ? allCategories[expense.category] 
                  : allCategories[expense.category]}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{new Date(expense.created).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">{expense.tipo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;





