// src/pages/GaragePage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGarage } from '../redux/slices/garageSlice';
import GearItemForm from '../components/Garage/GearItemForm';
import GearItemList from '../components/Garage/GearItemList';

const GaragePage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.garage);


  useEffect(() => {
    dispatch(fetchGarage());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Gear Garage</h2>
      <GearItemForm />
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <GearItemList items={items} />
      )}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default GaragePage;
