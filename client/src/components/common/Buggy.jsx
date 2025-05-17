// src/components/common/Buggy.jsx
import React from 'react';

const Buggy = () => {
  throw new Error('Test Error Boundary 🎉');
};

export default Buggy;
