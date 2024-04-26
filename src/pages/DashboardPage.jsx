import React, { useState } from 'react';
import { RiLineChartLine } from "react-icons/ri";
import { PieChart } from '@mui/x-charts';
import Modal from '../components/Modal';

export const DashboardPage = () => {

  // Variables consultar base:
  const TopEgresos = "Transporte"; 
  const NTransacciones = 7;
  const TotalIngresos = 25875.65;
  const TotalEgresos = 2458.66;
  const TotalNeto = TotalIngresos-TotalEgresos;



  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const formattedTotal = new Intl.NumberFormat('es-HN', {
    style: 'currency',
    currency: 'HNL'
  }).format(TotalNeto);

  return (
    <>
      {modalOpen && <div className="fixed inset-0 z-50 bg-black bg-opacity-50 blur"></div>}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-10 gap-8 relative">
              <div className="bg-primary-100 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
                <RiLineChartLine className="text-5xl" />
                <h4 className="text-2xl">Total Neto</h4>
                <span className="text-4xl text-white">{formattedTotal}</span>
              </div>
              <div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl relative">
                <div className="flex items-center gap-4 bg-primary-100/10 rounded-xl p-4">
                  <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
                    ★
                  </span>
                  <div>
                    <h3 className="font-bold">Top Egresos:</h3>
                    <p className="text-gray-500">{TopEgresos}</p>
                  </div>
                </div>
                <div className="bg-primary-100/10 rounded-xl p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-primary-100 text-gray-300 text-2xl font-bold p-4 rounded-xl">
                    {NTransacciones}
                    </span>
                    <div>
                      <h3 className="font-bold">Transacciones</h3>
                      <p className="text-gray-500">{NTransacciones} en este mes</p>
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
                <h1 className="text-2xl font-bold mb-4">Ingresos vs. Egresos </h1>
                <div className="bg-white p-8 rounded-xl shadow-2xl">
                  <PieChart
                    series={[
                      {
                        data: [
                          { id: 0, value: TotalIngresos, label: 'Ingresos', color: 'green' },
                          { id: 1, value: TotalEgresos, label: 'Egresos',color: 'red' },
                        ],
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                      },
                    ]}
                    width={500}
                    height={250}
                  />
                </div>
              </div>
            </section>
            {modalOpen && <Modal onClose={closeModal} />}
            <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
              <div>
                <h1 className="text-2xl font-bold mb-4">Recientes</h1>
                <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
                  <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                    <div className="col-span-2 flex items-center gap-4">
                      <div>
                        <h3 className="font-bold">Compra BipBip - Comida</h3>
                        <p className="text-gray-500">15/06/2024</p>
                      </div>
                    </div>
                    <div>
                    <span className="bg-red-100 text-red-800 py-1 px-3 rounded-full font-medium">
                        Egreso
                      </span>
                    </div>
                    <div>
                      <span className="font-bold">L 1,200.87</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                    <div className="col-span-2 flex items-center gap-4">
                      <div>
                        <h3 className="font-bold">Deposito Juan Orlando</h3>
                        <p className="text-gray-500">10/03/2024</p>
                      </div>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
                        Ingreso
                      </span>
                    </div>
                    <div>
                      <span className="font-bold">L 12,998.88</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                    <div className="col-span-2 flex items-center gap-4">
                      <div>
                        <h3 className="font-bold">Pago Sueldo</h3>
                        <p className="text-gray-500">09/03/2024</p>
                      </div>
                    </div>
                    <div>
                      <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full font-medium">
                        Ingreso
                      </span>
                    </div>
                    <div>
                      <span className="font-bold">L 22,542.41</span>
                    </div>
                  </div>
                </div>
    
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-4">Categorias</h1>
                <div className="bg-white p-8 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
                  <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                    <div>
                      <span className="bg-yellow-100 text-black-800 py-1 px-3 rounded-full font-medium">
                        #1
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center gap-4">
                      <div>
                        <h3 className="font-bold">ALIMENTACIÓN</h3>
                        <p className="text-gray-500">L 1,200.87</p>
                      </div>
                    </div>
                    <div>
                      <span className="font-bold">31.5%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                    <div>
                      <span className="bg-yellow-100 text-black-800 py-1 px-3 rounded-full font-medium">
                        #2
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center gap-4">
                      <div>
                        <h3 className="font-bold">ROPA</h3>
                        <p className="text-gray-500">L 1,200.87</p>
                      </div>
                    </div>
                    <div>
                      <span className="font-bold">31.5%</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-4 items-center gap-4 mb-4">
                    <div>
                      <span className="bg-yellow-100 text-black-800 py-1 px-3 rounded-full font-medium">
                        #3
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center gap-4">
                      <div>
                        <h3 className="font-bold">OCIO</h3>
                        <p className="text-gray-500">L 1,200.87</p>
                      </div>
                    </div>
                    <div>
                      <span className="font-bold">31.5%</span>
                    </div>
                    
                  </div>
                </div>
              </div>
            </section>
    </>
  )
}
