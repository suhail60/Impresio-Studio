import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const PhotographersContext = createContext();

export function PhotographersProvider({ children }) {
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/photographers'
  : '/db.json';

  const [filters, setFilters] = useState({
    city: null,
    minRating: null,
    priceRange: [0, 20000],
    styles: [],
    searchQuery: '',
    sortBy: null
  });

  useEffect(() => {
    const fetchPhotographers = async () => {
      try {
        const response = await axios.get(baseURL);
        setPhotographers(response.data);
        console.log(photographers)
      } catch (error) {
        console.error('Error fetching photographers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotographers();
  }, []);

  return (
    <PhotographersContext.Provider value={{ photographers, loading, filters, setFilters }}>
      {children}
    </PhotographersContext.Provider>
  );
}

export function usePhotographers() {
  const context = useContext(PhotographersContext);
  if (!context) {
    throw new Error('usePhotographers must be used within a PhotographersProvider');
  }
  return context;
}