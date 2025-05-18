import { useState, useEffect } from 'react';

/**
 * Debounce a value by the given delay.
 *
 * @param {any} value   The value to debounce
 * @param {number} delay Delay in ms
 * @returns {any}        The debounced value
 */
export default function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounced;
}
