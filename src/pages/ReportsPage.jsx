import React, { useEffect, useState } from 'react';
import PocketBaseContext from './PocketBaseContext';
import { useContext } from 'react';

const ReportsPage = () => {
  const pb = useContext(PocketBaseContext);

  const [userExpenses, setUserExpenses] = useState([]);

  const categories = {
    '0bdec586jdcc6yl': "Educación",
    'gqvw3zmv64soxtt': "Transporte",
    'bngyqv8smschzy4': "Alimentación",
  };
  

  useEffect(() => {
    const fetchData = async () => {
      const user = pb.authStore.model.id;
      const filter = `user="${user}"`;
      pb.autoCancellation(false);
      const expenses = await pb.collection("expenses").getFullList({
        filter: filter,
        sort: '-created',
      });
      setUserExpenses(expenses);
      console.log(expenses)
    };
    fetchData();
  }, [pb]);



  return (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Reportes</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {userExpenses.map((expense) => (
        <div key={expense.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="p-4">
          <p className="text-gray-600">Descripción: {expense.description}</p>
          <p className="text-gray-600">Monto: {expense.ammount}</p>
          <p className="text-gray-600">Categoria: {categories[expense.category]}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default ReportsPage;