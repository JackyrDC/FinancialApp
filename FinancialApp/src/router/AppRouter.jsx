import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../components/pages/Home';

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/login" element={<h1>Este es el Login </h1>} />
        <Route path="/home" element={<Home />} />
    </Routes>
  )
}
