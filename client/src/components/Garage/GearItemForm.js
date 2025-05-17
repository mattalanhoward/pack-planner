// src/components/Garage/GearItemForm.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addGearItem } from '../../redux/slices/garageSlice';

const GearItemForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    category: '',
    itemType: '',
    brand: '',
    name: '',
    description: '',
    weight: '',
    price: '',
    link: '',
    worn: false,
    consumable: false,
    quantity: 1,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple client-side validation
    if (!formData.category || !formData.itemType || !formData.brand || !formData.name) {
      setError('Please fill in category, item type, brand, and name.');
      return;
    }
    setError(null);

    // Dispatch addGearItem
    dispatch(
      addGearItem({
        ...formData,
        weight: Number(formData.weight),
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      })
    );

    // Reset form
    setFormData({
      category: '',
      itemType: '',
      brand: '',
      name: '',
      description: '',
      weight: '',
      price: '',
      link: '',
      worn: false,
      consumable: false,
      quantity: 1,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Add New Gear</h3>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block mb-1">Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Shelter"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Item Type</label>
          <input
            name="itemType"
            value={formData.itemType}
            onChange={handleChange}
            placeholder="e.g., Tent"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Brand</label>
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="e.g., Big Agnes"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Copper Spur UL2"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Optional details"
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
        <div>
          <label className="block mb-1">Weight (g)</label>
          <input
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Price (USD)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Link</label>
          <input
            name="link"
            type="url"
            value={formData.link}
            onChange={handleChange}
            placeholder="Optional URL"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              name="worn"
              type="checkbox"
              checked={formData.worn}
              onChange={handleChange}
              className="mr-2"
            />
            Worn
          </label>
          <label className="flex items-center">
            <input
              name="consumable"
              type="checkbox"
              checked={formData.consumable}
              onChange={handleChange}
              className="mr-2"
            />
            Consumable
          </label>
        </div>
        <div>
          <label className="block mb-1">Quantity</label>
          <input
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add Gear
      </button>
    </form>
  );
};

export default GearItemForm;
