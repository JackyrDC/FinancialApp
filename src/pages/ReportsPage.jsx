import React, { useEffect, useState } from 'react';
import PocketBaseContext from './PocketBaseContext';
import { useContext } from 'react';

const ReportsPage = () => {
  const pb = useContext(PocketBaseContext);
  const [userExpenses, setUserExpenses] = useState([]);

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
    <div>
      <h1>Reports Page</h1>
      {userExpenses.map((expense) => (
        <div key={expense.id}>{/* Render each expense item here */}</div>
      ))}
    </div>
  );
};

export default ReportsPage;