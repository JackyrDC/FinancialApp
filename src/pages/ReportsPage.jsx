import React, { useEffect, useState } from 'react';
import PocketBaseContext from './PocketBaseContext';
import { useContext } from 'react';

const History = () => {
  const pb = useContext(PocketBaseContext);

  const [userTransactions, setUserTransactions] = useState([]);

  const categoriesExpense = {
    '0bdec586jdcc6yl': "Educación",
    'gqvw3zmv64soxtt': "Transporte",
    'bngyqv8smschzy4': "Alimentación",
    'wex4348d6pz5u0r': "Ocio",
    'bflxztysr4avre0': "Salud",
    'ur26x4pwvo05umk': "Entretenimiento",
    '0cq5rlqpfig8a0h': "Otros"
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
      const allTransactions = [...expenses.map(e => ({...e, tipo: 'Egreso'})), ...incomes.map(i => ({...i, tipo: 'Ingreso'}))];
      setUserTransactions(allTransactions);
    };
    fetchData();
  }, [pb]);

  return (
  <div className="p-4">
    <h1 className="text-2xl font-bold mb-4">Historial</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {userTransactions.map((transaction) => (
        <div key={transaction.id} className="bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="p-4">
          <p className="text-gray-600">Descripción: {transaction.description}</p>
          <p className="text-gray-600">Monto: {transaction.ammount}</p>
          <p className="text-gray-600">Categoria: {transaction.tipo === 'Egreso' ? categoriesExpense[transaction.category] : categoriesIncome[transaction.category]}</p>
          <p className="text-gray-600">Tipo de Transacción: {transaction.tipo}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default History;