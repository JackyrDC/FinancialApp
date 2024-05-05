import React, { useState } from 'react';
import { RiLineChartLine } from "react-icons/ri";
import { PieChart } from '@mui/x-charts';
import Modal from '../components/Modal';
import PocketBaseContext from './PocketBaseContext';
import { useContext, useEffect } from 'react';

export const DashboardPage = () => {

  // Servidor:
  const pb = useContext(PocketBaseContext);
  const user = pb.authStore.model.id;
  const email = pb.authStore.model.email;

  // Datos Usuario:
  const [topEgreso, setTopEgreso] = useState('');
  const [numeroTransacciones, setNumeroTransacciones] = useState(0);
  const [userTransactions, setUserTransactions] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);

  useEffect(() => {
    pb.autoCancellation(false);
    DataAccount();
    DataTransaction();
    DataCategories();
  }, [pb]);

  const DataAccount = async () => {
    const search = await pb.collection('Accounts').getFirstListItem(`email="${email}"`)
    const account = await pb.collection('Accounts').getOne(search.id);
    const transactions = account.count_ingresos + account.count_egresos;
    setIngresos(account.total_mes_ingresos);
    setEgresos(account.total_mes_egresos);
    setNumeroTransacciones(transactions);
  };

  const DataTransaction = async () => {
    const transactions = await pb.collection("Transactions").getFullList({
      filter: `user="${user}"`,
      sort: '-created',
    });
    setUserTransactions(transactions);
  };

  const DataCategories = async () => {
    const analysis = await pb.collection('Category_Expense_Analysis').getFullList({
      filter: `user="${user}"`,
      sort: ['-total_mes_actual', '-created'],
    });
    setUserCategories(analysis);
    const listCategories = await pb.collection('expense_categories').getFullList();
    setCategories(listCategories);
    if (analysis.length > 0) {
      const one = analysis[0];
      const oneName = categories.find(cat => cat.id === one.category)?.name || 'N/A';
      setTopEgreso(oneName);
    } else {
      setTopEgreso('N/A');
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => { setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); };

  const totalNeto = ingresos-egresos;

  return (
    <>

      {modalOpen && <div className="fixed inset-0 z-50 bg-black bg-opacity-50 blur"></div>}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8 relative">
              <div className="bg-primary-100 p-7 rounded-xl text-gray-300 flex flex-col gap-6">
                <RiLineChartLine className="text-5xl" />
                <h4 className="text-2xl">Total Neto</h4>
                <span className="text-4xl text-white">L {totalNeto.toLocaleString('es-HN', {minimumFractionDigits: 2})}</span>
              </div>

              <div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl relative">
                <div className="flex items-center gap-4 bg-primary-100/10 rounded-xl p-4">
                  <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
                    ★
                  </span>
                  <div>
                    <h3 className="font-bold">Top Egresos:</h3>
                    <p className="text-gray-500">{topEgreso}</p>
                  </div>
                </div>
                <div className="bg-primary-100/10 rounded-xl p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
                    {numeroTransacciones}
                    </span>
                    <div>
                      <h3 className="font-bold">Transacciones</h3>
                      <p className="text-gray-500">Realizadas este mes</p>
                    </div>
                  </div>
                </div>
                <div className="w-full xl:w-auto">
                  <button onClick={openModal} className="bg-primary-100 py-2 px-6 rounded-xl text-white w-full">
                    Nueva Transacción
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col justify-between">
                <h1 className="text-2xl font-bold mb-4">Balance de {new Date().toLocaleString('default', { month: 'long' }).replace(/^\w/, (c) => c.toUpperCase())}</h1>
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: ingresos, label: 'Ingresos', color: 'green' },
                          { id: 1, value: egresos, label: 'Egresos',color: 'red' },
                        ],
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      },
                    ]}
                    width={400}
                    height={230}
                  />
                </div>
              </div>
            </section>
            {modalOpen && <Modal onClose={async () => { closeModal(); await DataAccount(); await DataTransaction(); }} />}

            <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
              <div>
                <h1 className="text-2xl font-bold mb-4">Recientes</h1>
                <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
                {userTransactions.slice(0, 5).map((transaction) => (
                  <div key={transaction.id} className="grid grid-cols-6 items-center gap-4 mb-1">
                    <div className="col-span-3 flex items-center gap-4">
                      <div>
                        <h3 className="font-bold">{transaction.description}</h3>
                        <p className="text-gray-500">
                        {new Date(transaction.created).toLocaleDateString('es-HN', { day: '2-digit', month: 'long'})},{' '}
                        {new Date(transaction.created).toLocaleTimeString('es-HN', { hour: '2-digit', minute: '2-digit', hour12: true })} 
                        </p>
                      </div>
                    </div>
                    <div className="col-span-1">
                      {transaction.type === 'expense' ? (
                          <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full font-medium">
                            Egreso
                          </span>
                      ) : (
                          <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
                            Ingreso
                          </span>
                      )}
                    </div>
                    <div className="col-span-2 flex items-center gap-4 justify-end">
                        <span className="font-bold ml-2 text-right">L {transaction.ammount.toLocaleString('es-HN', {minimumFractionDigits: 2})}</span>
                    </div>
                  </div>
                ))}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-4">Categorias</h1>
                <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
                  {userCategories.length > 0 ? (
                    userCategories.map((item, index) => (
                      <div className="grid grid-cols-8 xl:grid-cols-8 items-center gap-4 mb-4" key={index}>
                        <div className="col-span-1">
                          <span className="bg-yellow-100 text-black-800 py-1 px-3 rounded-full font-medium">
                            #{index + 1}
                          </span>
                        </div>
                        <div className="col-span-3 flex items-center gap-4 justify-center">
                          <div>
                            <h3 className="font-bold">{categories.find(cat => cat.id === item.category)?.name || 'N/A'}</h3>
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center gap-4 justify-end">
                          <div>
                            <p className="text-gray-500">L {item.total_mes_actual.toLocaleString('es-HN', {minimumFractionDigits: 2})}</p>
                          </div>
                        </div>
                        <div className="col-span-2 flex items-center gap-4 justify-end">
                          <div>
                            <p className="text-gray-500">
                              {((item.total_mes_actual/totalNeto)*100).toFixed(2)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">No hay categorías disponibles.</div>
                  )}
                </div>
              </div>
            </section>
    </>
  )
}
